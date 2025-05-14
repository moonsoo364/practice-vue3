<template>
  <component :is="myComp" />
</template>

<script lang="ts">
import HelloWorld from '@/components/do/ch07/7_5_component/HelloWorld.vue'
import { defineComponent } from 'vue';
export default defineComponent({
    data() {
        return{
            myComp:{
                template: '<div>Hello'
            }
        }
    },
});
</script>