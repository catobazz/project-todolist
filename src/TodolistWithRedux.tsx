import { TaskType } from './App'
import React, { ChangeEvent, memo, useCallback } from 'react'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from './EditableSpan'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Box from '@mui/material/Box'
import { filterButtonsContainerSx, getListItemSx } from './Todolist.styles'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from './state/store'
import { TodolistType } from './AppWithRedux'
import { changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC } from './model/todolists-reducer'
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './model/tasks-reducer'
import CustomButton from './CustomButton'

type PropsType = {
  todolist: TodolistType
}

export const TodolistWithRedux = memo(({ todolist }: PropsType) => {
  const { id, title, filter } = todolist

  const tasks = useSelector<AppRootStateType, TaskType[]>((state) => state.tasks[id])
  const dispatch = useDispatch()

  console.log('Todolist вызван')

  const removeTodolistHandler = () => {
    dispatch(removeTodolistAC(id)) //
  }

  const addTaskCallback = useCallback((title: string) => {
    dispatch(addTaskAC(title, id))
  }, [])

  const updateTodolistTitleHandler = (title: string) => {
    dispatch(changeTodolistTitleAC(id, title))
  }

  let taskForTodolist = tasks
  if (filter === 'active') {
    taskForTodolist = tasks.filter((t) => !t.isDone)
  }
  if (filter === 'completed') {
    taskForTodolist = tasks.filter((t) => t.isDone)
  }
  const onAllClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(id, 'all')), [id])
  const onActiveClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(id, 'active')), [id])
  const onCompleteClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(id, 'completed')), [id])

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
              dispatch(changeTaskStatusAC(task.id, newStatusValue, id))
            }
            const changeTaskTitleHandler = (title: string) => {
              dispatch(changeTaskTitleAC(task.id, title, id))
            }
            const removeTaskHandler = () => {
              dispatch(removeTaskAC(id, task.id))
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
        <CustomButton
          onClick={onAllClickHandler}
          variant={filter === 'all' ? 'outlined' : 'text'}
          color={'inherit'}
          title="All"
        >
          All
        </CustomButton>

        <CustomButton
          title="Active"
          onClick={onActiveClickHandler}
          variant={filter === 'active' ? 'outlined' : 'text'}
          color={'primary'}
        >
          Active
        </CustomButton>

        <CustomButton
          title="Completed"
          onClick={onCompleteClickHandler}
          variant={filter === 'completed' ? 'outlined' : 'text'}
          color={'secondary'}
        >
          Completed
        </CustomButton>
      </Box>
    </div>
  )
})
