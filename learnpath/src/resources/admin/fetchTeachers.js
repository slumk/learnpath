export const fetchAllTeachers = async () => {
  let allTeachers = await fetch('/api/boss/fetch/all/teachers')
  if (await allTeachers.status === 200) {
    allTeachers = await allTeachers.json()
    return allTeachers
  }
  return false
}
