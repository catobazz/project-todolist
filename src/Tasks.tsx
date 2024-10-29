import React from 'react'
import List from '@mui/material/List'
import { useSelector } from 'react-redux'
import { TasksStateType } from './model/tasks-reducer'
import { AppRootStateType } from './state/store'
import { TodolistType } from './model/todolists-reducer'
import { Task } from './Task'

type Props = {
  todolist: TodolistType
}

export const Tasks = ({ todolist }: Props) => {
  const tasks = useSelector<AppRootStateType, TasksStateType>((state) => state.tasks)

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
            return <Task key={task.id} task={task} todolist={todolist} />
          })}
        </List>
      )}
    </>
  )
}
