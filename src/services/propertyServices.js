import axios from 'axios'
import config from '@/config'
import store from '@/store'

const headers = {
    'Content-Type': 'application/json'
}

export const postProperty = async (propertyDetails) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': store.state.token
    }
    const res = await axios.post(`${config.apiBaseUrl}/property/create`, propertyDetails, { headers })
    return res.data
}

export const getSearchResults = async (searchInfo) => {
    let url = `${config.apiBaseUrl}/property/properties`
    url += `?for=${searchInfo.for}&city=${searchInfo.city}`
    if (searchInfo.furnishing) {
        url += `&furnishing=${searchInfo.furnishing}`
    }
    if (searchInfo.noOfBedrooms > 0) {
        url += `&noOfBedrooms=${searchInfo.noOfBedrooms}`
    }
    if (searchInfo.minPrice >= 5000) {
        url += `&minPrice=${searchInfo.minPrice}&maxPrice=${searchInfo.maxPrice}`
    }
    if (searchInfo.minArea >= 300) {
        url += `&minArea=${searchInfo.minArea}&maxArea=${searchInfo.maxArea}`
    }
    const res = await axios.get(url, headers)
    return res.data
}

export const buyPremium = async (id, options) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': store.state.token
    }
    const res = await axios.post(`${config.apiBaseUrl}/property/premium/${id}`, options, { headers })
    return res.data
}

export const setPremium = async (id) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': store.state.token
    }
    const res = await axios.patch(`${config.apiBaseUrl}/property/payment-successful/${id}`, { plan: 'BASIC' }, { headers })
    return res.data
}

export const deletePropById = async (id) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': store.state.token
    }
    const res = await axios.delete(`${config.apiBaseUrl}/property/${id}`, { headers })
    return res.data
}

export const getPropertyById = async (id) => {
    const res = await axios.get(`${config.apiBaseUrl}/property/id/${id}`, headers)
    return res.data
}

export const getRate = (rate) => {
    if (rate > 1000 && rate < 100000) {
        return `${rate / 1000}K`
    } else if (rate >= 100000 && rate < 10000000) {
        return `${rate / 100000}L`
    } else if (rate >= 10000000 && rate < 1000000000) {
        return `${rate / 10000000}Cr`
    } else {
        return rate
    }
}