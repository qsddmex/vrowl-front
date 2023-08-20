<template>
  <v-container>
    <v-row>
      <v-col v-for="(item, index) in classQuestions" :key="index" cols="12" md="3">
        <v-card>
          <v-card-title>
            {{ item.question }}
          </v-card-title>

          <v-card-subtitle>
            Alternativa correta: ({{ item.correct_answer }})
          </v-card-subtitle>

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

async function updateItem(item) {
  if (!item.updateReason) return;

  try {
    isRequestingData.value = true;

    const updatePayload = {
      update_reason: item.updateReason,
    };

    const response = await axios.put(`http://my-server/update/${item.id}`, updatePayload);

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
</style>
