export const filterButtonsContainerSx = {
  display: 'flex',
  justifyContent: 'space-between',
}

export const getListItemSx = (isDone: boolean) => ({
  p: 0,
  justifyContent: 'space-between',
  opacity: isDone ? 0.5 : 1,
})
//---------------------------------

// import { SxProps } from '@mui/material'
//
// export const filterButtonsContainerSx: SxProps = {
//   display: 'flex',
//   justifyContent: 'space-between',
// }
//
// export const getListItemSx = (isDone: boolean): SxProps => ({
//   p: 0,
//   justifyContent: 'space-between',
//   opacity: isDone ? 0.5 : 1,
// })

// Заметка: если оставить такую запись с пропсами, то компонента тудулист вешает шторм и мой ноут дымит.
