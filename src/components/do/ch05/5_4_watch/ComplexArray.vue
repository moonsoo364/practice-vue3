<template>
    <div>
        <h2>Watch User Name</h2>
        <p>Name: {{ user.name }}</p>
        <p>Age: {{ user.age }}</p>
        <button @click="user.name = 'newName'">Change Name</button>
        <button @click="user.age++">Increase Age</button>
    </div>
</template>
<script setup lang="ts">
import {reactive,watch} from 'vue'

interface User {
    name: string
    age: number
}

const user = reactive<User>({
    name: 'maya',
    age: 20,
})

watch(
    [() => user.name, () => user.age],
    ([newName, newAge], [oldName, oldAge]) => {
        console.log('name changed from', oldName, 'to', newName)
        console.log('age changed from', oldAge, 'to', newAge)
    },
    { immediate: true }
)

</script>
