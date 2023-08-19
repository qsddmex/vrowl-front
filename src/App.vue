<template>
  <v-app>
    <TheSidebar />

    <v-main>
      <div class="app-content">
        <ContentHeader />

        <div class="app-content__view">
          <router-view />
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import TheSidebar from '@/components/TheSidebar.vue';
import ContentHeader from './components/ContentHeader.vue';
</script>


<style lang="scss">
.app-content {
  padding: 40px;
}

.app-content__view {
  margin-top: 48px;
}
</style>
