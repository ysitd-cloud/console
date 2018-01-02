<template>
    <v-flex xs12>
        <v-card v-if="ready">
            <v-card-title>
                <h3 class="mb-0">App</h3>
            </v-card-title>
            <v-list v-if="apps.length > 0">
                <v-list-tile v-for="app in apps" :key="app.id">
                    <v-list-tile-content>
                        <v-list-tile-title>{{ app.name }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
            <v-card-text v-else class="ml-2 mb-2">
                No app is created. Go and create one.
            </v-card-text>
        </v-card>
        <error-card v-if="error" :error="error"></error-card>
        <v-progress-linear v-if="!ready && !error" indeterminate></v-progress-linear>
    </v-flex>
</template>

<script src="./script.js"></script>
