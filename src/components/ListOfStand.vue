<template>
  <div class="q-gutter-sm div-checkbox-container">
    <span class="element" v-for="stand in allStand">
      <q-checkbox size="sm" v-model="shape" :val=stand.id-1 :label=stand.nom color="pink-14" :title=stand.prix
                  @click="shapeChanged(shape)"/>
    </span>
  </div>
  <PopupModification :id=this.id />
</template>

<script>
import {mapGetters} from "vuex";
import PopupModification from "./PopupModification";

export default {
  name: "AllStands",
  components: {
    PopupModification
  },
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
     * @param value la valeur des stands selectionner
     */
    shapeChanged(value) {
      this.$store.dispatch('mainStore/updateStand', {
        "id": this.index,
        "stands": value,
      })
      if (this.$store.dispatch('mainStore/testDifferenceWithAPI')) {
        document.querySelector('.btn-add').style.display = 'block';
      } else {
        document.querySelector('.btn-add').style.display = 'none';
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
  }
}
</script>

<style scoped>
.div-checkbox-container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 550px;
}

.element {
  width: fit-content;
}

/*****************************************
Style des différente section
****************************************/
.inf {
  text-decoration: underline;
  text-decoration-color: #7d6aa4;
}

.hor {
  text-decoration: underline;
  text-decoration-color: #f8b02a;
}

.lac {
  text-decoration: underline;
  text-decoration-color: #8fc9ba;
}

.mmc {
  text-decoration: underline;
  text-decoration-color: #028fc5;
}

.dcm {
  text-decoration: underline;
  text-decoration-color: #3fa83f;
}

.elt {
  text-decoration: underline;
  text-decoration-color: #e83f78;
}

.aut {
  text-decoration: underline;
  text-decoration-color: #5c2976;
}

/******************************************
Responsive
******************************************/

@media screen and (min-width: 530px) {
  .div-checkbox-container {
    height: 400px;
  }
}
@media screen and (min-width: 900px) {
  .div-checkbox-container {
    height: 300px;
  }
}

@media screen and (min-width: 1100px) {
  .div-checkbox-container {
    height: 250px;
  }
}

@media screen and (min-width: 1700px) {
  .div-checkbox-container {
    height: 200px;
  }
}
</style>
