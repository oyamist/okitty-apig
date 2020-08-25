<template>
  <v-card flat width="40em">
    <v-card-title>
      Authorization callback URL
      (Demo Part 2/2)
    </v-card-title>
    <v-card-text>
      <p>
      The user has granted application access to their Github account.
      We now need to authenticate the applicaton itself given:
      <ul>
      <li><b>state:</b> {{state}} is the random number we generated 
        earlier.
      </li>
      <li><b>code:</b> {{code}} is a code that we need to exchange 
        for an actual authentication token
      </li>
      </ul>
      </p>

      The application service that converts a Github authentication code
      into a Github authentication token needs a <i>client_id</i> and
      a <i>client_secret</i>. Typically, these values are configured
      using encrypted environment variables. For the demo, we will
      enter them in plain text.

      <details width="35em">
        <summary>
          <b>Step 1.</b> Configure Application Client ID
        </summary>
        <v-card>
          <v-card-text>
            <p>
            To authenticate our application, we'll need the 
            Application <b>Client Secret</b>, which we did NOT 
            send with the initial authentication request.
            For security, the originating application code
            will typically not have the Client Secret.
            Instead the Client Secret is secured within 
            the server that has the Authorization callback URL.
            </p>
            Once again, we need the client_id, so just re-enter
            the <i>same client_id</i> because we did not store it:
            <v-text-field id="githubAppId"
              v-model="client_id"
              label="Github Application Client ID"
              hint="Re-enter the client_id"
            ></v-text-field>
          </v-card-text>
        </v-card>
      </details>

      <details width="35em">
        <summary>
          <b>Step 2.</b> Configure Application Client Secret
        </summary>
        <v-card>
          <v-card-text>
            This is not a secure website. Enter a RANDOM string.
            <v-alert type="error" >
              DO NOT ENTER A VALID CLIENT SECRET. 
            </v-alert>
            <v-text-field id="client_secret"
              v-model="client_secret"
              label="Github Application Client Secret"
              hint="First enter an invalid secret to see what happens"
            ></v-text-field>
          </v-card-text>
        </v-card>
      </details>

      <details width="35em">
        <summary>
          <b>Step 3.</b> Configure redirect url
        </summary>
        <v-card>
          <v-card-text>
            <p>
              The <b>redirect_uri</b> will receive the Github
              authentication token that lets the application update
              a Github repositor on behalf of the Github user.
            </p>
            <v-text-field id="redirect_uri"
              v-model="redirect_uri"
              label="redirect_uri"
            ></v-text-field>

          </v-card-text>
        </v-card>
      </details>

      <details width="35em">
        <summary>
          <b>Step 4.</b> Configure access_token URL
        </summary>
        <v-card>
          <v-card-text>
            <p>
              The <b>redirect_uri</b> will receive the Github
              authentication token that lets the application update
              a Github repositor on behalf of the Github user.
            </p>
            <v-radio-group v-model="accessUrl">
              <v-radio 
                :label="`${accessUrls.github} \u2b95 CORS error`"
                :value="`${accessUrls.github} (lambda test)`"
                />
              <v-radio 
                :label="accessUrls.localhost3100"
                :value="accessUrls.localhost3100"
            />
            </v-radio-group>

          </v-card-text>
        </v-card>
      </details>

      <v-btn 
        raised dark color="green darken-2 mt-3"
        @click="postCode()"
      >Request Access Token</v-btn>
      <v-alert type="error" v-if="error" class="mt-3">
        {{error.message}}
        <div>
          Check browse console for a
          <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS"
            style="color: white"
            >
            CORS error
          </a>
        </div>
      </v-alert>
    </v-card-text>
  </v-card>
</template>

<script>
import Vue from "vue";
const axios = require("axios");

const ACCESSURLS = {
  github: `https://github.com/login/oauth/access_token`,
  localhost3100: `http://localhost:3100/lambda`,
};

export default {
  name: 'Login',

  props: {
  },
  data: () => {
    return {
      code: '',
      state: '',
      accessUrl: ACCESSURLS.github,
      client_id: '',
      client_secret: '',
      redirect_uri: "http://localhost:3000/code",
      login: '',
      error: '',
    }
  },
  methods: {
    postCode() {
      var that = this;
      var { 
        client_id, 
        client_secret,
        redirect_uri,
        accessUrl,
        state,
        code,
      } = that;
      var data = {
        client_id,
        client_secret,
        redirect_uri,
        state,
        code,
      };
      (async function() { try {
          var config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          };
          var res = await axios.post(accessUrl, data, config);
          console.log(`postCode()`, accessUrl, res);
        } catch(e) {
          Vue.set(that, "error", e);
          console.error(e);
        }
      })();
    },
  },
  computed: {
    accessUrls() { 
      return ACCESSURLS;
    },
  },
  mounted() {
    var { query } = this.$route;
    console.log(`dbg mounted`, query);
    Vue.set(this, "code", query.code);
    Vue.set(this, "state", query.state);
    
  },
  components: {
  },
}
</script>
<style >
details {
  margin-top: 0.5em;
}
</style>
