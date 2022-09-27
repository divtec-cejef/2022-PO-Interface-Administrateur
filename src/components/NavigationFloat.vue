<template>
  <div class="container-for-panel">
  <div v-show="status" class="panel">
    <div class="button">
      <q-btn class="btn-fermer" flat icon="close" right title="Fermer" @click="closeMenu"/>
    </div>
    <ul>
      <li class="data" @click="this.$router.push('/data')">Tous les utilisateurs</li>
      <li class="register-user" @click="this.$router.push('/register')">Créer un utilisateur</li>
      <q-separator/>
      <li class="badge" @click="this.$router.push('/badge')">Tous les badges</li>
      <li class="register-badge" @click="this.$router.push('/create-badge')">Créer un badge</li>
    </ul>
  </div>
  <div v-show="!status">
    <q-btn class="btn-ouvrir" flat icon="menu" title="Menu" @click="openMenu"/>
  </div>
  </div>
</template>

<script>

export default {
  name: "NavigationFloat",
  data() {
    return {
      status: false,
    }
  },
  props: {
    selected: {
      type: String,
      default: 1
    }
  },
  methods: {
    /**
     * Ferme le menu
     */
    closeMenu() {
      this.status = false;
    },
    /**
     * Ouvre le menu
     */
    openMenu() {
      this.status = true;
    }
  },
  watch: {
    /**
     * S'occupe du status du menu
     * @param value status du menu
     */
    status(value) {
      if (value) {
        document.querySelector('.container-for-panel').style.width = '340px';
      } else {
        document.querySelector('.container-for-panel').style.width = '0';
      }
    }
  },
  mounted() {
    let selected = '';
    switch (this.selected) {
      case '1':
        selected = '.data';
        break;
      case '2':
        selected = '.register-user';
        break;
      case '3':
        selected = '.badge';
        break;
      case '4':
        selected = '.register-badge';
        break;
    }
    document.querySelector(selected).classList.add('selected');
  }
}
</script>

<style scoped>
.data, .register-badge, .badge, .register-user {
  font-size: 25px;
}

.data:hover, .register-badge:hover, .badge:hover, .register-user:hover {
  cursor: pointer;
  background-color: #e0e0e0;
}

.btn-fermer {
  position: fixed;
  top: 5px;
  left: 190px;
  z-index: 200;
}

.panel {
  background-color: #f5f5f5;
  box-shadow: #5d5d5d 0 0 5px;
  width: 340px;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}

ul {
  position: fixed;
  list-style-type: none;
  margin: 10px;
  padding: 0;
  font-size: 2em;
  overflow: hidden;
}

li {
  margin-bottom: 15px;
  color: rgba(29, 29, 29, 0.53);
  word-break: break-word;
}

.data {
  margin-top: 30px;
}

.selected {
  border-bottom: #DC006B 2px solid;
  color: #1D1D1D;
}

.btn-ouvrir {
  position: fixed;
}
/******************************************
Responsive
**************************************** */
@media screen and (max-width: 620px) {
  .btn-fermer {
    right: 5px !important;
    top: 5px !important;
    left: auto !important;
  }
  .panel {
    height: 100%;
    width: 620px !important;
    position: fixed;
    z-index: 100;
    padding: 10px;
  }
  ul {
    width: 620px !important;
  }
}

@media screen and (max-width: 1100px) {
  .panel {
    width: 220px;
  }
  ul {
    width: 200px;
  }
}

@media screen and (min-width: 620px) {
  .btn-fermer {
    left: 180px;
  }
}
@media screen and (min-width: 900px) {
  .panel {
    width: 240px;
  }
  .btn-fermer {
    left: 200px;
  }
}
@media screen and (min-width: 1110px) {
  .panel {
    width: 260px;
  }
  .btn-fermer {
    left: 215px;
  }
}
@media screen and (min-width: 1300px) {
  .panel {
    width: 280px;
  }
  .btn-fermer {
    left: 225px;
  }
}
@media screen and (min-width: 1400px) {
  .btn-fermer {
    left: 215px;
  }
}
@media screen and (min-width: 1500px) {
  .btn-fermer {
    left: 220px
  }
}
</style>
