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
    </v-app>
</template>

<style lang="stylus">
    @import "../../node_modules/vuetify/src/stylus/main.styl"

    ul.breadcrumbs
        justify-content: left
        border-bottom: 1px solid $grey.lighten-3
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
