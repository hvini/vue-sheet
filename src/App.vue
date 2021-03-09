<template>
  <v-app>
    <Navbar/>
    <v-container class="my-5">
      <v-layout row wrap>
        <v-flex xs12 md6>
          <v-card class="pa-2" flat>
            <v-form ref="form" v-model="valid">
                <v-col md="auto">
                  <v-text-field v-model="url" label="Url" :rules="urlRules" required></v-text-field>
                </v-col>
                <v-col md="auto">
                  <v-text-field v-model="sheetName" label="Sheet name" :rules="sheetNameRules" required></v-text-field>
                </v-col>
                <v-col md="auto">
                  <v-text-field v-model="range" label="Range" :rules="rangeRules" required></v-text-field>
                </v-col>
                <v-col md="auto">
                  <v-btn 
                    :disabled="!valid"
                    color="success"
                    class="mr-4">Send
                  </v-btn>
                </v-col>
            </v-form>
          </v-card>
        </v-flex>
        <v-flex xs12 md6>
          <h5 class="pa-2" style="font-size: 1.64rem; line-height: 110%; font-weight: 400">Response</h5>
          <v-card class="pa-2" style="font-size: 1.2rem;" flat>
            <code style="font-size: 1em; display: block; overflow-x: auto; padding: 0.5em; background: rgb(240, 240, 240) none repeat scroll 0% 0%; color: rgb(68, 68, 68);">
              <section style="overflow-y: scroll; max-height: 300px;">
                <pre style="white-space: pre-line;">
                  {
                    <v-list-item v-for="index in 10" :key="index" style="margin-bottom: -15px;">
                      <pre style="white-space: nowrap;">
                        <span>"id":</span> <span style="color: rgb(136, 0, 0);" v-if="index < 10">"{{ index }}",</span> <span style="color: rgb(136, 0, 0);" v-if="index == 10">"{{ index }}"</span>
                      </pre>
                    </v-list-item>
                  }
                </pre>
              </section>
            </code>
          </v-card>
        </v-flex>
      </v-layout>
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
