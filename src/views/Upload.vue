<template>
  <div class="upload">
    <UploadTabs @tab-select="setTabRoute" />

    <router-view />
  </div>
</template>

<script setup>
import UploadTabs from '@/components/UploadTabs.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const setTabRoute = (route) => {
  router.push({ name: route });
};
</script>

<style lang="scss" scoped>
.upload {
  display: flex;
  column-gap: 36px;
}
</style>