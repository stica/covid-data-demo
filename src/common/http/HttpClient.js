import axios from 'axios';

const httpClientCovid = axios.create({
    baseURL: 'https://api.covid19api.com/',
    timeout: 20000,
    headers: {
        "Content-Type": "application/json",
    }
});

const httpClientCountry = axios.create({
    baseURL: 'https://restcountries.eu/rest/v2/alpha/',
    timeout: 20000,
    headers: {
        "Content-Type": "application/json",
    }
});

export default {
    httpClientCovid,
    httpClientCountry
}

