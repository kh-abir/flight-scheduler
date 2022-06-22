import { combineReducers } from 'redux'

import tabReducer from './tab/tabReducer'
import authReducer from './auth/authReducer'

export default combineReducers({
  tabReducer,
  authReducer,
})
