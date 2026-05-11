<script setup>
import moment from 'moment'
import { ref, computed, onMounted } from 'vue'
const emits = defineEmits(['setclock'])

const minutes = ref(0)
const hours = ref(22)

// *** computed
const fullTime = computed(() => {
    return moment.duration({
        seconds: 0,
        minutes: minutes.value,
        hours: hours.value
    });
})

onMounted(() => {
    emits('setclock', fullTime);
})
</script>

<template>
    <v-container style="max-width:344px; text-align: left;">
        <v-row>
            <v-label text="Start At"></v-label>
            <v-text-field label="hh" v-model="hours" type="number" width="30" @update:model-value="$emit('setclock', fullTime)"></v-text-field>
            :
            <v-text-field label="mm" v-model="minutes" type="number" width="30" @update:model-value="$emit('setclock', fullTime)"></v-text-field>
        </v-row>
    </v-container>
</template>