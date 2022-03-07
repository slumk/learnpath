export const fetchMyCapsules = async () => {
  let myCapsules = await fetch('/api/teacher/view/own/capsules')
  if (myCapsules.status === 200) {
    myCapsules = await myCapsules.json()
    return myCapsules
  }
  return false
}
