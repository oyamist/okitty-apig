<template>
  <v-card flat width="40em">
    <v-card-title>
      Initiate Authentication (Demo Part 1/2)
    </v-card-title>
    <v-card-text>
      Github requires a
      <span class="font-weight-black">client_id</span> 
      to 
      <a href="https://docs.github.com/en/developers/apps/authorizing-oauth-apps"
      >authenticate</a>
      a Github application. For this demo, we'll need 
      a valid Github application client_id

      <details>
        <summary class="subtitle-1">
          <b>Step 1.</b> Configure your client_id
        </summary>
        <v-card class="pr-5">
          <v-card-text>
            <p>
            The Github application client_id is a public identifier
            for your application. It is normally
            coded into your own application.
            </p><p>
            For the demo, enter the client_id of your own application.
            </p>
            <v-text-field id="githubAppId"
              v-model="client_id"
              label="Github Application Client ID"
              hint="Enter the client_id for a trusted application"
            ></v-text-field>
          </v-card-text>
        </v-card>
      </details>

      <details>
        <summary class="subtitle-1">
          <b>Step 2. </b>Ask for Github Account
        </summary>
        <v-card class="pr-5">
          <v-card-text>
            <p>
            Your Github application will operate on behalf
            of a Github user account. Your application will
            therefore need to ask for
            a Github account username or email<sup>*</sup>. 
            </p>
            <v-text-field id="login"
              v-model="login"
              label="Github account name"
              hint="Enter new or existing Github account name"
            ></v-text-field>
            <sup>*</sup> If necessary, direct users to 
            <a href="https://docs.github.com/en/github/getting-started-with-github/signing-up-for-github">
              open a Github account
            </a>
          </v-card-text>
        </v-card>
      </details>

      <details v-if="login">
        <summary class="subtitle-1">
          <b>Step 3. </b>Initiate Github authentication
        </summary>
        <v-card class="pr-5">
          <v-card-text>
            <p>
            With the Github user account name, we
            can initiaite Github authentication.
            The Github authentication protocol requires 
            <ul>
            <li> <b>state</b> is usually a random number used for context.
              <v-text-field id="state"
                v-model="state"
                label="state"
              ></v-text-field>
            </li>
            <li> <b>redirect_uri</b> is required to handle
              the second step in the Github authentication protocol
              <v-text-field id="redirect_uri"
                v-model="redirect_uri"
                label="redirect_uri"
                hint="Enter your application Authorization callback URL"
              ></v-text-field>
            </li>
            </ul>
            </p>
            <p>
              We can now send the user to Github for authentication:
            </p>
            <div class="url"> {{loginUrl}}</div>
            <v-btn :href="loginUrl"
              raised dark color="green darken-2"
            >Login to Github</v-btn>
          </v-card-text>
        </v-card>
      </details>
    </v-card-text>
  </v-card>
</template>

<script>
import Vue from "vue";

export default {
  name: 'Login',

  props: {
  },
  data: () => {
    return {
      code: '',
      state: `${Math.random()}`,
      client_id: '',
      login: '',
      redirect_uri: "http://localhost:3000/code",
    }
  },
  methods: {
  },
  computed: {
    loginUrl() {
      var { login, client_id, state } = this;
      var parms = {
        client_id,
        redirect_uri: "http://localhost:3000/code",
        state,
        login,
      }; 
      var query = Object.keys(parms)
        .map(p=>`${p}=${encodeURIComponent(parms[p])}`)
        .join("&");
      return `https://github.com/login/oauth/authorize?${query}`;
    },
  },
  mounted() {
    var { query } = this.$route;
    console.log(`dbg mounted`, query);
    Vue.set(this, "code", query.code);
    
  },
  components: {
  },
}
</script>
<style >
details {
  margin-top: 0.5em;
}
.url {
  background: #eee;
  padding: 0.25em;
}
</style>
