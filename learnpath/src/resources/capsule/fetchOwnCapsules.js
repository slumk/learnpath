export const fetchOwnCapsules = async (teacherId) => {
  const capsules = await fetch('/api/capsules/fetch/of/' + teacherId)
  if (await capsules.status === 200) {
    return await capsules.json()
  }
  return false
}
