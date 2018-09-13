<template>
  <v-app>
    <v-toolbar app fix>
      <v-toolbar-title>
          <a href="#">
            <img src="./assets/pantry-logo.svg" alt="pantry" height="45px" />
            <span class="hidden-xs-only">pantry</span>
          </a>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat to="total-rankings">Total Rankings</v-btn>
        <v-btn flat to="/">My Rankings</v-btn>
      </v-toolbar-items>
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
  .v-toolbar {
    &__title {
      a {
        font-family: CircularStd-Black, Circular Std, 'Avenir', Helvetica, Arial,
          sans-serif;
        font-weight: 900;
        text-decoration: none;
        display: flex;
        align-items: center;
        font-size: 2em;
        color: #333;
      }

      img {
        width: 1em;
        height: 1em;
        margin-right: 0.25em;
      }
    }
  }
  .v-progress-linear {
    position: absolute;
    margin: 0;
    transition-property: height;
    transition-duration: 500ms;
  }
}
</style>
