<template>
    <v-app id="app">
        <v-navigation-drawer></v-navigation-drawer>
        <v-toolbar></v-toolbar>
        <main>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </main>
        <v-footer></v-footer>
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

    main > .container
        min-height: 0 !important

</style>

<script>
  export default {
    metaInfo: {
      title: 'YSITD Cloud',
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },
      ],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  };
</script>
