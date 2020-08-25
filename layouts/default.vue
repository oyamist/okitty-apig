<template>
  <v-app>
    <script src="https://sdk.amazonaws.com/js/aws-sdk-2.738.0.min.js">
    </script>
    <v-app-bar dark fixed app>
      <v-btn icon href="/" class="mr-1">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      Github Application Authentication Demo
    </v-app-bar>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Package from '../package';

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
    version() {
      return Package.version;
    },
  },
  mounted () {
  },
  methods: {
  }

}
</script>
<style>
</style>
