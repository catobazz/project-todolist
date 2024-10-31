import React, { memo } from 'react'
import Button, { ButtonProps } from '@mui/material/Button'

type CustomButtonProps = ButtonProps & {
  title: string
}

const CustomButton = memo(({ title, ...props }: CustomButtonProps) => {
  console.log(`CustomButton "${title}" вызван`)

  return <Button {...props}>{title}</Button>
})

export default CustomButton
