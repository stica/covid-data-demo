<template>
    <div class="covid-data">
        <b-overlay class="covid-data-overlay" :show="isLoading" rounded="sm">
            
            <div class="covid-data-input-wrapper">
                <b-form-input
                    v-model="selectedCountry"
                    v-on:change="countryInputChanged"
                    class="covid-data-input"
                    list="country-list">
                </b-form-input>
                <div class="covid-data-input-btn-wrapper">
                    <b-button class="covid-data-input-btn"
                        v-on:click="addCountryToSelectedArray">
                        Add
                    </b-button>
                    <b-button class="covid-data-input-btn"
                        v-on:click="clearInputField">
                        Cancel
                    </b-button>
                </div>
            </div>

            <div class="data-wrapper">
                <div class="table-and-chart-wrapper">
                    <div class="covid-data-representation-btn">
                        <b-button class="component-button" v-on:click="switchRepresentationView">
                            {{ buttonText }}
                        </b-button>
                    </div>
                    <TableComponent v-if="this.showTable"
                        :selectedCountries="selectedCovidDataPerCountries"/>

                    <ChartComponent v-if="!this.showTable"
                        :selectedCountries="selectedCovidDataPerCountries"/>
                </div>

                <div class="covid-data-selected-countries-wrapper">
                    <b-list-group v-if="selectedCountries.length" v-bind:class="{ 'need-scroll': hasTenElements }"
                        class="covid-data-selected-countries">
                        <b-list-group-item class="covid-data-selected-countries-one-country"
                            v-for="country in selectedCountries"
                            v-on:click="openCountryData(country)"
                            v-bind:key="country">
                            {{country}}
                            <b-icon icon="x-circle"
                                class="covid-data-selected-countries-remove"
                                v-on:click="removeCountryFromSelected(country)"
                                variant="danger"></b-icon>
                        </b-list-group-item>
                    </b-list-group>

                    <b-media tag="li" v-if="!selectedCountries.length">
                        <template>
                            <img src="../../../assets/681699.png" alt="Image" width="256"/>
                        </template>
                        <h5 class="mt-0 mb-1">Corona virus data per countries</h5>
                        <p class="mb-0">
                            Globally, as of 5:47pm CET, 5 January 2021, there have been 84,474,195 confirmed cases of COVID-19, including 1,848,704 deaths, reported to WHO.
                            In this application you can see table and chart representation of total confirmed, deaths and recovered cases per country.
                            Currently, you can see data for all world countries for which we have confirmed data.
                            If you select one country or more from autocomplete, you will be able to see data specific for that countries.
                        </p>
                    </b-media>
                </div>
            </div>

            <datalist id="country-list" >
                <option v-for="country in countries"
                    :key="country">
                    {{ country }}
                </option>
            </datalist>
        </b-overlay>
        <b-modal id="modal-lg" ok-only size="lg" title="Country Data">
            <CountryDataComponent :countryName="countryName"
                :countryCode="countryCode"
                v-on:send-country-for-delete="removeCountryFromSelected"/>
        </b-modal>
    </div>
</template>

