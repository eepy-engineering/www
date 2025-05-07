import { SteamWebApi } from "@j4ckofalltrades/steam-webapi-ts";
import { Client, GatewayIntentBits } from 'discord.js';
import { building } from "$app/environment";
import { env } from "$env/dynamic/private";
import { readFileSync } from "node:fs";

const GLOBAL_STATUS_DATA = {
  listening_to: undefined as undefined | Record<string, any>,
  discord_status: "no_data",
  current_game: undefined as undefined | Record<string, any>,
}

function startPolling() {
  if (env.SECRETS_FILE === undefined)
    throw new Error("missing SECRETS_FILE environment variable");

  const SECRETS = JSON.parse(readFileSync(env.SECRETS_FILE, "utf-8"));

  const steamWebApi = new SteamWebApi(SECRETS.STEAM_API_KEY);

  async function get_currently_listening() {
    let result = await fetch("https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=roobscoob&api_key=" + SECRETS.LAST_FM_API_KEY + "&format=json");
    let data = await result.json();

    return data?.recenttracks?.track?.find((t: any) => t?.["@attr"]?.nowplaying);
  }

  let client: Client<boolean>;

  if (!("__server_data_discord_client" in globalThis)) {
    let client = new Client({ intents: [GatewayIntentBits.GuildPresences] });
    (globalThis as any).__server_data_discord_client = client;

    client.login(SECRETS.DISCORD_BOT_TOKEN);
  }

  client = (globalThis as any).__server_data_discord_client

  if ("__server_data_fetch_interval" in globalThis) {
    clearInterval((globalThis as any).__server_data_fetch_interval);
  }

  let is_fetching = false;

  let game_data_cache: Map<string, any> = new Map;

  async function get_game_info(game_id: string | number | undefined) {
    if (game_id == undefined)
      return undefined;

    let cache_result = game_data_cache.get(game_id.toString());

    if (cache_result !== undefined)
      return cache_result;

    console.log("Fetching uncached game", game_id);

    let response = await fetch(`https://store.steampowered.com/api/appdetails?appids=${game_id}`);
    let data = await response.json();

    let result = data?.[game_id]?.data;

    if (result == undefined)
      console.log("[Data] [Warn] Failed to get steam data for title:", game_id, result)
    else
      game_data_cache.set(game_id.toString(), result);

    return result;
  }

  let steamTimeout = 0;

  (globalThis as any).__server_data_fetch_interval = setInterval(async () => {
    if (is_fetching)
      return;

    is_fetching = true;

    try {
      let scrobble_data = await get_currently_listening();

      if (scrobble_data == undefined) {
        GLOBAL_STATUS_DATA.listening_to = undefined;
      } else if (GLOBAL_STATUS_DATA.listening_to == undefined || GLOBAL_STATUS_DATA.listening_to.url != scrobble_data.url) {
        console.log("[DATA] Scrobbling changed to:", scrobble_data.name, "by", scrobble_data.artist["#text"]);

        GLOBAL_STATUS_DATA.listening_to = {
          ...scrobble_data,
          scrobble_start_time: Date.now(),
        }
      }
    } catch (e) {
      console.log("Failed to get scrobble information:", e)
    }

    try {
      let petals = await client.guilds.fetch("1052608171094573056");
      let rose = await petals.members.fetch("519673297693048832");

      GLOBAL_STATUS_DATA.discord_status = rose.presence?.status ?? "no_data"
    } catch (e) {
      console.log("Failed to get discord information:", e)
    }

    if (steamTimeout == 0) {
      try {
        let steam_player_result = await steamWebApi.usersApi.getPlayerSummaries(["76561198087706314"]);
        let current_game = steam_player_result.response.players[0].gameid; // e.g 1262350
        let steam_game_result = await get_game_info(current_game);

        GLOBAL_STATUS_DATA.current_game = steam_game_result;
      } catch (e) {
        console.log("Failed to get steam info:", JSON.stringify((e as any).toString()))

        if ((e as any).toString() === "Error: Request failed with status code 429") {
          steamTimeout = 10;
          console.log("Rate limited by steam, retrying in 40 seconds");
        }
      }
    } else {
      steamTimeout--;
    }

    is_fetching = false;
  }, 1000);
}

if (!building)
  startPolling();

export let get_data = function get_data() {
  return GLOBAL_STATUS_DATA;
}
