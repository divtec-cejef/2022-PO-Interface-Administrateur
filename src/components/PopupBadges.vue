<template>
  <q-btn icon="manage_accounts" @click="fixed = true" :class="['popup' + this.id]"/>
  <q-dialog v-model="fixed">
    <q-card  style="width: 500px; max-width: 500px;">
      <q-card-section class="header">
        <div class="text-h6">Modification de {{ badge_nom }} </div>
        <q-btn flat-left label="Supprimer" color="red-14" @click="deleteUser()" v-close-popup/>
      </q-card-section>
      <q-separator/>
      <q-card-section style="max-height: 50vh;" class="scroll">
        <q-input outlined v-model="badge_nom" color="pink-14" label="Nouveau nom de badge" class="input-badge-nom" />
        <q-input outlined v-model="badge_prix" color="pink-14" label="Nouveau prix de badge" class="input-badge-prix" />
        <q-input outlined v-model="badge_section_id" color="pink-14" label="Nouvelle section" class="input-badge-section" />
        <q-separator />
      </q-card-section>
      <q-separator/>
      <q-card-actions align="right">
        <q-btn flat label="Fermer" v-close-popup/>
        <q-btn flat label="Enregistrer" color="pink-14" @click="saveData(); updateStands()" />
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
      index: '',
      allBadge: [],
    }
  },
  computed: {
    ...mapState('mainStore', ['global_shape']),
    ...mapGetters('mainStore', ['getStands', 'getManager']),
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  methods: {
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
  },
  mounted() {
    this.allBadge = this.getStands;
    this.getIdentifiant();
    this.badge_nom = this.allBadge[this.index].nom;
    this.badge_prix = this.allBadge[this.index].prix;
    this.badge_section_id = this.allBadge[this.index].section_id;
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
