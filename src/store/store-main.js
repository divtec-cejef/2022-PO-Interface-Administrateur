import {Notify} from 'quasar'
import axios from 'axios';

axios.defaults.baseURL = 'https://api-mars.divtec.ch/api';
const listOfStands = [
  {
    id: 1,
    name: 'Donner du style avec CSS',
    keywords: 'CSS',
    id_badge: [1, 2, 3, 4, 5, 6]
  },
  {
    id: 2,
    name: 'Utilisation du terminal',
    keywords: 'Terminal',
    id_badge: [7]
  },
  {
    id: 3,
    name: 'Serveur & réseau',
    keywords: 'Réseau',
    id_badge: [8]
  },
  {
    id: 4,
    name: 'Les bases de la programmation',
    keywords: 'Robotique',
    id_badge: [9]
  },
  {
    id: 5,
    name: 'C\'est quoi le cryptage ?',
    keywords: 'Cryptage',
    id_badge: [10, 11, 12]
  },
  {
    id: 6,
    name: 'Montage pont de barillet',
    keywords: 'Pont',
    id_badge: [13]
  },
  {
    id: 7,
    name: 'Horloge didactique',
    keywords: 'Horloge',
    id_badge: [14]
  },
  {
    id: 8,
    name: 'Carburant Martien',
    keywords: 'Poire',
    id_badge: [15]
  },
  {
    id: 9,
    name: 'Analyse du sol Martien !',
    keywords: 'Masse et volume',
    id_badge: [16]
  },
  {
    id: 10,
    name: 'Les anneaux de \"Ça tourne\"',
    keywords: 'Anneaux',
    id_badge: [17]
  },
  {
    id: 11,
    name: 'no name',
    keywords: 'Vaisseau',
    id_badge: [18]
  },
  {
    id: 12,
    name: 'Reaction time',
    keywords: 'Reaction',
    id_badge: [19]
  },
  {
    id: 13,
    name: 'Effet du courant électique',
    keywords: 'Courant',
    id_badge: [20]
  },
  {
    id: 14,
    name: 'Mars Attacks',
    keywords: 'Flipper',
    id_badge: [21]
  },
  {
    id: 15,
    name: 'Morpion',
    keywords: 'CNC',
    id_badge: [22]
  }
];
const state = {
  isAdmin: false,
  isConnected: false,
  listOfManagerInAPI: [],
  listOfManager: [],
  listOfBadge: [],
  connected: [],
}

const mutations = {
  changeStand(state, payload) {
    state.listOfManager[payload.index].responsable = [];
    payload.newStands.forEach(stand => {
      state.listOfManager[payload.index].responsable.push(stand);
    })
  },
  setConnected(state, payload) {
    state.isConnected = payload;
  },
  setIsAdmin(state, payload) {
    state.isAdmin = payload['user'].is_admin === 1;
  },
  setListOfManager(state, payload) {
    state.listOfManager = payload;
  },
  setListOfManagerinAPI(state, payload) {
    state.listOfManagerInAPI = payload;
  },
  setListOfBadge(state, payload) {
    state.listOfBadge = payload;
  },
  setWhoIsConnected(state, payload) {
    state.connected = payload;
  }
}
const actions = {
  testDifferenceWithAPI({commit}) {
    let manager = state.listOfManager
    let managerAPI = state.listOfManagerInAPI

    manager.forEach((manager, index) => {
      if (managerAPI[index].responsable !== manager.responsable) {
        return true
      }
    })
    return false
  },
  register({commit}, payload) {
    let config = {
      "headers": {
        "Authorization": "Bearer " + state.connected.access_token,
      }
    }
    payload.firstname = payload.firstname.replaceAll(' ', '');
    payload.lastname = payload.lastname.replaceAll(' ', '');
    payload.username = payload.username.replaceAll(' ', '');
    payload.email = payload.email.replaceAll(' ', '');

    return axios
      .post('responsables/register', {
        first_name: payload.firstname,
        last_name: payload.lastname,
        username: payload.username,
        email: payload.email,
      }, config)
      .then(response => {
        Notify.create({
          type: 'positive',
          color: 'positive',
          timeout: 1000,
          position: 'top-right',
          message: 'Inscription réussie !',
          progress: true
        })
      })
      .catch(error => {
        console.log(error)
        Notify.create({
          type: 'negative',
          color: 'negative',
          timeout: 1000,
          position: 'top-right',
          message: 'Erreur lors de l\'inscription !',
          progress: true
        })
      })
  },
  updateResponsable({state}) {
    let manager = state.listOfManager;
    let managerAPI = state.listOfManagerInAPI;
    let forgedData = '';
    let config = {
      "headers": {
        "Authorization": "Bearer " + state.connected.access_token,
      }
    }

    manager.forEach((item, index) => {
      forgedData = '';

      if (managerAPI[index].responsable.length !== item.responsable.length) {
        item.responsable.forEach((stand, index) => {
          forgedData += stand.id + ';';
        })
        forgedData = forgedData.substring(0, forgedData.length - 1);
        return axios
          .post('/users/' + item.id + '/responsables', {
            badges_id: forgedData
          }, config)
          .then(response => {
            document.querySelector('.btn-add').style.display = 'none';
          })
      }
    });
  },
  getListOfManager({commit}) {
    return axios.get('/users')
      .then(response => {
        commit('setListOfManager', response.data);
      })
  },
  getListOfManagerInAPI({commit}) {
    return axios.get('/users')
      .then(response => {
        commit('setListOfManagerinAPI', response.data);
      })
  },
  getListOfBadge({commit}) {
    return axios.get('/badges')
      .then(response => {
        commit('setListOfBadge', response.data);
      })
  },
  updateStand({state, commit}, payload) {
    let newStand = []
    let badges = state.listOfBadge;

    payload.stands.forEach(stand => {
      if (stand === 0) {
        console.log('cssouge')
        newStand.push(badges[0]);
        newStand.push(badges[1]);
        newStand.push(badges[2]);
        newStand.push(badges[3]);
        newStand.push(badges[4]);
        newStand.push(badges[5]);
      } else if (stand >= 1 && stand <= 3) {
        console.log('fdpouge')
        newStand.push(badges[stand + 5]);
      } else if (stand === 4) {
        newStand.push(badges[9]);
        newStand.push(badges[10]);
        newStand.push(badges[11]);
      } else {
        console.log('autrouge')
        newStand.push(badges[stand + 7]);
      }
    })
    commit('changeStand', {index: payload.id, newStands: newStand});
  },
  // connecte un responsable
  login({commit}, credentials) {

    //emet une requête axios en passant l'email et le mot de passe
    return axios
      .post("/login", {
        email: credentials.email,
        password: credentials.password
      })
      //une fois la requete
      .then(response => {
        commit('setConnected', true)
        commit('setIsAdmin', response.data)
        commit('setWhoIsConnected', response.data)
        this.$router.push('/data')
        Notify.create({
          type: 'positive',
          color: 'positive',
          timeout: 1000,
          position: 'top-right',
          message: 'Bienvenue ' + response.data.user.first_name,
          progress: true
        })
      })
      .catch(err => {
        if (err.response.status === 401) {
          Notify.create({
            type: 'negative',
            color: 'negative',
            timeout: 1000,
            position: 'top-right',
            message: 'Email ou mot de passe incorrect',
            progress: true
          })
        }
      })
  },
}
const getters = {
  getManager: (state) => {
    return state.listOfManager
  },

  getStands: () => {
    return listOfStands;
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
