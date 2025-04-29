<template>
  <div>
    <div>
      <label for="name"
        >Name:
        <input v-model="user.name" placeholder="Enter Your name" id="name" />
      </label>
    </div>
    <div>
      <label for="age"
        >Age:
        <input type="number" v-model="user.age" placeholder="Enter your age" id="age" />
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { WatchStopHandle} from 'vue'
type User = {
  name: string
  age: number
  address:{
    street: string
    city: string
    country: string
    zip: string
  }
}

export default defineComponent({
  name: 'userWatcherComponent',
  data(): { user: User; stopWatchingAddressCity?: WatchStopHandle } {
    return {
      user: {
        name: 'John',
        age: 30,
        address: {
          street: '123 main St',
          city: 'New York',
          country: 'USA',
          zip: '10001',
        }
      },
      stopWatchingAddressCity : undefined,//1
    }
  },
  created() {
    if(this.user.address){//2
      this.stopWatchingAddressCity = this.$watch(
        "user.address.city",
        (newValue: string, oldValue: string) =>{
          console.log({newValue, oldValue});
        }
      )
    }
  },
  beforeUnmount() {//3
    if(this.stopWatchingAddressCity){
      this.stopWatchingAddressCity();
    }
  },
})
</script>
