import { Button } from './Button'
import { FilterValuesType, TaskType } from './App'
import { ChangeEvent, KeyboardEvent, useState } from 'react'

type PropsType = {
  title: string
  tasks: TaskType[]
  date?: string
  removeTask: (taskId: string) => void
  changeFilter: (filtered: FilterValuesType) => void
  addTask: (title: string) => void
}

export const Todolist = ({ title, tasks, date, removeTask, changeFilter, addTask }: PropsType) => {
  const [taskTitle, setTaskTitle] = useState('')

  const addTaskHandler = () => {
    addTask(taskTitle)
    setTaskTitle('')
  }
  const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value)
  }
  const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addTaskHandler()
    }
  }

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input value={taskTitle} onChange={changeTaskTitleHandler} onKeyUp={addTaskOnKeyUpHandler} />
        <Button title="+" onClick={addTaskHandler} />
      </div>
      <ul>
        {tasks.map((task) => {
          return (
            <li key={task.id}>
              <input type="checkbox" checked={task.isDone} />
              <span>{task.title}</span>
              <Button title={'x'} onClick={() => removeTask(task.id)} />
            </li>
          )
        })}
      </ul>
      <div>
        <Button title="All" onClick={() => changeFilter('all')} />
        <Button title="Active" onClick={() => changeFilter('active')} />
        <Button title="Completed" onClick={() => changeFilter('completed')} />
      </div>
      <div>{date}</div>
    </div>
  )
}
