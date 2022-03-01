export const upgradeLearner = async (learnerId) => {
  const request = { learner_id: learnerId }
  const isModCreated = await fetch('/api/boss/register/new/mod',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    }
  )
  if (await isModCreated.status === 202) {
    return true
  }
  return false
}
