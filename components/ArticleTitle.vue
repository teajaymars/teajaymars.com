<script setup lang="ts">
import dayjs from "dayjs";
import dayJsAdvancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(dayJsAdvancedFormat);

defineProps({
  timestamp: String,
});
</script>

<template>
  <div class="article-byline">
    <NuxtLink class="article-title has-text-body" :href="useRoute().path">
      <slot />
    </NuxtLink>
    <time :datetime="timestamp" class="article-timestamp" v-if="timestamp">
      {{ dayjs(timestamp).format("Do MMM YYYY") }}
    </time>
  </div>
</template>

<style scoped>
.article-title {
  font-family: "Roboto Slab", serif;
  color: #151515;
  font-size: 36px;
  line-height: 42px;
}
.article-byline {
  margin-bottom: 2rem;
}
.article-timestamp {
  color: #888;
  font-family: "Roboto Condensed", serif;
  margin-top: 0.7rem;
  display: block;
  font-size: 18px;
}
</style>
