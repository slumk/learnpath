export const fetchLearners = async () => {
  let learners = await fetch('/api/boss/fetch/all/learners')
  if (await learners.status === 200) {
    learners = await learners.json()
    return learners
  }
  return false
}
