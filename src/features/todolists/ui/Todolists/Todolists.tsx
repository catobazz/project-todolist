import React from 'react'
import { Todolist } from './Todolist/Todolist'
import { useAppSelector } from '../../../../common/hooks/useAppSelector'

export const Todolists = () => {
  const todolists = useAppSelector((state) => state.todolists)
  return (
    <>
      {todolists.map((todolist) => (
        <Todolist todolist={todolist} key={todolist.id} />
      ))}
    </>
  )
}
