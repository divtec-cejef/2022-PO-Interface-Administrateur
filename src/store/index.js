import {store} from 'quasar/wrappers'
import {createStore} from 'vuex'
import mainStore from './store-main'

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      mainStore
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
