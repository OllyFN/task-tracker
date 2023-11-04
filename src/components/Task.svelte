<script lang="ts">
  import { onMount } from "svelte";
  import type { TaskData } from "../types/Task";

  export let data:TaskData;
  export let deleteSelf:() => void;
  export let updateSelf:(name:string, description:string, completed:boolean) => void;
  let confirmDelete=false;

  // This is very wonky but its the only way I know of to resize the textarea based on the content
  const textareaResize = (element:HTMLTextAreaElement) => 
    (element.style.height = '0px') &&
    (element.style.height = 'max(2.45rem, ' + element.scrollHeight + 'px)')

  // onMount we need to resize the task description textarea since it might consist some information from the previous session
  onMount(() => {
    const textarea = document.getElementById(data.id.toString())
    if (textarea==null) {return}
    textareaResize(textarea as HTMLTextAreaElement)
  })

  const updateTitle = (newTitle:string) => updateSelf(newTitle, data.description, data.completed);
  const updateDesc = (newDesc:string) => updateSelf(data.name, newDesc, data.completed);
  const toggleCompletion = () => updateSelf(data.name, data.description, !data.completed);
  const deleteTask = () => confirmDelete ? deleteSelf() : ((confirmDelete=true) && setTimeout(() => confirmDelete=false, 1000));
</script>

<div class='task' data-testid="task">
  <div>
    <input
      name='Task name'
      data-testid='nameInput'
      placeholder='Name'
      bind:value={data.name} on:input={(e) => updateTitle(e.currentTarget.value)} />

    <textarea
      name='Task description'
      data-testid='descInput'
      placeholder='Description'
      id={data.id.toString()}
      bind:value={data.description}
      on:input={(e) => textareaResize(e.currentTarget) && updateDesc(e.currentTarget.value)}
      />
  </div>
  <button on:click={deleteTask} data-testid='deleteButton'>{confirmDelete ? '✅' : '🗑️'}</button>
  <button on:click={toggleCompletion} data-testid='completionButton'>{data.completed ? '✔️' : '❌'}</button>
</div>

<style>
  .task {
    font-size: 1rem;
    padding:0;
    white-space:nowrap;
    display: flex;
    border: 2px solid black;
    border-radius: 8px;
    box-shadow: 0 0 16px #0102038a;

    opacity: 0;
    margin-right: 80%;
    animation: task-transition 1s forwards;
  }

  @keyframes task-transition {
    0% {opacity:0}
    50% {opacity:1}
    100% {margin-right:0; opacity:1}
  }

  .task * {
    background: transparent;
    border: none;
    outline: none;
  }

  .task div {
    display: inline-block;
    width: 100%;
    height: 100%;
    white-space: wrap;
    padding: 8px;
  }

  .task input, .task textarea {
    box-sizing: border-box;
    display: inline-block;
    width: 100%;
    resize: none;
    overflow: hidden;
    line-height: 110%;
  }
  
  .task input {
    font-size: 1.5rem;
  }
  
  .task textarea {
    font-size: 1rem;
    min-height: 2rem;
  }
  
  .task button {
    height: 100%;
    width: 5%;
    border-left: 2px black solid;
    font-size: 32px;
    cursor:pointer;
  }
</style>