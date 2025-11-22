<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-12 col-md-6">
        <q-input
          v-model="search"
          filled
          label="Buscar por nombre"
          dense
          clearable
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <div class="col-12 col-md-6">
        <q-select
          v-model="levelFilter"
          :options="levelOptions"
          filled
          label="Filtrar por Nivel"
          dense
          clearable
          emit-value
          map-options
        />
      </div>
    </div>

    <div v-if="loading" class="flex flex-center q-pa-xl">
      <q-spinner color="primary" size="3em" />
    </div>

    <div v-else class="row q-col-gutter-md">
      <div
        v-for="digimon in filteredDigimons"
        :key="digimon.name"
        class="col-12 col-sm-6 col-md-4 col-lg-3"
      >
        <q-card class="my-card">
          <q-img :src="digimon.img" :ratio="1" spinner-color="primary" />

          <q-card-section>
            <div class="text-h6">{{ digimon.name }}</div>
            <div class="text-subtitle2">{{ digimon.level }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    
    <div v-if="!loading && filteredDigimons.length === 0" class="text-center q-pa-xl text-grey">
      No se encontraron Digimons
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useQuasar } from 'quasar'

const digimons = ref([])
const search = ref('')
const levelFilter = ref(null)
const loading = ref(true)
const $q = useQuasar()

const levelOptions = computed(() => {
  const levels = new Set(digimons.value.map(d => d.level))
  return Array.from(levels).sort()
})

const filteredDigimons = computed(() => {
  return digimons.value.filter(d => {
    const matchesName = d.name.toLowerCase().includes((search.value || '').toLowerCase())
    const matchesLevel = !levelFilter.value || d.level === levelFilter.value
    return matchesName && matchesLevel
  })
})

onMounted(async () => {
  try {
    const response = await axios.get('https://digimon-api.vercel.app/api/digimon')
    digimons.value = response.data
  } catch (error) {
    console.error('Error fetching digimons:', error)
    $q.notify({
      color: 'negative',
      message: 'Error al cargar los Digimons'
    })
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.my-card {
  height: 100%;
  transition: transform 0.2s;
}
.my-card:hover {
  transform: translateY(-5px);
}
</style>
