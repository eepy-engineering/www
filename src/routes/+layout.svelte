<script lang="ts">
  import EffectProvider from "$lib/component/effect_provider/effect_provider.svelte";

  let { children } = $props();

  import "../app.css";
</script>

<div class="normal root">
  {@render children()}
</div>

<div class="effect root">
  {@render children()}
</div>

<div class="effect2 root">
  {@render children()}
</div>

<div class="scanlines1 root"></div>
<div class="scanlines2 root"></div>

<style lang="postcss">
  /* Stolen from dimden.dev, thanks dimden! */

  @keyframes Static {
    0% {
      background-position: 0px 0px;
    }
    100% {
      background-position: 0px 4px;
    }
  }

  :root {
    --scanline-opacity: 0.6;
  }

  .scanlines1 {
    position: sticky;
    top: 0;
    left: 0;
    height: 100vh;
    pointer-events: none;
    pointer-events: none;
    z-index: 1000;
    background-image: url(/overlay.png);
    background-repeat: all;
    background-position: 0px 0px;
    opacity: var(--scanline-opacity);
    animation-name: Static;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: steps(4);
  }

  .scanlines2 {
    position: sticky;
    top: 0;
    left: 0;
    height: 100vh;
    pointer-events: none;
    z-index: 1000;
    background-image: url(/overlay2.png);
    background-repeat: all;
    background-position: 0px 0px;
    opacity: var(--scanline-opacity);
    animation-name: Static;
    animation-duration: 0.8s;
    animation-iteration-count: infinite;
    animation-timing-function: steps(4);
  }

  .root {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  .effect {
    filter: blur(5px) opacity(0.66) brightness(75%);
    mix-blend-mode: lighten;
    pointer-events: none;
  }

  .effect2 {
    filter: blur(40px) opacity(0.22) saturate(120%);
    mix-blend-mode: lighten;
    pointer-events: none;
  }

  :global(body) {
    margin: 0;
    padding: 0;
    background-color: var(--color-theme-light);
    min-height: 100vh;
  }

  @media (prefers-color-scheme: dark) {
    :global(body) {
      background-color: var(--color-dark-theme-dark);
    }
  }
</style>
