<template>
    <v-flex xs12>
        <v-card v-if="ready">
            <v-list>
                <v-list-tile v-for="app in apps" :key="app.id">
                    <v-list-tile-content>
                        <v-list-tile-title>{{ app.name }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-card>
        <error-card v-if="error" :error="error"></error-card>
        <v-progress-linear v-if="!ready && !error" indeterminate></v-progress-linear>
    </v-flex>
</template>

<script src="./list.js"></script>
