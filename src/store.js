import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      // 1. Store userData in state
      state.user = userData
      // 2. Store userData in localStorage
      localStorage.setItem('user', JSON.stringify(userData))
      // 3. Add token to Axios header
      axios.defaults.headers.common['Authorization'] = `Bearer ${
        userData.token
      }`
    }
  },
  actions: {
    register({ commit }, credentials) {
      return axios
        .post('//localhost:3000/register', credentials)
        .then(({ data }) => {
          // data will include name, email and token
          commit('SET_USER_DATA', data)
        })
    }
  }
})
