<template>
  <v-container fill-height>
    <v-layout wrap align-center justify-center style="max-width:500px;margin:auto">
      <v-flex xs12 class="text-xs-center">
        <v-layout wrap>
          <v-flex xs12>
            <v-form>
              <v-text-field

                label="Email"
                type="email"
                name="email"
                color="black"
                v-model="email"
                :disabled="loading"
                @keyup.enter="login()"
              ></v-text-field>
              <v-text-field

                label="Password"
                type="password"
                name="password"
                color="black"
                v-model="password"
                :disabled="loading"
                @keyup.enter="login()"
              ></v-text-field>
              <v-btn
                block
                dark
                color="secondary"
                @click.native="login()"
                :loading="loading"
              >
                Login
              </v-btn>
            </v-form>
          </v-flex>
          <v-flex xs12 class="pt-3 pb-3 mt-3 mb-2">
            <div
             :style="$store.state.ui.dark ? 'border-bottom: 1px solid rgba(255,255,255,0.7);' : 'border-bottom: 1px solid #212121;'"
              style="height: 12px; text-align: center"
            >
              <span
              :class="{
                  'white grey--text text--darken-4': !$store.state.ui.dark,
                  'grey darken-4 grey--text text--lighten-2': $store.state.ui.dark
              }"
              class="subheading pr-3 pl-3"
              >
                Sign in With
              </span>
            </div>
          </v-flex>
          <v-flex xs12 class="pr-1">
            <v-btn
              block
              dark
              color="red lighten-1"
              @click.native="google()"
            >
              <v-icon>mdi-google-plus</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs12 class="pt-4">
            <router-link to="/register" :class="{ 'black--text': !$store.state.ui.dark, 'white--text': $store.state.ui.dark }" class="pr-3">Need an Account?</router-link>
            <router-link to="/recover" :class="{ 'black--text': !$store.state.ui.dark, 'white--text': $store.state.ui.dark }">Forgot your password?</router-link>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Login',
  data: () => ({
    email: '',
    password: '',
    loading: false
  }),
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    async login () {
      this.loading = true
      await this.$store.dispatch('user/login', { email: this.email, password: this.password })
      this.$router.replace('/')
      this.loading = false
    },
    async google () {
      this.loading = true
      await this.$store.dispatch('user/loginWithGoogle')
      this.$router.replace('/')
      this.loading = false
    }
  }
}
</script>
