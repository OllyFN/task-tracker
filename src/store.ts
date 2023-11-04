import { writable } from 'svelte/store'
import { browser } from "$app/environment"
import {type TaskData, TaskClass} from './types/Task'

// Loading tasks from localstorage
const storedTasks = (browser && JSON.parse(localStorage.getItem('tasks')!)) ?? []
let latestTaskID = (!browser || storedTasks.length==0) ? 0 : storedTasks[storedTasks.length-1].id
export const tasks = writable<TaskData[]>(storedTasks);

// Subscribing to tasks and on every change we save it to local storage
tasks.subscribe((curTasks) => {
  if (!browser) { return }
  localStorage.setItem('tasks', JSON.stringify(curTasks))
})

// Simple CRUD functions
export const deleteTask = (taskID:number) => tasks.update((curTasks:TaskData[]) => 
  curTasks.filter((curTask:TaskData) => curTask.id !== taskID))

export const createNewTask = () => tasks.update((curTasks:TaskData[]) => [...curTasks, new TaskClass(++latestTaskID)])

export const updateTask = (taskID:number, taskName:string, taskDesc:string, completed:boolean) =>
  tasks.update((curTasks:TaskData[]) =>
    curTasks.map((curTask:TaskData) =>
      curTask.id === taskID ? new TaskClass(taskID, taskName, taskDesc, completed) : curTask))