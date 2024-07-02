import { TasksStateType } from '../App'
import { v1 } from 'uuid'
import { AddTodolistActionType, RemoveTodolistActionType } from './todolists-reducer'

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

let todolistID1 = v1()
let todolistID2 = v1()

const initialState: TasksStateType = {
  [todolistID1]: [
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
  ],
  [todolistID2]: [
    { id: v1(), title: 'Rest API', isDone: true },
    { id: v1(), title: 'GraphQL', isDone: false },
  ],
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      const { taskId, todolistId } = action.payload
      return {
        ...state,
        [todolistId]: state[todolistId].filter((task) => task.id !== taskId),
      }
    }
    case 'ADD-TASK': {
      const { title, todolistId } = action.payload
      const newTask = {
        id: v1(),
        title: title,
        isDone: false,
      }
      const todolistTasks = state[todolistId]
      state[todolistId] = [newTask, ...todolistTasks]
      return {
        ...state,
      }
    }
    case 'CHANGE-TASK-STATUS': {
      const { taskId, isDone, todolistId } = action.payload
      const updatedTasks = state[todolistId].map((task) => {
        return task.id === taskId ? { ...task, isDone } : task
      })
      return {
        ...state,
        [todolistId]: updatedTasks,
      }
    }
    case 'CHANGE-TASK-TITLE': {
      const { taskId, title, todolistId } = action.payload
      const updatedTasks = state[todolistId].map((task) => {
        return task.id === taskId ? { ...task, title } : task
      })
      return {
        ...state,
        [todolistId]: updatedTasks,
      }
    }
    case 'ADD-TODOLIST': {
      const stateCopy = { ...state }

      stateCopy[action.payload.todolistId] = []

      return stateCopy
    }
    case 'REMOVE-TODOLIST': {
      const stateCopy = { ...state }
      delete stateCopy[action.payload.id]
      return stateCopy
    }

    default:
      return state
  }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
  return { type: 'REMOVE-TASK', payload: { taskId, todolistId } } as const
}
export const addTaskAC = (title: string, todolistId: string) => {
  return { type: 'ADD-TASK', payload: { title, todolistId } } as const
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
  return { type: 'CHANGE-TASK-STATUS', payload: { taskId, isDone, todolistId } } as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
  return { type: 'CHANGE-TASK-TITLE', payload: { taskId, title, todolistId } } as const
}
