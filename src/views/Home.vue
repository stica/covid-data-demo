<template>
  <div class="home">
    <HomeComponent />
  </div>
</template>

<script>
  import HomeComponent from '@/modules/home/components/HomeComponent.vue'

  export default {
    name: 'Home',
    components: {
      HomeComponent
    }
  }
</script>
