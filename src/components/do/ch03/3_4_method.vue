<template>
 <h2 class="heading">I am {{ reversedMessage(message) }}</h2>
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
  methods:{
    reverse(message: string):string[]{
      return message.split('').reverse()
    },
    arrToString(arr: string[]):string{
      return arr.join('')
    },
    reversedMessage(message : string):string {
      return this.arrToString(this.reverse(message))
    }
  }
  
})
</script>
