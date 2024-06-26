import { Button } from './Button'
import { FilterValuesType, TaskType } from './App'
import { ChangeEvent, KeyboardEvent, useState } from 'react'

type PropsType = {
  title: string
  todolistId: string
  tasks: TaskType[]
  date?: string
  removeTask: (todolistId: string, taskId: string) => void
  changeFilter: (todolistId: string, filtered: FilterValuesType) => void
  addTask: (todolistId: string, title: string) => void
  changeTaskStatus: (todolistId: string, taskId: string, newStatusValue: boolean) => void
  activeFilter: FilterValuesType
  removeTodolist: (todolistId: string) => void
}

export const Todolist = ({
  title,
  tasks,
  date,
  removeTask,
  changeFilter,
  addTask,
  changeTaskStatus,
  activeFilter,
  todolistId,
  removeTodolist,
}: PropsType) => {
  const [taskTitle, setTaskTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  const addTaskHandler = () => {
    if (taskTitle.trim() !== '') {
      addTask(todolistId, taskTitle.trim())
      setTaskTitle('')
    } else {
      setError('Title is required')
      setTaskTitle('') // чистим поле от пробелов после ошибки
    }
  }
  const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value)
  }
  const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (event.key === 'Enter') {
      addTaskHandler()
    }
  }
  const removeTodolistUpHandler = () => {
    removeTodolist(todolistId) // колбек вызова функции удаления тудулиста
  }

  return (
    <div>
      <div className={'todolist-title-container'}>
        <h3>{title}</h3>
        <Button title={'x'} onClick={removeTodolistUpHandler} />
      </div>

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
            changeTaskStatus(todolistId, task.id, newStatusValue)
          }
          return (
            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
              <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler} />
              <span>{task.title}</span>
              <Button title={'x'} onClick={() => removeTask(todolistId, task.id)} />
            </li>
          )
        })}
      </ul>
      <div>
        <Button
          title="All"
          onClick={() => changeFilter(todolistId, 'all')}
          className={activeFilter === 'all' ? 'active-filter' : ''}
        />
        <Button
          title="Active"
          onClick={() => changeFilter(todolistId, 'active')}
          className={activeFilter === 'active' ? 'active-filter' : ''}
        />
        <Button
          title="Completed"
          onClick={() => changeFilter(todolistId, 'completed')}
          className={activeFilter === 'completed' ? 'active-filter' : ''}
        />
      </div>
      <div>{date}</div>
    </div>
  )
}
