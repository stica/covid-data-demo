<template>
    <div class="component-wrapper">
        <div class="element-wrapper">
            <b-table sticky-header
                :items="selectedCountries"
                :fields="fields"
                :hover="true"
                head-variant="light"
                class="sticky-footer">

                <template #table-caption>
                    <div class="table-footer">
                        <div>Total: </div>
                        <div>{{ totalConfirmedNumber }}</div>
                        <div>{{ totalDeathsNumber }}</div>
                        <div>{{ totalRecoveredNumber }}</div>
                    </div>
                </template>

            </b-table>
        </div>
    </div>
</template>

<script>
import TableComponentView from './TableComponentView.js';

export default {
    name: 'TableComponent',
    props: ['selectedCountries'],
    data() {
        return {
            totalConfirmedNumber: 0,
            totalDeathsNumber: 0,
            totalRecoveredNumber: 0,
            fields: TableComponentView.getTableFields()
        }
    },
    created() {
        this.countData();
    },
    watch: {
        selectedCountries: function () {
            this.countData();
        }
    },
    methods: {
        countData() {
            if (this.selectedCountries) {
                this.totalConfirmedNumber = this.selectedCountries
                    .reduce((a, b) => {
                        return a + b.TotalConfirmed;
                    }, 0);

                this.totalDeathsNumber =  this.selectedCountries
                    .reduce((a, b) => {
                        return a + b.TotalDeaths;
                    }, 0);

                this.totalRecoveredNumber = this.selectedCountries
                    .reduce((a,b) => {
                        return a + b.TotalRecovered;
                    }, 0);
            }
        },
    }
}
</script>

<style lang="scss" scoped>
    @import './../../../shared/scss/component-wrapper.scss';
    .b-table-sticky-header {
        max-height: 500px;
    }
    .b-table {

        .table-footer {
            display: flex;
            flex-direction: row;

            div {
                width: 22%;
                padding: 0 12px;
                text-align: right;
                &:first-child {
                    text-align: center;
                    width: 34%
                }
            }
        }
    }

</style>