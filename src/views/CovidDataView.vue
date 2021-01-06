<template>
    <div>
        <CovidDataComponent />
    </div>
</template>

<script>
    import CovidDataComponent from '@/modules/covid-data/components/CovidDataComponent.vue'

    export default {
        name: 'Table',
        components: {
            CovidDataComponent
        }
    }
</script>