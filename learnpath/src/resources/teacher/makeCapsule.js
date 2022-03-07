export const createCapsule = async (capsuleData) => {
  const isCapsuleCreated = await fetch('/api/teacher/capsule/create/new',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(capsuleData)
    })
  if (await isCapsuleCreated.status === 202) {
    return true
  }
  return false
}
