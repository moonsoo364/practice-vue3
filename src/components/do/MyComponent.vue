<template>
 <h2 class="heading">I am {{ reversedMessage }}</h2>
 <input v-model="message" type="text" placeholder="Enter your name"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ReversedMessage',
  data() {
    return {
      message: '',
    }
  },
  computed:{
    reversedMessage(){
      return this.message.split('').reverse().join('')
    }
  },

  
})
</script>
