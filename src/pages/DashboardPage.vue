<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md q-mb-md items-center">
      <div class="col-12 col-md-4">
        <h1 class="text-h4 text-primary q-my-none">Digimon List</h1>
      </div>
      <div class="col-12 col-sm-6 col-md-4">
        <q-select
          filled
          v-model="selectedLevel"
          :options="levelOptions"
          label="Niveles"
          dense
          clearable
        />
      </div>
      <div class="col-12 col-sm-6 col-md-4">
        <q-input
          filled
          v-model="search"
          label="Buscar por nombre"
          dense
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>

    <div v-if="loading" class="flex flex-center q-pa-xl">
      <q-spinner-dots color="primary" size="3em" />
    </div>

    <div v-else class="row q-col-gutter-md">
      <div
        v-for="digimon in filteredDigimons"
        :key="digimon.name"
        class="col-12 col-sm-6 col-md-4 col-lg-3"
      >
        <q-card class="my-card hover-effect">
          <q-img :src="digimon.img" :ratio="1" class="bg-grey-2">
            <template v-slot:error>
              <div class="absolute-full flex flex-center bg-negative text-white">
                Error loading image
              </div>
            </template>
             <div class="absolute-bottom text-subtitle2 text-center">
              {{ digimon.level }}
            </div>
          </q-img>

          <q-card-section>
            <div class="text-h6 text-center text-primary">{{ digimon.name }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    
    <div v-if="!loading && filteredDigimons.length === 0" class="text-center q-pa-xl text-grey">
      No se encontraron Digimons.
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { getAllDigimons } from '../services/digimonService'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const digimons = ref([])
const loading = ref(true)
const search = ref('')
const selectedLevel = ref(null)

const levelOptions = computed(() => {
  const levels = new Set(digimons.value.map(d => d.level))
  return Array.from(levels).sort()
})

const fetchDigimons = async () => {
  loading.value = true
  try {
    const data = await getAllDigimons()
    digimons.value = data
  } catch (error) {
    $q.notify({
      color: 'negative',
      message: 'Error al cargar Digimons',
      icon: 'report_problem'
    })
  } finally {
    loading.value = false
  }
}

const filteredDigimons = computed(() => {
  let result = digimons.value
  
  if (selectedLevel.value) {
    result = result.filter(d => d.level === selectedLevel.value)
  }
  
  if (search.value) {
    const term = search.value.toLowerCase()
    result = result.filter(d => d.name.toLowerCase().includes(term))
  }
  
  // Ordenar alfabéticamente por nombre
  return result.sort((a, b) => a.name.localeCompare(b.name))
})

onMounted(() => {
  fetchDigimons()
})
</script>

<style scoped>
.my-card {
  transition: transform 0.2s, box-shadow 0.2s;
}
.hover-effect:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}
</style>
