import {Notify} from 'quasar'
import axios from 'axios';

axios.defaults.baseURL = 'https://api-mars.divtec.ch/api';
const state = {
  isAdmin: false,
  isConnected: false,
  listOfManagerInAPI: [],
  listOfManager: [],
  listOfBadge: [],
  listOfBase: [],
  connected: [],
  global_shape: [],
  sections: [],
}

const mutations = {
  /**
   * Met à jour la liste des badges
   * @param state
   * @param payload
   */
  updateShape(state, payload) {
    state.global_shape = payload
  },
  /**
   * Modifie les stands
   * @param state les variables du store
   * @param payload les stands
   */
  changeStand(state, payload) {
    let i = 0;
    let index = 0;

    // Trouve l'index de l'occurrence avec l'id de l'utilisateur
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
  changeBase(state, payload) {
    let i = 0;
    let index = 0;

    // Trouve l'index de l'occurrence avec l'id de l'utilisateur
    state.listOfManager.forEach((manager) => {
      if (manager.id === payload.index) {
        index = i
      }
      i++;
    })
    state.listOfManager[index].responsable = [];
    payload.newBases.forEach(base => {
      state.listOfManager[index].responsable.push(base);
    })
  },
  /**
   * Met à jour les données de la personne connectée
   * @param state les variables du store
   * @param payload les données de la personne connectée
   */
  setConnected(state, payload) {
    state.isConnected = payload;
  },
  /**
   * Met à jour si l'utilisateur est admin
   * @param state les variables du store
   * @param payload si l'utilisateur est admin
   */
  setIsAdmin(state, payload) {
    state.isAdmin = payload['user'].is_admin === 1;
  },
  /**
   * Met à jour la liste des stands
   * @param state les variables du store
   * @param payload la liste des stands
   */
  setListOfManager(state, payload) {
    state.listOfManager = payload;
  },
  /**
   * Met à jour la liste des managers de l'API
   * @param state les variables du store
   * @param payload la liste des managers de l'API
   */
  setListOfManagerInAPI(state, payload) {
    state.listOfManagerInAPI = payload;
  },
  /**
   * Met à jour la liste des badges
   * @param state les variables du store
   * @param payload la liste des badges
   */
  setListOfBadge(state, payload) {
    state.listOfBadge = payload;
  },
  setListOfBase(state, payload) {
    state.listOfBase = payload;
  },
  setSections(state, payload) {
    state.sections = payload;
  },
  /**
   * Met à jour l'utilisateur connecté
   * @param state les variables du store
   * @param payload l'utilisateur connecté
   */
  setWhoIsConnected(state, payload) {
    state.connected = payload;
  }
}
const actions = {
  /**
   * Met à jour les données
   * @param dispatch les actions
   */
  updateData({dispatch}) {
    // Met à jour les tables
    dispatch('getListOfManager');
    dispatch('getListOfManagerInAPI');
    dispatch('getListOfBadge');
    dispatch('getListOfBase');
  },
  /**
   * Supprime un badge
   * @param commit les mutations
   * @param dispatch les actions
   * @param payload l'id du badge
   */
  deleteBadge({commit, dispatch}, payload) {
    let config = {
      "headers": {
        "Authorization": "Bearer " + state.connected.access_token,
      }
    }
    axios.delete('/badges/' + payload, config)
      .then((response) => {
        Notify.create({
          type: 'positive',
          color: 'positive',
          timeout: 1000,
          position: 'top-right',
          message: response.data.message,
          progress: true
        })
        // Met à jour les tables
        dispatch('getListOfBadge');
      })
      .catch(() => {
        Notify.create({
          type: 'negative',
          color: 'negative',
          timeout: 1000,
          position: 'top-right',
          message: 'Erreur lors de la suppression du badge !',
          progress: true
        })
      })
  },
  /**
   * Supprime un user
   * @param commit les mutations
   * @param dispatch les actions
   * @param payload l'id de l'utilisateur
   */
  deleteUser({commit, dispatch}, payload) {
    let config = {
      "headers": {
        "Authorization": "Bearer " + state.connected.access_token,
      }
    }
    axios.delete('/users/' + payload, config)
      .then((response) => {
        Notify.create({
          type: 'positive',
          color: 'positive',
          timeout: 1000,
          position: 'top-right',
          message: response.data.message,
          progress: true
        })
        // Met à jour les tables
        dispatch('getListOfManager');
        dispatch('getListOfManagerInAPI');
      })
      .catch((error) => {
        Notify.create({
          type: 'negative',
          color: 'negative',
          timeout: 1000,
          position: 'top-right',
          message: error.response.data.error,
          progress: true
        })
      })
  },
  /**
   * Met à jour les badges
   * @param dispatch les actions
   * @param state les variables du store
   * @param payload les badges
   * @returns {Promise<T>} les badges
   */
  updateBadges({dispatch, state}, payload) {
    let config = {
      "headers": {
        "Authorization": "Bearer " + state.connected.access_token,
      }
    }
    return axios.put('badges/' + payload.id, {
      nom: payload.badge_nom,
      prix: payload.badge_prix,
      section_id: payload.badge_section_id,
    }, config)
      .then(response => {
        Notify.create({
          type: 'positive',
          color: 'positive',
          timeout: 1000,
          position: 'top-right',
          message: response.data.message,
          progress: true
        })
        dispatch('getListOfBadge');
      })
      .catch(error => {
        Notify.create({
          type: 'negative',
          color: 'negative',
          timeout: 1000,
          position: 'top-right',
          message: error.response.data.error,
          progress: true
        })
      })
  },
  updateBases({dispatch, state}, payload) {
    let config = {
      "headers": {
        "Authorization": "Bearer " + state.connected.access_token,
      }
    }

    console.log(payload)

    return axios.put('bases/' + payload.id, {
      nom: payload.base_nom,
      credit: payload.base_credit,
      oxygene: payload.base_oxygene,
    }, config)
      .then(response => {
        Notify.create({
          type: 'positive',
          color: 'positive',
          timeout: 1000,
          position: 'top-right',
          message: response.data.message,
          progress: true
        })
        dispatch('getListOfBases');
      })
      .catch(error => {
        Notify.create({
          type: 'negative',
          color: 'negative',
          timeout: 1000,
          position: 'top-right',
          message: error.response.data.error,
          progress: true
        })
      })
  },
  /**
   * Met à jour le mot de passe
   * @param commit les mutations
   * @param payload le mot de passe
   * @returns {Promise<T>} le mot de passe
   */
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
          message: response.data.message,
          progress: true
        })
      })
      .catch(error => {
        console.log(error.response.data)
        Notify.create({
          type: 'negative',
          color: 'negative',
          timeout: 1000,
          position: 'top-right',
          message: 'Erreur lors de la modification du mot de passe !',
          progress: true
        })
      })
  },
  /**
   * Crée un utilisateur
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

    // Enlève les espaces
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
          message: response.data.message,
          progress: true
        })
        dispatch('getListOfManager')
        dispatch('getListOfManagerInAPI')
      })
      .catch((error) => {
        if (error.response.data.last_name) {
          Notify.create({
            type: 'negative',
            color: 'negative',
            timeout: 1000,
            position: 'top-right',
            message: 'Le nom ne respecte pas les règles de validation !',
            progress: true
          })
        } else if (error.response.data.first_name) {
          Notify.create({
            type: 'negative',
            color: 'negative',
            timeout: 1000,
            position: 'top-right',
            message: 'Le prénon ne respecte pas les règles de validation !',
            progress: true
          })
        } else if (error.response.data.email) {
          Notify.create({
            type: 'negative',
            color: 'negative',
            timeout: 1000,
            position: 'top-right',
            message: 'L\'email ne respecte pas les règles de validation !',
            progress: true
          })
        } else {
          Notify.create({
            type: 'negative',
            color: 'negative',
            timeout: 1000,
            position: 'top-right',
            message: 'Un problème est survenu !',
            progress: true
          })
        }
      })
  },
  /**
   * Crée un badge
   * @param dispatch permet de faire des actions
   * @param commit permet de faire des mutations
   * @param payload les données de l'utilisateur
   * @returns {Promise<T>} les données de l'utilisateur
   */
  createBadge({dispatch, commit}, payload) {
    let config = {
      "headers": {
        "Authorization": "Bearer " + state.connected.access_token,
      }
    }

    if (payload.badge_prix.length > 0) {
      // Enlève les espaces
      payload.badge_prix = payload.badge_prix.replaceAll(' ', '');
    }

    return axios
      .post('badges', {
        nom: payload.badge_nom,
        prix: payload.badge_prix,
        section_id: payload.section_id,
      }, config)
      .then(response => {
        Notify.create({
          type: 'positive',
          color: 'positive',
          timeout: 1000,
          position: 'top-right',
          message: response.data.message,
          progress: true
        })
        dispatch('getListOfBadge')
      })
      .catch(error => {
        if (error.response.data.nom) {
          Notify.create({
            type: 'negative',
            color: 'negative',
            timeout: 1000,
            position: 'top-right',
            message: 'Le nom du badge ne respecte pas les règles de validation !',
            progress: true
          })
        } else if (error.response.data.prix) {
          Notify.create({
            type: 'negative',
            color: 'negative',
            timeout: 1000,
            position: 'top-right',
            message: 'Le prix du badge ne respecte pas les règles de validation !',
            progress: true
          })
        } else if (error.response.data.section_id) {
          Notify.create({
            type: 'negative',
            color: 'negative',
            timeout: 1000,
            position: 'top-right',
            message: 'La section du badge doit être renseignée !',
            progress: true
          })
        } else {
          Notify.create({
            type: 'negative',
            color: 'negative',
            timeout: 1000,
            position: 'top-right',
            message: 'Un problème est survenu !',
            progress: true
          })
        }
      })
  },
  /**
   * Met à jour les responsables
   * @param state les variables du store
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
        item.responsable.forEach((stand) => {
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
              message: response.data.message,
              progress: true
            })
          })
          .catch(error => {
            Notify.create({
              type: 'negative',
              color: 'negative',
              timeout: 1000,
              position: 'top-right',
              message: error.response.data.error,
              progress: true
            })
          })
      }
    });
  },
  /**
   * Récupère la liste des managers
   * @param commit permet de faire des mutations
   * @returns {Promise<AxiosResponse<any>>} la liste des managers
   */
  getListOfManager({commit}) {
    return axios.get('/users')
      .then(response => {
        commit('setListOfManager', response.data);
      })
  },
  /**
   * Récupère la liste des managers de l'API
   * @param commit permet de faire des mutations
   * @returns {Promise<AxiosResponse<any>>} la liste des managers de l'API
   */
  getListOfManagerInAPI({commit}) {
    return axios.get('/users')
      .then(response => {
        commit('setListOfManagerInAPI', response.data);
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
  getListOfBases({commit}) {
    return axios.get('/bases')
      .then(response => {
        commit('setListOfBase', response.data);
      })
  },
  /**
   * Récupère la liste des sections
   * @param commit permet de faire des mutations
   * @returns {Promise<AxiosResponse<any>>} la liste des sections
   */
  getSections({commit}) {
    return axios.get('/sections')
      .then(response => {
        commit('setSections', response.data);
      })
  },
  /**
   * Met à jour les stands
   * @param state les variables du store
   * @param commit permet de faire des mutations
   * @param payload les stands
   */
  updateStand({state, commit}, payload) {
    let newStand = []
    let badges = state.listOfBadge;

    // Push les badges pour qu'ils correspondent avec l'api
    payload.stands.forEach(stand => {
      badges.forEach(badge => {
        if (stand + 1 === badge.id) {
          newStand.push(badge)
        }
      })
    })
    commit('changeStand', {index: payload.id, newStands: newStand});
  },
  // Connecte un responsable
  login({state, commit}, credentials) {

    // Émet une requête axios en passant l'email et le mot de passe
    return axios
      .post("/login", {
        email: credentials.email,
        password: credentials.password
      })
      // Une fois la requete
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
      .catch(error => {
        if (error.response.status === 401) {
          Notify.create({
            type: 'negative',
            color: 'negative',
            timeout: 1000,
            position: 'top-right',
            message: error.response.data.error,
            progress: true
          })
        }
      })
  },
}
const getters = {
  /**
   * Récupère la liste des managers
   * @param state les variable du store
   * @returns {[]} la liste des managers
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
  /**
   * Récupère la liste des bases
   * @param state les variables du store
   * @returns {*} la liste des bases
   */
  getBases: (state) => {
    return state.listOfBase;
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
