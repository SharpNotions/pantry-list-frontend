<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  data: () => ({})
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
