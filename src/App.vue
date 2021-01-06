<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/covid-data">Covid Data</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import './common/scss/index.scss';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $base-color;
}

#nav {
  padding: 30px;
}

#nav {
  a {
    font-weight: bold;
    color: $base-link-color;
  }
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