<script>
    import CovidDataService from './../services/CovidDataService.js';
    import ToastsService from './../../../common/services/ToastsService.js'
    import TableComponent from './table-component/TableComponent';
    import ChartComponent from './chart-component/ChartComponent';
    import CountryDataComponent from './country-data-component/CountryDataComponent';
    
    export default {
        components: {
            TableComponent,
            ChartComponent,
            CountryDataComponent
        },
        data() {
            return {
                countries: [],
                selectedCountries: [],
                selectedCountry: null,
                allCovidDataPerCountries: [],
                selectedCovidDataPerCountries: [],
                canSelect: true,
                showTable: true,
                buttonText: 'Show grid representation',
                isLoading: false,
                countryCode: '',
                countryName: ''
            }
        },
        mounted() {
            this.fetchData();
        },
        methods: {
            async fetchData() {
                this.isLoading = true;

                await this.fetchCountries();
                await this.fetchCovidData();

                this.selectedCovidDataPerCountries = this.allCovidDataPerCountries;
                this.isLoading = false;
            },
            async fetchCountries() {
                try {
                    this.countries = await CovidDataService.getAllCountries();
                }
                catch(error) {
                    console.error(error);
                }
            },
            async fetchCovidData() {
                try {
                    this.allCovidDataPerCountries = await CovidDataService.getCovidData();
                }
                catch(error) {
                    console.error(error);
                }
            },
            countryInputChanged() {
                if (this.countries.findIndex(x => x === this.selectedCountry) <= -1) {
                    this.clearInputField();
                }                
            },
            clearInputField() {
                this.selectedCountry = null;
            },
            switchRepresentationView() {
                this.showTable = !this.showTable;
                this.buttonText = `Show ${this.showTable ? 'grid' : 'table'} representation`
            },
            addCountryToSelectedArray() {
                if (this.selectedCountry) {
                    if (this.hasDataForCountry(this.selectedCountry)) {
                        this.selectedCountries.push(this.selectedCountry);
                        this.countries = this.countries.filter(x => x !== this.selectedCountry);

                        this.selectedCovidDataPerCountries = this.allCovidDataPerCountries.filter(x => this.selectedCountries.includes(x.Country));
                    }
                    else {
                        ToastsService.makeToast(this.$bvToast,
                            'Error',
                            `There is no data for ${this.selectedCountry}`,
                            'danger');
                    }
                    this.clearInputField();
                }
            },
            removeCountryFromSelected(removedCountry) {
                this.selectedCountries = this.selectedCountries.filter(x => x !== removedCountry);
                this.countries.push(removedCountry);
                this.countries = this.countries.sort();

                if (this.selectedCountries.length === 0) {
                    this.selectedCovidDataPerCountries = this.allCovidDataPerCountries;
                }
                else {
                    this.selectedCovidDataPerCountries = this.selectedCovidDataPerCountries.filter(x => x.Country !== removedCountry);
                }
            },
            hasTenElements() {
                return this.selectedCountries.length > 10;
            },
            hasDataForCountry(country) {
                if (this.allCovidDataPerCountries) {
                    return this.allCovidDataPerCountries.findIndex(x => x.Country === country) > -1;
                }
            },
            openCountryData(country) {
                this.countryCode = this.selectedCovidDataPerCountries.filter(x => x.Country === country)[0].CountryCode;
                this.countryName = country;
                this.$root.$emit('bv::show::modal', 'modal-lg', '#btnShow')
            }
        }
    }
</script>

<style lang="scss">
    @import "./../../../common/scss/index";
    .covid-data {
        padding: 0 25px;

        .covid-data-overlay {
            .b-overlay {
                position: fixed !important;
            }
        }
        .covid-data-input-wrapper {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            max-width: 500px;
            margin-bottom: 10px;
            padding: 0 10px;
            text-align: center;
            margin: 0 auto;

            .covid-data-input {
                margin: 0 auto;
                width: 300px;
                min-width: 300px;
                margin-bottom: 10px;
                margin-right: 10px;
            }

            .covid-data-input-btn-wrapper {
                margin: 0 auto;

                .covid-data-input-btn {
                    margin: 0 auto;
                    margin-right: 10px;
                    margin-bottom: 10px;

                    &:last-child {
                        margin-right: 0;
                    }
                }
            }
        }

        .covid-data-representation-btn {
            margin-bottom: 10px;
            text-align: left;
            padding: 0 10px;
            text-align: center;
        }

        .covid-data-selected-countries-wrapper {
            width: 500px;
            min-width: 300px;
            margin-bottom: 10px;
            padding: 0 10px;
            margin-top: 45px;
            
            .covid-data-selected-countries {
                max-height: 495px;
                max-width: 500px;
                min-width: 300px;
                margin: 0 auto;
                &.need-scroll{
                    overflow-y: scroll;
                }
                .list-group-item {
                    @include base-dark-gray;
                    min-width: 300px;
                }
                .covid-data-selected-countries-remove {
                    float: right;
                    margin-top: 3px;
                    font-size: large;
                    cursor: pointer;
                }
                .covid-data-selected-countries-one-country {
                    cursor: pointer;
                    &:hover {
                        background-color: $base-gray-color;
                    }
                }
            }
        }

        .data-wrapper {
            margin: 0 auto;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap-reverse;

            .table-and-chart-wrapper {
                width: 65%;
            }
        }

        .mt-0 {
            margin: 22px 0 !important
        }
    }
</style>