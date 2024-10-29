import React from 'react'
import './App.css'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useSelector } from 'react-redux'
import { AppRootStateType } from '../state/store'
import { getTheme } from '../common/theme'
import { Header } from '../Header'
import { Main } from '../Main'

type ThemeMode = 'dark' | 'light'

export function App() {
  const themeMode = useSelector<AppRootStateType, ThemeMode>((state) => state.app.themeMode)
  const theme = getTheme(themeMode)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Main />
    </ThemeProvider>
  )
}
