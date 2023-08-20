<template>
  <h2>
    {{ selectedClass.name }}
  </h2>

  <p v-if="selectedClass.report">
    {{ selectedClass.report }}
  </p>
</template>

<script setup>
import { useClassStore } from '@/store/class';
import { onBeforeUnmount, computed } from 'vue';

const classStore = useClassStore();

const selectedClass = computed(() => classStore.selectedClass);

onBeforeUnmount(() => {
  classStore.setSelectedClass(null);
})
</script>
