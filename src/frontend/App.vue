<template>
    <v-app id="app" toolbar footer fill-height>
        <drawer :drawer.sync="drawer"></drawer>
        <v-toolbar class="primary" dark app>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>YSITD Cloud</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <main>
            <v-container fluid>
                <v-content>
                    <transition name="fade-transition">
                        <router-view></router-view>
                    </transition>
                </v-content>
            </v-container>
        </main>
        <v-footer class="primary" app>
            <span class="white--text">&copy; YSITD Cloud</span>
        </v-footer>
    </v-app>
</template>

<style lang="stylus">
    @import "../../node_modules/vuetify/src/stylus/settings/_colors.styl"
    $theme := {
        primary: #44A148
        accent: $cyan.lighten-2
        secondary: $indigo.darken-2
        info: $blue.base
        warning: $amber.base
        error: $red.base
        success: $green.base
    }
    @import "../../node_modules/vuetify/src/stylus/main.styl"

    ul.breadcrumbs
        justify-content: left
        border-bottom: 1px solid $grey.lighten-3

    main
        min-height 80vh
        background-color white
        > .container
            min-height: 0 !important
</style>

<script>
  import Drawer from './components/Drawer.vue';

  export default {
    components: {
      Drawer,
    },
    data() {
      return {
        drawer: false,
      };
    },
    metaInfo: {
      title: 'YSITD Cloud',
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },
        { rel: 'icon', sizes: '16x16', href: 'https://ysitd.cloud/logo-16x16.png' },
        { rel: 'icon', sizes: '32x32', href: 'https://ysitd.cloud/logo-32x32.png' },
      ],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui' },
        { name: 'theme-color', content: '#44A148' },
      ],
    },
  };
</script>
