import { setStyle } from '../'

export const withWidgetStyle = setStyle([
  ['align-items', 'flex-start'],
  ['background', '#f7f7f7'],
  ['bottom', 0],
  ['box-shadow', '0 1px 4px #444'],
  ['color', '#222'],
  ['display', 'flex'],
  ['font-size', '20px'],
  ['left', 0],
  ['overflow-x', 'scroll'],
  ['padding', '10px'],
  ['position', 'absolute'],
  ['width', '100vw']
])

export const withListStyle = setStyle([
  ['align-items', 'flex-start'],
  ['display', 'flex'],
  ['flex-direction', 'row'],
  ['flex-wrap', 'no-wrap']
])

export const onClearBtnEnter = setStyle([
  ['background', '#f45'],
  ['color', '#f7f7f7'],
  ['box-shadow', '0 0 4px #666']
])

export const onClearBtnLeave = setStyle([
  ['background', '#f78'],
  ['color', '#fff']
])

export const withBtnStyle = setStyle([
  ['align-self', 'flex-start'],
  ['background', '#f78'],
  ['border', 'none'],
  ['box-shadow', '0 0 2px #666'],
  ['color', '#fff'],
  ['cursor', 'pointer'],
  ['display', 'none'],
  ['font-size', '14px'],
  ['margin', '0 0 0 10px'],
  ['padding', '2px 5px 5px'],
  ['transition', 'all 200ms ease-in-out']
])

export const withH4Style = setStyle([['margin', '0 10px 0 0']])

export const withFlashStyle = setStyle([
  ['box-shadow', '0 0 5px tomato'],
  ['transition', 'box-shadow 200ms ease']
])
