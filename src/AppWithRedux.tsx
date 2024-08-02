import React, { useCallback, useState } from 'react'
import './App.css'
import { AddItemForm } from './AddItemForm'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Unstable_Grid2'
import Paper from '@mui/material/Paper'
import { MenuButton } from './MenuButton'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Switch from '@mui/material/Switch'
import { addTodolistAC } from './model/todolists-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from './state/store'
import { TodolistWithRedux } from './TodolistWithRedux'

export type TasksStateType = {
  [key: string]: TaskType[]
}
export type TodolistType = {
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
type ThemeMode = 'dark' | 'light'

function AppWithRedux() {
  const todolists = useSelector<AppRootStateType, TodolistType[]>((state) => state.todolists)
  const dispatch = useDispatch()

  const [themeMode, setThemeMode] = useState<ThemeMode>('dark')
  const theme = createTheme({
    palette: {
      mode: themeMode === 'light' ? 'light' : 'dark',
      primary: {
        main: '#ef6c00',
      },
    },
  })

  const addTodolist = useCallback((title: string) => {
    dispatch(addTodolistAC(title))
  }, [])

  const changeModeHandler = () => {
    setThemeMode(themeMode == 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" sx={{ mb: '30px' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <div>
            <MenuButton>Login</MenuButton>
            <MenuButton>Logout</MenuButton>
            <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
            <Switch color={'default'} onChange={changeModeHandler} />
          </div>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container sx={{ mb: '30px' }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={4}>
          {todolists.map((tl) => {
            return (
              <Grid key={tl.id}>
                <Paper elevation={5} sx={{ p: '0 20px 20px 20px' }}>
                  <TodolistWithRedux todolist={tl} />
                </Paper>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

export default AppWithRedux
