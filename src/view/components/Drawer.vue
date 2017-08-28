<template>
    <v-navigation-drawer v-model="drawerToggle" persistent light>
        <v-toolbar flat class="transparent">
            <v-list class="pa-0">
                <v-list-tile>

                </v-list-tile>
            </v-list>
        </v-toolbar>
    </v-navigation-drawer>
</template>

<script>
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
      },
    };
</script>
