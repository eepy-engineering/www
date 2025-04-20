<script lang="ts">
  import Banner from "$lib/component/banner/banner.svelte";
</script>

<Banner />

{#snippet member(
  tag: string,
  profile_icon: string,
  name: string,
  pronouns: string,
  link: string,
  blurb1: string,
  blurb2: string,
)}
  <a
    href={link}
    is-="column"
    align-="end"
    class="member"
    box-="round contain:!top"
  >
    <row align-="end">
      <strong is-="badge" class="badge">{tag}</strong>
    </row>
    <row>
      <img src={profile_icon} alt="profile" />
      <column class="profile-info" self-="!basis grow">
        <h1>{name}</h1>
        <i>{pronouns}</i>
        <p class="blurb" style:font-weight="500">{blurb1}</p>
        <p class="blurb" style:font-weight="500">{blurb2}</p>
      </column>
    </row>
  </a>
{/snippet}

{#snippet highlight(
  tag: string,
  title: string,
  subtitle: string,
  link: string,
  description: string,
  tags: string[],
)}
  <a
    href={link}
    is-="column"
    align-="start"
    class="highlight"
    box-="round contain:!top"
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
      <p>{description}</p>
    </column>
  </a>
{/snippet}

<column align-="center" style:gap="1lh">
  <div box-="round contain:!top" class="ようこぞ" style:width="131ch">
    <row align-="start">
      <b is-="badge" class="badge" variant-="background0"
        >&lt; welcome.md &gt;</b
      >
    </row>
    <p style:font-weight="500">
      We're a software collective of 3 members hoping to make software better
      for everyone.
    </p>
  </div>
  <row align-="start center" items-="start" style:gap="1ch">
    <column class="highlights">
      {@render highlight(
        "Featured Project",
        "Lorem ipsum dolor",
        "sit amet, consectetur adipiscing elit.",
        "/projects/demo-0",
        "",
        ["#project", "#natoque"],
      )}
      {@render highlight(
        "Featured Project",
        "Quisque dignissim quam et",
        "mauris facilisis, et imperdiet urna iaculis.",
        "/projects/pble",
        "",
        ["#project", "#magnis"],
      )}
      {@render highlight(
        "Featured Article",
        "Vivamus volutpat",
        "tellus vel tempus tempor, nisi nunc posuere velit, a sagittis nulla turpis eget eros.",
        "/projects/pble",
        "",
        ["#hot-takes", "#natoque"],
      )}
    </column>
    <column class="members" self-="!basis">
      {@render member(
        "Founding Member",
        "/profile_pictures/rose.jpg",
        "Rose Kodsi-Hall",
        "(she/they)",
        "/member/rose",
        "Lifelong engineer, curious tinkerer",
        "and unapologetic problem-solver.",
      )}

      {@render member(
        "Founding Member",
        "/profile_pictures/walter.jpg",
        "Walter Min",
        "(he/him)",
        "/member/walter",
        "Lorem ipsum dolor sit amet,",
        "consectetur adipiscing elit.",
      )}

      {@render member(
        "Founding Member",
        "/profile_pictures/aubrey.png",
        "Aubrey Taylor",
        "(she/her)",
        "/member/aubrey",
        "Lorem ipsum dolor sit amet,",
        "consectetur adipiscing elit.",
      )}
    </column>
  </row>
</column>

<style>
  .ようこぞ {
    padding-left: 2ch;
    padding-right: 2ch;
    width: 100%;
  }

  .highlight-info > h1 {
    font-size: calc(var(--font-size) * 2);
  }

  .highlight-info {
    padding: 1lh 2ch;
    width: 100%;
  }

  .member:hover {
    background-color: var(--background1);
  }

  .highlight:hover {
    background-color: var(--background1);
  }

  .blurb {
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 36ch;
    overflow: hidden;
  }

  .highlight > row {
    padding: 0lh 1ch;
    gap: 1ch;
  }

  .member > row {
    padding: 0lh 1ch;
    gap: 1ch;
  }

  .member img {
    height: 4lh;
  }

  .highlights {
    min-width: 80ch;
    max-width: 80ch;
  }

  .members {
    min-width: 50ch;
    max-width: 50ch;
  }
</style>
