<script lang="ts">
  import Badge from "$lib/component/badge.svelte";
  import Box from "$lib/component/box.svelte";

  let { name, pronouns, role, description }: Props = $props();

  interface Props {
    name: string;
    pronouns: string;
    role: string;
    description?: string;
  }
</script>

<Box>
  {#snippet top()}
    <Badge variant="background0">&lt; summary.md &gt;</Badge>
  {/snippet}
  <h1 class="name">{name}</h1>
  <p><i>({pronouns})</i> - <b>{role}</b></p>
  {#if description}
    <br />
    <p>"{description}"</p>
  {/if}
</Box>

<style>
  h1 {
    font-size: calc(var(--font-size) * 2);
  }
</style>
