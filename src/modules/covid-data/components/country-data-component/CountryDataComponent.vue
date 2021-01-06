<template>
    <div>
        <b-overlay :show="isLoading" rounded="sm">
            <div class="country-data-country-content flex-row">
                <diV class="country-data-country-content-flag">
                    <img width="150" v-bind:src="countryData.flag" />
                </div>
                <div class="country-data-country-content-data flex-column">
                    <div class="flex-row">
                        <label>Country Name : </label>
                        <p> {{ countryData.name}}</p>
                    </div>
                    <div class="flex-row">
                        <label>Population : </label>
                        <p> {{ countryData.population}}</p>
                    </div>
                    <div class="flex-row">
                        <label>Percent of Infected Population : </label>
                        <p> {{ infectedPopulation}}%</p>
                    </div>
                </div>
                <div>
                    <b-button v-on:click="deleteFromSelected">
                        Delete from selected
                    </b-button>
                </div>
            </div>

            <div class="country-data-graph-wrapper">
                <graph-line
                    class="country-data-graph"
                    :width="650"
                    :height="400"
                    :shape="'normal'"
                    :axis-min="0"
                    :axis-max="maxXAxisValue"
                    :axis-full-mode="true"
                    :labels="labels"
                    :names="names"
                    :values="values">
                    <note :text="'Line Chart'"></note>
                    <tooltip :names="names" :position="'right'"></tooltip>
                    <legends :names="names"></legends>
                    <guideline :tooltip-y="true"></guideline>
                </graph-line>
            </div>
        </b-overlay>

    </div>
</template>

<script>
    import CountryDataService from './../../services/CountryDataService.js';
    import CovidDataService from './../../services/CovidDataService.js';

    export default {
        props: ['countryCode', 'countryName'],
        data() {
            return {
                isLoading: false,
                countryData: {},
                countryCovidData: {},
                numberOfActiveCases: [],
                numberOfDeathCases: [],
                numberOfConfirmedCases: [],
                maxXAxisValue: 0,
                labels: [],
                names: ['Active', 'Comfirmed', 'Deaths'],
                values: [
                    this.numberOfActiveCases,
                    this.numberOfConfirmedCases,
                    this.numberOfDeathCases
                ],
                infectedPopulation: 0,
                totalCovidCases: 0
            }
        },
        mounted() {
            this.fetchData();
        },
        methods: {
            async fetchData() {
                this.isLoading = true;
                await this.getCountryDataByCountryCode();
                await this.getCountryCovidDataByCountryName();

                this.getDataForChart();

                this.isLoading = false;
            },
            async getCountryDataByCountryCode() {
                if (this.countryCode) {
                    try {
                        this.countryData = await CountryDataService.getCountryDataByCountryCode(this.countryCode);
                    }
                    catch(error) {
                        console.log(error);
                    }
                }
            },
            async getCountryCovidDataByCountryName() {
                if (this.countryName) {
                    try {
                        this.countryCovidData = await CovidDataService.getCovidDataPerCountry(this.countryName.toLowerCase().replace(' ', '-'));
                    }
                    catch(error) {
                        console.log(error);
                    }
                }
            },
            getDataForChart() {
                this.numberOfActiveCases = this.countryCovidData.map(x => x.Active);
                this.numberOfConfirmedCases = this.countryCovidData.map(x => x.Confirmed);
                this.numberOfDeathCases = this.countryCovidData.map(x => x.Deaths);
                this.labels = this.countryCovidData.map(x => x.Date);

                this.maxXAxisValue = Math.max(...this.numberOfActiveCases,
                    ...this.numberOfConfirmedCases,
                    ...this.numberOfDeathCases);
                this.values = [
                    this.numberOfActiveCases,
                    this.numberOfConfirmedCases,
                    this.numberOfDeathCases
                ];
                this.totalCovidCases = this.numberOfConfirmedCases.reduce((a, b) => a + b, 0);
                this.infectedPopulation = (this.totalCovidCases / this.countryData.population).toFixed(2);
            },
            deleteFromSelected() {
                this.$emit('send-country-for-delete', this.countryName);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .country-data-country-content {
        width: 90%;
        margin: 0 auto;
        margin-bottom: 20px;
        min-width: 350px;

        .country-data-country-content-flag {
            margin-right: 10px;
        }
    }

    .country-data-graph-wrapper {
        width: 90%;
        margin: 0 auto;

        .country-data-graph {
            overflow-y: scroll; 
        }
    }
    .flex-row {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        label {
            margin-right: 8px;
        }
    }

    .flex-column {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }
</style>