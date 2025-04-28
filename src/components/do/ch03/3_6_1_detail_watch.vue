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
// type User = {
//   name: string
//   age: number
//   address:{
//     street: string
//     country: string
//     zip: string
//   }
// }
type User = {
  name: string
  age: number
}
export default defineComponent({
  name: 'userWatcherComponent',
  data(): { user: User } {
    return {
      user: {
        name: 'John',
        age: 30,
      },
    }
  },
  watch: {
    'user.name': {
      //name 필드만 감시
      handler(newValue: string, oldValue: string) {
        console.log({ newValue, oldValue })
      },
    },
    // user: {
    //   handler(newValue: User, oldValue: User) {
    //     console.log({ newValue, oldValue })
    //   },
    //   deep: true,
    // },
  },
})
</script>
