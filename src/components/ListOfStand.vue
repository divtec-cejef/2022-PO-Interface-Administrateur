<template>
  <div class=" div-checkbox-container">
    <span v-for="stand in allStand" class="element">
      <q-checkbox v-model="shape" :label=stand.nom :title=stand.prix :val=stand.id-1 color="pink-14" size="sm"
                  @click="shapeChanged"/>
    </span>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {Notify} from "quasar";

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
      oldShape: [],
      allManager: [],
      allStand: [],
      shape: [],
      index: 0,
    }
  },
  methods: {
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
    /**
     * Retourne tous les stands sélectionnés dans l'api
     * @returns {*[]} liste de tous les stands
     */
    getStandSelected() {
      let standSelected = [];
      // Filtre les badges pour sélectionner les bons stands
      this.allManager[this.index].responsable.forEach(badge => {
        standSelected.push(badge.id - 1)
      });
      return standSelected;
    },
    /**
     * Modifie les stands sélectionnés
     */
    shapeChanged() {
      if (this.shape.length > 0) {
        this.oldShape = this.shape;
        this.$store.commit('mainStore/updateShape', this.shape);
      } else {
        this.shape = this.oldShape;
        Notify.create({
          type: 'negative',
          color: 'negative',
          timeout: 1000,
          position: 'top-right',
          message: 'Il doit y avoir au moins 1 badge sélectionné !',
          progress: true
        })
      }
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
    this.oldShape = this.shape;
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
