<template>
  <div class="container">
    <div class="data pc">
      <div class="q-pa-md">
        <Filter />
        <q-list bordered class="rounded-borders">
          <q-expansion-item class="item-section-header"
                            expand-icon="none"
          >
            <template v-slot:header="{ expanded }">
              <q-item-section class="item-section-1">
                <p>ID</p>
              </q-item-section>
              <q-item-section class="item-section-2">
                <p>Prénom, Nom</p>
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
          <div v-for="item in getManager">
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
                  <p> {{ item.stand }} </p>
                </q-item-section>
              </template>
              <q-separator/>
              <q-card>
                <q-card-section>
                  <AllStands/>
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-separator/>
          </div>
        </q-list>
      </div>
    </div>
    <div class="data phone">
      <div class="q-pa-md">
        <div class="div-container-filter">
          <div class="div-filter">
            <Filter />
          </div>
        </div>
        <q-list bordered class="rounded-borders">
          <div v-for="item in getManager">
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
                    <p> {{ item.stand }} </p>
                  </div>
                </div>
              </template>
              <q-separator />
              <q-card>
                <q-card-section>
                  <AllStands/>
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
import Filter from "components/Filter";

export default {
  name: "DatasPage",
  components: {AllStands, Filter},
  computed: {
    ...mapGetters('mainStore', ['getManager']),
  },
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
  background-color: var(--q-primary);
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
}

@media screen and (max-width: 1100px) {
  .item-section-4 {
    text-align: right;
  }
}

@media screen and (max-width: 1700px) {
}
</style>
