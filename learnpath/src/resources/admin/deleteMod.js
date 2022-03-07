export const deleteMod = async (modId) => {
  const reqendi = {
    mod_id: modId
  }
  const isDeleted = await fetch('/api/boss/destroy/mod',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqendi)
    }
  )
  if (await isDeleted.status === 202) {
    return true
  }
  return false
}
