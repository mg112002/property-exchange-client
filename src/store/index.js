import Vuex from 'vuex'
import { login } from '@/services/auth'


const KEY_TOKEN = 'token'
const KEY_EMAIL = 'email'
const PROPERTIES = 'properties'
const PROPERTY = 'property'
const LOADING = 'isLoading'
const RERA = 'rera'

const store = new Vuex.Store({
    state: {
        token: localStorage.getItem(KEY_TOKEN) || '',
        email: localStorage.getItem(KEY_EMAIL) || '',
        properties: localStorage.getItem(PROPERTIES) || [],
        property: localStorage.getItem(PROPERTY) || {},
        isLoading: localStorage.getItem(LOADING) || false,
        rera: localStorage.getItem(RERA) || '',
    },
    getters: {
        isAuthenticated: state => { return !!state.token },
        email: state => { return state.email },
        properties: state => { return state.properties },
        property: state => { return state.property },
        rera: state => { return state.rera },
        isLoading: state => { return state.isLoading },
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        },
        setEmail(state, email) {
            state.email = email
        },
        setProperties(state, properties) {
            localStorage.setItem(PROPERTIES, properties)
            state.properties = properties
        },
        setProperty(state, property) {
            localStorage.setItem(PROPERTY, property)
            state.property = property
        },
        setRera(state, rera) {
            localStorage.setItem(RERA, rera)
            state.rera = rera
        },
        setLoading(state) {
            localStorage.setItem(LOADING, !state.isLoading)
            state.isLoading = !state.isLoading
        }
    },
    actions: {
        login({ commit }, credentials) {

            return login(credentials)
                .then(res => {
                    const { token, email } = res.data

                    localStorage.setItem(KEY_TOKEN, token)
                    localStorage.setItem(KEY_EMAIL, email)

                    commit('setToken', token)
                    commit('setEmail', email)

                    return email;
                });
        },
        logout({ commit }) {
            localStorage.removeItem(KEY_TOKEN)
            localStorage.removeItem(KEY_EMAIL)
            localStorage.removeItem(RERA)
            localStorage.removeItem(LOADING)

            commit('setToken', '')
            commit('setEmail', '')
            commit('setRera', '')
            commit('setLoading', false)

            return Promise.resolve();
        }
    }
})


export default store