<template functional>
    <v-card>
        <v-card-title>
            <h3 class="mb-0">App</h3>
        </v-card-title>
        <v-divider></v-divider>
        <v-list v-if="props.apps && props.apps.length > 0">
            <v-list-tile v-for="app in props.apps" :key="app.id" :to="{name: 'app.get', params: { id: app.id } }">
                <v-list-tile-content>
                    <v-list-tile-title>{{ app.name }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
        <v-card-text v-else class="ml-2 mb-2">
            No app is created. Go and create one.
        </v-card-text>
    </v-card>
</template>
