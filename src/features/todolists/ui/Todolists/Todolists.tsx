import React from 'react'
import { Todolist } from './Todolist/Todolist'
import { useAppSelector } from '../../../../common/hooks/useAppSelector'
import { selectTodolists } from '../../model/todolistsSelectors'

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)
  return (
    <>
      {todolists.map((todolist) => (
        <Todolist todolist={todolist} key={todolist.id} />
      ))}
    </>
  )
}
