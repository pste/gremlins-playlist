<script setup>
import { useTheme } from 'vuetify'
import logo from '@/assets/gremlins_logo.png'

const theme = useTheme()

function switchTheme() {
    theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}
</script>

<template>
    <v-app-bar>
        <template v-slot:prepend>
            <v-img
                :src="logo"
                width="100px" 
                height="100px"
            ></v-img>
        </template>

        <v-app-bar-title>Gremlins Playlist Generator</v-app-bar-title>

        <template v-slot:append>
            <v-btn
                @click="switchTheme"
                icon="mdi mdi-theme-light-dark"
            ></v-btn>
        </template>
    </v-app-bar>
</template>