import React, { useState } from 'react'
import './App.css'
import { Todolist } from './Todolist'
import { v1 } from 'uuid'

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
  const [filter, setFilter] = useState<FilterValuesType>('all')
  const [tasks, setTasks] = useState<TaskType[]>([
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
    { id: v1(), title: 'Redux', isDone: false },
    { id: v1(), title: 'Typescript', isDone: false },
    { id: v1(), title: 'RTK query', isDone: false },
  ])

  const addTask = (title: string) => {
    const newTask: TaskType = {
      id: v1(),
      title,
      isDone: false,
    }
    const newTasks = [newTask, ...tasks]
    setTasks(newTasks)
  }

  const removeTask = (taskId: string) => {
    const filteredTask = tasks.filter((t) => {
      return t.id !== taskId
    })
    setTasks(filteredTask)
  }
  const changeFilter = (filtered: FilterValuesType) => {
    setFilter(filtered)
  }

  let taskForTodolist = tasks
  if (filter === 'active') {
    taskForTodolist = tasks.filter((t) => !t.isDone)
  }
  if (filter === 'completed') {
    taskForTodolist = tasks.filter((t) => t.isDone)
  }

  const changeTaskStatus = (taskId: string, isDone: boolean) => {
    const updatedTasks = tasks.map((task) => (task.id === taskId ? { ...task, isDone } : task))
    setTasks(updatedTasks)
  }

  return (
    <div className="App">
      <Todolist
        title="What to learn"
        tasks={taskForTodolist}
        removeTask={removeTask}
        date={'30.01.24'}
        changeFilter={changeFilter}
        addTask={addTask}
        changeTaskStatus={changeTaskStatus}
      />
    </div>
  )
}

export default App
