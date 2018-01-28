<template>
    <div class="snack" :class="classes">
        <v-slide-y-reverse-transition>
            <div class="snack__content" v-if="display">
                <span class="white--text">{{ message }}</span>
                <v-progress-circular indeterminate color="white" v-if="display && current.type !== 'error'"></v-progress-circular>
            </div>
        </v-slide-y-reverse-transition>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'status-bar',
    data() {
      return {
        activeTimeout: {},
      };
    },
    computed: {
      classes() {
        return this.display ? ['snack--bottom', 'snack--multi-line', this.current.type] : [];
      },
      ...mapGetters({ current: 'process/current', display: 'process/display' }),
      message() {
        if (this.current) {
          return this.current.message;
        }
        return '';
      },
    },
  };
</script>