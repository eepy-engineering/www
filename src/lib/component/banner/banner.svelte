<script lang="ts">
  import lowerLayerDark from "./lower_layer_dark.png";
  import lowerLayer from "./lower_layer.png";
  import middleLayerDark from "./middle_layer_dark.png";
  import middleLayer from "./middle_layer.png";
  import upperLayerDark from "./upper_layer_dark.png";
  import upperLayer from "./upper_layer.png";
</script>

<div class="root">
  <div class="padding-top"></div>
  <div class="main">
    <div class="content">
      <img class="lowerLayer dark" src={lowerLayerDark} alt="" />
      <img class="lowerLayer light" src={lowerLayer} alt="" />
      <img class="middleLayer dark" src={middleLayerDark} alt="" />
      <img class="middleLayer light" src={middleLayer} alt="" />
      <img class="upperLayer dark" src={upperLayerDark} alt="" />
      <img class="upperLayer light" src={upperLayer} alt="" />
    </div>
  </div>
  <div class="padding-bottom"></div>
</div>

<style lang="postcss">
  .root {
    --pixel-size: 6px;
  }

  @property --pixel-size {
    syntax: "<length>";
    inherits: true;
    initial-value: 6px;
  }

  .padding-top {
    background-color: var(--color-theme-dark);
    width: 100%;
    height: calc(var(--pixel-size) * 6);
  }

  .padding-bottom {
    background-color: var(--color-theme-light);
    width: 100%;
    height: calc(var(--pixel-size) * 10);
  }

  @media (prefers-color-scheme: dark) {
    .padding-top {
      background-color: var(--color-dark-theme-light);
    }

    .padding-bottom {
      background-color: var(--color-dark-theme-dark);
    }
  }

  .content {
    /* this has to be even otherwise the alignment with the background breaks */
    /* it *wants* to be 141. 142 (the current value) will make it slightly offset to the left, and 140 the inverse. */
    width: calc(var(--pixel-size) * 142);
    height: calc(var(--pixel-size) * 34);
    position: relative;
  }

  .content > img {
    position: absolute;
    top: 0;
  }

  .upperLayer {
    left: calc(var(--pixel-size) * 73);
    width: calc(var(--pixel-size) * 28);
    height: calc(var(--pixel-size) * 18);
  }

  .middleLayer {
    left: calc(var(--pixel-size) * 6);
    width: calc(var(--pixel-size) * 135);
    height: calc(var(--pixel-size) * 30);
    filter: drop-shadow(0px 6px 12px rgba(84, 84, 84, 0.5));
  }

  .lowerLayer {
    left: 0;
    width: calc(var(--pixel-size) * 126);
    height: calc(var(--pixel-size) * 36);
  }

  .main {
    width: 100%;
    height: calc(var(--pixel-size) * 40);

    user-select: none;

    image-rendering: pixelated;

    background-image: url("./background_slice.png"),
      linear-gradient(
        180deg,
        var(--color-theme-dark) 30%,
        var(--color-theme-light) 80%,
        var(--color-theme-light) 100%
      );

    background-repeat: repeat-x, no-repeat;

    background-size:
      calc(var(--pixel-size) * 2) calc(var(--pixel-size) * 22),
      100% 100%;

    background-position:
      center calc(var(--pixel-size) * 11),
      0% 0%;

    display: flex;
    justify-content: center;
  }

  .dark {
    opacity: 0;
  }

  .light {
    opacity: 1;
  }

  @media (prefers-color-scheme: dark) {
    .main {
      background-image: url("./background_slice_dark.png"),
        linear-gradient(
          180deg,
          var(--color-dark-theme-light) 30%,
          var(--color-dark-theme-dark) 80%,
          var(--color-dark-theme-dark) 100%
        );
    }

    .dark {
      opacity: 1;
    }

    .light {
      opacity: 0;
    }
  }
</style>
