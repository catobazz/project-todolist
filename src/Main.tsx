import Container from '@mui/material/Container'
import Grid from '@mui/material/Unstable_Grid2'
import { AddItemForm } from './AddItemForm'
import Paper from '@mui/material/Paper'
import { Todolist } from './Todolist'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from './state/store'
import { addTodolistAC, TodolistType } from './model/todolists-reducer'

export const Main = () => {
  const todolists = useSelector<AppRootStateType, TodolistType[]>((state) => state.todolists)
  const dispatch = useDispatch()

  const addTodolist = useCallback((title: string) => {
    dispatch(addTodolistAC(title))
  }, [])

  return (
    <Container fixed>
      <Grid container sx={{ mb: '30px' }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={4}>
        {todolists.map((tl) => {
          return (
            <Grid key={tl.id}>
              <Paper elevation={5} sx={{ p: '0 20px 20px 20px' }}>
                <Todolist todolist={tl} />
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}
