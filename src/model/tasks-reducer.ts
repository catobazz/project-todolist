import { TasksStateType } from '../App'
import { v1 } from 'uuid'

type ActionsType = RemoveTaskActionType

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

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
    default:
      return state
  }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
  return { type: 'REMOVE-TASK', payload: { taskId, todolistId } } as const
}
