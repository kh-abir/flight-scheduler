import * as authActions from './authActions'

const initialState = {
  isAuthenticated: false,
  currentUser: {},
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authActions.AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload,
      }
    case authActions.CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      }
    default:
      return state
  }
}

export default authReducer
