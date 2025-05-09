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

async function getUser1(){
    try{
        const response = await axios.get('https://api.github.ocm/users/mayashavin');
        user.value = response.data;
    }catch(error){
         err.value = { message: (error as Error).message };
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