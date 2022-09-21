<template>
  <q-btn icon="manage_accounts" @click="fixed = true" :class="['popup' + this.id, classBtn]"/>
  <q-dialog v-model="fixed">
    <q-card  style="width: 500px; max-width: 500px;">
      <q-card-section class="header">
        <div class="text-h6">Modification de {{ prenom }} {{ nom }} </div>
        <q-btn flat-left label="Supprimer" color="red-14" @click="deleteUser()" v-close-popup/>
      </q-card-section>
      <q-separator/>
      <q-card-section style="max-height: 50vh;" class="scroll">
        <q-input outlined v-model="pwd" color="pink-14" label="Nouveau mot de passe" class="input-pwd" :type="isPwd ? 'password' : 'text'">
          <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd"/>
          </template>
        </q-input>
        <q-separator />
        <ListOfStand :id=this.id />
      </q-card-section>
      <q-separator/>
      <q-card-actions align="right">
        <q-btn flat label="Fermer" v-close-popup/>
        <q-btn flat label="Enregistrer" color="pink-14" @click="saveData(); updateResponsable()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import {ref} from 'vue'
import {mapGetters} from 'vuex'
import ListOfStand from "components/ListOfStand";

export default {
  name: "PopupModification.vue",
  data() {
    return {
      classBtn: 'btn-modification',
      user: '',
      nom: '',
      prenom: '',
      email: '',
      pwd: '',
      allResponsable: '',
    }
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  components: {
    ListOfStand
  },
  computed: {
    ...mapGetters('mainStore', ['getManager']),
  },
  methods: {
    /**
     * met a jour les responsable
     */
    updateResponsable() {
      this.$store.dispatch('mainStore/updateResponsable')
    },
    deleteUser() {
      this.$store.dispatch('mainStore/deleteUser', this.id)
    },
    saveData() {
      // changement du mdp si il a été modifié
      if (this.pwd !== '') {
        this.$store.dispatch('mainStore/updatePassword', {
          id: this.id,
          password: this.pwd
        })
        this.pwd = '';
      }
      // changement du nom si il a été modifié
      if (this.nom !== this.user.last_name) {

      }
    },
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
.btn-modification {
  width: 50px;
}

.header {
  display: flex;
}
.header button {
  margin-left: auto;
  margin-right: 0;
}

.text-h6 {
  width: fit-content;
}

.input-pwd {
  margin-bottom: 10px;
}

</style>
