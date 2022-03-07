export const deleteOwnCapsule = async (capsuleId) => {
  const isDeleted = await fetch('/api/teacher/capsule/delete/' + capsuleId,
    {
      method: 'DELETE'
    })
  if (await isDeleted.status === 202) {
    return true
  }
  return false
}
