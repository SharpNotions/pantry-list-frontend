<template>
  <v-app>
    <v-toolbar app fix>
      <v-toolbar-title>
          <a href="#">
            <img src="./assets/pantry-logo.svg" alt="Pantry list" height="45px" />
          </a>
      </v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  .container {
    max-width: 720px;
  }
}
</style>
