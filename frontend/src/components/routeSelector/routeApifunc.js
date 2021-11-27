import axios from 'axios'

export async function getRoutesFromApi(startCity, destination,date) {
    const baseURL = "http://localhost:8080/booking/"
    let incoming = await axios.post(baseURL, { startCity, destination, date })
    return incoming
}