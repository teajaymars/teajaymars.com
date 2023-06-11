import type { Link, Meta, Script } from "@unhead/vue";

export default defineNuxtPlugin((nuxtApp) => {
  // -- Populate the page <head>
  const link: Link[] = [];
  const meta: Meta[] = [];
  const script: Script[] = [];

  // Install FontAwesome Pro
  link.push({
    rel: "stylesheet",
    tagPosition: "bodyClose",
    href: "https://cdn.datapress.cloud/fontawesome-pro-6.1.1-web/css/fontawesome.min.css",
  });
  link.push({
    rel: "stylesheet",
    tagPosition: "bodyClose",
    href: "https://cdn.datapress.cloud/fontawesome-pro-6.1.1-web/css/brands.min.css",
  });
  link.push({
    rel: "stylesheet",
    tagPosition: "bodyClose",
    href: "https://cdn.datapress.cloud/fontawesome-pro-6.1.1-web/css/duotone.min.css",
  });
  link.push({
    rel: "stylesheet",
    tagPosition: "bodyClose",
    href: "https://cdn.datapress.cloud/fontawesome-pro-6.1.1-web/css/solid.min.css",
  });

  useHead({
    link,
    meta,
    script,
  });
});
