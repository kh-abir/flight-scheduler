export const AUTHENTICATED = 'AUTHENTICATED'

export const authenticate = (isAuthenticated) => {
  return {
    type: AUTHENTICATED,
    payload: isAuthenticated,
  }
}
