<script lang="ts" setup>
import axios from 'axios'
import {ref} from 'vue'
type User ={
    name: string;
    bio: string;
    avatar_url: string;
    twitter_username: string;
    blog: string; 
}

type Error ={
    message: string;
}
const user = ref<User>()
const err =  ref<Error>()

// axios.get('https://api.github.com/users/mayashavin')
// .then(response=>{
//     user.value = response.data;
// })
//async, await
// async function getUser(){
//     const response = await axios.get('https://api.github.com/users/mayashavin');
//     user.value = response.data;
// }
// getUser();
//try catch
async function getUser1(){
    try{
        const response = await axios.get('https://api.github.com/users/mayashavin');
        user.value = response.data;
    }catch(error){
         err.value = { message: (error as Error).message };
    }

}
getUser1();
</script>
<template>
    <div class="user-profile" v-if="user">
        <img :src="user.avatar_url" :alt="`${user.name} Avatar`" width="200" />
        <div>
            <h1>{{ user.name }}</h1>
            <p>{{ user.bio }}</p>
            <p>Twitter : {{ user.twitter_username }}</p>
            <p>Blog: {{ user.blog }}</p>
        </div>
    </div>
    <div class="error" v-else-if="err">
        {{ err.message}}
    </div>
</template>