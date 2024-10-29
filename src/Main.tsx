import Container from '@mui/material/Container'
import Grid from '@mui/material/Unstable_Grid2'
import { AddItemForm } from './todolist/AddItemForm'
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { addTodolistAC } from './model/todolists-reducer'
import { Todolists } from './todolist/Todolists'

export const Main = () => {
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
        <Todolists />
      </Grid>
    </Container>
  )
}
