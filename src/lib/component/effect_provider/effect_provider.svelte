<script lang="ts">
  let { children } = $props();
  import html2canvas from "html2canvas";
  import { onMount } from "svelte";

  let view: HTMLCanvasElement;
  let contents: HTMLElement;

  onMount(() => {
    view.width = window.innerWidth * window.devicePixelRatio;
    view.height = window.innerHeight * window.devicePixelRatio;

    html2canvas(contents, {
      canvas: view,
    });
  });
</script>

<div bind:this={contents} class="contents">
  {@render children()}
</div>

<canvas bind:this={view} class="view"></canvas>

<style>
  .contents {
    background-color: var(--color-theme-light);
  }

  @media (prefers-color-scheme: dark) {
    .contents {
      background-color: var(--color-dark-theme-dark);
    }
  }
  .view {
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10000;
  }
</style>
