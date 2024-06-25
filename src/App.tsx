import React, { useState } from 'react'
import './App.css'
import { Todolist } from './Todolist'

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
  const [filter, setFilter] = useState<FilterValuesType>('all')
  const [tasks, setTasks] = useState<TaskType[]>([
    { id: 1, title: 'HTML&CSS', isDone: true },
    { id: 2, title: 'JS', isDone: true },
    { id: 3, title: 'ReactJS', isDone: false },
    { id: 4, title: 'Redux', isDone: false },
    { id: 5, title: 'Typescript', isDone: false },
    { id: 6, title: 'RTK query', isDone: false },
  ])

  const removeTask = (taskId: number) => {
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

  return (
    <div className="App">
      <Todolist
        title="What to learn"
        tasks={taskForTodolist}
        removeTask={removeTask}
        date={'30.01.24'}
        changeFilter={changeFilter}
      />
    </div>
  )
}

export default App
