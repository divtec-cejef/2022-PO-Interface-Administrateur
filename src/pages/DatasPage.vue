<template>
  <q-btn fab icon="logout" color="pink-14" class="btn-disconnect" @click="logout()"/>
  <div class="button">
    <q-btn fab icon="person_add" color="pink-14" class="btn-register" v-if="isAdmin"
           @click="$router.push('/register')"/>
    <q-btn fab color="positive" class="btn-add" v-if="isAdmin" @click="updateResponsable">
      <span class="text-btn-add">Enregistrer</span>
    </q-btn>
  </div>
  <div class="container">
    <div class="data pc">
      <div class="q-pa-md">
        <div class="div-container-filter">
          <div class="div-filter">
            <q-input v-model="filter" bottom-slots label="Filtre" counter maxlength="30" color="pink-14">
              <template v-slot:append>
                <q-icon v-if="filter !== ''" name="close" @click="filter = ''" class="cursor-pointer"/>
              </template>
              <template v-slot:hint>
                Nom / Prénom / Stands
              </template>
            </q-input>
          </div>
        </div>
        <q-list bordered class="rounded-borders q-list">
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
                :expand-icon=this.getIcon()
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
                    <p> {{ this.getStylesed(item.responsable) }} </p>
                  </q-item-section>
                </template>
                <q-separator/>
                <q-card>
                  <q-card-section v-if="isAdmin">
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
            <q-input v-model="filter" bottom-slots label="Filtre" counter maxlength="30" color="pink-14">
              <template v-slot:append>
                <q-icon v-if="filter !== ''" name="close" @click="filter = ''" class="cursor-pointer"/>
              </template>
              <template v-slot:hint>
                Nom / Prénom / Stands
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
                  <div class="phone-name">
                    <span> {{ item.first_name }} </span>
                    <span> {{ item.last_name }} </span>
                    <span> {{ item.email }} </span>
                  </div>
                  <div>
                    <p> {{ this.getStylesed(item.responsable) }} </p>
                  </div>
                </div>
              </template>
              <q-separator/>
              <q-card>
                <q-card-section v-if="isAdmin">
                  <AllStands :id=item.id />
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-separator class="q-separator"/>
          </div>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import AllStands from "components/ListOfStand";
import {Notify} from 'quasar'

