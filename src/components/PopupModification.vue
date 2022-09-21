<template>
  <q-btn label="Modification" color="pink-14" @click="fixed = true"/>
  <q-dialog v-model="fixed">
    <q-card>
      <q-card-section>
        <div class="text-h6">Modification de {{ prenom }} {{ nom }} </div>
      </q-card-section>
      <q-separator/>
      <q-card-section style="height: 50vh" class="scroll">
        <q-input outlined color="pink-14" v-model="nom" label="Nom" class="input-lastname"/>
        <q-input outlined color="pink-14" v-model="prenom" label="Prenom" class="input-firstname"/>
        <q-input outlined color="pink-14" v-model="email" label="Mail" class="input-mail"/>
        <q-input outlined v-model="password" color="pink-14" label="Mot de passe" class="input-pwd" :type="isPwd ? 'password' : 'text'">
          <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd"/>
          </template>
        </q-input>
      </q-card-section>
      <q-separator/>
      <q-card-actions align="right">
        <q-btn flat label="Annuler" color="pink14" v-close-popup/>
        <q-btn flat label="Enregistrer" color="pink-14" v-close-popup/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import {ref} from 'vue'
import {mapGetters} from 'vuex'

export default {
  name: "PopupModification.vue",
  data() {
    return {
      user: '',
      nom: '',
      prenom: '',
      email: '',
      mdp: '',
      allResponsable: '',
    }
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapGetters('mainStore', ['getManager']),
  },
  methods: {
    /**
     * return le nom de la personne traiter
     * @returns {string} le nom de la personne
     */
    getUser() {
      let user = "";
      this.allResponsable.forEach(item => {
        if (item.id === this.id) {
          user = item;
        }
      });
      return user;
    },
    /**
     * return l'identifiant de l'utilisateur traiter
     */
    getIdentifiant() {
      this.allManager.forEach((manager, i) => {
        if (manager.id === this.id) {
          this.index = i
        }
      });
    },
  },
  setup() {
    return {
      fixed: ref(false),
      password: ref(''),
      isPwd: ref(true),
    }
  },
  mounted() {
    this.allResponsable = this.getManager;
    this.user = this.getUser();
    this.prenom = this.user.first_name;
    this.nom = this.user.last_name;
    this.email = this.user.email;
  }
}
</script>

<style scoped>
.input-pwd, .input-mail, .input-firstname, .input-lastname {
  margin-bottom: 10px;
}
</style>
