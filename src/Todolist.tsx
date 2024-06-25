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
  changeTaskStatus: (taskId: string, newStatusValue: boolean) => void
}

export const Todolist = ({ title, tasks, date, removeTask, changeFilter, addTask, changeTaskStatus }: PropsType) => {
  const [taskTitle, setTaskTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  const addTaskHandler = () => {
    setTaskTitle('')
    if (taskTitle.trim() !== '') {
      addTask(taskTitle.trim())
    } else {
      setError('Title is required')
    }
  }
  const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setError(null)
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
        <input
          value={taskTitle}
          onChange={changeTaskTitleHandler}
          onKeyUp={addTaskOnKeyUpHandler}
          className={error ? 'error' : ''}
        />
        <Button title="+" onClick={addTaskHandler} />
        {error && <div className={'error-message'}>{error}</div>}
      </div>
      <ul>
        {tasks.map((task) => {
          const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            const newStatusValue = e.currentTarget.checked
            changeTaskStatus(task.id, newStatusValue)
          }

          return (
            <li key={task.id}>
              <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler} />
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
