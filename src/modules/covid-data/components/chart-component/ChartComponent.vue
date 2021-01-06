<template>
    <div class="component-wrapper">
        <div class="element-wrapper">
            <graph-bar
                class="chart-component-chart"
                :width="width"
                :height="500"
                :axis-min="0"
                :axis-max="maxXAxisValue"
                :labels="countries"
                :values="values">
                <note :text="'Covid Data Chart'"></note>
                <tooltip :names="names" :position="'left'"></tooltip>
                <legends :names="names" :filter="true"></legends>
            </graph-bar>
        </div>
    </div>
</template>

<script>
export default {
    props: ['selectedCountries'],
    data() {
        return {
            maxXAxisValue: 0,
            width: 0,
            countries: [],
            totalConfirmedNumberArray: [],
            totalDeathsNumberArray: [],
            totalRecoveredNumberArray: [],            
            names: [ "Total Confirmed Number", "Total Deaths Number", "Total Recovered Number" ],
            values: [
                this.totalConfirmedNumberArray,
                this.totalDeathsNumberArray,
                this.totalRecoveredNumberArray
            ]
        }
    },
    created() {
        this.getDataForChart();
    },
    watch: {
        selectedCountries: function () {
            this.getDataForChart();
        }
    },
    methods: {
        getDataForChart() {
            this.width = this.selectedCountries.length > 5 ? this.selectedCountries.length * 100 : 900;
            this.countries = this.selectedCountries.map(x => x.Country);
            this.totalConfirmedNumberArray = this.selectedCountries.map(x => x.TotalConfirmed);
            this.totalDeathsNumberArray = this.selectedCountries.map(x => x.TotalDeaths);
            this.totalRecoveredNumberArray = this.selectedCountries.map(x => x.TotalRecovered);
            this.maxXAxisValue = Math.max(...this.totalConfirmedNumberArray,
                ...this.totalDeathsNumberArray,
                ...this.totalRecoveredNumberArray);

            this.values = [
                this.totalConfirmedNumberArray,
                this.totalDeathsNumberArray,
                this.totalRecoveredNumberArray
            ];
        }
    }
}
</script>

<style lang="scss" scoped>
    @import './../../../shared/scss/component-wrapper.scss';

    .chart-component-chart {
        overflow-y: scroll;
    }
</style>