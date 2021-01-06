export default {
    getTableFields() {
        return [
            {
                key: 'Country',
                label: 'Country',
                sortable: true,
                thClass: 'column-30-width'
            },
                            {
                key: 'TotalConfirmed',
                label: 'Total Confirmed',
                sortable: true,
                tdClass: 'table-data-number',
                thClass: 'column-22-width'
            },
                            {
                key: 'TotalDeaths',
                label: 'Total Deaths',
                sortable: true,
                tdClass: 'table-data-number',
                thClass: 'column-22-width'
            },
                            {
                key: 'TotalRecovered',
                label: 'Total Recovered',
                sortable: true,
                tdClass: 'table-data-number',
                thClass: 'column-22-width'
            }
        ];
    }
}