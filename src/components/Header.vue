<script setup>
import logo from '@/assets/gremlins_logo.png'
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
    </v-app-bar>
</template>