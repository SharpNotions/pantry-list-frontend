<template>
  <v-layout align-center column>
    <p>Halt!  Who goes there!?!?</p>
    <div id="g-signin2"> </div>
  </v-layout>
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
  mounted () {
    if (auth.isAuthorized()) {
      this.$router.replace(this.$route.query.redirect || '/')
    }
    if (!window.gapi) {
      throw new Error('Google API is missing.  You can\'t log in without it 😦')
    }

    window.gapi.signin2.render('g-signin2', {
      scope: 'profile email',
      onsuccess: this.onSignIn
    })
  },
  methods: {
    onSignIn (user) {
      const hd = user.getHostedDomain()
      if (hd === 'sharpnotions.com') {
        const idToken = user.getAuthResponse().id_token
        auth.authorize(idToken)
        this.$router.replace(this.$route.query.redirect || '/')
      }
    }
  }
}
</script>

<style lang="scss">
 #g-signin2 {
   display: flex;
   justify-content: center;
 }
</style>
