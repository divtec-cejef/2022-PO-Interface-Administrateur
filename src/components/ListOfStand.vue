<template>
  <div class="q-gutter-sm div-checkbox-container">
    <span class="element" v-for="stand in allStand">
      <q-checkbox size="sm" v-model="shape" :val=stand.id-1 :label=stand.keywords color="pink-14" @click="shapeChanged(shape)" :class=this.getClass(stand.section) />
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
        this.allManager[this.id - 1].stand.forEach((item) => {
          this.allStand.forEach((stand) => {
            if (stand.keywords === item) {
              standSelected.push(stand.id - 1)
            }
          })
        })
      return standSelected;
    },
    shapeChanged(value) {
      this.$store.dispatch('mainStore/updateStand', {
        "id": this.id - 1,
        "stands": value,
      })
    },
    getClass(section) {
      switch (section) {
        case this.getListOfSections[0]:
          return "inf";
        case this.getListOfSections[1]:
          return "hor";
        case this.getListOfSections[2]:
          return "lac";
        case this.getListOfSections[3]:
          return "mmc";
        case this.getListOfSections[4]:
          return "dcm";
        case this.getListOfSections[5]:
          return "elt";
        case this.getListOfSections[6]:
          return "aut";
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
