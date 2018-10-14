<template>
  <v-app>

    <v-navigation-drawer floating fixed clipped app class="grey lighten-5" v-model="drawer">
      <v-list>
        <template v-for="item in items">
        <v-list-tile :key="item.title">
          <v-list-tile-action>
            <v-icon>subject</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
         </v-list-tile-content>
        </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar flat fixed app clipped-left>
      <v-toolbar-title>
          <a href="#" @click="drawer = !drawer">
            <img
              @transitionend="onTransitionFinish"
              :class="{ loading: loading }"
              src="./assets/pantry-logo.svg"
              alt="pantry"
              height="45px"
            />
            <span class="hidden-xs-only">pantry</span>
          </a>
        </v-toolbar-title><v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn active-class="btn-active" flat to="total-rankings">Total Rankings</v-btn>
        <v-btn active-class="btn-active" flat to="/">My Rankings</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-progress-linear
      fixed
      :class="{ hide: true }"
      :indeterminate="true"
    ></v-progress-linear>
    <v-content>
      <v-container fluid>
        <router-view :class="{ hide: loading }"></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'app',
  data: () => ({
    drawer: true,
    items: [{ title: 'List 1' }, { title: 'List 2' }, { title: 'List 3' }]
  }),
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
$border: 1px solid #ccc;
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
    transition-property: opacity;
    transition-duration: $transitionDuration;
  }

  .v-toolbar {
    border-bottom: $border;
  }

  .v-toolbar {
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
    .v-btn {
      border-radius: 0;
      top: 2px;
    }
    .btn-active {
      background: rgb(250, 250, 250);
      border: $border;
      border-bottom-color: white;
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
