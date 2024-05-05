<script setup>
/*import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'*/

// libs
import moment from 'moment'
// vue
import { defineComponent, computed, ref, toRaw } from 'vue'
import draggable from 'vuedraggable'

defineComponent({
    components: {
      draggable,
    },
})

// init
import fulllist from '@/assets/songs.json'
fulllist.forEach(elem => {
    elem.active = true;
});

// data
const activeSongs = ref(fulllist);
const inactiveSongs = ref([]);
const deadTimeSecs = ref(30)

// methods
function add( idx ) {
    let rm = inactiveSongs.value.splice(idx, 1);
    activeSongs.value.push(rm[0]);
}

function toggle( idx ) {
    let rm = activeSongs.value.splice(idx, 1);
    inactiveSongs.value.push(rm[0]);
}

// computed
const totalTime = computed(() => {
    let secs = activeSongs.value.reduce((acc, elem) => {
        let song = toRaw(elem);
        let time = (song.duration.length === 4) ? "00:0"+song.duration : "00:"+song.duration; // to have this fmt: 00:04:35
        return acc + moment.duration(time).as('seconds') + deadTimeSecs.value
    }, 0);
    return moment.utc(secs * 1000).format("HH:mm:ss")// 'aaa' + moment.utc(moment.duration(secs * 1000)).format("HH:mm:ss")
})
</script>

<template>
    <v-slider
        v-model="deadTimeSecs"
        :max="120"
        :min="5"
        :step="5"
        thumb-label
        prepend-icon="mdi-clock-outline"
    ></v-slider>

    <v-list density="compact" >
        <v-list-subheader>CASALE {{ totalTime }}</v-list-subheader>

        <draggable v-model="activeSongs" 
                    item-key="title"
                    style="min-height: 10px">
            <template #item="{ element, index }">
            <v-list-item>
                <!--<v-list-item  v-for="(element, i) in songs" :key="i">-->
                    <template v-slot:prepend>
                        <v-icon icon="mdi-check-circle" 
                            color="primary"
                            @click="toggle(index)"
                        ></v-icon>
                    </template>

                    {{ element.title }} ({{element.duration}})
                </v-list-item>
            </template>
        </draggable>
    </v-list>

    <v-list density="compact" >
        <v-list-item v-for="(element, index) in inactiveSongs" :key="index">
            <template v-slot:prepend>
                        <v-icon icon="mdi-check-circle" 
                            @click="add(index)"
                        ></v-icon>
            </template>
            {{ element.title }} ({{element.duration}})
        </v-list-item>
    </v-list>
</template>

<style scoped>
.v-list-item {
    cursor:pointer;
}
</style>