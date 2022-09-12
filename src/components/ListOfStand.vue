<template>
  <div class="q-gutter-sm">
    <span v-for="stand in allStand">
      <q-checkbox size="sm" v-model="shape" :val=stand.id-1 :label=stand.keywords color="pink-14" @click="shapeChanged(shape)"/>
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
    }
  },
  computed: {
    ...mapGetters('mainStore', ['getStands', "getManager"]),
  },
  mounted() {
    this.allManager = this.getManager;
    this.allStand = this.getStands
    this.shape = this.getStandSelected();
  }
}
</script>

<style scoped>

</style>
