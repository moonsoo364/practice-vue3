<script lang="ts" setup>
import { reactive } from 'vue'

const defaultIser ={
    name: 'maya',
    age: 20,
}

const user = reactive({...defaultIser})

user.name='Rachel'
user.age= 30

console.log(user.name) // Rachel
console.log(user.age) // 30
defaultIser.name = 'Samuel'

console.log(user);

</script>
