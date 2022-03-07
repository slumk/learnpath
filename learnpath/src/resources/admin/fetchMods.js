export const fetchMods = async () => {
  let learners = await fetch('/api/boss/fetch/all/mods')
  if (await learners.status === 200) {
    learners = await learners.json()
    return learners
  }
  return false
}
