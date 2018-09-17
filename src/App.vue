<template>
  <v-app>
    <v-toolbar app fix>
      <v-toolbar-title>
          <a href="#">
            <img
              @transitionend="onTransitionFinish"
              :class="{ loading: loading }"
              src="./assets/pantry-logo.svg"
              alt="pantry"
              height="45px"
            />
            <span class="hidden-xs-only">pantry</span>
          </a>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat to="total-rankings">Total Rankings</v-btn>
        <v-btn flat to="my-rankings">My Rankings</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-progress-linear
        :class="{ hide: true }"
        :indeterminate="true"
      ></v-progress-linear>
        <router-view :class="{ hide: loading }"></router-view>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'app',
  computed: {
    ...mapGetters(['loading'])
  },
  methods: {
    onTransitionFinish() {
      console.log('DONE')
    }
  }
}
</script>

<style lang="scss">
$transitionDuration: 200ms;

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  .hide {
    opacity: 0;
  }

  .container {
    max-width: 720px;
    transition-property: opacity;
    transition-duration: $transitionDuration;
  }

  .v-toolbar {
    &__content {
      max-width: 720px;
      margin: 0 auto;
    }

    &__title {
      overflow: visible;

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
        transition: transform 500ms ease-in-out;
        &.loading {
          transform: rotate(360deg);
        }
      }
    }
  }
  .v-progress-linear {
    position: relative;
    top: 5px;
    margin: 0;
    transition-property: opacity;
    transition-duration: $transitionDuration;
  }
}
</style>
