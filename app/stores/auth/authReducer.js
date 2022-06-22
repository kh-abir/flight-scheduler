import * as authActions from './authActions'

const initialState = {
  isAuthenticated: false,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authActions.AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload,
      }
    default:
      return state
  }
}

export default authReducer
