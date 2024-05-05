<script setup>
import logo from '@/assets/gremlins_logo.png'
</script>

<template>
    <v-card>
        <v-img
            :src="logo"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            width="125px" 
            height="125px"
        >
            <v-card-title class="text-white" text="Gremlins"></v-card-title>
        </v-img>

            
        <v-card-text>
            <div>Gremlins Playlist</div>
        </v-card-text>
    </v-card>
</template>