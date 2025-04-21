import { get_data } from "$lib/server/data";

export async function load() {
  let data = get_data();

  return {
    listening_to: data.listening_to ? {
      icon: data.listening_to.image.find((image: any) => image.size == "large")["#text"],
      song_name: data.listening_to.name,
      artist_name: data.listening_to.artist["#text"],
      song_url: data.listening_to.url,
      start_time: data.listening_to.scrobble_start_time,
    } : undefined,
    discord_status: data.discord_status,
    location_info: {
      time_zone: "America/New_York",
    },
    current_game: data.current_game,
  }
}