<template>
  <div class=" container window-height">
    <div class="div-main">
      <div class="div-title">
        <h2>Connexion</h2>
      </div>
      <div class="div-form">
        <q-input outlined color="pink-14" label="Mail" class="input-mail"/>
        <q-input outlined v-model="password" color="pink-14" label="Mot de passe" class="input-pwd" :type="isPwd ? 'password' : 'text'">
          <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd"/>
          </template>
        </q-input>
      </div>
      <div class="div-button">
        <q-btn :loading="loading" class="bt-login" @click="simulateProgress(), $router.push('/data')"
               style="width: 150px">
          Se connecter
          <template v-slot:loading>
            <q-spinner-hourglass class="on-left"/>
          </template>
        </q-btn>
        <q-btn @click="$router.push('/register')">
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
      password: ref(''),
      isPwd: ref(true),
      loading,
      progress,
      simulateProgress
    }
  },
}


</script>

<style scoped>
h2 {
  font-size: 4rem;
  margin: 0 0 10% 0;
  padding: 1%;
}

.div-main {
  width: 100%;
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
  background-color: #DC006B;
  color: white;
}

.div-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
}

.input-pwd, .input-mail {
  width: 100%;
  margin-bottom: 4%;
}

.input-pwd {
  margin-bottom: 9%;
}

/******************************************
Responsive
**************************************** */
@media screen and (min-width: 600px) {
  .div-main {
    width: 60%;
  }
}

@media screen and (min-width: 1000px) {
  .div-main {
    width: 40%;
  }
}

@media screen and (min-width: 1700px) {
  .div-main {
    width: 25%;
  }
}

</style>
