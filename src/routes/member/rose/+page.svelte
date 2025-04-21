<script lang="ts">
  import clock from "$lib/clock.js";
  import Badge from "$lib/component/badge.svelte";
  import Box from "$lib/component/box.svelte";
  import PersonalLink from "$lib/component/personal_link.svelte";
  import { DataFetcher } from "$lib/data_fetcher.js";
  import {
    faBluesky,
    faDiscord,
    faGithub,
    faInstagram,
    faItunesNote,
    faLastfm,
    faLinkedin,
    faSteam,
    faTwitter,
    faXTwitter,
  } from "@fortawesome/free-brands-svg-icons";
  import {
    faClock,
    faEnvelope,
    faLink,
    faLocationPin,
  } from "@fortawesome/free-solid-svg-icons";
  import { DateTime, Duration } from "luxon";
  import { onMount } from "svelte";
  import Fa from "svelte-fa";
  import MemberSummary from "../member_summary.svelte";
  import { isKeyDown } from "$lib/is_key_down";

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
  let my_date = $derived($date.setZone($data.location_info.time_zone));
  let my_location = $derived(
    $data.location_info.time_zone.split("/")[1].replaceAll("_", " "),
  );
  let listening_duration = $derived(
    $data.listening_to == undefined
      ? undefined
      : $date.diff(DateTime.fromMillis($data.listening_to.start_time)),
  );

  const shift = isKeyDown("Shift");
</script>

<div class="rootwrapper">
  <column class="root">
    <Box>
      <a class="link" href="/">eepy.engineering</a>
    </Box>
    <row>
      <column>
        <img
          class="profile-picture"
          src="/profile_pictures/rose.jpg"
          alt="Rose's profile"
        />
        <Box unpadded>
          {#snippet top()}
            <Badge variant="background0">Now</Badge>
          {/snippet}

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
              {#if $data.discord_status == "online"}
                <p class="now-item" style:color="#6dab7f">Online</p>
              {:else if $data.discord_status == "idle"}
                <p class="now-item" style:color="#d19e75">Idle</p>
              {:else if $data.discord_status == "dnd"}
                <p class="now-item" style:color="#de626b">Do Not Disturb</p>
              {:else if $data.discord_status == "offline"}
                <p class="now-item">Offline</p>
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
          <PersonalLink width={20} content={my_location}>
            {#snippet icon()}
              <Fa icon={faLocationPin} translateY={0.15} translateX={0.1} />
            {/snippet}
          </PersonalLink>
          {#if $data.listening_to !== undefined}
            <PersonalLink
              width={20}
              content={$data.listening_to.song_name}
              icon={faItunesNote}
              href={$data.listening_to.song_url}
            />
            <PersonalLink
              width={20}
              content={$data.listening_to.artist_name}
              icon={undefined}
              href={$data.listening_to.song_url}
            />
          {/if}
        </Box>
        <Box unpadded>
          {#snippet top()}
            <Badge variant="background0">Personal</Badge>
          {/snippet}

          <PersonalLink
            width={20}
            href="https://rose.hall.ly"
            content="rose.hall.ly"
            icon={faLink}
          />

          <PersonalLink
            width={20}
            href="mailto:rose@hall.ly"
            content="rose@hall.ly"
            icon={faEnvelope}
          />

          <PersonalLink width={20} content="@roobscoob">
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
            href="https://github.com/roobscoob"
            content="GitHub"
            icon={faGithub}
          />

          <PersonalLink
            width={20}
            href="https://www.linkedin.com/in/rose-kodsi-hall/"
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
            href="https://x.com/roobscoob1"
            content={$shift ? "Twitter" : "X"}
            icon={$shift ? faTwitter : faXTwitter}
          />

          <PersonalLink
            width={20}
            href="https://bsky.app/profile/rose.hall.ly"
            content="Bluesky"
            icon={faBluesky}
          />

          <PersonalLink
            width={20}
            href="https://steamcommunity.com/id/roobscoob"
            content="Steam"
            icon={faSteam}
          />

          <PersonalLink
            width={20}
            href="https://www.instagram.com/roob.scoob/"
            content="Instagram"
            icon={faInstagram}
          />

          <PersonalLink
            width={20}
            href="https://www.last.fm/user/roobscoob"
            content="Last.FM"
            icon={faLastfm}
          />
        </Box>
      </column>
      <column class="rhs">
        <MemberSummary
          name="Rose Kodsi-Hall"
          pronouns="she/they"
          role="Founding Member"
          description="
            Lifelong engineer, curious tinkerer, and unapologetic problem-solver. I
            thrive on unraveling complexity and building clever, sometimes
            unconventional, solutions, whether it's code, circuits, workflows, or
            everyday chaos. I don't just think outside the box - I like to take it apart
            and see how it works."
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
