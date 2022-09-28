<template>
  <q-btn :class="['popup' + this.id, classBtn]" icon="manage_accounts" @click="fixed = true"/>
  <q-dialog v-model="fixed">
    <q-card  style="width: 500px; max-width: 500px;">
      <q-card-section class="header">
        <div class="text-h6">Modification de {{ prenom }} {{ nom }} </div>
        <q-btn v-close-popup flat icon="close" title="Fermer" />
      </q-card-section>
      <q-separator/>
      <q-card-section class="scroll" style="max-height: 50vh;">
        <q-input v-model="pwd" :type="isPwd ? 'password' : 'text'" class="input-pwd" color="pink-14" label="Nouveau mot de passe" outlined>
          <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd"/>
          </template>
        </q-input>
        <q-separator />
        <ListOfStand :id=this.id />
      </q-card-section>
      <q-separator/>
      <q-card-actions align="between">
        <q-btn color="pink-14" flat label="Enregistrer" @click="saveData(); updateStands()" />
        <q-btn v-close-popup color="red-14" flat-left label="Supprimer" @click="deleteUser()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import {ref} from 'vue'
import {mapGetters, mapState } from 'vuex'
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
    ...mapState('mainStore', ['global_shape', "listOfManager", "listOfManagerInAPI"]),
    ...mapGetters('mainStore', ['getManager']),
  },
  methods: {
    /**
     * Modifie les stands sélectionnés
     */
    updateStands() {
      this.$store.dispatch('mainStore/updateStand', {
        "id": this.id,
        "stands": this.global_shape,
      })
      this.updateResponsable();
    },
    /**
     * Met à jour les responsables
     */
    updateResponsable() {
      this.$store.dispatch('mainStore/updateResponsable')
    },
    /**
     * Supprime un utilisateur
     */
    deleteUser() {
      this.$store.dispatch('mainStore/deleteUser', this.id)
    },
    /**
     * Sauvegarde les données
     */
    saveData() {
      // Changement du mdp s'il a été modifié
      if (this.pwd !== '') {
        this.$store.dispatch('mainStore/updatePassword', {
          id: this.id,
          password: this.pwd
        })
        this.pwd = '';
      }
      // Changement du nom s'il a été modifié
      if (this.nom !== this.user.last_name) {

      }
    },
    /**
     * Retourne le nom de la personne traité
     * @returns {string} la personne
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
     * Retourne l'identifiant de l'utilisateur traité
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
