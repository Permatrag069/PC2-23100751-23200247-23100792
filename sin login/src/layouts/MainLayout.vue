<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Digimon App </q-toolbar-title>

        <q-btn flat round dense icon="logout" @click="logout" label="Salir" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Menú </q-item-label>

        <q-item clickable tag="a" target="_blank" href="https://digimon-api.vercel.app/">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Digimon API</q-item-label>
            <q-item-label caption>Fuente de datos</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from 'src/stores/authStore'
import { useRouter } from 'vue-router'

const leftDrawerOpen = ref(false)
const authStore = useAuthStore()
const router = useRouter()

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function logout() {
  authStore.logout()
  router.push('/login')
}
</script>
