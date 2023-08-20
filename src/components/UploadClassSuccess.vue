<template>
  UPLOAD SUCCESS: {{ shareableLink }}
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  classConfirmData: {
    type: Object,
    required: true,
  },
});

const shareableLink = computed(() => props.classConfirmData.shareable_link);
</script>
