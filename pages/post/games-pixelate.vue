<script lang="ts" setup>
const title = "Java Games: Pixelate";

useSeoMeta({
  title,
  description: "Lumines-like game in 3D.",
});
</script>

<template>
  <article class="article content">
    <ArticleTitle timestamp="2008-09-03">{{ title }}</ArticleTitle>
    <blockquote>
      <p>
        For the sake of posterity, and for completeness, I am including links to
        software I wrote in my first job. In my first job out of university, I
        was hired to write Java browser games to complement
        <a href="http://runescape.com" target="_blank">Runescape</a>.
      </p>
    </blockquote>
    <p>
      To detox from long days writing Java, especially in the rush to launch
      <a href="http://funorb.com">FunOrb.com</a>, I would play
      <a href="https://www.penny-arcade.com/comic/2005/03/25"
        ><em>Lumines</em></a
      >.
    </p>
    <p>
      I got a bit obsessed. My next project was to design a spiritual successor
      with the same aesthetic idea of transitioning colour and light. The result
      was a 3D-falling-block game:
    </p>
    <p>
      <a href="http://www.funorb.com/info.ws?game=pixelate"
        ><img src="/img/games_pixelate.jpg" alt="Pixelate"
      /></a>
    </p>
    <ul>
      <li>
        This was the first Jagex game with any kind of real-time multiplayer
        feedback.
        <ul>
          <li>
            Writing browser applets in 2007, with no libraries, entirely on TCP
            streams (no UDP), means that was <em>really difficult</em>.
          </li>
        </ul>
      </li>
      <li>
        I was very keen for Pixelate to be unique, not a clone of any existing
        block game.
        <ul>
          <li>The result is fun, but not as much fun as <em>Lumines</em>.</li>
        </ul>
      </li>
      <li>
        It&#39;s possible to master the game with a little effort. We saw users
        playing perfect (ie. unbeatable) games against each other in
        head-to-head multiplayer.
      </li>
    </ul>
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/ARMx5VK1eKI"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>
    <hr />
    <h4>Screenshots:</h4>
    <p><img src="/img/pixelate4.jpg" alt="Screenshot 4" /></p>
    <p><img src="/img/pixelate1.jpg" alt="Screenshot 1" /></p>
    <p><img src="/img/pixelate2.jpg" alt="Screenshot 2" /></p>
    <p><img src="/img/pixelate3.jpg" alt="Screenshot 3" /></p>
  </article>
  <template />
</template>
