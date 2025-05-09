<script lang="ts" setup>
import { onBeforeMount, onMounted, onUpdated, ref } from 'vue';
import axios from 'axios';
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
const loading = ref<boolean>()

async function getUser1(){
  loading.value = true;
    try{
        const response = await axios.get('https://api.github.com/users/mayashavin');
        user.value = response.data;
        console.log(user.value?.name)
        
    }catch(error){
         err.value = { message: (error as Error).message };
    }finally{
      loading.value = false
    }

}

onBeforeMount(async()=> {
    console.log('created');
    getUser1();
})
onMounted(()=>{
    console.log('mounted');   
})
onUpdated(()=>{
    console.log('updated');
})

</script>
<template>
    <div v-if="loading">
      Loading...
    </div>
    <div class="user-profile" v-else-if="user">
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