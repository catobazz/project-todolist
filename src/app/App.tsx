import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { getTheme } from '../common/theme/theme'
import { Header } from '../common/components/Header/Header'
import { Main } from './Main'
import { useAppSelector } from '../common/hooks/useAppSelector'

export function App() {
  const themeMode = useAppSelector((state) => state.app.themeMode)
  const theme = getTheme(themeMode)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Main />
    </ThemeProvider>
  )
}
