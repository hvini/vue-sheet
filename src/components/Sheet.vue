<template>
    <v-app>
        <h5 class="pa-2" style="font-size: 1.64rem; line-height: 110%; font-weight: 400">Response</h5>
        <v-card class="pa-2" style="font-size: 1.2rem;" flat>
            <code style="font-size: 1em; display: block; overflow-x: auto; padding: 0.5em; background: rgb(240, 240, 240) none repeat scroll 0% 0%; color: rgb(68, 68, 68);">
            <section style="overflow-y: scroll; max-height: 300px;">
                <v-list-item style="margin-bottom: -15px;">
                <pre>
                    <span v-if="values != ''">{{ values }}</span>
                </pre>
                </v-list-item>
            </section>
            </code>
        </v-card>
    </v-app>
</template>
<script>
    export default {
        name: 'sheet',
        props: {
            values: {
                type: Array
            }
        }
    }
</script>
