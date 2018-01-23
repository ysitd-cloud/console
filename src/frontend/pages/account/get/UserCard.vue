<template>
    <v-card>
        <v-layout row>
            <v-flex xs12 md2 lg1>
                <img :src="avatarUrl" />
            </v-flex>
            <v-flex xs12 md8 lg11>
                <v-card-title class="pb-0">
                    <div class="headline mb-0">
                        <span class="bold">Name: </span>{{ name }}</div>
                </v-card-title>
                <v-card-text class="pt-1">
                    <div>
                        <span class="bold">Username: </span>{{ username }}</div>
                </v-card-text>
            </v-flex>
        </v-layout>
    </v-card>
</template>

<style scoped lang="stylus">
    img {
        min-height: 50px
    }
    .bold {
        font-weight: 500
    }
    .headline {
        font-weight: normal
    }
</style>

<script>
  export default {
    props: {
      name: {
        type: String,
        required: true,
      },
      avatarUrl: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
    },
  };
</script>
