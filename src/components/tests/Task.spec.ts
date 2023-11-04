import {jest} from '@jest/globals'
import {render, fireEvent, screen, waitFor} from '@testing-library/svelte'
import '@testing-library/jest-dom'
import Task from '../Task.svelte'

const taskProps = {
  data: {
    id: 1,
    name: 'Test task',
    description: 'Test description',
    completed: false
  },
  updateSelf: jest.fn(),
  deleteSelf: jest.fn()
}

test('render tasklist', () => {
  render(Task, {props: taskProps})
  expect(screen.getByTestId('task')).toBeInTheDocument()
})
describe('Task test', () => {
  let taskComponent:Task,
      completionButtonComponent:HTMLButtonElement,
      deleteButtonComponent:HTMLButtonElement,
      NameInputComponent:HTMLInputElement,
      DescriptionInputComponent:HTMLInputElement;

  beforeEach(() => {
    const {component:task, getByTestId, getByText} = render(Task, {props: taskProps})
    taskComponent=task
    completionButtonComponent = getByTestId('completionButton') as HTMLButtonElement
    deleteButtonComponent = getByTestId('deleteButton') as HTMLButtonElement
    NameInputComponent = getByTestId('nameInput') as HTMLInputElement
    DescriptionInputComponent = getByTestId('descInput') as HTMLInputElement
  })

  test('updating the task name', async () => {
    fireEvent.input(NameInputComponent, { target: { value: 'new title' } })  
    expect(NameInputComponent.value).toBe('new title')
  })

  test('updating the task description', async () => {
    fireEvent.input(DescriptionInputComponent, { target: { value: 'new description' } })  
    expect(DescriptionInputComponent.value).toBe('new description')
  })

  test('completing the task', async () => {
    const completionSymbolBefore=completionButtonComponent.innerHTML
    await fireEvent.click(completionButtonComponent)
    expect(screen.getByTestId('completionButton')).not.toBe(completionSymbolBefore)
  })
  
  test('completing & uncompleting the task', async () => {
    const completionSymbolBeforeDoubleClicking=completionButtonComponent.innerHTML
    await fireEvent.doubleClick(completionButtonComponent)
    expect(completionButtonComponent.innerHTML).toBe(completionSymbolBeforeDoubleClicking)
  })
  

  test('delete confirmation', async () => {
    await fireEvent.click(deleteButtonComponent)
    expect(deleteButtonComponent.innerHTML).toBe('✅')
  })

  test('deleting the task', async () => {
    await fireEvent.click(screen.getByTestId('deleteButton'))
    await fireEvent.doubleClick(screen.getByTestId('deleteButton'))
    waitFor(() => {
      expect(screen.getByTestId('task')).not.toBeInTheDocument()
    })
  })
})