export default {
  name: "DatasPage",
  components: {AllStands},
  data() {
    return {
      loadFiltre: true,
      dataFilter: [],
      filter: '',
      allUsers: [],
    }
  },
  computed: {
    ...mapState('mainStore', ['isConnected', 'isAdmin']),
    ...mapGetters('mainStore', ['getManager', 'getStands']),
  },
  methods: {
    /**
     * met a jour les responsable
     */
    updateResponsable() {
      this.$store.dispatch('mainStore/updateResponsable')
      Notify.create({
        type: 'positive',
        color: 'positive',
        timeout: 1000,
        position: 'top-right',
        message: 'Base de données mise à jour',
        progress: true
      })
    },
    /**
     * déconnect l'utilisateur
     */
    logout() {
      window.location.reload();
    },
    /**
     * r'envoie une amélioration visuelle des stands
     * @param payload les stands selectionner
     * @returns {string} string de tous les stands
     */
    getStylesed(payload) {
      let list = '';

      if (payload !== undefined) {
        let reforgedPayload = [];
        payload.forEach(item => {
          reforgedPayload.push(item.nom);
        })

        // met a jour la liste pour a la place d'afficher tous les fom affiche seulement CSS
        let reReforgedPayload = [];
        reforgedPayload.forEach((item) => {
          if (item.includes('fom')) {
            if (!reReforgedPayload.includes('CSS')) {
              reReforgedPayload.push('CSS');
            }
          } else if (item.includes('robotique lvl1') || item.includes('robotique lvl2') || item.includes('robotique lvl3')) {
            if (!reReforgedPayload.includes('Robotique')) {
              reReforgedPayload.push('Robotique');
            }
          } else if (item.includes('cryptage lvl1') || item.includes('cryptage lvl2') || item.includes('cryptage lvl3')) {
            if (!reReforgedPayload.includes('Cryptage')) {
              reReforgedPayload.push('Cryptage');
            }
          } else {
            reReforgedPayload.push(item);
          }
        })

        list = reReforgedPayload.toString();
        let stand = this.getStands;

        reReforgedPayload.forEach((items) => {
          switch (items) {
            case 0:
              list = list.replace(0, stand[0].keywords);
              break;
            case 1:
              list = list.replace(1, stand[1].keywords);
              break;
            case 2:
              list = list.replace(2, stand[2].keywords);
              break;
            case 3:
              list = list.replace(3, stand[3].keywords);
              break;
            case 4:
              list = list.replace(4, stand[4].keywords);
              break;
            case 5:
              list = list.replace(5, stand[5].keywords);
              break;
            case 6:
              list = list.replace(6, stand[6].keywords);
              break;
            case 7:
              list = list.replace(7, stand[7].keywords);
              break;
            case 8:
              list = list.replace(8, stand[8].keywords);
              break;
            case 9:
              list = list.replace(9, stand[9].keywords);
              break;
            case 10:
              list = list.replace(10, stand[10].keywords);
              break;
            case 11:
              list = list.replace(11, stand[11].keywords);
              break;
            case 12:
              list = list.replace(12, stand[12].keywords);
              break;
            case 13:
              list = list.replace(13, stand[13].keywords);
              break;
            case 14:
              list = list.replace(14, stand[14].keywords);
              break;
            case 15:
              list = list.replace(15, stand[15].keywords);
              break;
            case 16:
              list = list.replace(16, stand[16].keywords);
              break;
          }
        })

        // remplace les element non voulu dans le strings
        list = list.replaceAll(',', ', ')
        list = list.replaceAll('"', '')
        list = list.replaceAll('[', '')
        list = list.replaceAll(']', '')
      }
      return list
    },
    /**
     * change l'icon en function de l'etat de la connexion
     */
    getIcon() {
      return this.isAdmin ? 'keyboard_arrow_down' : 'none'
    },
  },
  watch: {
    /**
     * met a jour les données en fonction de la recherche
     * @param value la valeur de la recherche
     */
    filter(value) {
      if (value === '') {
        this.dataFilter = this.allUsers;
      } else {
        this.loadFiltre = false
        this.dataFilter = [];
        this.allUsers.forEach((item) => {
          if (item.first_name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) || item.last_name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
            this.dataFilter.push(item)
          }
          item.responsable.forEach((items) => {
            if (items.nom.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) || (value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === 'css' && items.nom.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes('fom'))) {
              if (!this.dataFilter.includes(item)) {
                this.dataFilter.push(item)
              }
            }
          })
        })
      }
      setTimeout(() => {
        this.loadFiltre = true
      }, 10)
    }
  },
  mounted() {
    // re dirige les utilisateur non connecter
    if (!this.isConnected) {
      this.$router.push('/')
    }
    this.dataFilter = this.getManager
    this.allUsers = this.getManager

    // protection de données non sauvegarder
    window.onbeforeunload = function () {
      return "Do you want to leave?"
    }
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

.q-list {
  border: 1px solid #DC006B;
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
  margin-right: -15%;
}

.item-section-3 {
  margin-right: -15%;
}

.phone {
  display: none;
}

.header-phone {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.header-phone div {
  width: 100%;
}

.phone-name {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.btn-disconnect {
  position: fixed;
  top: 16px;
  right: 16px;
  padding: 0 !important;
  min-height: 0 !important;
  min-width: 0 !important;
  height: 40px;
  width: 40px;
}

.button {
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: end;
  bottom: 5px;
  right: 5px;
  height: fit-content;
}

.btn-add {
  display: none;
  height: 45px;
  width: auto;
  margin: 5px;
  padding: 0 !important;
  min-height: 0 !important;
  min-width: 0 !important;
  transition: 0.5s;
  z-index: 1;
}

.btn-register {
  height: 45px;
  width: 45px;
  margin: 5px;
  padding: 0 !important;
  min-height: 0 !important;
  min-width: 0 !important;
}

.text-btn-add {
  padding: 10px;
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
@media screen and (max-width: 700px) {
  .phone-name {
    flex-direction: column;
  }
}

@media screen and (max-width: 1100px) {
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

@media screen and (max-width: 1500px) {
  .item-section-4 {
    text-align: right;
  }
}

@media screen and (max-width: 1400px) {
  .item-section-4 {
    text-align: right;
  }

  .item-section-1 {
    margin-right: -30%;
  }

  .item-section-2 {
    margin-right:-10%;
  }

  .item-section-3 {
    margin-right: 0;
  }
}
</style>
