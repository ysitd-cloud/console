<template>
    <v-navigation-drawer v-model="drawerToggle" persistent light app>
        <v-toolbar flat class="transparent">
            <v-list class="pa-0">
                <v-list-tile href="https://account.ysitd.cloud/" target="_blank">
                    <v-list-tile-avatar>
                        <img :src="photo" />
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>
                            {{ displayName }}
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-toolbar>
        <v-list>
            <v-list-tile href="https://account.ysitd.cloud/" target="_blank">
                Account <v-icon>launch</v-icon>
            </v-list-tile>
            <v-list-tile href="/auth/logout">
                Logout
            </v-list-tile>
            <v-divider></v-divider>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    import { mapState, mapGetters } from 'vuex';

    export default {
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
    };
</script>
