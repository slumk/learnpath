export const fetchPending = async (neededTeachers) => {
  if (neededTeachers) {
    let pendingTeachers = await fetch('/api/mod/fetch/pending/teachers')
    if (await pendingTeachers.status === 200) {
      pendingTeachers = await pendingTeachers.json()
      return pendingTeachers.data
    }
    return false
  } else {
    let pendingCapsules = await fetch('/api/mod/fetch/pending/capsules')
    if (await pendingCapsules.status === 200) {
      pendingCapsules = await pendingCapsules.json()
      return pendingCapsules.data
    }
    return false
  }
}
