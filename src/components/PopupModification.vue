<template>
  <q-btn :class="['popup' + this.id, classBtn]" icon="manage_accounts" @click="fixed = true"/>
  <q-dialog v-model="fixed">
    <q-card style="width: 500px; max-width: 500px;">
      <q-card-section class="header">
        <div class="text-h6">Modification de {{ prenom }} {{ nom }}</div>
        <q-btn v-close-popup flat icon="close" title="Fermer"/>
      </q-card-section>
      <q-separator/>
      <q-card-section class="scroll" style="max-height: 50vh;">
        <!-- Liste des bases -->
        <div class=" div-checkbox-container">
          <q-input v-model="base_nom" class="input-base-nom" color="pink-14" label="Nom de la base" outlined/>
          <q-input v-model="base_credit" type="number" class="input-base-credit" color="pink-14" label="Crédits de la base" outlined/>
          <q-input v-model="base_oxygene" type="number" class="input-base-oxygene" color="pink-14" label="Oxygène" outlined/>
        </div>
        <q-separator/>
        <!-- Mot de passe -->
        <q-input v-model="pwd" :type="isPwd ? 'password' : 'text'" class="input-pwd" color="pink-14"
                 label="Nouveau mot de passe" outlined>
          <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd"/>
          </template>
        </q-input>
        <q-separator/>
        <!-- Liste des stands -->
        <ListOfStand :id=this.id />
        <q-separator/>
      </q-card-section>
      <q-separator/>
      <q-card-actions align="between">
        <q-btn v-close-popup color="red-14" flat label="Supprimer" @click="deleteUser()"/>
        <q-btn v-close-popup color="pink-14" flat-left label="Enregistrer" @click="saveData(); updateStands(); updateBase();"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import {ref} from 'vue'
import {mapGetters, mapState} from 'vuex'
import ListOfStand from "components/ListOfStand";
import {Notify} from "quasar";

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
      base: [],
      base_nom: '',
      base_credit: '',
      base_oxygene: '',
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
     * Retourne le nom de la personne traité
     * @returns {string} la personne
     */
    getBase() {
      let base = [];
      this.allResponsable.forEach(item => {
        if (item.id === this.id) {
          if (item.base !== null) {
            base = item.base;
          }
        }
      });
      return base;
    },
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
    updateBase() {
      this.base_oxygene = this.base_oxygene < 1 ? 1 : this.base_oxygene
      if (this.base_oxygene < 1 || this.base_oxygene > 100) {
        Notify.create({
          type: 'negative',
          color: 'negative',
          timeout: 1000,
          position: 'top-right',
          message: 'L\'oxygène de la base ne peut pas être plus grand que 100',
          progress: true
        })
        this.base_oxygene = this.base.oxygene
      } else if (this.base_credit < 0) {
        Notify.create({
          type: 'negative',
          color: 'negative',
          timeout: 1000,
          position: 'top-right',
          message: 'Les crédits ne peuvent pas être négatifs',
          progress: true
        })

        this.base_credit = this.base.credit;
    } else {
        this.$store.dispatch('mainStore/updateBases', {
          "id": this.id,
          "base_nom": this.base_nom,
          "base_credit": this.base_credit,
          "base_oxygene": this.base_oxygene,
        })
      }
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
        if (this.pwd.replaceAll(' ', '') === '') {
          Notify.create({
            type: 'negative',
            color: 'negative',
            timeout: 1000,
            position: 'top-right',
            message: 'Le mot de passe ne peut pas être composé d\'espaces',
            progress: true
          })
        } else {
          this.$store.dispatch('mainStore/updatePassword', {
            id: this.id,
            password: this.pwd
          })
          this.pwd = '';
        }
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
    this.base = this.getBase();
    this.base_nom = this.base.nom;
    this.base_credit = this.base.credit;
    this.base_oxygene = this.base.oxygene;
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

.input-pwd, .input-base-nom, .input-base-credit, .input-base-oxygene {
  margin-bottom: 10px;
}
</style>
