import React, { useCallback } from 'react'
import { AddItemForm } from '../../../../../common/components/AddItemForm/AddItemForm'
import { TodolistType } from '../../../model/todolists-reducer'
import { addTaskAC } from '../../../model/tasks-reducer'
import { FilterTasksButtons } from './FilterTasksButtons/FilterTasksButtons'
import { Tasks } from './Tasks/Tasks'
import { TodolistTitle } from './TodolistTitle/TodolistTitle'
import { useAppDispatch } from '../../../../../common/hooks/useAppDispatch'

type PropsType = {
  todolist: TodolistType
}

export const Todolist = React.memo(({ todolist }: PropsType) => {
  const { id } = todolist

  const dispatch = useAppDispatch()

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
