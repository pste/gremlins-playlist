<script setup>
// libs
import moment from 'moment'
// vue
import { defineComponent, computed, ref, toRaw, isReactive } from 'vue'
import draggable from 'vuedraggable'

defineComponent({
    components: {
      draggable,
    },
})

// *** init
import fulllist from '@/assets/songs.json'
fulllist.forEach(elem => {
    elem.active = true;
});

// *** data
const activeSongs = ref([]);
const inactiveSongs = ref([]);
const deadTimeSecs = ref(30);
const openSnackCopied = ref(false);
const expandDetails = ref(false);

// *** methods
function sortSongs(arr) {
    arr.sort((a,b) => {
        return a.title > b.title
    });
    return arr;
}

function add( idx ) {
    let rm = inactiveSongs.value.splice(idx, 1);
    //console.log('add ' + idx + ' ' + rm[0])
    activeSongs.value.push(rm[0]);
}

function toggle( idx ) {
    let rm = activeSongs.value.splice(idx, 1);
    //console.log('toggle ' + idx + ' ' + rm[0]);
    inactiveSongs.value.push(rm[0]);
    inactiveSongs.value = sortSongs(inactiveSongs.value);
}

// read the querystring to get and load a playlist
function loadPlaylist() {
    let urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('playlistid')) {
        let items = urlParams.get('playlistid').match(/.{1,2}/g); // get param value + split every 2 chars
        let ids = items.map( hexid => Number("0x"+hexid));
        //console.log(items)
        // reset and reload
        activeSongs.value = [];
        inactiveSongs.value = [];
        ids.forEach( id => {
            let idx = fulllist.findIndex(el => el.id === id);
            if (idx >= 0) {
                let rm = fulllist.splice(idx, 1);
                activeSongs.value.push(rm[0]);
            }
        })
        inactiveSongs.value = sortSongs(fulllist);
        //console.log("inactive loaded " + inactiveSongs.value.length);
        //console.log("active loaded " + activeSongs.value.length);
    }
    else {
        activeSongs.value = fulllist;
    }
}

// converts a number to a 2 digits hex string value
function toHex( x ) {
    let rtn = x.toString(16);
    if (rtn.length === 1) {
        return '0' + rtn;
    }
    else {
        return rtn
    }
}

// copy to clipboard
function copyToClipboard() {
    navigator.clipboard.writeText(playlistId.value);
    openSnackCopied.value = true;
}

// *** computed
const totalTime = computed(() => {
    let secs = activeSongs.value.reduce((acc, song) => {
        let duration = isReactive(song)? toRaw(song).duration : song.duration;
        let time = (duration.length === 4) ? "00:0"+duration : "00:"+duration; // to have this fmt: 00:04:35
        return acc + moment.duration(time).as('seconds') + deadTimeSecs.value
    }, 0);
    return moment.utc(secs * 1000).format("HH:mm:ss");
})

const playlistId = computed(() => {
    return activeSongs.value.reduce((acc, song) => {
        let id = isReactive(song)? toRaw(song).id : song.id;
        return acc + toHex(id);
    }, '');
})

//
loadPlaylist();
</script>

<template>
    <v-snackbar
      :timeout="2000"
      color="success"
      v-model="openSnackCopied"
    >
      Content <strong>copied</strong> to clipboard!
    </v-snackbar>

    <v-text-field 
        readonly 
        variant="outlined" 
        :model-value="playlistId"
        prepend-icon="mdi-content-copy"
        @click:prepend="copyToClipboard"
        label="id"
    ></v-text-field>

    <v-slider
        v-model="deadTimeSecs"
        :max="120"
        :min="5"
        :step="5"
        :label="'song idle time ('+deadTimeSecs+' sec)'"
        prepend-icon="mdi-clock-outline"
    ></v-slider>

    <v-toolbar color="deep-purple-lighten-1" density="compact" >
        <v-btn 
                icon="mdi-arrow-expand"
                @click="expandDetails=!expandDetails"
                :color="(expandDetails)?'primary':null"
        ></v-btn>
        <v-toolbar-title>
            Playlist Duration {{ totalTime }} ({{activeSongs.length}} brani)
        </v-toolbar-title>
    </v-toolbar>

    <v-list density="compact" >
        <draggable v-model="activeSongs" 
                    item-key="id"
                    style="min-height: 10px">
            <template #item="{ element, index }">
            <v-list-item class="active">
                    <template v-slot:prepend>
                        <v-icon icon="mdi-check-circle" 
                            color="primary"
                            @click="toggle(index)"
                        ></v-icon>
                    </template>
                    
                    <v-row>
                        <v-col>#{{ index }} - {{ element.title }} ({{element.duration}})</v-col>
                        <v-col v-if="expandDetails">{{ element.intro }}</v-col>
                    </v-row>
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
.v-list-item.active {
    cursor:pointer;
}
</style>