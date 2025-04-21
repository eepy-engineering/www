<script lang="ts">
  import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
  import type { Snippet } from "svelte";
  import Fa from "svelte-fa";

  let { href, content, icon, width }: Props = $props();

  interface Props {
    href?: string;
    content: string | Snippet;
    icon: Snippet | IconDefinition | undefined;
    width?: number;
  }
</script>

{#if !href}
  <b class="personal-link">
    <div style:width="2ch">
      {#if icon !== undefined}
        {#if "icon" in icon}
          <Fa {icon} translateY={0.15} />
        {:else}
          {@render icon()}
        {/if}
      {/if}
    </div>
    {#if typeof content === "string"}
      <b class="content" style={width ? `width: ${width - 2}ch` : ""}
        >{content}</b
      >
    {:else}
      {@render content()}
    {/if}
  </b>
{:else}
  <a class="link personal-link" href="https://bsky.app/profile/rose.hall.ly">
    <span style:width="2ch">
      {#if icon !== undefined}
        {#if "icon" in icon}
          <Fa {icon} translateY={0.15} />
        {:else}
          {@render icon()}
        {/if}
      {/if}
    </span>
    {#if typeof content === "string"}
      <b class="content" style={width ? `width: ${width - 2}ch` : ""}
        >{content}</b
      >
    {:else}
      {@render content()}
    {/if}
  </a>
{/if}

<style>
  .content {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-grow: 0;
    flex-shrink: 0;
  }

  .personal-link {
    display: flex;
    flex-direction: row;
    gap: 1ch;
    padding-left: 1ch;
    padding-right: 1ch;
  }

  .link {
    font-weight: bold;
    text-decoration: underline;
  }

  .link:hover {
    background-color: var(--background1);
  }
</style>
