<template>
  <v-navigation-drawer expand-on-hover>
    <v-list>
      <v-list-item
        prepend-avatar="https://cdn3.emoji.gg/emojis/5727-pepe-smirk.png"
        title="Peepo the Frog"
        subtitle="peepo@frog.com"
      />
    </v-list>

    <v-divider />

    <v-list density="compact" nav>
      <v-list-item
        v-for="(item, index) in sidebarItems"
        :key="index"
        :prepend-icon="item.icon"
        :title="item.title"
        :value="item"
        :to="item.route"
        color="primary"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
const sidebarItems = [
  {
    title: 'Dashboard',
    route: '/',
    icon: 'fas fa-chart-bar',
  },
  {
    title: 'Aulas',
    route: '/classes',
    icon: 'fas fa-chalkboard-teacher',
  },
  {
    title: 'Uploads',
    route: '/uploads',
    icon: 'fas fa-file-upload',
  },
];
</script>
