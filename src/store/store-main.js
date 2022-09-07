const state = {
  listOfManager: [
    {
      id: 1,
      first_name: 'Quentin',
      last_name: 'Prongue',
      email: 'quentin.prongue@divtec.ch',
      stand: ['ROBOTIQUE', 'RESEAU', 'CRYPTAGE'],
    },
    {
      id: 2,
      first_name: 'Karim',
      last_name: 'Houbbi',
      email: 'karim.houbbi@divtec.ch',
      stand: ['CSS', 'HTML'],
    },
    {
      id: 3,
      first_name: 'Bilel',
      last_name: 'Hofer',
      email: 'bilel.hofer@divtec.ch',
      stand: ['MARS'],
    },
  ]
}
const mutations = {

}
const actions = {

}
const getters = {
  getManager: (state) => {
    return state.listOfManager
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
