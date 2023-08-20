<template>
  <v-container>
    <v-row>
      <v-col v-for="(item, index) in classQuestions" :key="index" cols="12" md="12">
        <v-card>
          <v-card-title>
            {{ item.question }}
          </v-card-title>

          <v-card-subtitle>
            Alternativa correta: ({{ item.correct_answer }})
          </v-card-subtitle>

          <v-card-text>
            <div class="upload-class-preview__alternatives-wrapper">
              <p
                v-for="(alternative, index) in item.answers"
                :key="index"
              >
                {{ formatAlternativeText(alternative) }}
              </p>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="primary"
              variant="text"
              @click="toggleItemShow(item)"
            >
              Trocar pergunta
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="item.show">
              <v-divider />

              <v-container fluid>
                <v-textarea
                  v-model="item.updateReason"
                  counter
                  label="Qual o motivo da troca?"
                  :rules="[v => v.length <= 200 || 'Maximo 200 caracteres']"
                />

                <v-btn
                  color="success"
                  block
                  :loading="isRequestingData"
                  @click="updateItem(item)"
                >
                  Enviar resposta e substituir
                </v-btn>
              </v-container>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="end" no-gutters>
      <v-btn
        color="success"
        :loading="isRequestingData"
        size="large"
        class="upload-class-preview__finish-button"
        @click="finishClassCreation()"
      >
        Confirmar criação de aula
      </v-btn>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';

const props = defineProps({
  formResponseData: {
    type: Object,
    required: true,
  },
});

const classQuestions = ref([]);
const isRequestingData = ref(false);

const emit = defineEmits(['preview-success']);

onMounted(() => {
  classQuestions.value = props.formResponseData.questions.map(question => ({
    ...question,
    show: false,
    updateReason: '',
  }));
});

function toggleItemShow(item) {
  item.show = !item.show;
}

function formatAlternativeText(alternative) {
  const { key: option, value: answer } = alternative;

  return `(${option}) ${answer}`;
};

async function finishClassCreation() {
  try {
    isRequestingData.value = true;

    const response = await axios.patch(`http://my-server/api/quizzes/${props.formResponseData.id}/confirm`);

    // mock
    // const response = {
    //   data: {
    //     shareable_link: 'https://meu-link.com/123456-654433-56755',
    //   },
    // };

    emit('preview-success', response.data);
    console.log('Aula criada com sucesso', response.data);
  } catch (error) {
    console.error('Erro ao finalizar:', error);
  } finally {
    isRequestingData.value = false;
  }
};

async function updateItem(item) {
  if (!item.updateReason) return;

  try {
    isRequestingData.value = true;

    const updatePayload = {
      update_reason: item.updateReason,
    };

    const response = await axios.patch(`http://my-server/api/questions/${item.id}`, updatePayload);

    // mock
    // const response = {
    //   data: {
    //     id: item.id,
    //     question: 'Pergunta atualizada?',
    //     correct_answer: 'c',
    //     answers: [
    //       {
    //         key: 'a',
    //         value: '<Minhas teta>',
    //       },
    //       {
    //         key: 'b',
    //         value: 'Disgraça',
    //       },
    //       {
    //         key: 'c',
    //         value: 'Baianinho de Mauá',
    //       },
    //       {
    //         key: 'd',
    //         value: 'Hackearam meu zap',
    //       },
    //     ]
    //   }
    // };

    const itemIndex = classQuestions.value.findIndex(question => question.id === item.id)

    if (itemIndex !== -1) {
      classQuestions.value[itemIndex] = response.data;

      console.log('Item atualizado com sucesso', response.data);
    } else {
      throw new Error('Item não encontrado pra substituição')
    }
  } catch (error) {
    console.error('Erro ao atualizar:', error);
  } finally {
    isRequestingData.value = false;
    item.updateReason = '';
    item.show = false;
  }
};
</script>

<style lang="scss">
.upload-class-preview__alternatives-wrapper {
  display: flex;
  flex-direction: column;
  row-gap: 4px;
}

.upload-class-preview__finish-button {
  margin-top: 24px;
}
</style>
