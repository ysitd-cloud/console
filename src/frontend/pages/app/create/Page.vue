<template>
    <v-flex xs12>
        <v-form @submit="() => false">
            <div class="headline mt-2 mb-3 mx-1">Create Application</div>

            <v-card class="mb-2">
                <v-card-title class="pb-0">
                    <div>Metadata</div>
                </v-card-title>
                <v-card-text class="pt-0">
                    <v-layout row>
                        <v-flex xs12 md8>
                            <v-text-field label="Name" id="name" v-model="app.name" required></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>

            <v-card class="mb-2">
                <v-card-title class="pb-0">
                    <div>Deployment</div>
                </v-card-title>
                <v-card-text class="pt-0">
                    <v-layout row>
                        <v-flex xs12 md6 lg3 xl2>
                            <v-text-field label="Image" id="image" v-model="app.deployment.image" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 md6 lg3 xl2 class="ml-1">
                            <v-text-field label="Tag" id="tag" v-model="app.deployment.tag" required></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>

            <v-card class="mb-2">
                <v-card-title class="pb-0">
                    <div>Network</div>
                </v-card-title>
                <v-card-text class="pt-0">
                    <v-layout row>
                        <v-flex xs12 md8>
                            <v-text-field label="Domain" id="domain" v-model="app.network.domain" required></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>

            <v-card class="mb-2">
                <v-card-title class="pb-0">
                    <div>Environment</div>
                </v-card-title>
                <v-card-text class="py-0">
                    <v-layout row v-for="(env, i) in app.environment" :key="i">
                        <v-flex xs12 md6 lg3 xl2>
                            <v-text-field label="Name" v-model="env.key" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 md6 lg3 xl2 class="ml-1">
                            <v-text-field label="Value" v-model="env.value" required></v-text-field>
                        </v-flex>
                        <v-btn icon class="red--text mb-0 mt-3" @click="() => removeEnv(i)">
                            <v-icon>remove_circle_outline</v-icon>
                        </v-btn>
                    </v-layout>
                </v-card-text>
                <v-card-actions class="py-0">
                    <v-btn icon class="green--text" @click="addEnv">
                        <v-icon>add_circle_outline</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>

            <v-layout row>
                <v-flex xs12>
                    <v-btn color="primary" type="submit">
                        <v-icon left>unarchive</v-icon>
                        Deploy
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-form>
    </v-flex>
</template>

<script src="./script.js"></script>

<!--<style scoped lang="stylus" ></style>-->