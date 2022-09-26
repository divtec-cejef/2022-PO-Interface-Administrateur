<template>
  <div class="button">
    <q-btn fab icon="add" color="pink-14" class="btn-create-badge"
           @click="$router.push('/create-badge')" title="Créer un badge"/>
  </div>
  <div class="container">
    <div class="data pc">
      <div class="q-pa-md">
        <q-list bordered class="rounded-borders q-list">
          <q-expansion-item class="item-section-header"
                            expand-icon="none"
          >
            <template v-slot:header="{ expanded }">
              <q-item-section class="item-section-1">
                <p>ID</p>
              </q-item-section>
              <q-item-section class="item-section-2">
                <p>Nom du badge</p>
              </q-item-section>
              <q-item-section class="item-section-3">
                <p>Prix</p>
              </q-item-section>
              <q-item-section class="item-section-4">
                <p>Section</p>
              </q-item-section>
            </template>
          </q-expansion-item>
          <q-separator/>
          <div>
            <div v-for="item in listOfBadge">
              <q-expansion-item
                expand-icon="none"
                @click="openPopup(item.id)"
              >
                <template v-slot:header="{ expanded }">
                  <q-item-section class="item-section-1">
                    <p> {{ item.id }} </p>
                  </q-item-section>
                  <q-item-section class="item-section-2">
                    <p> {{ item.nom }} </p>
                  </q-item-section>
                  <q-item-section class="item-section-3">
                    <p> {{ item.prix }} </p>
                  </q-item-section>
                  <q-item-section class="item-section-4">
                    <p> {{ this.getStylesed(item.section_id) }} </p>
                  </q-item-section>
                  <q-item-section class="item-section-btn">
                    <PopupBadges :id=item.id />
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
        <q-list bordered class="rounded-borders">

          <q-expansion-item class="item-section-header"
                            expand-icon="none"
          >
            <template v-slot:header="{ expanded }">
              <q-item-section>
                <p>Nom du badge</p>
              </q-item-section>
              <q-item-section>
                <p>Prix</p>
              </q-item-section>
              <q-item-section>
                <p>Section</p>
              </q-item-section>
            </template>
          </q-expansion-item>
          <q-separator/>
          <div v-for="item in listOfBadge">
            <q-expansion-item
              expand-icon="none"
              @click="openPopup(item.id)"
            >
              <template v-slot:header="{ expanded }">
                <div class="header-phone">
                  <div class="phone-name">
                    <span> {{ item.nom }} </span>
                    <span> {{ item.prix }} </span>
                    <span> {{ this.getStylesed(item.responsable) }} </span>
                  </div>
                  <div class="phone-btn-popup">
                    <PopupBadges :id=item.id />
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
</template>
<script>
import {mapGetters, mapState} from "vuex";
import PopupBadges from "components/PopupBadges";

export default {
  name: "BadgesPage",
  components: {
    PopupBadges
  },
  data() {
    return {
      isLoad: false,
    };
  },
  computed: {
    ...mapState('mainStore', ['isConnected', "listOfBadge"]),
    ...mapGetters('mainStore', ['getStands']),
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
     * return le nom de la section
     * @param id
     * @returns {string}
     */
    getStylesed(id) {
      switch (id) {
        case 1:
          return 'INF'
        case 2:
          return 'HOR'
        case 3:
          return 'LAC'
        case 4:
          return 'MMC'
        case 5:
          return 'DCM'
        case 6:
          return 'ELT'
        case 7:
          return 'AUT'
      }
    },
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
    // Redirige les utilisateurs non connectés
    if (!this.isConnected) {
      this.$router.push('/')
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

.btn-create-badge {
  position: fixed;
  bottom: 5px;
  right: 5px;
  height: 40px;
  width: 40px;
  padding: 0 !important;
  min-height: 0 !important;
  min-width: 0 !important;
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
