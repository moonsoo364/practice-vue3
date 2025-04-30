<template>
  <div>
    <ul>
      <li v-for="(task,index) in tasks" :key="task.id" ref="tasksRef">
        {{ title }} {{ index }} : {{ task.description }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import type { Task } from '@/ts_class/Task'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TaskListComponent',
  data() : {tasks: Task[],title: string}{
    return {
      tasks: [
        {id: 'task01', description: 'Buy Groceries'},
        {id: 'task02', description: 'Do laundry'},
        {id: 'task03', description: 'Watch Moonknight'},
      ],
      title: 'Task'
    };
  }
})
</script>
