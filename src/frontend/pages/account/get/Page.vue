<template>
    <v-flex xs12>
        <user-card v-if="ready" :avatarUrl="user.avatarUrl" :name="user.displayName" :username="user.username"></user-card>
        <v-progress-linear color="primary" v-else-if="!ready && !error" indeterminate></v-progress-linear>
        <error-card v-else-if="error !== null" :error="error"></error-card>
    </v-flex>
</template>

<script src="./script.js"></script>