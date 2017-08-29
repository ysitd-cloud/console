<template>
    <v-layout column>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card flat>
                    <v-card-title primary-title>
                        <div class="headline">Welcome, {{ displayName }}</div>
                    </v-card-title>
                </v-card>
            </v-flex>
        </v-layout>
    </v-layout>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
      computed: mapState({
        displayName: state => state.user.displayName,
      }),
    };
</script>
