<script lang="ts" setup>
const title = "Organograms Explorer: A D3 Guide to the Civil Service";

useSeoMeta({
  title,
  description: "D3 App: Explore roles & salaries within the UK Civil Service.",
  ogImage: "/img/thumb/organograms.png",
});
</script>

<template>
  <article class="article content">
    <ArticleTitle timestamp="2014-03-01">{{ title }}</ArticleTitle>

    <p>
      This is personal side-project which was picked up for further development
      by the UK Cabinet Office. Smaller agencies such as the
      <em>Government Procurement Service</em> work best. To see the template
      break down, try something like <em>Ministry of Justice</em>.
    </p>
  </article>

  <div style="background: #f0f0f0; border-radius: 1rem; padding: 2rem 0">
    <iframe
      src="/organograms/"
      width="1024px"
      height="1000px"
      style="margin: auto; display: block"
    ></iframe>
  </div>

  <div class="content">
    <ul>
      <li>
        I used a Python scraper to pull all the
        <a
          href="https://data.gov.uk/dataset/staff-organograms-and-pay-civil-service-learning"
          >UK Civil Service Organograms Data</a
        >
        from the linked-data triplestore.
      </li>
      <li>
        I learned to hate linked data and triplestores. If you think they are a
        good idea I can prove you wrong. With science.
      </li>
      <li>
        This data is <strong>out of date!</strong> It was scraped around
        mid-2012.
      </li>
      <li>
        I wanted to build a communication tool to represent both the hierarchy
        of roles in the civil service, and the respective pay scales.
      </li>
    </ul>
  </div>
</template>
