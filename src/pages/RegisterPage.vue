<template>
  <div class="container-menu window-height">
  <NavigationFloat selected='2' />
  <div class=" container window-height">
    <div class="div-main">
      <div class="div-title">
        <h2>Inscription</h2>
      </div>
      <div class="div-form">
        <q-input outlined color="pink-14" v-model="lastname" label="Nom" class="input-lastname"/>
        <q-input outlined color="pink-14" v-model="firstname" label="Prenom" class="input-firstname"/>
        <q-input outlined color="pink-14" v-model="email" label="Mail" class="input-mail"/>
        <div class="checkbox-administrator">
          <q-checkbox
            left-label
            v-model="isAdmin"
            label="Administrateur"
            checked-icon="task_alt"
            unchecked-icon="highlight_off"
            color="pink-14"
            size="lg"
          />
        </div>
      </div>
      <div class="div-button">
        <q-btn class="btn-register" :loading="loading" @click="simulateProgress(); this.update()" style="width: 150px">
          S'inscrire
          <template v-slot:loading>
            <q-spinner-hourglass class="on-left"/>
          </template>
        </q-btn>
        <q-btn @click="$router.push('/data')">
          Retour
        </q-btn>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import {ref} from 'vue'
import {mapState} from "vuex";
import NavigationFloat from "components/NavigationFloat";

export default {
  name: 'RegisterPage',
  data() {
    return {
      isAdmin: false,
    }
  },
  components: {
    NavigationFloat
  },
  methods: {
    /**
     * Crée un utilisateur
     */
    registerUser() {
      this.$store.dispatch('mainStore/register', {
        "lastname": this.lastname,
        "firstname": this.firstname,
        "email": this.email,
        "is_admin": this.isAdmin,
      })
    },
    /**
     * Met a jour les données
     */
    update() {
      this.registerUser();
    }
  },
  computed: {
    ...mapState('mainStore', ['isConnected']),
  },
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
      }, 500)
    }

    return {
      lastname: ref(''),
      firstname: ref(''),
      username: ref(''),
      email: ref(''),
      loading,
      progress,
      simulateProgress
    }
  },
  mounted() {
    // re dirige les utilisateur non connecter
    if (!this.isConnected) {
      this.$router.push('/')
    }
  }
}


</script>

<style scoped>
.container-menu {
  display: flex;
  height: 100%;
  width: 100%;
}
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
  width: 100%;
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

.input-lastname, .input-firstname, .input-mail {
  width: 100%;
  margin-bottom: 4%;
}


.checkbox-administrator {
  width: 100%;
  text-align: left;
  margin-bottom: 9%;
  font-size: 1.2em;
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
