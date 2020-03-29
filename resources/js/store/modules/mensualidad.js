import axios from 'axios'

export const  state = {
    mensualidadSugerida: 0
}

export const getters = {
    mensualidadSugerida : state => state.mensualidadSugerida
}

export const mutations = {
    mutations_mensualidadSugerida(state, payload){
        state.mensualidadSugerida = payload
    }
}


export const actions = {
    async actions_mensualidadSugerida({commit}, payload){
        const {data} = await axios(`/api/registros/mensualidad-sugerida/${payload}`)
        commit('mutations_mensualidadSugerida', data)
    }
}
