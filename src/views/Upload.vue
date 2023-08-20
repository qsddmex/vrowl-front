<template>
  <UploadForm
    v-if="currentStep === 'form'"
    @submit-success="handleFormUploadSuccess"
  />
  <UploadClassPreview
    v-else-if="currentStep === 'class-preview'"
    :form-response-data="formResponseData"
    @preview-success="handlePreviewSuccess"
  />
  <UploadClassSuccess
    v-else
    :class-confirm-data="previewResponseData"
  />
</template>

<script setup>
import { ref } from 'vue';
import UploadForm from '@/components/UploadForm.vue';
import UploadClassPreview from '@/components/UploadClassPreview.vue';
import UploadClassSuccess from '@/components/UploadClassSuccess.vue';

const currentStep = ref('form');
const formResponseData = ref(null);
const previewResponseData = ref(null);

function handleFormUploadSuccess(data) {
  formResponseData.value = data;

  currentStep.value = 'class-preview';
};

function handlePreviewSuccess(data) {
  previewResponseData.value = data;

  currentStep.value = 'finished';
};
</script>

<style lang="scss">
</style>