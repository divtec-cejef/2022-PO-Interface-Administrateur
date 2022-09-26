<template>
  <div class="panel" v-show="statu">
    <div class="button">
      <q-btn right flat icon="close" title="Fermer" @click="closeMenu" class="btn-fermer"/>
    </div>
    <ul>
      <li class="data" @click="this.$router.push('/data')">Tous les utilisateurs</li>
      <li class="register-user" @click="this.$router.push('/register')">Crée un utilisateur</li>
      <q-separator/>
      <li class="badge" @click="this.$router.push('/badge')">Tous les Badges</li>
      <li class="register-badge" @click="this.$router.push('/create-badge')">Crée un Badge</li>
    </ul>
  </div>
  <div v-show="!statu">
    <q-btn flat icon="menu" title="Menu" @click="openMenu"/>
  </div>
  <div class="panel phone" v-show="statu">
    <div class="button">
      <q-btn right flat icon="close" title="Fermer" @click="closeMenu"/>
    </div>
    <ul>
      <li class="data" @click="this.$router.push('/data')">
        <q-btn flat icon="account_box" title="Tous les utilisateurs"/>
      </li>
      <li class="register-user" @click="this.$router.push('/register')">
        <q-btn flat icon="person_add" title="Crée un utilisateur"/>
      </li>
      <li class="badge" @click="this.$router.push('/badge')">
        <q-btn flat icon="badge" title="Tous les Badges"/>
      </li>
      <li class="register-badge" @click="this.$router.push('/create-badge')">
        <q-btn flat icon="add" title="Crée un Badge"/>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: "NavigationFloat",
  data() {
    return {
      statu: false,
    }
  },
  props: {
    selected: {
      type: String,
      default: 1
    }
  },
  methods: {
    closeMenu() {
      this.statu = false;
    },
    openMenu() {
      this.statu = true;
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
  cursor: pointer;
}
.phone {
  display: none;
}
.button {
  float: right;
}

.panel {
  background-color: #eaeaea;
  box-shadow: #5d5d5d 0 0 5px;
  width: 340px;
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

/******************************************
Responsive
**************************************** */
@media screen and (max-width: 620px) {
  .panel {
    display: none;
  }
  .phone {
    display: block;
    width: 100px;
  }
  .btn-fermer {
    align-items: center;
  }
}

@media screen and (max-width: 1100px) {
  ul {
    width: 200px;
  }
}

</style>
