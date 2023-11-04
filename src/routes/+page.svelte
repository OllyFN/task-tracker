<script lang="ts">
  import TaskList from "../components/TaskList.svelte";
  import {createNewTask} from '../store'
</script>

<div class='task-wrapper'>
  <TaskList />
  <button class='add-button' on:click={createNewTask}>Add task</button>
</div>

<style>
  .task-wrapper {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
 
  .add-button {
    border: none;
    height: 10%;
    border-top: 2px solid black;
    background: transparent;
    font-size: 3rem;
  }

  ::-webkit-scrollbar {
    width: 20px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 8px
  }

  button { cursor:pointer }
</style>