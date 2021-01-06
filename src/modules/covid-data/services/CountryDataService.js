import HttpClient from '../../../common/http/HttpClient.js';

export default {
    async getCountryDataByCountryCode(countryCode) {
        let result = {};
        await HttpClient.httpClientCountry.get(countryCode)
            .then(response => 
                result = response.data);
        return result;
    },
}