{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };
  outputs = {
    self,
    nixpkgs,
    flake-utils,
  }:
    flake-utils.lib.eachDefaultSystem
    (
      system: let
        pkgs = import nixpkgs {
          inherit system;
        };
      in rec {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            pnpm
            nodejs_22
          ];
        };
        formatter = pkgs.alejandra;
        packages = with pkgs; rec {
          js-package = stdenv.mkDerivation (finalAttrs: {
            pname = "eepy-site";
            version = "0.0.1";

            src = ./.;

            buildInputs = [
              nodejs_22
              pnpm_9.configHook
            ];

            pnpmDeps = pnpm_9.fetchDeps {
              inherit (finalAttrs) pname src version;
              hash = "sha256-W1UTnY/5+90m8M+C/9J7tRvpNGcPnKteLm0VvZwB2Lw=";
            };
            pnpmRoot = ".";

            buildPhase = ''
              runHook preBuild
              pnpm build --sourcemap "inline"
              mkdir $out
              cp -r build/* node_modules $out/
              runHook postBuild
            '';
          });

          pushDockerImage = writeShellScriptBin "push-docker-image" ''
            sudo ${docker}/bin/docker image load -i ${dockerImage}
            sudo ${docker}/bin/docker push kokuzo.tailc38f.ts.net/eepy-site:latest
          '';
          dockerImage = let
            pkgsLinux = import nixpkgs {system = "x86_64-linux";};
          in
            pkgs.dockerTools.buildLayeredImage {
              name = "kokuzo.tailc38f.ts.net/eepy-site";
              tag = "latest";
              config = {
                Cmd = ["${pkgsLinux.nodejs_22}/bin/node" "${js-package}/index.js"];
                Env = [
                  "NODE_EXTRA_CA_CERTS=${pkgsLinux.cacert}/etc/ssl/certs/ca-bundle.crt"
                ];
                ExposedPorts = {
                  "3000 su/tcp" = {};
                };
                Volumes = {
                  "/data" = {};
                };
              };
            };
        };
      }
    );
}
