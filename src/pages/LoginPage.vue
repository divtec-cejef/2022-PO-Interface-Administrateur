<template>
  <div class=" container window-height">
    <div class="div-main">
      <div class="div-title">
        <h2>Connectez-vous</h2>
      </div>
      <div class="div-form">
        <q-input outlined label="Nom" class="input-nom" />
        <q-input outlined label="Prenom" class="input-prenom" />
        <q-input outlined label="Mail" class="input-mail" />
      </div>
      <div class="div-button">
        <q-btn :loading="loading" color="primary" @click="simulateProgress()" style="width: 150px">
          Se connecter
          <template v-slot:loading>
            <q-spinner-hourglass class="on-left"/>
            Chargement...
          </template>
        </q-btn>
        <q-btn color="primary" @click="$router.push('/register')">
          Crée un compte
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'

export default {
  name: 'LoginPage',
  setup() {
    const loading = ref([
      false,
    ])

    const progress = ref(false)

    function simulateProgress() {
      // we set loading state
      loading.value = true

      // simulate a delay
      setTimeout(() => {
        // we're done, we reset loading state
        loading.value = false
      }, 3000)
    }

    return {
      loading,
      progress,
      simulateProgress
    }
  }
}


</script>

<style scoped>
h2 {
  font-size: 4rem;
  margin:0 0 5% 0;
  padding: 1%;
}

.div-main {
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.div-title {
  display: block ruby;
}


.div-button {
  display: flex;
  justify-content: space-around;
  width: 100%;
  font-weight: 600;
}

button {
  font-size: 1.17em;
}

.div-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
}

.input-prenom, .input-nom, .input-mail {
  width: 100%;
  margin-bottom: 2%;
}

.input-mail {
  margin-bottom: 5%;
}


</style>
