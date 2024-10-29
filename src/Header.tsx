import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from './state/store'
import { getTheme } from './common/theme'
import { changeThemeAC, ThemeMode } from './app/app-reducer'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { MenuButton } from './MenuButton'
import Switch from '@mui/material/Switch'
import React from 'react'

export const Header = () => {
  const themeMode = useSelector<AppRootStateType, ThemeMode>((state) => state.app.themeMode)
  const dispatch = useDispatch()
  const theme = getTheme(themeMode)

  const changeModeHandler = () => {
    dispatch(changeThemeAC(themeMode === 'light' ? 'dark' : 'light'))
  }

  return (
    <AppBar position="static" sx={{ mb: '30px' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
        <div>
          <MenuButton>Login</MenuButton>
          <MenuButton>Logout</MenuButton>
          <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
          <Switch color={'default'} onChange={changeModeHandler} />
        </div>
      </Toolbar>
    </AppBar>
  )
}
