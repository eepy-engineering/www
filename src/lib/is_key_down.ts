import { readable, writable, type Readable } from "svelte/store";

export function isKeyDown(key_name: string): Readable<boolean> {
  if (typeof window === "undefined") {
    return readable(false);
  }

  let controller = new AbortController();

  let is_key_down = writable(false);

  window.addEventListener("keydown", (event) => {
    if (event.key == key_name) {
      is_key_down.set(true);
    }
  }, { signal: controller.signal });

  window.addEventListener("keyup", (event) => {
    if (event.key == key_name) {
      is_key_down.set(false);
    }
  }, { signal: controller.signal });

  return {
    subscribe(run, invalidate) {
      let unsubscribe = is_key_down.subscribe(run, invalidate);

      return () => {
        controller.abort();
        unsubscribe();
      };
    },
  }
}