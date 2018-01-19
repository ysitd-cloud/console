<template>
    <v-flex xs12>
        <v-btn color="info" :to="{ name: 'app.list' }">
            <v-icon left>keyboard_arrow_left</v-icon>Back
        </v-btn>
        <v-btn @click="loadApp" :disabled="!ready" v-if="!error">
            <v-icon>cached</v-icon>Refresh
        </v-btn>
        <v-card v-if="ready && !error && app != null">
            <v-card-title>
                <h3 class="mb-0">{{ app.name }}</h3>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="pb-0">
                <p>
                    Image: <v-chip>{{ app.deployment.image }}:{{ app.deployment.tag }}</v-chip>
                </p>
                <p>
                    Network: <a :href="`http://${app.network.domain}`" target="_blank">{{ app.network.domain }}</a>
                </p>
            </v-card-text>
            <div class="pl-3">Environment</div>
            <v-data-table :headers="[ { text: 'Name', value: 'key', align: 'left' }, { text: 'Value', value: 'value', align: 'left' } ]" :items="app.environment" hide-actions>
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.key }}</td>
                    <td>
                        <hidable-text :content="props.item.value"></hidable-text>
                    </td>
                </template>
            </v-data-table>
        </v-card>
        <error-card v-if="error" :error="error"></error-card>
        <v-progress-linear v-if="!ready && !error" indeterminate></v-progress-linear>
    </v-flex>
</template>

<script src="./script.js"></script>
<style scoped src="./style.styl" lang="stylus"></style>
