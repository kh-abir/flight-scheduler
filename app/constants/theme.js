import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

export const COLORS = {
  primary: '#9fdeff',
  secondary: '#CDE6F9',
  transparentPrimary: 'rgba(227, 120, 75, 0.4)',
  yellow: '#FFD900',
  lightYellow: '#FCFFD9',
  orange: '#FFA133',
  lightOrange: '#FFE3C4',
  lightOrange2: '#FDDED4',
  lightOrange3: '#FFD9AD',
  green: '#27AE60',
  green1: '#4AD991',
  lightGreen: '#EFFFEE',
  red: '#FF1717',
  lightRed: '#FFF7F7',
  blue: '#0064C0',
  blue1: '#003f5c',
  blue2: '#6EC1F1',
  darkBlue: '#111A2C',
  darkGray: '#555353',
  darkGray2: '#757D85',
  gray: '#898B9A',
  gray2: '#BBBDC1',
  gray3: '#CFD0D7',
  lightGray1: '#DDDDDD',
  lightGray2: '#F5F5F8',
  white2: '#FBFBFB',
  white: '#FFFFFF',
  black: '#222222',

  transparent: 'transparent',
  transparentWhite: 'rgba(255,255,255,0.55)',
  transparentBlack1: 'rgba(0, 0, 0, 0.1)',
  transparentBlack7: 'rgba(0, 0, 0, 0.7)',
}
export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  largeTitle: 40,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  h5: 12,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
}

const appTheme = { COLORS, SIZES }

export default appTheme
