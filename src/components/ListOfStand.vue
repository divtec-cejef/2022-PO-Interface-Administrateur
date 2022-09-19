<template>
  <div class="q-gutter-sm div-checkbox-container">
    <span class="element" v-for="stand in allStand">
      <q-checkbox size="sm" v-model="shape" :val=stand.id-1 :label=stand.keywords color="pink-14" :title=stand.name
                  @click="shapeChanged(shape)"/>
    </span>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "AllStands",
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
      shape: []
    }
  },
  methods: {
    getStandSelected() {
      let standSelected = [];
      this.allManager[this.id - 1].responsable.forEach(badge => {
        if (badge.id === 1 || badge.id === 2 || badge.id === 3 || badge.id === 4 || badge.id === 5 || badge.id === 6) {
          standSelected.push(0);
        } else if (badge.id <= 9) {
          standSelected.push(badge.id - 6);
        } else if (badge.id === 10 || badge.id === 11 || badge.id === 12) {
          standSelected.push(4);
        } else {
          standSelected.push(badge.id - 8);
        }
      });
      return standSelected;
    },
    shapeChanged(value) {
      this.$store.dispatch('mainStore/updateStand', {
        "id": this.id - 1,
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
    ...mapGetters('mainStore', ['getStands', "getManager", "getListOfSections"]),
  },
  mounted() {
    this.allManager = this.getManager;
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
  height: 350px;
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
@media screen and (min-width: 900px) {
  .div-checkbox-container {
    height: 150px;
  }
}

@media screen and (min-width: 1100px) {
  .div-checkbox-container {
    height: 100px;
  }
}
</style>
