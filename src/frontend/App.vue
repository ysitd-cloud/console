<template>
    <v-app id="app" toolbar footer fill-height>
        <drawer :drawer.sync="drawer"></drawer>
        <v-toolbar class="primary" dark app>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>YSITD Cloud</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-content>
            <v-container fluid>
                <transition name="fade-transition">
                    <router-view></router-view>
                </transition>
            </v-container>
        </v-content>
        <v-footer class="primary" app>
            <span class="white--text">&copy; YSITD Cloud</span>
        </v-footer>
        <status-bar></status-bar>
    </v-app>
</template>

<style lang="stylus">
    @import "../../node_modules/vuetify/src/stylus/main.styl"

    ul.breadcrumbs
        justify-content: left
        border-bottom: 1px solid $grey.lighten-3
</style>

<script src="./script.js"></script>
