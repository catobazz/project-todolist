import React, { ChangeEvent } from 'react'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from '../EditableSpan'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { getListItemSx } from './Todolist.styles'
import { TodolistType } from '../model/todolists-reducer'
import { FilterTasksButtons } from './FilterTasksButtons'

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

      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {tasks.map((task) => {
            const removeTaskHandler = () => {
              removeTask(task.id, todolist.id)
            }

            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              const newStatusValue = e.currentTarget.checked
              changeTaskStatus(task.id, newStatusValue, todolist.id)
            }

            const changeTaskTitleHandler = (title: string) => {
              updateTask(todolist.id, task.id, title)
            }
            return (
              <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
                <div>
                  <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} />
                  <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
                </div>
                <IconButton onClick={removeTaskHandler}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            )
          })}
        </List>
      )}

      <FilterTasksButtons todolist={todolist} />
    </div>
  )
}
