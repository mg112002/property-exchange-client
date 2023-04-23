import axios from "axios"
import config from '@/config'
import store from "@/store"

const headers = {
    'Content-Type': 'application/json'
}

export const userRegistration = async (userDetails) => {
    const res = await axios.post(`${config.apiBaseUrl}/auth/register`, userDetails, headers)
    return res.data
}

export const getDetailsOnMail = async (id) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': store.state.token
    }
    const res = await axios.get(`${config.apiBaseUrl}/property/contact/${id}`, { headers })
    return res.data
}