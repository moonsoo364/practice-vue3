<script lang="ts" setup>
import {reactive} from 'vue';

const user = reactive({
    name:"",
    age: 0,
});
//Property 'value' does not exist on type '{ name: string; age: number; }'.Vetur(2339)
user.value={
    name:"Rachel",
    age: 30,
};
//Cannot assign to 'user' because it is a constant.ts-plugin(2588)
user={
    name:"Rachel",
    age: 30,
}
user.name="Rachel";
user.age= 30;

</script>