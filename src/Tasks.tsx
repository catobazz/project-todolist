import React, { ChangeEvent } from 'react'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { useDispatch, useSelector } from 'react-redux'
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksStateType } from './model/tasks-reducer'
import { AppRootStateType } from './state/store'
import { TodolistType } from './model/todolists-reducer'
import { getListItemSx } from './todolist/Todolist.styles'
import { EditableSpan } from './EditableSpan'

type Props = {
  todolist: TodolistType
}

export const Tasks = ({ todolist }: Props) => {
  const dispatch = useDispatch()

  const tasks = useSelector<AppRootStateType, TasksStateType>((state) => state.tasks)

  const removeTask = (taskId: string, todolistId: string) => {
    dispatch(removeTaskAC({ taskId, todolistId }))
  }

  const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
    dispatch(changeTaskStatusAC({ taskId, isDone: taskStatus, todolistId }))
  }

  const updateTask = (todolistId: string, taskId: string, title: string) => {
    dispatch(changeTaskTitleAC({ taskId, title, todolistId }))
  }

  const allTodolistTasks = tasks[todolist.id]

  let tasksForTodolist = allTodolistTasks

  if (todolist.filter === 'active') {
    tasksForTodolist = allTodolistTasks.filter((task) => !task.isDone)
  }

  if (todolist.filter === 'completed') {
    tasksForTodolist = allTodolistTasks.filter((task) => task.isDone)
  }

  return (
    <>
      {tasksForTodolist.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {tasksForTodolist.map((task) => {
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
    </>
  )
}
