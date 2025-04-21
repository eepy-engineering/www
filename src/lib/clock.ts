import { readable } from 'svelte/store'

import { DateTime } from "luxon";

export default function (options: { interval?: number } = {}) {
  const initial = DateTime.now()

  // return a readable store
  return readable(initial, set => {
    // the `update` function sets the latest date
    const update = () => set(DateTime.now())

    // setup an interval timer to update the store's value every x milliseconds
    const interval = setInterval(update, options.interval || 1000)

    // return a cleanup function,
    // it will stop the timer when the store is destroyed
    return () => clearInterval(interval)
  })
}