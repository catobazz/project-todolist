import React from 'react'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from '../EditableSpan'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from '../state/store'
import { changeTodolistTitleAC, removeTodolistAC, TodolistType } from '../model/todolists-reducer'
import { TaskType } from '../model/tasks-reducer'
import { FilterTasksButtons } from './FilterTasksButtons'
import { Tasks } from '../Tasks'

type PropsType = {
  todolist: TodolistType
}

export const Todolist = React.memo(({ todolist }: PropsType) => {
  const { id, title, filter } = todolist

  const tasks = useSelector<AppRootStateType, TaskType[]>((state) => state.tasks[id])
  const dispatch = useDispatch()

  const removeTodolistHandler = () => {
    dispatch(removeTodolistAC(id)) //
  }

  // const addTaskCallback = useCallback((title: string) => {
  //   dispatch(addTaskAC(title, id))
  // }, [])

  const updateTodolistTitleHandler = (title: string) => {
    dispatch(changeTodolistTitleAC(id, title))
  }

  let taskForTodolist = tasks
  if (filter === 'active') {
    taskForTodolist = tasks.filter((t) => !t.isDone)
  }
  if (filter === 'completed') {
    taskForTodolist = tasks.filter((t) => t.isDone)
  }

  return (
    <div>
      <div className={'todolist-title-container'}>
        <h3>
          <EditableSpan value={title} onChange={updateTodolistTitleHandler} />
        </h3>
        <IconButton onClick={removeTodolistHandler}>
          <DeleteIcon />
        </IconButton>
      </div>

      <div>
        <AddItemForm addItem={addTaskCallback} />
      </div>
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </div>
  )
})
