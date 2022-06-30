export const AUTHENTICATED = 'AUTHENTICATED'
export const CURRENT_USER = 'CURRENT_USER'

export const authenticate = (isAuthenticated) => {
  return {
    type: AUTHENTICATED,
    payload: isAuthenticated,
  }
}

export const setCurrentUser = (currentUser) => {
  return {
    type: CURRENT_USER,
    payload: currentUser,
  }
}
