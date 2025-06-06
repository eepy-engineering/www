<script lang="ts">
  import Badge from "$lib/component/badge.svelte";
  import Box from "$lib/component/box.svelte";
  import PersonalLink from "$lib/component/personal_link.svelte";
  import {
    faBluesky,
    faDiscord,
    faGithub,
    faLastfm,
    faLinkedin,
    faSteam,
    faTwitter,
    faXTwitter,
  } from "@fortawesome/free-brands-svg-icons";
  import { faClock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
  import Fa from "svelte-fa";
  import MemberSummary from "../member_summary.svelte";
  import { isKeyDown } from "$lib/is_key_down";
  import { DataFetcher } from "$lib/data_fetcher";
  import { onMount } from "svelte";
  import clock from "$lib/clock";

  const shift = isKeyDown("Shift");

  let { data: raw_data } = $props();

  let fetcher = DataFetcher.instance("/member/rose");

  onMount(() => {
    let unwatch = fetcher.watch();

    return () => {
      unwatch();
    };
  });

  let data = fetcher.getData(Date.now(), raw_data);

  let date = clock({ interval: 1000 });
  let my_date = $derived($date.setZone($data.time_zone));
  let my_location = $derived(
    $data.time_zone.split("/")[1].replaceAll("_", " "),
  );
</script>

<svelte:head>
  <title>eepy.engineering - Aubrey</title>
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
          src="/profile_pictures/aubrey.png"
          alt="Aubrey's profile"
        />
        <Box unpadded>
          <PersonalLink width={20}>
            {#snippet icon()}
              <Fa
                icon={faDiscord}
                translateY={0.15}
                scale={0.9}
                translateX={-0.1}
              />
            {/snippet}
            {#snippet content()}
              {#if $data.discord?.status == "online"}
                <p class="now-item" style:color="#6dab7f">Online</p>
              {:else if $data.discord?.status == "idle"}
                <p class="now-item" style:color="#d19e75">Idle</p>
              {:else if $data.discord?.status == "dnd"}
                <p class="now-item" style:color="#de626b">Do Not Disturb</p>
              {:else if $data.discord?.status == "offline"}
                <p class="now-item">Offline</p>
              {:else}
                <p class="now-item">Loading</p>
              {/if}
            {/snippet}
          </PersonalLink>
          <PersonalLink
            width={20}
            icon={faClock}
            content={my_date.toLocaleString({
              weekday: "short",
              hour: "numeric",
              minute: "2-digit",
              second: "2-digit",
            })}
          />
        </Box>
        <Box unpadded>
          {#snippet top()}
            <Badge variant="background0">Personal</Badge>
          {/snippet}

          <PersonalLink
            width={20}
            href="mailto:aubrey@hall.ly"
            content="aubrey@hall.ly"
            icon={faEnvelope}
          />

          <PersonalLink width={20} content="@sanae6">
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
            href="https://github.com/Sanae6"
            content="GitHub"
            icon={faGithub}
          />

          <PersonalLink
            width={20}
            href="https://www.linkedin.com/in/aubrey-taylor-994798270/"
            content="LinkedIn"
            icon={faLinkedin}
          />
        </Box>
        <Box unpadded>
          {#snippet top()}
            <Badge variant="background0">Social</Badge>
          {/snippet}

          <PersonalLink
            width={20}
            href="https://x.com/sanae6k"
            content={$shift ? "Twitter" : "X"}
            icon={$shift ? faTwitter : faXTwitter}
          />

          <PersonalLink
            width={20}
            href="https://bsky.app/profile/sanae6.bsky.social"
            content="Bluesky"
            icon={faBluesky}
          />

          <PersonalLink
            width={20}
            href="https://steamcommunity.com/id/sanae6"
            content="Steam"
            icon={faSteam}
          />

          <PersonalLink
            width={20}
            href="https://www.last.fm/user/Sanae6"
            content="Last.FM"
            icon={faLastfm}
          />
        </Box>
      </column>
      <column class="rhs">
        <MemberSummary
          name="Aubrey Taylor"
          pronouns="she/her"
          role="Founding Member"
          description="Hands on learner and compulsive system builder."
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
