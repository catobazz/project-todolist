import { ChangeEvent, memo, useCallback, useState } from 'react'
import TextField from '@mui/material/TextField'

type Props = {
  value: string
  onChange: (newTitle: string) => void
}
export const EditableSpan = memo(({ value, onChange }: Props) => {
  console.log('EditableSpan вызван')

  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState(value)

  const activateEditModeHandler = () => {
    setEditMode(true)
  }
  const deactivateEditModeHandler = useCallback(() => {
    setEditMode(false)
    onChange(title)
  }, [onChange, title])
  const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }

  return (
    <>
      {editMode ? (
        <TextField
          variant={'outlined'}
          value={title}
          size={'small'}
          onChange={changeTitleHandler}
          onBlur={deactivateEditModeHandler}
          autoFocus
        />
      ) : (
        <span onDoubleClick={activateEditModeHandler}>{value}</span>
      )}
    </>
  )
})
// Заметка: необходимо добавить валидацию при имении заголовка на пустую строку !!!
