<template>
  <v-container>
    <v-row>
      <v-col v-for="(item, index) in classStore.classes" :key="index" cols="12" md="4">
        <v-card>
          <v-card-title>
            {{ item.name }}
          </v-card-title>

          <v-card-subtitle>
            status: {{ item.status }}
          </v-card-subtitle>

          <v-card-actions>
            <v-btn
              color="primary"
              variant="text"
              @click="goToClassDetails(item)"
            >
              Ver relatório
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted} from 'vue';
import { useRouter } from 'vue-router';
import { useClassStore } from '@/store/class';

const router = useRouter();
const classStore = useClassStore();

function goToClassDetails(classItem) {
  classStore.setSelectedClass(classItem);

  router.push({ name: 'ClassDetail', params: { id: classItem.id } });
};

async function fetchClasses() {
  try {
    // const response = await axios.get('https://meu-server/api/quizzes');

    // mock
    const response = {
      data: [
        {
          id: 1,
          name: 'Meu quiz 1',
          status: 'done',
          report: 'EU TENHO MEU REPORT OLHA SO',
        },
        {
          id: 2,
          name: 'Meu quiz 2',
          status: 'done'
        },
        {
          id: 3,
          name: 'Meu quiz 3',
          status: 'done'
        },
        {
          id: 4,
          name: 'Meu quiz 4',
          status: 'done'
        },
        {
          id: 5,
          name: 'Meu quiz 5',
          status: 'done'
        },
        {
          id: 6,
          name: 'Meu quiz 6',
          status: 'done'
        },
      ]
    };

    classStore.setClasses(response.data);
  } catch (error) {
    console.log('Erro para resgatar aulas: ', error);
  }
};

onMounted(() => {
  fetchClasses();
});
</script>
