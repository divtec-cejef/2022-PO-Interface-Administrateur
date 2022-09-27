<template>
  <div class=" div-checkbox-container">
    <span class="element" v-for="stand in allStand">
      <q-checkbox size="sm" v-model="shape" :val=stand.id-1 :label=stand.nom color="pink-14" :title=stand.prix
      @click="shapeChanged"/>
    </span>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "ListOfStand",
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      allManager: [],
      allStand: [],
      shape: [],
      index: 0,
    }
  },
  methods: {
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
    /**
     * return tous les stands selectionner dans l'api
     * @returns {*[]} liste de tous les stands
     */
    getStandSelected() {
      let standSelected = [];
      // filtre les badges pour selectionner les bons stands
      this.allManager[this.index].responsable.forEach(badge => {
        standSelected.push(badge.id - 1)
      });
      return standSelected;
    },
    /**
     * modifie les stands sélectionnés
     */
    shapeChanged() {
      this.$store.commit('mainStore/updateShape', this.shape);
    }
  },
  computed: {
    ...mapGetters('mainStore', ['getStands', "getManager"]),
  },
  mounted() {
    this.allManager = this.getManager;
    this.getIdentifiant();
    this.allStand = this.getStands
    this.shape = this.getStandSelected();
  }
}
</script>

<style scoped>
.div-checkbox-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  word-break: break-all;
}

.element {
  width: 145px;
  margin-bottom: 10px;
}
</style>
