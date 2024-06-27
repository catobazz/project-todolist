import { Button } from './Button'
import { FilterValuesType, TaskType } from './App'
import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { AddItemForm } from './AddItemForm'

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
  const removeTodolistUpHandler = () => {
    removeTodolist(todolistId) // колбек вызова функции удаления тудулиста
  }

  const addTaskCallback = (title: string) => {
    addTask(todolistId, title)
  }

  return (
    <div>
      <div className={'todolist-title-container'}>
        <h3>{title}</h3>
        <Button title={'x'} onClick={removeTodolistUpHandler} />
      </div>

      <div>
        <AddItemForm addItem={addTaskCallback} />
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
