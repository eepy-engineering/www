<script lang="ts">
  let { link, tag, title, subtitle, tags, style = "round" } = $props();
</script>

<a
  href={link}
  is-="column"
  align-="start"
  class="highlight"
  box-="{style} contain:!top"
>
  <row align-="end" style:gap="1ch">
    <strong is-="badge" class="badge">{tag}</strong>
    {#each tags as tag}
      <p is-="badge" class="badge" variant-="foreground1" cap-="round">
        <i
          style:z-index="10"
          style:position="relative"
          style:left="-0.125ch"
          style:font-weight="500"
        >
          {tag}
        </i>
      </p>
    {/each}
  </row>
  <column class="highlight-info" self-="!basis grow">
    <h1>{title}</h1>
    <h2>{subtitle}</h2>
  </column>
</a>

<style>
  .highlight-info > h1 {
    font-size: calc(var(--font-size) * 2);
  }

  .highlight-info {
    padding: 1lh 2ch;
    width: 100%;
  }

  .highlight:hover {
    background-color: var(--background1);
  }

  .highlight > row {
    padding: 0lh 1ch;
    gap: 1ch;
  }
</style>
