# syntax = ghcr.io/reproducible-containers/buildkit-nix:v0.1.1@sha256:7d4c42a5c6baea2b21145589afa85e0862625e6779c89488987266b85e088021
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
        defaultPackage = packages.dockerImage;
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

          pushDockerImageActions = writeShellScriptBin "push-docker-image" ''
            echo "pushing ${self.rev}"
            push-docker-image ${dockerImage}
          '';

          dockerImage = let
            pkgsLinux = import nixpkgs {system = "x86_64-linux";};
            # Node's own build of 22.23.4, which fixes CVE-2026-111497 (an
            # out-of-bounds write in its Brotli decoder); this nixpkgs has 22.14.0.
            # Only its interpreter is patched (patchelf --set-rpath leaves it
            # segfaulting), so libstdc++ comes by LD_LIBRARY_PATH.
            nodejs = pkgsLinux.stdenv.mkDerivation (finalAttrs: {
              pname = "nodejs";
              version = "22.23.4";
              src = pkgsLinux.fetchurl {
                url = "https://nodejs.org/dist/v${finalAttrs.version}/node-v${finalAttrs.version}-linux-x64.tar.xz";
                sha256 = "1805bcd35e6815559bd2eb97db438d3fdb0eb3a5e6a977b7c1badca76337e9ce";
              };
              nativeBuildInputs = [pkgsLinux.makeBinaryWrapper];
              dontStrip = true;
              dontPatchELF = true;
              installPhase = ''
                runHook preInstall
                install -Dm755 bin/node $out/libexec/node
                patchelf --set-interpreter ${pkgsLinux.stdenv.cc.bintools.dynamicLinker} $out/libexec/node
                makeWrapper $out/libexec/node $out/bin/node \
                  --prefix LD_LIBRARY_PATH : ${pkgsLinux.lib.makeLibraryPath [pkgsLinux.stdenv.cc.cc.lib]}
                runHook postInstall
              '';
            });
          in
            pkgs.dockerTools.buildLayeredImage {
              name = "kokuzo.tailc38f.ts.net/eepy-site";
              tag = self.rev;
              config = {
                Cmd = ["${nodejs}/bin/node" "${js-package}/index.js"];
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
