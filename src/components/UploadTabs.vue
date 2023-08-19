<template>
  <v-tabs
    v-model="tab"
    direction="vertical"
    color="primary"
  >
    <v-tab
      v-for="(media, index) in uploadMediaTypes"
      :key="index"
      :value="media.routeName"
    >
      <v-icon :icon="media.icon" class="upload-tabs__icon" />
      {{ media.title }}
    </v-tab>
  </v-tabs>
</template>

<script setup>
import { ref, watch } from 'vue';

const tab = ref('video');

const emit = defineEmits(['tab-select']);

watch(tab, (currentTab) => {
  emit('tab-select', currentTab);
});

const uploadMediaTypes = [
  {
    title: 'Video',
    routeName: 'UploadVideo',
    icon: 'fas fa-video',
  },
  {
    title: 'Áudio',
    routeName: 'UploadAudio',
    icon: 'fas fa-file-audio',
  },
  {
    title: 'PDF',
    routeName: 'UploadPDF',
    icon: 'fas fa-file-pdf',
  },
  {
    title: 'Texto',
    routeName: 'UploadText',
    icon: 'fas fa-file-alt',
  },
];
</script>

<style lang="scss">
.upload-tabs__icon {
  margin-right: 10px;
}
</style>
