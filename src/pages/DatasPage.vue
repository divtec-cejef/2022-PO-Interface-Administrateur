<template>
  <div class="container-menu">
  <NavigationFloat selected='1' />
  <q-btn fab icon="logout" color="pink-14" class="btn-disconnect" @click="logout()" title="Se déconnecter"/>
  <div class="button">
    <q-btn fab icon="person_add" color="pink-14" class="btn-register"
           @click="$router.push('/register')" title="Créer un responsable"/>
  </div>
  <div class="button">
    <q-btn fab icon="post_add" color="pink-14" class="btn-badges"
           @click="$router.push('/badge')" title="Modifier les badges"/>
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
                expand-icon="none"
                @click="openPopup(item.id)"
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
                  <q-item-section class="item-section-btn">
                    <PopupModification :id=item.id />
                  </q-item-section>
                </template>
                <q-separator/>
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
              expand-icon="none"
              @click="openPopup(item.id)"
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
                  <div class="phone-btn-popup">
                    <PopupModification :id=item.id />
                  </div>
                </div>
              </template>
              <q-separator/>
            </q-expansion-item>
            <q-separator class="q-separator"/>
          </div>
        </q-list>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import PopupModification from "components/PopupModification";
import NavigationFloat from "components/NavigationFloat";

export default {
  name: "DatasPage",
  components: {PopupModification, NavigationFloat},
  data() {
    return {
      isLoad: false,
      loadFiltre: true,
      dataFilter: [],
      filter: '',
    }
  },
  computed: {
    ...mapState('mainStore', ['isConnected', 'isAdmin', "listOfManager"]),
    ...mapGetters('mainStore', ['getManager', 'getStands']),
  },
  methods: {
    openPopup(id) {
      if (!this.isLoad) {
        this.isLoad = true;
        let className = '.popup' + id
        document.querySelector(className).click()
      }
      this.isLoad = false;
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
        let forgedPayload = [];
        payload.forEach(item => {
          forgedPayload.push(item.nom);
        })

        list = forgedPayload.toString();

        // remplace les element non voulu dans le strings
        list = list.replaceAll(',', ', ')
        list = list.replaceAll('"', '')
        list = list.replaceAll('[', '')
        list = list.replaceAll(']', '')
      }
      return list
    },
  },
  watch: {
    listOfManager: function () {
      this.loadFiltre = false;
      setTimeout(() => {
        this.dataFilter = this.listOfManager
        this.loadFiltre = true;
      }, 100)
    },
    /**
     * met a jour les données en fonction de la recherche
     * @param value la valeur de la recherche
     */
    filter(value) {
      if (value === '') {
        this.dataFilter = this.listOfManager;
      } else {
        this.loadFiltre = false
        this.dataFilter = [];
        this.listOfManager.forEach((item) => {
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
  beforeMount() {
    window.addEventListener("keydown", event => {
      if (event.keyCode == 116) {
        event.preventDefault();
        this.$store.dispatch('mainStore/updateData')
      }
    });
  },
  mounted() {
    // recharche les données
    this.$store.dispatch('mainStore/getListOfManager')
    this.$store.dispatch('mainStore/getListOfBadge')
    this.$store.dispatch('mainStore/getListOfManagerInAPI')

    // re dirige les utilisateur non connecter
    if (!this.isConnected) {
      this.$router.push('/')
    }
    this.dataFilter = this.listOfManager;
  }
}
</script>

<style scoped>
.container-menu {
  display: flex;
  height: 100%;
  width: 100%;
}
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

.item-section-btn {
  margin-right: -40%;
  display: none;
}

.phone-btn-popup {
  display: none;
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
  height: fit-content;
}

.btn-register {
  position: fixed;
  height: 45px;
  width: 45px;
  margin: 5px;
  padding: 0 !important;
  min-height: 0 !important;
  min-width: 0 !important;
  bottom: 5px;
  right: 5px;
}

.btn-badges {
  position: fixed;
  height: 45px;
  width: 45px;
  margin: 5px;
  padding: 0 !important;
  min-height: 0 !important;
  min-width: 0 !important;
  bottom: 55px;
  right: 5px;
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
@media screen and (max-width: 620px) {
  .button {
    display: none;
  }
  .btn-disconnect {
    display: none;
  }
}

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

@media screen and (max-width: 1400px) {
  .item-section-4 {
    text-align: right;
  }

  .item-section-1 {
    margin-right: -30%;
  }

  .item-section-2 {
    margin-right: -10%;
  }

  .item-section-3 {
    margin-right: 0;
  }
}

@media screen and (max-width: 1500px) {
  .item-section-4 {
    text-align: right;
  }

  .item-section-btn {
    margin-right: -25%;
  }
}
</style>
