import {render, fireEvent, screen, waitFor} from '@testing-library/svelte'
import '@testing-library/jest-dom'
import TaskList from '../TaskList.svelte'
import TaskPage from '../../routes/+page.svelte'

describe('TaskList', () => {
  let tasklistComponent:HTMLElement, addButtonComponent:HTMLElement, taskpageUnmount: () => void;

  beforeEach(() => {
    const {getByTestId, getByText, unmount} = render(TaskPage)
    taskpageUnmount=unmount
    tasklistComponent = getByTestId('tasklist')
    addButtonComponent = getByText('Add task')
  })

  test('render tasklist', () => {
    expect(screen.getByTestId('tasklist')).toBeInTheDocument() 
  })
  
  it('adding tasks', async () => {
    const taskAmount = 10
    
    for(let i = 0; i < taskAmount; i++) {
      await fireEvent.click(addButtonComponent)
    }

    expect(tasklistComponent.children).toHaveLength(taskAmount)
  })
  
  
  test('deleting tasks', async () => {
    await fireEvent.click(addButtonComponent)

    const createdDeleteButton = screen.getAllByTestId('deleteButton')[0]
    const taskAmountBeforeDeletion = tasklistComponent.children.length
    
    await fireEvent.click(createdDeleteButton)
    await fireEvent.click(createdDeleteButton)
    
    expect(tasklistComponent.children.length).toBe(taskAmountBeforeDeletion-1)
  })
  
  test('saving tasks', async () => {
    await fireEvent.click(addButtonComponent)
    
    const latestTaskIndex = tasklistComponent.children.length-1
    const createdTaskTitle = screen.getAllByTestId('nameInput')[latestTaskIndex]
    const createdTaskDesc = screen.getAllByTestId('descInput')[latestTaskIndex]
    const createdTaskCompletion = screen.getAllByTestId('completionButton')[latestTaskIndex]
    
    fireEvent.input(createdTaskTitle, { target: { value: 'new title' } })
    fireEvent.input(createdTaskDesc, { target: { value: 'new description' } })
    fireEvent.click(createdTaskCompletion)
    
    taskpageUnmount()
    render(TaskList)
    
    waitFor(() => {
      expect(screen.getAllByTestId<HTMLInputElement>('nameInput')[0].value).toBe('new title')
      expect(screen.getAllByTestId<HTMLInputElement>('descInput')[0].value).toBe('new description')
      expect(screen.getByText('✅')).toBeInTheDocument()
    })
  })
})