<template>
    <v-card>
        <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0">Error Occur</h3>
                <div class="red--text">{{ error }}</div>
            </div>
        </v-card-title>
    </v-card>
</template>

<script>
  export default {
    name: 'error-card',
    props: {
      error: {
        type: String,
        required: true,
      },
    },
  };
</script>
