<script lang="ts">
  import Banner from "$lib/component/banner/banner.svelte";
  import Highlight from "$lib/component/highlight.svelte";
  import Fa from "svelte-fa";
  import Wave from "./wave.svelte";
  import { faEnvelope, faHeart } from "@fortawesome/free-solid-svg-icons";
  import { faDiscord } from "@fortawesome/free-brands-svg-icons";
  import Box from "$lib/component/box.svelte";
  import Badge from "$lib/component/badge.svelte";
  import PersonalLink from "$lib/component/personal_link.svelte";
</script>

<title>eepy.engineering</title>

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
  <a href={link} class="member">
    <Box>
      {#snippet top()}
        <row align-="end">
          <Badge><b>{tag}</b></Badge>
        </row>
      {/snippet}
      <row>
        <img src={profile_icon} alt="profile" />
        <column class="profile-info" self-="!basis grow">
          <h1>{name}</h1>
          <i>{pronouns}</i>
          <p class="blurb" style:font-weight="500">{blurb1}</p>
          <p class="blurb" style:font-weight="500">{blurb2}</p>
        </column>
      </row>
    </Box>
  </a>
{/snippet}

<column align-="center" style:gap="1lh">
  <row align-="start center" items-="start" style:gap="1ch">
    <column class="highlights">
      <Box width={80}>
        {#snippet top()}
          <Badge variant="background0"><b>&lt; welcome.md &gt;</b></Badge>
        {/snippet}

        <h1 style:display="flex" style:flex-direction="row" style:gap="1ch">
          <span style:padding-top="6px"><Wave size={26} /></span>
          Welcome to eepy.engineering!
        </h1>
        <br />

        <p style:font-weight="500">
          We're a collective of engineers building software and writing about
          the world around us. We were kids who couldn't stop asking "why?". We
          took apart our toys to see what makes them tick, and grew up to be
          engineers who do the same with the tools we use, the games we play,
          and the lives we live.
        </p>
        <br />

        <p style:font-weight="500">
          Here you'll find a collection of projects we've worked on (both
          personal and for the collective), as well as articles we've written to
          document our journey. There's also other stuff scattered around the
          website, like member profiles, experiments, and games.
        </p>
        <br />

        <p style:font-weight="500">
          Thanks for reading! If you like the work we do, feel free to <a
            href="https://ko-fi.com/eepyengineering">send us a cup of coffee</a
          > to keep us up another night.
        </p>
      </Box>

      <!-- Things will go here -->
    </column>
    <column class="members" self-="!basis">
      <Box unpadded>
        {#snippet top()}
          <Badge variant="background0"><b>&lt; links.md &gt;</b></Badge>
        {/snippet}

        <!-- <PersonalLink
          href="mailto:hello@eepy.engineering"
          content="hello@eepy.engineering"
          icon={faEnvelope}
        /> -->

        <PersonalLink
          href="https://ko-fi.com/eepyengineering"
          content="Donate"
          icon={faHeart}
        />

        <PersonalLink
          href="https://discord.gg/gF3J5ZBSzZ"
          content="Join our Community"
        >
          {#snippet icon()}
            <Fa
              icon={faDiscord}
              translateY={0.15}
              scale={0.9}
              translateX={-0.1}
            />
          {/snippet}
        </PersonalLink>
      </Box>

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
        "Full-stack builder, from cells to",
        "datacenters and all in-between.",
      )}

      {@render member(
        "Founding Member",
        "/profile_pictures/aubrey.png",
        "Aubrey Taylor",
        "(she/her)",
        "/member/aubrey",
        "Hands on learner and compulsive",
        "system builder.",
      )}
    </column>
  </row>
</column>

<style>
  .highlights h1 {
    font-size: calc(var(--font-size) * 2);
  }

  .member:hover {
    background-color: var(--background1);
  }

  .blurb {
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 36ch;
    overflow: hidden;
  }

  .member row {
    gap: 1ch;
  }

  .member {
    display: inherit;
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
