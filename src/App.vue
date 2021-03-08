<template>
  <v-app>
    <Navbar/>
    <v-container>
      <v-form ref="form" v-model="valid">
          <v-col md="4">
            <v-text-field v-model="url" label="Url" :rules="urlRules" required></v-text-field>
          </v-col>
          <v-col md="4">
            <v-text-field v-model="sheetName" label="Sheet name" :rules="sheetNameRules" required></v-text-field>
          </v-col>
          <v-col md="4">
            <v-text-field v-model="range" label="Range" :rules="rangeRules" required></v-text-field>
          </v-col>
          <v-col md="4">
            <v-btn 
              :disabled="!valid"
              color="success"
              class="mr-4">Send
            </v-btn>
          </v-col>
      </v-form>
    </v-container>
  </v-app>
</template>
<script>
  import Navbar from '@/components/Navbar'

  export default {
    name: 'App',
    components: {
      Navbar
    },
    data: () => ({
      valid: true,
      url: '',
      urlRules: [
        v => !!v || 'Url is required'
      ],
      sheetName: '',
      sheetNameRules: [
        v => !!v || 'Sheet name is required'
      ],
      range: '',
      rangeRules: [
        v => !!v || 'Range is required'
      ]
    })
  };
</script>
