<template>
  <v-form v-model="valid" class="upload-class-form">
    <v-container>
      <v-row>
        <v-col cols="12" md="12">
          <v-text-field
            v-model="className"
            :rules="classNameRules"
            :counter="classNameMaxSize"
            label="Nome da aula"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="12">
          <v-text-field
            v-model="contextInputValue"
            label="Digite contextos e aperte ENTER"
            @keydown.enter.prevent="addValue"
          ></v-text-field>

          <div class="upload-class-form__badges-wrapper">
            <v-chip
              v-for="(value, index) in contextTags"
              :key="index"
              color="primary"
            >
              {{ value }}
              <v-icon
                size="16"
                icon="fas fa-times"
                @click="removeValue(index)"
              />
            </v-chip>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="questionsQuantity"
            :rules="questionsQuantityRules"
            label="Número de questões geradas"
            type="number"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="alternativesQuantity"
            :rules="alternativesQuantityRules"
            label="Número de alternativas por questão"
            type="number"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="12">
          <v-file-input
            v-model="file"
            :rules="fileRules"
            label="Upload de vídeo"
            prepend-icon="fas fa-file-import"
            show-size
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="12">
          <p>
            Data limite para finalização da prova:
          </p>
          <vue-date-picker
            v-model="selectedDate"
            :min-date="new Date()"
            model-type="yyyy-MM-dd HH:mm:ss"
          />
        </v-col>
      </v-row>

      <v-row no-gutters justify="end">
        <v-btn
          :disabled="!valid || !selectedDate"
          color="success"
          :loading="isRequestingData"
          class="upload-class-form__submit-button"
          @click="submitForm"
        >
          Submeter aula
        </v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
// import { createMock } from './mock';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const valid = ref(false);
const className = ref('');
const questionsQuantity = ref(1);
const alternativesQuantity = ref(2);
const contextInputValue = ref('');
const contextTags = ref([]);
const file = ref(null);
const selectedDate = ref(null);

const classNameMaxSize = 50;
const questionsInputSize = {
  min: 1,
  max: 20,
};
const alternativesInputSize = {
  min: 2,
  max: 5,
};

const isRequestingData = ref(false);

function addValue() {
  if (contextInputValue.value.trim() !== '') {
    contextTags.value.push(contextInputValue.value);
    contextInputValue.value = '';
  }
};

function removeValue(index) {
  contextTags.value.splice(index, 1);
};

const emit = defineEmits(['submit-success']);

async function submitForm() {
  try {
    isRequestingData.value = true;

    const formData = new FormData();
    formData.append('file', file.value[0]);
    formData.append('name', className.value);
    formData.append('questions_qty', questionsQuantity.value);
    formData.append('alternative_qty', alternativesQuantity.value);
    formData.append('context_tags', contextTags.value);
    formData.append('categories', []);
    formData.append('close_at', selectedDate.value);

    const response = await axios.post('http://localhost:3000/api/quizzes', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    // mock
    // const response = {
    //   data: createMock,
    // };

    emit('submit-success', response.data);
  } catch (error) {
    console.error('Erro ao enviar arquivo:', error);
  } finally {
    isRequestingData.value = false;
  }
}

const classNameRules = [
  value => {
    if (value) return true;

    return 'Nome da aula é obrigatório';
  },
  value => {
    if (value?.length <= classNameMaxSize) return true

    return `Máximo de ${classNameMaxSize} caracteres`;
  },
];

const questionsQuantityRules = [
  value => {
    const { min, max } = questionsInputSize;

    if (value >= min && value <= max) return true;

    return `Mínimo: ${min}. Máximo: ${max}`;
  },
];

const alternativesQuantityRules = [
  value => {
    const { min, max } = alternativesInputSize;

    if (value >= min && value <= max) return true;

    return `Mínimo: ${min}. Máximo: ${max}`;
  },
];

const fileRules = [
  value => {
    if (value) return true;

    return 'Nome da aula é obrigatório';
  },
];
</script>

<style lang="scss">
.upload-class-form {
  width: 700px;
}

.upload-class-form__badges-wrapper {
  display: flex;
  column-gap: 8px;
  row-gap: 4px;
  flex-wrap: wrap;
}

.upload-class-form__submit-button {
  margin-top: 24px;
}
</style>
