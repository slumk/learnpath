export const modFetchReportedCapsules = async () => {
  let reportedCapsules = await fetch('/api/mod/fetch/reported/capsules')
  if (await reportedCapsules.status === 200) {
    reportedCapsules = await reportedCapsules.json()
    return await reportedCapsules.data
  }
  return false
}
