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
import { defineComponent, ref } from 'vue'
import draggable from 'vuedraggable'

defineComponent({
    components: {
      draggable,
    },
})

//
import fulllist from '@/assets/songs.json' 
const songs = ref(fulllist.map(elem => {
    elem.active = true
    return elem
}));
/*
function renderTime( secs ) {
    return secs // moment.duration('00'secs).humanize();
}*/
</script>

<template>
    <v-list density="compact" >
        <v-list-subheader>CASALE</v-list-subheader>

        <!--<draggable v-model="songs" 
                    item-key="title"
                    style="min-height: 10px">
            <template #item="{element}">
            <v-list-item>
                -->
                
                <v-list-item  v-for="(element, i) in songs" :key="i">
                    <template v-slot:prepend>
                        <v-icon icon="mdi-check-circle" 
                            color="primary"
                        ></v-icon>
                        <!--<v-list-item-action start>
                            <v-switch :model-value="active" color="primary" ></v-switch>
                        </v-list-item-action>-->
                    </template>

                    {{ element.title }} ({{element.duration}})
                </v-list-item>
            <!--</template>
        </draggable>-->
    </v-list>
</template>

<style scoped>
.v-list-item {
    cursor:pointer;
}
</style>