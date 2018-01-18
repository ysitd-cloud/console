<template>
    <span>
        <v-icon @click="display = !display">{{ icon }}</v-icon>
        {{ text }}
    </span>
</template>

<script>
  export default {
    name: 'hidable-text',
    data() {
      return {
        display: false,
      };
    },
    props: {
      content: {
        required: true,
      },
    },
    computed: {
      icon() {
        return this.display ? 'visibility_off' : 'visibility';
      },
      text() {
        return this.display ? this.content : 'Click to display';
      },
    },
  };
</script>

<style scoped lang="stylus">
    i.material-icons.icon {
        cursor: pointer
    }
</style>
