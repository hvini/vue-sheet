<template>
    <v-card class="card-code pa-2" flat>
        <h5 class="pa-2">Response</h5>
        <code>
            <section>
                <v-list-item>
                    <pre><span>{{ values }}</span></pre>
                </v-list-item>
            </section>
        </code>
    </v-card>
</template>
<script>
    export default {
        name: 'sheet',
        props: {
            values: {
                type: Object
            }
        }
    }
</script>
<style scoped>
    h5 {
        font-size: 1.64rem;
        line-height: 110%;
        font-weight: 400;
    }

    code {
        max-height: 75vh;
        font-size: 1em;
        display: block;
        overflow-x: auto;
        padding: 0.5em;
        background: rgb(240, 240, 240) none repeat scroll 0% 0%;
        color: rgb(68, 68, 68);
    }

    .card-code {
        font-size: 1.2rem;
        max-height: 100%;
    }
</style>
