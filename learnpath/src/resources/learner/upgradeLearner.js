export const upgradeLearner = async (teacherData) => {
  const isCreated = await fetch('/api/learner/request/upgrade',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(teacherData)
    })
  if (await isCreated.status === 202) {
    return true
  }
  return false
}
