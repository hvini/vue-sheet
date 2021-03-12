<template>
  <v-app>
    <Navbar></Navbar>
    <v-container fill-height fluid>
      <v-layout row wrap>
        <v-flex class="pa-2" xs12 md6>
          <v-card class="pa-2" flat>
            <v-form ref="form" v-model="valid" @submit.prevent="get">
              <v-row>
                <v-col cols="12" md="12">
                  <v-text-field v-model="posts.url" label="Url" :rules="urlRules" required></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="12">
                  <v-text-field v-model="posts.key" label="Api key" :rules="keyRules" required></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field v-model="posts.sheetName" label="Sheet name" :rules="sheetNameRules" required></v-text-field>
                </v-col>
                <v-col v-for="(input, index) in posts.ranges" :key="`rangeInput-${index}`" cols="12" md="6">
                  <v-text-field v-model="input.range" label="Range" :rules="rangeRules" required></v-text-field>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="ml-2" @click="addField(input, posts.ranges)">
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path fill="green" d="M11 11V7h2v4h4v2h-4v4h-2v-4H7v-2h4zm1 11C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"/>
                  </svg>
                  <svg v-show="posts.ranges.length > 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="ml-2" @click="removeField(index, posts.ranges)">
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path fill="#EC4899" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9.414l2.828-2.829 1.415 1.415L13.414 12l2.829 2.828-1.415 1.415L12 13.414l-2.828 2.829-1.415-1.415L10.586 12 7.757 9.172l1.415-1.415L12 10.586z"/>
                  </svg>
                </v-col>
              </v-row>
              <v-row>
                <v-col md="6">
                  <v-btn type="submit" :disabled="!valid" color="success" class="mr-4">Send</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card>
        </v-flex>
        <v-flex class="pa-2" xs12 md6>
          <Sheet :data=data></Sheet>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>
<script>
  import Navbar from '@/components/Navbar'
  import Sheet from '@/components/Sheet'
  import Api from '@/services/Api'
  import { db } from '@/firebase'

  const sheetCollection = db.collection('sheets');

  export default {
    name: 'App',
    components: {
      Navbar,
      Sheet
    },
    data: () => ({
      valid: true,
      urlRules: [
        v => !!v || 'Url is required'
      ],
      sheetNameRules: [
        v => !!v || 'Sheet name is required'
      ],
      keyRules: [
        v => !!v || "Key is required"
      ],
      rangeRules: [
        v => !!v || 'Range is required'
      ],
      posts: {
        url: null,
        sheetName: null,
        key: null,
        ranges: [{range: null}]
      },
      data: {},
    }),
    methods: {
      addField(value, fieldType) {
        fieldType.push({ value: "" });
      },
      removeField(index, fieldType) {
        fieldType.splice(index, 1);
      },
      nestedArrayToObj(data) {
        let keys = data.shift();
        let convertedData = data.map(function(row) {
          return keys.reduce(function(obj, key, i) {
            obj[key] = row[i];
            return obj;
          }, {});
        });
        return convertedData;
      },
      async save(data) {
        try {
          await sheetCollection.add({'values': data});
        } catch (error) {
          console.log(JSON.stringify(error));
        }
      },
      get() {
        let spreadsheetId = new RegExp("/spreadsheets/d/([a-zA-Z0-9-_]+)").exec(this.posts.url)[1];
        if(this.posts.ranges.length == 1) {
          Api.SingleGet(this.posts.key, spreadsheetId, this.posts.sheetName, this.posts.ranges, sheets => {
            this.data = sheets.data;
            this.save(this.nestedArrayToObj(this.data.values));
          });
        } else {
          Api.BatchGet(this.posts.key, spreadsheetId, this.posts.sheetName, this.posts.ranges, sheets => {
            let valueRanges = {};
            
            this.data = sheets.data;
            for(let i = 0; i < this.data.valueRanges.length; i++) {
              valueRanges[i] = this.nestedArrayToObj(this.data.valueRanges[i].values);
            }

            this.save(valueRanges);
          });
        }
      },
    }
  };
</script>
<style scoped>
  svg {
    cursor: pointer;
  }
</style>