import React, { useState } from 'react'
import './App.css'
import { Todolist } from './Todolist'
import { v1 } from 'uuid'
import { AddItemForm } from './AddItemForm'

export type TasksStateType = {
  [key: string]: TaskType[]
}
type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
  let todolistID1 = v1()
  let todolistID2 = v1()

  let [todolists, setTodolists] = useState<TodolistType[]>([
    { id: todolistID1, title: 'What to learn', filter: 'all' },
    { id: todolistID2, title: 'What to buy', filter: 'all' },
  ])

  let [tasks, setTasks] = useState<TasksStateType>({
    [todolistID1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: 'Rest API', isDone: true },
      { id: v1(), title: 'GraphQL', isDone: false },
    ],
  })

  const addTask = (todolistId: string, title: string) => {
    // 1. Создадим новую таску
    const newTask = {
      id: v1(),
      title: title,
      isDone: false,
    }
    // 2. Найдем массив тасок для тудулиста, в который будем добавлять новую таску
    const todolistTasks = tasks[todolistId]
    // 3. Перезапишем массив тасок на новый массив, добавив в начало новую таску
    tasks[todolistId] = [newTask, ...todolistTasks]
    // 4. Засетаем в state копию объекта, чтобы React отреагировал перерисовкой
    setTasks({ ...tasks })
  }

  const removeTask = (todolistId: string, taskId: string) => {
    // 1. Найдем таски для тудулиста, в котором будет происходить удаление
    const todolistTasks = tasks[todolistId]
    // 2. Удалим таску по которой кликнули
    const newTodolistTasks = todolistTasks.filter((t) => t.id !== taskId)
    // 3. Перезапишем массив тасок на новый (отфильтрованный) массив
    tasks[todolistId] = newTodolistTasks
    // 4. Засетаем в state копию объекта, чтобы React отреагировал перерисовкой
    setTasks({ ...tasks, newTodolistTasks })
  }

  const changeFilter = (todolistId: string, filtered: FilterValuesType) => {
    const newTodolist = todolists.map((tl) => {
      return tl.id === todolistId ? { ...tl, filter: filtered } : tl
    })
    setTodolists(newTodolist)
  }

  const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    const updatedTasks = tasks[todolistId].map((task) => {
      return task.id === taskId ? { ...task, isDone } : task
    })
    setTasks({ ...tasks, [todolistId]: updatedTasks })
  }

  const removeTodolist = (todolistId: string) => {
    const newTodo = todolists.filter((t) => t.id !== todolistId)
    setTodolists(newTodo)
    // удалим таски для тудулиста из стейта где мы храним таски
    delete tasks[todolistId]
    // засетаем в state копию объекта
    setTasks({ ...tasks })
  }

  const addTodolist = (title: string) => {
    const newTodolistId = v1()
    const newTodolist: TodolistType = { id: newTodolistId, title: title, filter: 'all' }
    setTodolists([newTodolist, ...todolists])
    // добавляем пустой массив тасок в новый тудулист
    setTasks({ ...tasks, [newTodolistId]: [] })
  }

  const updateTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
    const updatedTasks = tasks[todolistId].map((task) => {
      return task.id === taskId ? { ...task, title: newTitle } : task
    })
    setTasks({ ...tasks, [todolistId]: updatedTasks })
  }
  const updateTodolistTitle = (todolistId: string, newTitle: string) => {
    const updatedTodolists = todolists.map((todo) => {
      return todo.id === todolistId ? { ...todo, title: newTitle } : todo
    })
    setTodolists(updatedTodolists)
  }

  return (
    <div className="App">
      <AddItemForm addItem={addTodolist} />
      {todolists.map((tl) => {
        const allTodolistTasks = tasks[tl.id]
        let taskForTodolist = allTodolistTasks
        if (tl.filter === 'active') {
          taskForTodolist = allTodolistTasks.filter((t) => !t.isDone)
        }
        if (tl.filter === 'completed') {
          taskForTodolist = allTodolistTasks.filter((t) => t.isDone)
        }
        return (
          <Todolist
            key={tl.id}
            todolistId={tl.id}
            title={tl.title}
            tasks={taskForTodolist}
            removeTask={removeTask}
            date={'30.01.24'}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            activeFilter={tl.filter}
            removeTodolist={removeTodolist}
            updateTaskTitle={updateTaskTitle}
            updateTodolistTitle={updateTodolistTitle}
          />
        )
      })}
    </div>
  )
}

export default App
