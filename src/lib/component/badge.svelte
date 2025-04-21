<script lang="ts">
  import type { Snippet } from "svelte";

  let { children, variant = "foreground0" }: Props = $props();

  interface Props {
    children?: Snippet;
    variant?:
      | "foreground0"
      | "foreground1"
      | "foreground2"
      | "background0"
      | "background1"
      | "background2";
  }
</script>

<badge is-="badge" variant-={variant}>
  {@render children?.()}
</badge>
