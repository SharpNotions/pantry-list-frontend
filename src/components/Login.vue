<template>
  <div id="login">
    <p>Halt!  Who goes there!?</p>
    <div id="g-signin2"> </div>
  </div>
</template>

<script>
import auth from '@/auth'

export default {
  name: 'login',
  data () {
    return {
      error: '',
      gapi: undefined
    }
  },
  mounted() {
    if (auth.isAuthorized()) {
      this.$router.replace(this.$route.query.redirect || '/')
    }
    if (!window.gapi) {
      return;
    } else {
      this.gapi = window.gapi;
    }

    gapi.signin2.render('g-signin2', {
      scope: 'profile email',
      onsuccess: this.onSignIn
    });
  },
  methods: {
    async login () {
      try {
        await auth.authorize()
        this.$router.push('/')
      } catch (error) {
        this.error = 'We ran into an error while attempting to log you in.'
      }
    },
    onSignIn (user) {
      const hd = user.getHostedDomain();
      if (hd === 'sharpnotions.com') {
        var id_token = user.getAuthResponse().id_token;
        auth.authorize(id_token);
        this.$router.replace(this.$route.query.redirect || '/')
      } else {
        auth.unauthorize();
        this.gapi.auth2.getAuthInstance().disconnect();
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
