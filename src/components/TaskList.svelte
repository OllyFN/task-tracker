<script lang="ts">
  import Task from '../components/Task.svelte';
  import { tasks, updateTask, deleteTask } from '../store';
  import { type TaskData } from '../types/Task';
  
  let curTasks:TaskData[] = [];

  // Subscribing to tasks allows curTasks to stay in sync
  tasks.subscribe((newTasks) => {
    curTasks = newTasks;
  });
</script>

<div class='tasklist-wrapper' data-testid="tasklist">
  {#each curTasks as task, _ (task.id)}
    <Task
      data={task}
      deleteSelf={() => deleteTask(task.id)}
      updateSelf={(title, description, completed) => updateTask(task.id, title, description, completed)}
      />
  {/each}
</div>

<style>
  .tasklist-wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;
    overflow-x: hidden;
    overflow-y: auto;
    height: 100%;
  }
</style>