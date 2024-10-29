import React, { useCallback } from 'react'
import { AddItemForm } from './AddItemForm'
import { useDispatch } from 'react-redux'
import { TodolistType } from '../model/todolists-reducer'
import { addTaskAC } from '../model/tasks-reducer'
import { FilterTasksButtons } from './FilterTasksButtons'
import { Tasks } from '../Tasks'
import { TodolistTitle } from '../TodolistTitle'

type PropsType = {
  todolist: TodolistType
}

export const Todolist = React.memo(({ todolist }: PropsType) => {
  const { id } = todolist

  const dispatch = useDispatch()

  const addTaskCallback = useCallback((title: string) => {
    dispatch(addTaskAC({ title, id }))
  }, [])

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskCallback} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </div>
  )
})
