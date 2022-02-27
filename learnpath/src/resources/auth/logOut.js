export const logoutUser = async () => {
  const isLoggedOut = await fetch('/api/user/logout',
    {
      method: 'POST'
    })
  if (await isLoggedOut.status === 200) {
    return true
  }
  return false
}
