<script setup lang="ts">
type Post = {
  title: string;
  link: string;
  description: string;
  img: string;
};
const posts = ref<Post[]>([
  {
    link: "diy-guitar-pedal-board-with-bike-chain",
    title: "DIY Pedalboard",
    description: "A guitar pedal board made from scrap wood & bike chain.",
    img: "/img/thumb/pedalboard.jpg",
  },
  {
    link: "organograms-a-d3-guide-to-the-civil-service",
    title: "Organograms Explorer",
    description:
      "D3 App: Explore roles & salaries within the UK Civil Service.",
    img: "/img/thumb/organograms.png",
  },
  {
    link: "linux-user-lego-pi-feature",
    title: "Linux User Feature",
    description: "Eben Upton reviews my Raspberry Pi car.",
    img: "/img/thumb/linuxuser.jpg",
  },
  {
    link: "lego-xbox-raspberry-pi",
    title: "Lego & Raspberry Pi",
    description: "Building an RC car with Raspberry Pi & a game pad.",

    img: "/img/thumb/raspi.jpg",
  },
  {
    link: "hacking-scrabble-part-2",
    title: "Hacking Scrabble #2",
    description: "Printable charts and Python code.",
    img: "/img/thumb/scrabble2.jpg",
  },
  {
    link: "hacking-scrabble-part-1",
    title: "Hacking Scrabble #1",
    description: "LifeHacker feature on Scrabble memory techniques.",
    img: "/img/thumb/scrabble1.jpg",
  },
  {
    link: "games-kickabout",
    title: "Kickabout League",
    description: "Multiplayer online football in the browser.",
    img: "/img/thumb/kickabout.png",
  },
  {
    link: "games-pixelate",
    title: "Pixelate",
    description: "Lines-like game in 3D.",
    img: "/img/thumb/pixelate.jpg",
  },
  {
    link: "games-zombiedawn",
    title: "Zombie Dawn",
    description: "Command-and-Conquer strategy with zombies.",
    img: "/img/thumb/zombiedawn.png",
  },
]);
</script>

<template>
  <article class="article posts-index">
    <NuxtLink
      v-for="post in posts"
      :key="post.link"
      :href="'/post/' + post.link"
      class="post has-text-grey-darker"
    >
      <div class="post-title">
        {{ post.title }}
      </div>
      <img :src="post.img" class="post-img" />
      <div class="post-description">
        {{ post.description }}
      </div>
    </NuxtLink>
  </article>
</template>

<style lang="scss" scoped>
@import "~/node_modules/bulma/sass/utilities/mixins.sass";

.posts-index {
  display: flex;
  flex-direction: column;
  gap: 60px;

  @include tablet {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 60px 20px;
  }

  .post:hover .post-title {
    color: var(--link);
  }

  .post {
    display: flex;
    gap: 10px;
    flex-direction: column;
  }
  .post-title {
    font-size: 24px;
    font-weight: bold;
  }
  .post-img {
    width: 100%;
    max-width: 300px;
  }
}
</style>
