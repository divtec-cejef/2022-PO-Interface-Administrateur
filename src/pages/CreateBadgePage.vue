<template>
  <div class=" container window-height">
  <div class="div-main">
    <div class="div-title">
      <h2>Création de badge</h2>
    </div>
    <div class="div-form">
      <q-input outlined color="pink-14" v-model="badge_nom" label="Nom du badge" class="input-badge-nom"/>
      <q-input outlined color="pink-14" v-model="badge_prix" label="Prix" class="input-badge-prix"/>
      <q-select outlined v-model="badge_section_id" :options="sections" color="pink-14" label="Nouvelle section" class="input-badge-section" />
    </div>
    <div class="div-button">
      <q-btn class="btn-register" :loading="loading" @click="simulateProgress(); this.update()" style="width: 150px">
        Ajouter
        <template v-slot:loading>
          <q-spinner-hourglass class="on-left"/>
        </template>
      </q-btn>
      <q-btn @click="$router.push('/badge')">
        Retour
      </q-btn>
    </div>
  </div>
  </div>
</template>

<script>
import {ref} from 'vue'
import {mapState} from "vuex";

export default {
  name: "CreateBadgePage",
  methods: {
    /**
     * Crée un utilisateur
     */
    createBadge() {
      this.$store.dispatch('mainStore/createBadge', {
        "badge_nom": this.badge_nom,
        "badge_prix": this.badge_prix,
        "section_id": this.badge_section_id,
      })
    },
    /**
     * Met a jour les données
     */
    update() {
      this.createBadge();
    }
  },
  computed: {
    ...mapState('mainStore', ['isConnected', 'sections']),
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
      badge_nom: ref(''),
      badge_prix: ref(''),
      badge_section_id: ref(''),
      loading,
      progress,
      simulateProgress
    }
  },
  mounted() {
    // Redirige les utilisateurs non connectés
    if (!this.isConnected) {
      this.$router.push('/')
    }
  }
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

.input-badge-nom, .input-badge-prix, .input-badge-section {
  width: 100%;
  margin-bottom: 4%;
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
