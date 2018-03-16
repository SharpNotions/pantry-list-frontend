<template>
  <div id="login">
    <p>Halt!  Who goes there!?</p>
    <button v-on:click="login()">Login with Google</button>
  </div>
</template>

<script>
import auth from '@/auth'

export default {
  name: 'login',
  data () {
    return {
      error: ''
    }
  },
  methods: {
    async login () {
      try {
        await auth.authorize()
        this.$router.push('/')
      } catch (error) {
        this.error = 'We ran into an error while attempting to log you in.'
      }
    }
  }
}
</script>

<style lang="scss"></style>
