import React, { useCallback } from 'react'
import './App.css'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC } from '../model/todolists-reducer'
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from '../model/tasks-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from '../state/store'
import { getTheme } from '../common/theme'
import { Header } from '../Header'
import { Main } from '../Main'

type ThemeMode = 'dark' | 'light'

function App() {
  const themeMode = useSelector<AppRootStateType, ThemeMode>((state) => state.app.themeMode)
  const dispatch = useDispatch()
  const theme = getTheme(themeMode)

  // const addTask = useCallback((todolistId: string, title: string) => {
  //   dispatch(addTaskAC(title, todolistId))
  // }, [])
  //
  // const removeTask = useCallback((todolistId: string, taskId: string) => {
  //   dispatch(removeTaskAC(taskId, todolistId))
  // }, [])
  //
  // const changeFilter = useCallback((todolistId: string, filtered: FilterValuesType) => {
  //   dispatch(changeTodolistFilterAC(todolistId, filtered))
  // }, [])
  //
  // const changeTaskStatus = useCallback((todolistId: string, taskId: string, isDone: boolean) => {
  //   dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
  // }, [])
  //
  // const removeTodolist = useCallback((todolistId: string) => {
  //   dispatch(removeTodolistAC(todolistId))
  // }, [])
  //
  // const updateTaskTitle = useCallback((todolistId: string, taskId: string, newTitle: string) => {
  //   dispatch(changeTaskTitleAC(taskId, newTitle, todolistId))
  // }, [])
  // const updateTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
  //   dispatch(changeTodolistTitleAC(todolistId, newTitle))
  // }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Main />
    </ThemeProvider>
  )
}

export default App
