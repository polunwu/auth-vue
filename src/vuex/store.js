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
    },
    CLEAR_USER_DATA(state) {
      state.user = null
      localStorage.removeItem('user')
      axios.defaults.headers.common['Authorization'] = null
      location.reload()
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
    },
    login({ commit }, credentials) {
      return axios
        .post('//localhost:3000/login', credentials)
        .then(({ data }) => {
          // data will include name, email and token
          commit('SET_USER_DATA', data)
        })
    },
    logout({ commit }) {
      commit('CLEAR_USER_DATA')
    }
  },
  getters: {
    loggedIn(state) {
      return !!state.user
    }
  }
})
