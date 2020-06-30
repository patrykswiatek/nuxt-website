import axios from 'axios'

export const state = () => ({
  loadedData: {},
})

export const mutations = {
  setData(state, payload) {
    state.loadedData = payload
  },
}

export const actions = {
  nuxtServerInit(vuexContext, context) {
    return axios
      .get(`${process.env.baseUrl}/data.json`)
      .then((res) => {
        vuexContext.commit('setData', res.data)
      })
      .catch((e) => context.error(e))
  },
  setData(vuexContext, payload) {
    vuexContext.commit('setData', payload)
  },
  sendForm(vuexContext, payload) {
    return axios.post('http://localhost:3000/api', payload)
  },
}

export const getters = {
  loadedData(state) {
    return state.loadedData
  },
}
