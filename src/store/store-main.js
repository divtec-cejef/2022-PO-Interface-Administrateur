import {Notify} from 'quasar'
import axios from 'axios';

axios.defaults.baseURL = 'https://api-mars.divtec.ch/api';
const state = {
  isAdmin: false,
  isConnected: false,
  listOfManagerInAPI: [],
  listOfManager: [],
  listOfBadge: [],
  connected: [],
  global_shape: [],
}

const mutations = {
  updateShape(state, payload) {
    state.global_shape = payload
  },
  /**
   * Modifi les stands
   * @param state les variable du store
   * @param payload les stands
   */
  changeStand(state, payload) {
    let i = 0;
    let index = 0;

    // trouve l'index de l'occurance avec l'id de l'utilisateur
    state.listOfManager.forEach((manager) => {
      if (manager.id === payload.index) {
        index = i
      }
      i++;
    })
    state.listOfManager[index].responsable = [];
    payload.newStands.forEach(stand => {
      state.listOfManager[index].responsable.push(stand);
    })
  },
  /**
   * met a jour les données de la personne connecter
   * @param state les variable du store
   * @param payload les données de la personne connecter
   */
  setConnected(state, payload) {
    state.isConnected = payload;
  },
  /**
   * met a jour si l'utilisateur est admin
   * @param state les variable du store
   * @param payload si l'utilisateur est admin
   */
  setIsAdmin(state, payload) {
    state.isAdmin = payload['user'].is_admin === 1;
  },
  /**
   * met a jour la liste des stands
   * @param state les variable du store
   * @param payload la liste des stands
   */
  setListOfManager(state, payload) {
    state.listOfManager = payload;
  },
  /**
   * met a jour la liste des manager de l'API
   * @param state les variable du store
   * @param payload la liste des manager de l'API
   */
  setListOfManagerinAPI(state, payload) {
    state.listOfManagerInAPI = payload;
  },
  /**
   * met a jour la liste des badges
   * @param state les variable du store
   * @param payload la liste des badges
   */
  setListOfBadge(state, payload) {
    state.listOfBadge = payload;
  },
  /**
   * met a jour l'utilisateur connecter
   * @param state les variable du store
   * @param payload l'utilisateur connecter
   */
  setWhoIsConnected(state, payload) {
    state.connected = payload;
  }
}
const actions = {
  updateData({dispatch}) {
    // met a jour les tables
    dispatch('getListOfManager');
    dispatch('getListOfManagerInAPI');
  },
  deleteUser({commit, dispatch}, payload) {
    let config = {
      "headers": {
        "Authorization": "Bearer " + state.connected.access_token,
      }
    }
    axios.delete('/users/' + payload, config)
      .then(() => {
        Notify.create({
          type: 'positive',
          color: 'positive',
          timeout: 1000,
          position: 'top-right',
          message: 'Utilisateur supprimé',
          progress: true
        })
        // met a jour les tables
        dispatch('getListOfManager');
        dispatch('getListOfManagerInAPI');
      })
      .catch(() => {
        Notify.create({
          type: 'negative',
          color: 'negative',
          timeout: 1000,
          position: 'top-right',
          message: 'Une erreur s\'est produite lors de la suppression de l\'utilisateur',
          progress: true
        })
      })
  },
  updatePassword({commit}, payload) {
    let config = {
      "headers": {
        "Authorization": "Bearer " + state.connected.access_token,
      }
    }

    return axios.post('users/' + payload.id + '/reset', {
      password: payload.password,
    }, config)
      .then(response => {
        Notify.create({
          type: 'positive',
          color: 'positive',
          timeout: 1000,
          position: 'top-right',
          message: 'Mot de passe modifié avec succès',
          progress: true
        })
      })
      .catch(error => {
        Notify.create({
          type: 'negative',
          color: 'negative',
          timeout: 1000,
          position: 'top-right',
          message: 'Une erreur s\'est produite lors de la modification du mot de passe',
          progress: true
        })
      })
  },
  /**
   * Crée un utilsiateur
   * @param dispatch permet de faire des actions
   * @param commit permet de faire des mutations
   * @param payload les données de l'utilisateur
   * @returns {Promise<T>} les données de l'utilisateur
   */
  register({dispatch, commit}, payload) {
    let config = {
      "headers": {
        "Authorization": "Bearer " + state.connected.access_token,
      }
    }

    // enleve les espace
    payload.firstname = payload.firstname.replaceAll(' ', '');
    payload.lastname = payload.lastname.replaceAll(' ', '');
    payload.email = payload.email.replaceAll(' ', '');

    return axios
      .post('responsables/register', {
        first_name: payload.firstname,
        last_name: payload.lastname,
        email: payload.email,
        is_admin: payload.is_admin ? 1 : 0,
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
        dispatch('getListOfManager')
        dispatch('getListOfManagerInAPI')
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
  /**
   * Met a jour les responsable
   * @param state les variable du store
   */
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
            Notify.create({
              type: 'positive',
              color: 'positive',
              timeout: 1000,
              position: 'top-right',
              message: 'Base de données mise à jour',
              progress: true
            })
          })
          .catch(error => {
            Notify.create({
              type: 'negative',
              color: 'negative',
              timeout: 1000,
              position: 'top-right',
              message: 'Une erreur s\'est produite lors de la mise à jour de la base de données',
              progress: true
            })
          })
      }
    });
  },
  /**
   * Récupère la liste des manager
   * @param commit permet de faire des mutations
   * @returns {Promise<AxiosResponse<any>>} la liste des manager
   */
  getListOfManager({commit}) {
    return axios.get('/users')
      .then(response => {
        commit('setListOfManager', response.data);
      })
  },
  /**
   * Récupère la liste des manager de l'API
   * @param commit permet de faire des mutations
   * @returns {Promise<AxiosResponse<any>>} la liste des manager de l'API
   */
  getListOfManagerInAPI({commit}) {
    return axios.get('/users')
      .then(response => {
        commit('setListOfManagerinAPI', response.data);
      })
  },
  /**
   * Récupère la liste des badges
   * @param commit permet de faire des mutations
   * @returns {Promise<AxiosResponse<any>>} la liste des badges
   */
  getListOfBadge({commit}) {
    return axios.get('/badges')
      .then(response => {
        commit('setListOfBadge', response.data);
      })
  },
  /**
   * Met a jour les stands
   * @param state les variable du store
   * @param commit permet de faire des mutations
   * @param payload les stands
   */
  updateStand({state, commit}, payload) {
    let newStand = []
    let badges = state.listOfBadge;

    // push les badges pour qu'elle corresponds avec l'api
    payload.stands.forEach(stand => {
        newStand.push(badges[stand]);
    })
    commit('changeStand', {index: payload.id, newStands: newStand});
  },
  // connecte un responsable
  login({state, commit}, credentials) {

    //emet une requête axios en passant l'email et le mot de passe
    return axios
      .post("/login", {
        email: credentials.email,
        password: credentials.password
      })
      //une fois la requete
      .then(response => {
        commit('setIsAdmin', response.data)
        if (state.isAdmin) {
        commit('setConnected', true)
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
        } else {
          Notify.create({
            type: 'negative',
            color: 'negative',
            timeout: 1000,
            position: 'top-right',
            message: 'Vous n\'avez pas les droits pour accéder à cette interface',
            progress: true
          })
        }
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
  /**
   * Récupère la liste des manager
   * @param state les variable du store
   * @returns {[]} la liste des manager
   */
  getManager: (state) => {
    return state.listOfManager
  },
  /**
   * Récupère la liste des stands
   * @returns {Array} la liste des stands
   */
  getStands: (state) => {
    return state.listOfBadge;
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
