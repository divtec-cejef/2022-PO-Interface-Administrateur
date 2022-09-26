<template>
  <q-btn icon="manage_accounts" @click="fixed = true" :class="['popup' + this.id]"/>
  <q-dialog v-model="fixed">
    <q-card  style="width: 500px; max-width: 500px;">
      <q-card-section class="header">
        <div class="text-h6">Modification de {{ badge_nom }} </div>
        <q-btn flat-left label="Supprimer" color="red-14" @click="deleteBadge()" v-close-popup/>
      </q-card-section>
      <q-separator/>
      <q-card-section style="max-height: 50vh;" class="scroll">
        <q-input outlined v-model="badge_nom" color="pink-14" label="Nouveau nom de badge" class="input-badge-nom" />
        <q-input outlined v-model="badge_prix" color="pink-14" label="Nouveau prix de badge" class="input-badge-prix" />
        <q-select outlined v-model="badge_section_id_stylesed" :options=options color="pink-14" label="Nouvelle section" class="input-badge-section" />
        <q-separator />
      </q-card-section>
      <q-separator/>
      <q-card-actions align="right">
        <q-btn flat label="Fermer" v-close-popup/>
        <q-btn flat label="Enregistrer" color="pink-14" @click="saveData()" />
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
     * return l'identifiant de l'utilisateur traiter
     */
    getIdentifiant() {
      this.allBadge.forEach((manager, i) => {
        if (manager.id === this.id) {
          this.index = i
        }
      });
    },
    deleteBadge() {
      this.$store.dispatch('mainStore/deleteBadge', this.id)
    },
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
      }
    },
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
      }
   } ,
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

.input-badge-nom, .input-badge-prix, .input-badge-section {
  margin-bottom: 10px;
}

</style>
