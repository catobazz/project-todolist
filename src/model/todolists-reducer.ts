import { FilterValuesType, TodolistType } from '../App'
import { v1 } from 'uuid'

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

let todolistID1 = v1()
let todolistID2 = v1()

const initialState: TodolistType[] = [
  { id: todolistID1, title: 'What to learn', filter: 'all' },
  { id: todolistID2, title: 'What to buy', filter: 'all' },
]

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType) => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter((tl) => tl.id !== action.payload.id)
    }
    case 'ADD-TODOLIST': {
      const todolistId = v1()
      const newTodolist: TodolistType = { id: todolistId, title: action.payload.title, filter: 'all' }
      return [...state, newTodolist]
    }
    case 'CHANGE-TODOLIST-TITLE': {
      return state.map((tl) => (tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl))
    }
    case 'CHANGE-TODOLIST-FILTER': {
      return state.map((tl) => (tl.id === action.payload.id ? { ...tl, filter: action.payload.filter } : tl))
    }
    default:
      return state
  }
}

export const removeTodolistAC = (todolistId: string) => {
  return { type: 'REMOVE-TODOLIST', payload: { id: todolistId } } as const
}
export const addTodolistAC = (title: string) => {
  return { type: 'ADD-TODOLIST', payload: { title } } as const
}
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
  return { type: 'CHANGE-TODOLIST-TITLE', payload: { id: todolistId, title } } as const
}
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
  return { type: 'CHANGE-TODOLIST-FILTER', payload: { id: todolistId, filter } } as const
}
