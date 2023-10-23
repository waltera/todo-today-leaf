import { defineStore } from 'pinia';
import { Task } from 'src/components/models';
import { ref } from 'vue';
import { useTaskStore } from './task-store';

export const useTodoTodayStore = defineStore('todoToday', () => {
  const taskStore = useTaskStore()

  const startedAt = ref<Date>(new Date())
  const finishedAt = ref()
  const tasks = ref<Array<Task>>([])

  function reset() {
    startedAt.value = new Date()
    finishedAt.value = null
    tasks.value = []
  }

  function saveTask(task: Task, description: string, totalPomodoros: number) {
    taskStore.saveTask(task, description, totalPomodoros)

    if (!task.id) {
      task.id = tasks.value.length + 1
      tasks.value.push(task)
    }
  }

  function removeTask(task: Task) {
    const taskIndex = tasks.value.findIndex(internalTask => internalTask.id == task.id)
    if (taskIndex > -1) {
      tasks.value.splice(taskIndex, 1)
    }
  }

  return { startedAt, finishedAt, tasks, saveTask, removeTask, reset }
},
{
  persist: true
})
