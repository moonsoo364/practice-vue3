<template>
 <h2 class="heading">I am {{ message }}</h2>
 <input v-model="message" type="text" placeholder="Enter your name"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'MyFirstComponent',
  data() {
    return {
      message: '',
    }
  },
  setup() {
    console.log('setup hook triggered!');
    return {};
  },
  beforeCreate() {
    console.log("beforeCreate hook triggered!");
  },
  created(){
    console.log('created hook triggered');
  },
  beforeMount(){
    console.log('beforeMount hook triggered');
  },
  mounted() {
    console.log('mounted hook triggered');
  }
})
</script>
