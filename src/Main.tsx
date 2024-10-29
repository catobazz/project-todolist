import Container from '@mui/material/Container'
import Grid from '@mui/material/Unstable_Grid2'
import { AddItemForm } from './todolist/AddItemForm'
import { todolist } from './todolist/Todolist'
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { addTodolistAC } from './model/todolists-reducer'

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
        <todolist />
      </Grid>
    </Container>
  )
}
