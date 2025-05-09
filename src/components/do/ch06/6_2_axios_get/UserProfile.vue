<script lang="ts" setup>
import axios from 'axios'
import {ref} from 'vue'

const user = ref(null)
const err = ref(null)

axios.get('https://api.github.ocm/users/mayashavin')
.then(response=>{
    user.value = response.data;
})
//async, await
async function getUser(){
    const response = await axios.get('https://api.github.ocm/users/mayashavin');
    user.value = response.data;
}
getUser();
//try catch
async function getUser1(){
    try{
        const response = await axios.get('https://api.github.ocm/users/mayashavin');
        user.value = response.data;
    }catch(error){
        err.value = error;
    }

}
getUser();
</script>