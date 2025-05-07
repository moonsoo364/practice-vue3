<script lang="ts" setup>
import {reactive} from 'vue';

const user = reactive({
    name:"",
    age: 0,
});


user.name="Rachel";
user.age= 30;

</script>