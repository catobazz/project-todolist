import React from 'react'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from '../EditableSpan'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { TodolistType } from '../model/todolists-reducer'
import { FilterTasksButtons } from './FilterTasksButtons'
import { Todolist } from './Todolist'

type Props = {
  todolist: TodolistType
  /*...*/
}

export const Todolists = (props: Props) => {
  const {
    /*...*/
    todolist,
  } = props

  const removeTodolistHandler = () => {
    removeTodolist(todolist.id)
  }

  const addTaskCallback = (title: string) => {
    addTask(title, todolist.id)
  }

  const updateTodolistHandler = (title: string) => {
    updateTodolist(todolist.id, title)
  }

  return (
    <div>
      <div className={'todolist-title-container'}>
        <h3>
          <EditableSpan value={todolist.title} onChange={updateTodolistHandler} />
        </h3>
        <IconButton onClick={removeTodolistHandler}>
          <DeleteIcon />
        </IconButton>
      </div>

      <AddItemForm addItem={addTaskCallback} />

      <Todolist todolist={todolist} />

      <FilterTasksButtons todolist={todolist} />
    </div>
  )
}
