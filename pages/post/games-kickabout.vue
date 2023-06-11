<script lang="ts" setup>
const title = "Java Games: Kickabout League";

useSeoMeta({
  title,
  description: "Multiplayer online football in the browser.",
});
</script>

<template>
  <article class="article content">
    <ArticleTitle timestamp="2011-02-13">{{ title }}</ArticleTitle>
    <blockquote>
      <p>
        For the sake of posterity, and for completeness, I am including links to
        software I wrote in my first job. In my first job out of university, I
        was hired to write Java browser games to complement
        <a href="http://runescape.com" target="_blank">Runescape</a>.
      </p>
    </blockquote>
    <p>
      Kickabout was a highly ambitious multiplayer football game which I
      designed and wrote for
      <a href="http://funorb.com" target="_blank">FunOrb.com</a>. It had over
      half a million players at its peak during the 2010 World Cup.
    </p>
    <p>
      <a
        href="https://web.archive.org/web/20100613074836/http://kickaboutleague.jagex.com/"
        ><img src="/img/games_kickabout.jpg" alt="Kickabout" />
        <div class="has-text-centered mt-1">kickaboutleague.com</div>
      </a>
    </p>
    <p>
      The goal was to test realtime multiplayer mechanics over TCP - which turns
      out to be a very tough problem.
    </p>
    <ul>
      <li>
        Fortunately, a year after launch, the IETF standardised
        <a href="https://en.wikipedia.org/wiki/WebSocket">WebSockets</a>, which
        provides a much more elegant solution.
      </li>
      <li>Sadly, it means the game quickly became obsolete!</li>
    </ul>
    <p>
      I led a team of four people to develop the game over eighteen months.
      Kickabout featured an auction house, player customisation, and 4v4
      in-browser multiplayer. The game is based on the simplified soccer games I
      used to enjoy on the NES when I was young.
    </p>
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/2MrPCfA-D4A"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>
    <hr />
    <h4>Screenshots:</h4>
    <p><img src="/img/kickabout4.jpg" alt="Screenshot 4" /></p>
    <p><img src="/img/kickabout1.jpg" alt="Screenshot 1" /></p>
    <p><img src="/img/kickabout2.jpg" alt="Screenshot 2" /></p>
    <p><img src="/img/kickabout3.jpg" alt="Screenshot 3" /></p>
  </article>
</template>
