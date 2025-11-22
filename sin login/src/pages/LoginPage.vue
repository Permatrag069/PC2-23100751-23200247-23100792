<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card class="q-pa-md shadow-2 my_card" bordered>
      <q-card-section class="text-center">
        <div class="text-h5 text-weight-bold text-primary">Bienvenido</div>
        <div class="text-subtitle2">Inicia sesión para continuar</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input
            filled
            v-model="email"
            label="Correo electrónico"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Por favor ingresa tu correo']"
          />

          <q-input
            filled
            type="password"
            v-model="password"
            label="Contraseña"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Por favor ingresa tu contraseña']"
          />

          <div>
            <q-btn label="Iniciar Sesión" type="submit" color="primary" class="full-width" :loading="loading"/>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from 'src/stores/authStore'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const email = ref('guerrero@peru.com')
const password = ref('12345678')
const authStore = useAuthStore()
const router = useRouter()
const $q = useQuasar()
const loading = ref(false)

const onSubmit = async () => {
  loading.value = true
  try {
    await authStore.login(email.value, password.value)
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Inicio de sesión exitoso'
    })
    router.push('/')
  } catch {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: 'Error al iniciar sesión. Verifica tus credenciales.'
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.my_card {
  width: 100%;
  max-width: 400px;
}
</style>
