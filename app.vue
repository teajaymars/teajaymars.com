<script lang="ts" setup></script>

<template>
  <section class="section pt-0 pb-0">
    <header>
      <img src="/img/avatar.jpg" class="header-avatar" />
      <div>
        <NuxtLink href="/" class="site-title">@teajaymars</NuxtLink>
      </div>

      <div class="socials">
        <a href="https://twitter.com/teajaymars" target="_blank" rel="noopener">
          <Icon pack="fab" icon="twitter" size="large" />
        </a>

        <a href="https://github.com/teajaymars" target="_blank" rel="noopener">
          <Icon pack="fab" icon="github" size="large" />
        </a>
      </div>
    </header>
  </section>

  <section class="section">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </section>

  <footer>
    <section class="section">
      <div class="socials">
        <a href="https://twitter.com/teajaymars" target="_blank" rel="noopener">
          <Icon pack="fab" icon="twitter" size="large" />
        </a>

        <a href="https://github.com/teajaymars" target="_blank" rel="noopener">
          <Icon pack="fab" icon="github" size="large" />
        </a>
      </div>
      &copy; {{ new Date().getFullYear() }}
      <a href="https://teajaymars.com">Tom Rees</a>. Released under the MIT
      licence.
    </section>
  </footer>
</template>

<style lang="scss" scoped>
@import "~/node_modules/bulma/sass/utilities/mixins.sass";

header {
  max-width: 600px;
  margin: 2rem auto 0 auto;
  position: relative;
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  font-family: "Roboto Slab", serif;

  .header-avatar {
    position: absolute;
    right: 106%;
    top: 0;
    height: 110px;
    @include touch {
      display: none;
    }
  }
  .site-title {
    font-size: 35px;
  }
  a {
    color: var(--body-color);
  }
  a:hover {
    color: var(--link);
  }
}

footer {
  font-family: "Roboto Condensed", serif;
  text-transform: uppercase;
  background: #f0f0f0;
  margin-top: 2rem;
  .section {
    padding-top: 2rem;
    padding-bottom: 2rem;
    text-align: center;
    .socials a {
      margin: 0.4rem;
      display: inline-block;
    }
  }
}
</style>
