<template>
    <v-navigation-drawer v-model="drawerToggle" fixed light app>
        <drawer-toolbar :photo="photo" :displayName="displayName"></drawer-toolbar>
        <v-list>
            <template v-for="link in links">
                <v-list-tile v-if="link.external" :key="link.href" :href="link.href" target="_blank">
                    <span>{{ link.display }}</span>
                    <v-spacer />
                    <v-icon>launch</v-icon>
                </v-list-tile>
                <v-list-tile v-else :key="link.display" :to="link.to">
                    <span>{{ link.display }}</span>
                </v-list-tile>
            </template>
            <v-divider></v-divider>
            <v-list-tile href="/auth/logout">Logout</v-list-tile>
        </v-list>
    </v-navigation-drawer>
</template>
<script>
    import { mapState, mapGetters } from 'vuex';
    import DrawerToolbar from './DrawerToolbar.vue';

    export default {
      components: {
        DrawerToolbar,
      },
      props: {
        drawer: {
          type: Boolean,
          requierd: true,
        },
      },
      computed: {
        drawerToggle: {
          get() {
            return this.drawer;
          },
          set(value) {
            this.$emit('update:drawer', value);
          },
        },
        ...mapState({
          displayName: state => state.user.displayName,
        }),
        ...mapGetters({
          photo: 'user/photo',
        }),
      },
      data() {
        return {
          links: [
            { to: { name: 'account.get' }, display: 'Account' },
            { href: 'https://health.ysitd.cloud/', external: true, display: 'Service Health' },
            { to: { name: 'app.list' }, display: 'App' },
          ],
        };
      },
    };
</script>
