export type ThemeMode = 'dark' | 'light'

type InitialState = typeof initialState

const initialState = {
  themeMode: 'light' as ThemeMode,
}

export const appReducer = (state: InitialState = initialState, action: ActionsType): InitialState => {
  switch (action.type) {
    case 'CHANGE-THEME':
      return { ...state, themeMode: action.themeMode }
    default:
      return state
  }
}

// Action creators
export const changeThemeAC = (theme: ThemeMode) => {
  return { type: 'CHANGE-THEME', themeMode: theme } as const
}

// Actions types
type ChangeThemeActionType = ReturnType<typeof changeThemeAC>

type ActionsType = ChangeThemeActionType
