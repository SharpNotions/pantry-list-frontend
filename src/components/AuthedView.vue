<template>
  <v-layout>
    <v-flex>
      <v-navigation-drawer floating fixed clipped app class="grey lighten-5" v-model="drawer">
        <lists></lists>
      </v-navigation-drawer>
      <v-toolbar flat fixed app clipped-left>
        <v-toolbar-title @click="drawer = !drawer">
          <img
            src="../assets/pantry-logo.svg"
            alt="pantry"
            height="45px"
          />
          <span class="hidden-xs-only">pantry</span>
          </v-toolbar-title><v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn active-class="btn-active" flat to="./total-rankings">total rankings</v-btn>
          <v-btn active-class="btn-active" flat to="./my-rankings">my rankings</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-progress-linear
        fixed
        :class="{ hide: !loading }"
        :indeterminate="true"
      ></v-progress-linear>
      <v-content>
        <v-container fluid>
          <router-view :class="{ hide: loading }"></router-view>
        </v-container>
      </v-content>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import Lists from '@/components/Lists'
export default {
  name: 'authed-view',
  components: { Lists },
  data: () => ({
    drawer: true,
    items: []
  }),
  computed: {
    ...mapGetters(['loading'])
  }
}
</script>

<style lang="scss">
$border: 1px solid #ccc;
$transitionDuration: 200ms;

#app {
  .hide {
    opacity: 0;
  }

  .container {
    transition-property: opacity;
    transition-duration: $transitionDuration;
  }

  .v-toolbar {
    border-bottom: $border;
    box-shadow: inset 0 1px 5px 0 rgba(0, 0, 0, 0.25) !important;
  }

  .v-toolbar {
    &__title {
      overflow: visible;
      font-family: CircularStd-Black, Circular Std, 'Avenir', Helvetica, Arial,
        sans-serif;
      font-weight: 900;
      text-decoration: none;
      display: flex;
      align-items: center;
      font-size: 2em;
      color: #333;
      cursor: default;

      img {
        width: 1em;
        height: 1em;
        margin-right: 0.25em;
      }
    }

    .v-btn {
      border-radius: 3px 3px 0 0;
      top: 8px;
      height: 50px;
    }

    .btn-active {
      background: rgb(250, 250, 250);
      border: $border;
      border-bottom-color: white;
    }
  }

  .v-progress-linear {
    position: relative;
    top: 0;
    margin: 0;
    z-index: 999;
    transition-property: opacity;
    transition-duration: $transitionDuration;
  }
}
</style>
