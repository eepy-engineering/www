<script lang="ts">
  import Badge from "$lib/component/badge.svelte";
  import Box from "$lib/component/box.svelte";
  import PersonalLink from "$lib/component/personal_link.svelte";
  import { isKeyDown } from "$lib/is_key_down";
  import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
  import Fa from "svelte-fa";
  import MemberSummary from "../member_summary.svelte";
  import {
    faDiscord,
    faGithub,
    faLinkedin,
    faTwitter,
    faXTwitter,
  } from "@fortawesome/free-brands-svg-icons";

  const shift = isKeyDown("Shift");
</script>

<svelte:head>
  <title>eepy.engineering - Walter</title>
</svelte:head>

<div class="rootwrapper">
  <column class="root">
    <Box>
      <a class="link" href="/">eepy.engineering</a>
    </Box>
    <row>
      <column>
        <img
          class="profile-picture"
          src="/profile_pictures/walter.jpg"
          alt="Walter's profile"
        />
        <Box unpadded>
          {#snippet top()}
            <Badge variant="background0">Personal</Badge>
          {/snippet}

          <PersonalLink
            width={20}
            href="mailto:walterminb@gmail.com"
            content="walterminb@gmail.com"
            icon={faEnvelope}
          />

          <PersonalLink width={20} content="@saghetti">
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
        <Box unpadded>
          {#snippet top()}
            <Badge variant="background0">Work</Badge>
          {/snippet}

          <PersonalLink
            width={20}
            href="https://github.com/Saghetti0"
            content="GitHub"
            icon={faGithub}
          />

          <PersonalLink
            width={20}
            href="https://www.linkedin.com/in/walter-min-745767230/"
            content="LinkedIn"
            icon={faLinkedin}
          />
        </Box>
      </column>
      <column class="rhs">
        <MemberSummary
          name="Walter Min"
          pronouns="he/him"
          role="Founding Member"
          description="
          Hi! I'm Walter. I'm a lifelong tinkerer, programmer, writer,
          and too many other things to list. To that end, I've dabbled
          in full-stack dev, embedded systems, networks, electrical engineering,
          and fun (spooky) algorithms. When I learned that cells were machines too,
          I programmed them with genes and pipettes. If you catch me on
          the bus (do say hi!), I'll probably be exploring Wikipedia or
          reading esoteric papers I have saved on my phone."
        />
        <column>
          <i style:width="100%" style:text-align="center">
            There's nothing here yet!
          </i>
        </column>
      </column>
    </row>
  </column>
</div>

<style>
  .rhs {
    width: 95ch;
  }

  .profile-picture {
    width: 23ch;
    height: 11lh;
    margin: 1lh 1ch;
  }

  .link {
    font-weight: bold;
    text-decoration: underline;
  }

  .link:hover {
    background-color: var(--background1);
  }

  .root {
    margin: 1lh 2ch;
    width: 120ch;
  }

  .rootwrapper {
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
