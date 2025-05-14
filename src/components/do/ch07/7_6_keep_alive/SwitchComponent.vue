<template>
    <div>
        <keep-alive max="1">
            <component :is="activeComp"/>
        </keep-alive>
        <div>
            <button @click="activeComp ='StepOne'" v-if="activeComp === 'StepTwo'">
                Go to Step Two
            </button>
            <button @click="activeComp ='StepTwo'" v-else>
                Go to Step One
            </button>
        </div>
    </div>
</template>
<script lang="ts" >
import { defineComponent } from 'vue';
import StepOne from '@/components/do/ch07/7_6_keep_alive/StepOne.vue'
import StepTwo from '@/components/do/ch07/7_6_keep_alive/StepTwo.vue'

export default defineComponent({
    components: { StepOne, StepTwo},
    data() {
      return {
        activeComp: "StepOne"
      }  
    },
})
</script>