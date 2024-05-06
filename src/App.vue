<script setup>
import Header from './components/Header.vue'
import Playlist from './components/Playlist.vue'
</script>

<template>
    <v-layout class="rounded rounded-md">
        <Header />
        
        <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
        <v-container fluid>
            <Playlist />
        </v-container>
        </v-main>
    </v-layout>
</template>
