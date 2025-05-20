import type { User } from "personal-api";

export async function load(): Promise<User> {
  return await (await fetch("https://rose.hall.ly/api/user")).json()
}
