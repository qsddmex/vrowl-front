<template>
  <v-navigation-drawer
    expand-on-hover
    rail
  >
    <v-list>
      <v-list-item
        prepend-avatar="https://cdn3.emoji.gg/emojis/5727-pepe-smirk.png"
        title="Peepo the Frog"
        subtitle="peepo@frog.com"
      />
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-folder" title="Dashboard" value="dashboard" to="/" />
      <v-list-item prepend-icon="mdi-account-multiple" title="Aulas" value="classes" to="/classes" />
      <v-list-item prepend-icon="mdi-star" title="Uploads" value="uploads" to="/uploads" />
    </v-list>
  </v-navigation-drawer>
</template>
