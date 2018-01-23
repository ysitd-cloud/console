<template functional>
    <v-toolbar flat class="transparent">
        <v-list class="pa-0">
            <v-list-tile href="https://account.ysitd.cloud/" target="_blank">
                <v-list-tile-avatar>
                    <img :src="props.photo" />
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>{{ props.displayName }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-toolbar>
</template>
