import { Notify } from 'quasar'
import axios from 'axios';
axios.defaults.baseURL = 'https://api-mailenz.divtec.me/api'

const listOfSections = ['INF', 'HOR', 'LAC', 'MMC', 'DCM', 'ELT', 'AUT'];
const listOfStands = [
  {
    id: 1,
    name: 'Donner du style avec CSS',
    section: listOfSections[0],
    keywords: 'CSS',
  },
  {
    id: 2,
    name: 'C\'est quoi le cryptage ?',
    section: listOfSections[0],
    keywords: 'Cryptage',
  },
  {
    id: 3,
    name: 'Les bases de la programmation',
    section: listOfSections[0],
    keywords: 'Programmation',
  },
  {
    id: 4,
    name: 'Utilisation du terminal',
    section: listOfSections[0],
    keywords: 'Terminal',
  },
  {
    id: 5,
    name: 'Créer un contenu HTML',
    section: listOfSections[0],
    keywords: 'HTML',
  },
  {
    id: 6,
    name: 'Serveur & réseau',
    section: listOfSections[0],
    keywords: 'Réseau',
  },
  {
    id: 7,
    name: 'Montage pont de barillet',
    section: listOfSections[1],
    keywords: 'Pont',
  },
  {
    id: 8,
    name: 'Horloge didactique',
    section: listOfSections[1],
    keywords: 'Horloge',
  },
  {
    id: 9,
    name: 'Carburant Martien',
    section: listOfSections[2],
    keywords: 'Poire',
  },
  {
    id: 10,
    name: 'Analyse du sol Martien !',
    section: listOfSections[3],
    keywords: 'Masse et volume',
  },
  {
    id: 11,
    name: 'Les anneaux de \"Ça tourne\"',
    section: listOfSections[3],
    keywords: 'Anneaux',
  },
  {
    id: 12,
    name: 'no name',
    section: listOfSections[4],
    keywords: 'Vaisseau',
  },
  {
    id: 13,
    name: 'Reaction time',
    section: listOfSections[5],
    keywords: 'Reaction',
  },
  {
    id: 14,
    name: 'Effet du courant électique',
    section: listOfSections[5],
    keywords: 'Courant',
  },
  {
    id: 15,
    name: 'Mars Attacks',
    section: listOfSections[6],
    keywords: 'Flipper',
  },
  {
    id: 16,
    name: 'Morpion',
    section: listOfSections[6],
    keywords: 'CNC',
  }
];
const state = {
  isAdmin: false,
  isConnected: false,
  listOfManager: []
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
    state.isAdmin = true;
    // state.isAdmin = payload['user'].is_admin === 1;
  },
  setListOfManager(state, payload) {
    state.listOfManager = payload;
  }
}
const actions = {
  getListOfManager({ commit }) {
    return axios.get('/users')
      .then(response => {
        console.log(response.data);
        commit('setListOfManager', response.data);
      })
      .catch(error => {
        console.log(error);
      })
  },
  updateStand({ commit }, payload) {
    let newStand = []

    payload.stands.forEach((element) => {
      newStand.push(element);
    });

    commit('changeStand', { index: payload.id, newStands: newStand });
  },
  // connecte un responsable
  login({commit}, credentials) {

    //emmet une requête axios en passant l'email et le mot de passe
    return axios
      .post("/login", {
        email: credentials.email,
        password: credentials.password
      })
      //une fois la requete
      .then(response => {
        commit('setConnected', true)
        commit('setIsAdmin', response.data)
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
  getListOfSections: () => {
    return listOfSections;
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
