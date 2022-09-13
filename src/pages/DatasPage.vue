<template>
  <div class="container">
    <div class="data pc">
      <div class="q-pa-md">
        <div class="div-container-filter">
          <div class="div-filter">
            <q-input v-model="filter" bottom-slots label="Filtre" counter maxlength="30" color="pink-14">
              <template v-slot:append>
                <q-icon v-if="filter !== ''" name="close" @click="filter = ''" class="cursor-pointer" />
              </template>
              <template v-slot:hint>
                Nom ou prénom
              </template>
            </q-input>
          </div>
        </div>
        <q-list bordered class="rounded-borders">
          <q-expansion-item class="item-section-header"
                            expand-icon="none"
          >
            <template v-slot:header="{ expanded }">
              <q-item-section class="item-section-1">
                <p>ID</p>
              </q-item-section>
              <q-item-section class="item-section-2">
                <p>Prénom et Nom</p>
              </q-item-section>
              <q-item-section class="item-section-3">
                <p>Adresse mail</p>
              </q-item-section>
              <q-item-section class="item-section-4">
                <p>Responsable de</p>
              </q-item-section>
            </template>
          </q-expansion-item>
          <q-separator/>
          <div v-if="loadFiltre">
          <div v-for="item in dataFilter">
            <q-expansion-item
              group="datas"
            >
              <template v-slot:header="{ expanded }">
                <q-item-section class="item-section-1">
                  <p> {{ item.id }} </p>
                </q-item-section>
                <q-item-section class="item-section-2">
                  <p> {{ item.first_name }} {{ item.last_name }} </p>
                </q-item-section>
                <q-item-section class="item-section-3">
                  <p> {{ item.email }} </p>
                </q-item-section>
                <q-item-section class="item-section-4">
                  <p> {{ this.getStylesed(item.stand) }} </p>
                </q-item-section>
              </template>
              <q-separator/>
              <q-card>
                <q-card-section>
                  <AllStands :id=item.id />
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-separator/>
          </div>
          </div>
        </q-list>
      </div>
    </div>
    <div class="data phone">
      <div class="q-pa-md">
        <div class="div-container-filter">
          <div class="div-filter">
            <q-input v-model="filter" bottom-slots label="Filtre" counter maxlength="30">
              <template v-slot:append>
                <q-icon v-if="filter !== ''" name="close" @click="filter = ''" class="cursor-pointer" />
              </template>
              <template v-slot:hint>
                nom ou prénom
              </template>
            </q-input>
          </div>
        </div>
        <q-list bordered class="rounded-borders">
          <div v-for="item in dataFilter">
            <q-expansion-item
              group="datas"
              expand-icon="none"
            >
              <template v-slot:header="{ expanded }">
                <div class="header-phone">
                  <div>
                    <p> {{ item.id }} </p>
                  </div>
                  <div>
                    <p> {{ item.first_name }}</p>
                    <p> {{ item.last_name }} </p>
                  </div>
                  <div>
                    <p> {{ item.email }} </p>
                    <p> {{ this.getStylesed(item.stand) }} </p>
                  </div>
                </div>
              </template>
              <q-separator/>
              <q-card>
                <q-card-section>
                  <AllStands :id=item.id />
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-separator/>
          </div>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import AllStands from "components/ListOfStand";

export default {
  name: "DatasPage",
  components: {AllStands},
  data() {
    return {
      loadFiltre: true,
      dataFilter: [],
      filter: '',
    }
  },
  computed: {
    ...mapGetters('mainStore', ['getManager']),
  },
  methods: {
    getStylesed(payload) {
      let list = payload.toString();
      list = list.replaceAll(',', ', ')
      list = list.replaceAll('"', '')
      list = list.replaceAll('[', '')
      list = list.replaceAll(']', '')
      return list
    },
  },
  watch: {
    filter(value) {
      this.loadFiltre = false
      this.dataFilter = [];
      this.getManager.forEach((item) => {
        if (item.first_name.toLowerCase().includes(value.toLowerCase()) || item.last_name.toLowerCase().includes(value.toLowerCase())) {
          this.dataFilter.push(item)
        }
      })
      setTimeout(() => {
        this.loadFiltre = true
      }, 10)
    }
  },
  mounted() {
    this.dataFilter = this.getManager
  }
}
</script>

<style scoped>

.container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.data {
  width: 80%;
}

.q-pa-md {
  width: 100%;
}

.item-section-header {
  background-color: #DC006B;
  color: white;
  opacity: 1 !important;
}

.item-section-1 {
  margin-right: -35%;
}

.item-section-2 {
  margin-right: -20%;
}

.item-section-3 {
  margin-right: -20%;
}

.phone {
  display: none;
}

.header-phone {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

/******************************
  Filtre
******************************/
.div-container-filter {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.div-filter {
  width: 30%;
  margin-bottom: 1em;
  display: flex;
  justify-content: flex-end;
}

.div-filter label {
  width: 100%;
}

/******************************************
Responsive
**************************************** */
@media screen and (max-width: 900px) {
  .phone {
    display: block;
  }

  .pc {
    display: none;
  }

  .div-filter {
    width: 100%;
  }
}

@media screen and (max-width: 1100px) {
  .item-section-4 {
    text-align: right;
  }
}
</style>
