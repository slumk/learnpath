export const handleSubmit = async (email, password) => {
  const userCred = {
    email: email,
    password: password
  }
  const isLoggedin = await fetch('api/user/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userCred)
    })
  if (await isLoggedin.status === 200) {
    return true
  }
  return false
}

export const handleAdminSubmit = async (ademail, adpassword) => {
  const adminCred = {
    email: ademail,
    password: adpassword
  }
  const isLoggedin = await fetch('/api/admin/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(adminCred)
    })
  if (isLoggedin.status === 200) {
    return true
  }
  return false
}
