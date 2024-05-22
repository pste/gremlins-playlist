<script setup>
// vue
import { defineEmits, defineProps, computed } from 'vue'
const props = defineProps({
    url: String,
    nowPlaying: String,
    text: String
});
const emits = defineEmits(['click'])

// *** computed
const isActive = computed(() => {
    return props.url && (props.nowPlaying === props.url)
})
</script>

<template>
    <v-icon icon="mdi-stop-circle-outline" class="clickable" color="primary" v-if="isActive === true"  @click="$emit('click')"></v-icon>
    <v-icon icon="mdi-play-circle-outline" class="clickable" v-else-if="url" @click="$emit('click')"></v-icon>
    <span :class="(isActive)?'text-primary':null">{{ text }}</span>
</template>

<style scoped>
.clickable {
    cursor:pointer;
}
</style>