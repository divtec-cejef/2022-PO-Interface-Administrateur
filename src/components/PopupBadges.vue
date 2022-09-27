<template>
  <q-btn :class="['popup' + this.id]" icon="manage_accounts" @click="fixed = true"/>
  <q-dialog v-model="fixed">
    <q-card style="width: 500px; max-width: 500px;">
      <q-card-section class="header">
        <div class="text-h6">Modification de {{ badge_nom }}</div>
        <q-btn v-close-popup flat icon="close" title="Fermer"/>
      </q-card-section>
      <q-separator/>
      <q-card-section class="scroll" style="max-height: 50vh;">
        <q-input v-model="badge_nom" class="input-badge-nom" color="pink-14" label="Nouveau nom de badge" outlined/>
        <q-input v-model="badge_prix" class="input-badge-prix" color="pink-14" label="Nouveau prix de badge" outlined/>
        <q-select v-model="badge_section_id_stylesed" :options=options class="input-badge-section" color="pink-14"
                  filled label="Nouvelle section" transition-hide="jump-up" transition-show="jump-up"/>
        <q-separator/>
      </q-card-section>
      <q-separator/>
      <q-card-actions align="between">
        <q-btn color="pink-14" flat label="Enregistrer" @click="saveData()"/>
        <q-btn v-close-popup color="red-14" flat-left label="Supprimer" @click="deleteBadge()"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import {mapGetters, mapState} from "vuex";

export default {
  name: "PopupBadges",
  data() {
    return {
      fixed: false,
      badge_nom: '',
      badge_prix: '',
      badge_section_id: '',
      badge_section_id_stylesed: '',
      index: '',
      allBadge: [],
      options: [],
    }
  },
  computed: {
    ...mapState('mainStore', ['global_shape', 'sections']),
    ...mapGetters('mainStore', ['getStands', 'getManager']),
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  methods: {
    initializeOptions() {
      this.sections.forEach((section) => {
        this.options.push(section.nom)
      })
    },
    /**
     * Retourne l'identifiant de l'utilisateur traité
     */
    getIdentifiant() {
      this.allBadge.forEach((manager, i) => {
        if (manager.id === this.id) {
          this.index = i
        }
      });
    },
    /**
     * Supprime un badge
     */
    deleteBadge() {
      this.$store.dispatch('mainStore/deleteBadge', this.id)
    },
    /**
     * Sauvegarde les données
     */
    saveData() {
      this.badge_section_id = this.getStylesedInvert(this.badge_section_id_stylesed)
      // Changement du badge si quelque chose a été modifié
      if (this.badge_nom !== '' || this.badge_prix !== '' || this.badge_section_id !== '') {
        this.$store.dispatch('mainStore/updateBadges', {
          id: this.id,
          'badge_nom': this.badge_nom,
          'badge_prix': this.badge_prix,
          'badge_section_id': this.badge_section_id,
        })
      }
    },
    /**
     * Retourne le nom de la section à partir de son id
     * @param id l'id de la section
     * @returns {string} le nom de la section
     */
    getStylesed(id) {
      switch (id) {
        case 1:
          return 'INF'
        case 2:
          return 'HOR'
        case 3:
          return 'LAC'
        case 4:
          return 'MMC'
        case 5:
          return 'DCM'
        case 6:
          return 'ELT'
        case 7:
          return 'AUT'
        case 8:
          return 'ENT'
      }
    },
    /**
     * Retourne l'id de la section à partir de son nom
     * @param nom le nom de la section
     * @returns {string} l'id de la section
     */
    getStylesedInvert(nom) {
      switch (nom) {
        case 'INF':
          return '1'
        case 'HOR':
          return '2'
        case 'LAC':
          return '3'
        case 'MMC':
          return '4'
        case 'DCM':
          return '5'
        case 'ELT':
          return '6'
        case 'AUT':
          return '7'
        case 'ENT':
          return '8'
      }
    },
  },
  mounted() {
    this.initializeOptions();
    this.allBadge = this.getStands;
    this.getIdentifiant();
    this.badge_nom = this.allBadge[this.index].nom;
    this.badge_prix = this.allBadge[this.index].prix;
    this.badge_section_id = this.allBadge[this.index].section_id;
    this.badge_section_id_stylesed = this.getStylesed(this.badge_section_id);
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

.input-badge-nom, .input-badge-prix, .input-badge-section {
  margin-bottom: 10px;
}
</style>
