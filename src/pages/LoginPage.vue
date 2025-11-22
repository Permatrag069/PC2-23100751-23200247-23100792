<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card class="q-pa-md shadow-2 my_card" bordered>
      <q-card-section class="text-center">
        <div class="text-h5 text-weight-bold text-primary">Digimon Portal</div>
        <div class="text-subtitle2">Inicia sesión para acceder</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input
            filled
            v-model="email"
            label="Email"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Por favor ingresa tu email']"
          />

          <q-input
            filled
            type="password"
            v-model="password"
            label="Contraseña"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Por favor ingresa tu contraseña']"
          />

          <div v-if="authStore.error" class="text-negative text-center q-mt-sm">
            {{ authStore.error }}
          </div>

          <div>
            <q-btn label="Ingresar" type="submit" color="primary" class="full-width" :loading="authStore.loading"/>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const email = ref('guerrero@peru.com')
const password = ref('12345678')

const authStore = useAuthStore()
const router = useRouter()

const onSubmit = async () => {
  const success = await authStore.loginUser(email.value, password.value)
  if (success) {
    router.push('/dashboard')
  }
}
</script>

<style scoped>
.my_card {
  width: 100%;
  max-width: 400px;
}
</style>
