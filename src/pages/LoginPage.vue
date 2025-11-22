<template>
  <q-page class="digimon-login-page flex flex-center">
    <div class="digital-grid"></div>
    <q-card class="digi-card q-pa-lg shadow-10" bordered>
      <q-card-section class="text-center">
        <div class="text-h4 text-weight-bold text-cyan-4 digi-title">
          DIGIMON PORTAL
        </div>
        <div class="text-subtitle2 text-grey-4">Acceso al Mundo Digital</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input
            filled
            dark
            v-model="email"
            label="Digi-Email"
            label-color="cyan-2"
            color="cyan-4"
            class="digi-input"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Por favor ingresa tu email',
            ]"
          >
            <template v-slot:prepend>
              <q-icon name="alternate_email" color="cyan-4" />
            </template>
          </q-input>

          <q-input
            filled
            dark
            type="password"
            v-model="password"
            label="Código de Acceso"
            label-color="cyan-2"
            color="cyan-4"
            class="digi-input"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Por favor ingresa tu contraseña',
            ]"
          >
            <template v-slot:prepend>
              <q-icon name="lock" color="cyan-4" />
            </template>
          </q-input>

          <div
            v-if="authStore.error"
            class="text-red-4 text-center q-mt-sm text-weight-bold"
          >
            {{ authStore.error }}
          </div>

          <div class="q-mt-lg">
            <q-btn
              label="DIGIEVOLUCIONAR"
              type="submit"
              color="orange-9"
              text-color="white"
              class="full-width digi-btn text-weight-bold"
              :loading="authStore.loading"
              glossy
              push
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

const email = ref("guerrero@peru.com");
const password = ref("12345678");

const authStore = useAuthStore();
const router = useRouter();

const onSubmit = async () => {
  const success = await authStore.loginUser(email.value, password.value);
  if (success) {
    router.push("/dashboard");
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap");

.digimon-login-page {
  background-color: #050a14;
  font-family: "Orbitron", sans-serif;
  position: relative;
  overflow: hidden;
}

/* Digital Grid Background Effect */
.digital-grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 200%;
  background-image: linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 40px 40px;
  transform: perspective(500px) rotateX(60deg) translateY(-100px)
    translateZ(-200px);
  animation: gridMove 20s linear infinite;
  opacity: 0.4;
  pointer-events: none;
}

@keyframes gridMove {
  0% {
    transform: perspective(500px) rotateX(60deg) translateY(0)
      translateZ(-200px);
  }
  100% {
    transform: perspective(500px) rotateX(60deg) translateY(40px)
      translateZ(-200px);
  }
}

.digi-card {
  width: 100%;
  max-width: 400px;
  background: rgba(12, 20, 35, 0.85);
  backdrop-filter: blur(10px);
  border: 2px solid #00e5ff;
  box-shadow: 0 0 20px rgba(0, 229, 255, 0.3),
    inset 0 0 20px rgba(0, 229, 255, 0.1);
  border-radius: 15px;
  z-index: 1;
}

.digi-title {
  text-shadow: 0 0 10px rgba(0, 229, 255, 0.8);
  letter-spacing: 2px;
}

.digi-btn {
  font-family: "Orbitron", sans-serif;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  box-shadow: 0 0 15px rgba(255, 152, 0, 0.4);
}

.digi-btn:hover {
  box-shadow: 0 0 25px rgba(255, 152, 0, 0.7);
  transform: scale(1.02);
}
</style>
