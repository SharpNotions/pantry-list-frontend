<template>
  <v-container fill-height>
    <v-layout align-center justify-center column>
      <h1 class="site-title mb-2">
        <img
          src="../assets/pantry-logo.svg"
          alt="pantry"
          width="50px"
        />
        <span>pantry</span>
      </h1>
      <v-card class="pa-2">
        <v-card-text>
         To login, use a valid Sharp Notions email address.
        </v-card-text>
        <v-card-actions style="justify-content: center;">
          <div id="g-signin2"></div>
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import auth from '@/auth'

const DEFAULT_URL = '/list/default'

export default {
  name: 'login',
  data() {
    return {
      error: ''
    }
  },
  mounted() {
    if (auth.isAuthorized()) {
      this.$router.replace(this.$route.query.redirect || DEFAULT_URL)
    }
    if (!window.gapi) {
      throw new Error("Google API is missing.  You can't log in without it 😦")
    }

    window.gapi.signin2.render('g-signin2', {
      scope: 'profile email',
      onsuccess: this.onSignIn
    })
  },
  methods: {
    onSignIn(user) {
      const hd = user.getHostedDomain()
      if (hd === 'sharpnotions.com') {
        const { id_token, expires_in } = user.getAuthResponse()
        auth.authorize(id_token, expires_in)
        this.$router.replace(this.$route.query.redirect || DEFAULT_URL)
      }
    }
  }
}
</script>

<style lang="scss">
.site-title {
  display: flex;
  font-size: 48px;
  span {
    margin-left: 0.5em;
  }
}
#g-signin2 {
  display: flex;
  justify-content: center;
}
</style>
