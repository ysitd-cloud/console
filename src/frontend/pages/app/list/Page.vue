<template>
    <v-flex xs12>
        <app-list v-if="ready" :apps="apps"></app-list>
        <error-card v-if="error" :error="error"></error-card>
        <v-progress-linear v-if="!ready && !error" indeterminate></v-progress-linear>
    </v-flex>
</template>

<script src="./script.js"></script>
