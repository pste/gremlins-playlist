<script setup>
import moment from 'moment'
import { ref, computed, watch, onMounted } from 'vue'
const emits = defineEmits(['setclock'])

const props = defineProps({
    initialHours: { type: Number, default: 22 },
    initialMinutes: { type: Number, default: 0 },
});

const hours = ref(props.initialHours)
const minutes = ref(props.initialMinutes)

// *** watches (to init the component from the parent)
watch(() => props.initialHours, (val) => { hours.value = val; })
watch(() => props.initialMinutes, (val) => { minutes.value = val; })

// *** computed
const fullTime = computed(() => {
    return moment.duration({
        seconds: 0,
        minutes: minutes.value,
        hours: hours.value
    });
})

// *** watch
watch(fullTime, (newVal, oldVal) => {
    emits('setclock', fullTime.value);
})

// *** init
onMounted(() => {
    emits('setclock', fullTime.value);
})
</script>

<template>
    <div class="timeclock">
        <v-icon icon="mdi-clock-outline" class="timeclock-icon" />
        <span class="timeclock-label">Start At</span>
        <v-text-field
            v-model="hours"
            type="number"
            label="hh"
            density="compact"
            variant="outlined"
            hide-details
            :min="0"
            :max="23"
            class="timeclock-field"
        />
        <span class="timeclock-sep">:</span>
        <v-text-field
            v-model="minutes"
            type="number"
            label="mm"
            density="compact"
            variant="outlined"
            hide-details
            :min="0"
            :max="59"
            class="timeclock-field"
        />
    </div>
</template>

<style scoped>
.timeclock {
    display: flex;
    align-items: center;
    gap: 8px;
    padding-bottom: 2px;
}

.timeclock-icon {
    opacity: 0.7;
}

.timeclock-label {
    font-size: 0.8rem;
    opacity: 0.6;
    white-space: nowrap;
}

.timeclock-field {
    width: 85px;
}

.timeclock-sep {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 2px;
    opacity: 0.8;
}
</style>
