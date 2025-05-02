<template>
  <h2>With Modal components</h2>
  <button @click="openModal = true">Open Modal</button>
  <NoticeModal 
    :open="openModal" 
    title="Hello World" 
    @closeDialog="toggleModal"/>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import NoticeModal from '@/components/do/ch04/4_5_teleport_api/4_1_1_dialog/NoticeModal.vue'

  export default defineComponent({
    name: "TeleportComponent",
    components: {NoticeModal},
    data() {
      return{
        openModal: false,
      }
    },
    methods:{
      toggleModal(newValue: boolean){
        this.openModal = newValue;
      }
    }
  })
</script>

<style>

</style>