import { writable, type Readable, type Writable } from "svelte/store";

function de_node(nodes: any[], data: Record<string, number>): any {
  let entries = Object.entries(data).map(([key, value]) => {
    let mapped = nodes[value];

    if ("object" == typeof mapped && mapped != null) {
      return [key, de_node(nodes, mapped)];
    } else {
      return [key, mapped];
    }
  });

  return Object.fromEntries(entries);
}

export class DataFetcher {
  static _instances = new Map<string, DataFetcher>();
  static instance(url: string) {
    if (this._instances.has(url)) {
      return this._instances.get(url)!;
    } else {
      const instance = new DataFetcher(url);
      this._instances.set(url, instance);
      return instance;
    }
  }

  constructor(private url: string) {
    this.interval = setInterval(() => {
      this.tick();
    }, 1000);
  }

  private data: Writable<{ data: any, time: number }> = writable({ data: {}, time: 0 });
  private count = 0;
  private interval: NodeJS.Timeout;
  private is_fetching = false;

  private async tick() {
    if (this.count == 0)
      return;

    if (this.is_fetching)
      return;

    this.is_fetching = true;

    try {
      let response = await fetch(`${this.url}/__data.json`);
      let body = await response.json();

      let array = body.nodes.find((node: any) => node?.type == "data").data;
      let data = de_node(array, array[0]);

      this.data.set({ data, time: Date.now() });
    } catch (e) {
      console.log("Failed to get realtime info", e);
    }

    this.is_fetching = false;
  }

  public getData<T>(time: number, data: T): Readable<T> {
    let store = writable(data);

    this.data.subscribe((value) => {
      if (value.time > time) {
        store.set(value.data);
      }
    });

    return store;
  }

  public watch(): () => void {
    this.count++;

    return () => {
      this.count--;
    }
  }
}
