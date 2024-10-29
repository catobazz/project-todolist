import React from 'react'
import { TodolistType } from '../model/todolists-reducer'
import { Todolist } from './Todolist'
import { useSelector } from 'react-redux'
import { AppRootStateType } from '../state/store'

export const Todolists = () => {
  const todolists = useSelector<AppRootStateType, TodolistType[]>((state) => state.todolists)
  return (
    <>
      {todolists.map((todolist) => (
        <Todolist todolist={todolist} key={todolist.id} />
      ))}
    </>
  )
}
