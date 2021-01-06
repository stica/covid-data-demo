import HttpClient from '../../../common/http/HttpClient.js';

export default {
    async getAllCountries() {
        let result = {};
        await HttpClient.httpClientCovid.get('countries')
            .then(response => 
                result = response.data.map(x => x.Country).sort());
        return result;
    },
    async getCovidData() {
        let result = {};
        await HttpClient.httpClientCovid.get('summary')
            .then(response => 
                result = response.data.Countries);
        return result;
    },
    async getCovidDataPerCountry(countryName) {
        let result = {};
        await HttpClient.httpClientCovid.get(`/total/dayone/country/${countryName}`)
            .then(response => 
                result = response.data);
        return result;
    }
}