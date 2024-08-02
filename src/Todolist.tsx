import { FilterValuesType, TaskType } from './App'
import React, { ChangeEvent, useCallback } from 'react'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from './EditableSpan'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Box from '@mui/material/Box'
import { filterButtonsContainerSx, getListItemSx } from './Todolist.styles'

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
  updateTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
  updateTodolistTitle: (todolistId: string, newTitle: string) => void
}

export const Todolist = React.memo(
  ({
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
    updateTaskTitle,
    updateTodolistTitle,
  }: PropsType) => {
    console.log('Todolist вызван')

    const removeTodolistHandler = () => {
      removeTodolist(todolistId) // колбек вызова функции удаления тудулиста
    }

    const addTaskCallback = useCallback(
      (title: string) => {
        addTask(todolistId, title)
      },
      [addTask, todolistId],
    )

    const updateTodolistTitleHandler = (title: string) => {
      updateTodolistTitle(todolistId, title)
    }

    let taskForTodolist = tasks
    if (activeFilter === 'active') {
      taskForTodolist = tasks.filter((t) => !t.isDone)
    }
    if (activeFilter === 'completed') {
      taskForTodolist = tasks.filter((t) => t.isDone)
    }

    return (
      <div>
        <div className={'todolist-title-container'}>
          <h3>
            <EditableSpan value={title} onChange={updateTodolistTitleHandler} />
          </h3>
          <IconButton onClick={removeTodolistHandler}>
            <DeleteIcon />
          </IconButton>
        </div>

        <div>
          <AddItemForm addItem={addTaskCallback} />
        </div>
        {tasks.length === 0 ? (
          <p>Тасок нет</p>
        ) : (
          <List>
            {taskForTodolist.map((task) => {
              const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                const newStatusValue = e.currentTarget.checked
                changeTaskStatus(todolistId, task.id, newStatusValue)
              }
              const changeTaskTitleHandler = (title: string) => {
                updateTaskTitle(todolistId, task.id, title)
              }
              const removeTaskHandler = () => {
                removeTask(todolistId, task.id)
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
        <Box sx={filterButtonsContainerSx}>
          <Button
            onClick={() => changeFilter(todolistId, 'all')}
            variant={activeFilter === 'all' ? 'outlined' : 'text'}
            color={'inherit'}
          >
            All
          </Button>

          <Button
            title="Active"
            onClick={() => changeFilter(todolistId, 'active')}
            variant={activeFilter === 'active' ? 'outlined' : 'text'}
            color={'primary'}
          >
            Active
          </Button>

          <Button
            title="Completed"
            onClick={() => changeFilter(todolistId, 'completed')}
            variant={activeFilter === 'completed' ? 'outlined' : 'text'}
            color={'secondary'}
          >
            Completed
          </Button>
        </Box>
        <div>{date}</div>
      </div>
    )
  },
)
