<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    children,
    style = "round",
    top,
    bottom,
    width,
    unpadded = false,
  }: Props = $props();

  interface Props {
    children?: Snippet;
    style?: "square" | "round" | "double";
    top?: Snippet;
    bottom?: Snippet;
    width?: number;
    unpadded?: boolean;
  }

  let contain: string | undefined = $derived.by(() => {
    if (top && bottom) {
      return "none";
    } else if (top) {
      return "!top";
    } else if (bottom) {
      return "!bottom";
    }
  });
</script>

<box
  box-="{style}{contain ? ` contain:${contain}` : ''}"
  style={width ? `width: ${width}ch` : ""}
  class:unpadded
>
  {#if top}
    <div class="top">
      {@render top?.()}
    </div>
  {/if}

  {@render children?.()}

  {#if bottom}
    {@render bottom?.()}
  {/if}
</box>

<style>
  .top {
    max-height: 1lh;
  }

  .unpadded .top {
    padding-left: 1ch;
  }

  box {
    padding-left: 2ch;
    padding-right: 2ch;
  }

  box.unpadded {
    padding-left: 1ch;
    padding-right: 1ch;
  }
</style>
