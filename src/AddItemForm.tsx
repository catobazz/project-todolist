import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import TextField from '@mui/material/TextField'
import AddBoxIcon from '@mui/icons-material/AddBox'
import IconButton from '@mui/material/IconButton'

type PropsType = {
  addItem: (title: string) => void
}

export const AddItemForm = React.memo(({ addItem }: PropsType) => {
  console.log('AddItemForm вызвана')
  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  const addItemHandler = () => {
    if (title.trim() !== '') {
      addItem(title.trim())
      setTitle('')
    } else {
      setError('Title is required')
      setTitle('')
    }
  }

  const changeItemHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }

  const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null)
    }
    if (event.key === 'Enter') {
      addItemHandler()
    }
  }

  return (
    <div>
      <TextField
        label="Enter a title"
        variant={'outlined'}
        value={title}
        size={'small'}
        error={!!error}
        helperText={error}
        onChange={changeItemHandler}
        onKeyUp={addItemOnKeyUpHandler}
      />
      <IconButton onClick={addItemHandler} color={'primary'}>
        <AddBoxIcon />
      </IconButton>
    </div>
  )
})
