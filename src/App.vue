<template>
  <v-app>
    <TheSidebar />

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import TheSidebar from '@/components/TheSidebar.vue';
</script>
