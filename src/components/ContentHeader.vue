<template>
  <h2 class="content-header__title">
    {{ route.meta.title }}
  </h2>

  <p class="content-header__description">
    {{ route.meta.description }}
  </p>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<style lang="scss">
.content-header__title {
  font-size: rem(48);
}

.content-header__description {
  font-size: rem(16);
  max-width: 900px;
}
</style>
