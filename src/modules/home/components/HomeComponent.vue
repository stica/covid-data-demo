<template>
    <div class="home-component">

        <h3>Covid Data Tracker demo app</h3>

        <p>My task was to create covid data tracker spa</p>

        <p>Unfortunately, COVID-19 is a serious issue nowadays. We would like you to create a SPA that helps to track data about this virus.
            The SPA should consume data from https://covid19api.com/ and have the following features:
        </p>
        <li>
            Display the data from the API in a tabular format, with the following columns:Country name
        </li>
        <li>
            The current total of the number of active cases,  since day 1
        </li>
        <li>
            The current total of the number of deaths,  since day 1
        </li>
        <li>
            The current total of the number of recoveries,  since day 1
        </li>
        <li>
            The table view should also have a “TOTALS” row, which shows the sum of the displayed data in each column.
        </li>
        <li>
            The user should be able to switch to another view that displays the data on a column chart.
        </li>
        <li>
            In the UI, there should be an input field that
            Autocompletes for country names
            Filters/searches for the input value in the data (country names) so that the views reflect the filtered dataset in both the tabular and the chart view
        </li>

        <h3>About application</h3>
        <li>
            Application is written in vue.js using pure javascript, html and scss.
        </li>
        <li>
            If you click on Covid-data link on topof the page yout will see table representation of the covid data per world countries. 
            At the topof that page you will have autocomplete component whitch you can use to filter data and with selecting country and click on button add
            you will create subset of countries whitch data will be shown in the table.
        </li>
        <li> 
            After you add country on list that country list will be showed, and if you click on country from the list
            you will see specific country covid data from day 1.
        </li>
        <li>
            If you click on button show grid representation you will see covid data per countries showed in data grid 
        </li>

        <h3>About me</h3>
        <li>
            I chosed vue.js to show my knowledge to create one more chalenge for my self. First of all i am Angular and .Net developer
            but i wanted to see if i am able to create Vue.js app and learn something new.
        </li>
        <li>
            I hope that you will find something interesting in way of creating this demo app.
        </li>

    </div>
</template>

<script>
</script>

<style lang="scss" scoped> 
    .home-component {
        text-align: left;
        padding: 20px;

        h3 {
            margin-top: 20px;
            &:first-child {
                margin-top: 0;
            }
        }
    }
</style>