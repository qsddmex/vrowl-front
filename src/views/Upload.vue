<template>
  <UploadForm
    v-if="currentStep === 'form'"
    @submit-success="handleFormUploadSuccess"
  />
  <UploadClassPreview
    v-else-if="currentStep === 'class-preview'"
    :form-response-data="formResponseData"
  />
</template>

<script setup>
import { ref } from 'vue';
import UploadForm from '@/components/UploadForm.vue';
import UploadClassPreview from '@/components/UploadClassPreview.vue';

const currentStep = ref('form');
const formResponseData = ref(null);

function handleFormUploadSuccess(data) {
  formResponseData.value = data;

  currentStep.value = 'class-preview';
};
</script>

<style lang="scss">
</style>