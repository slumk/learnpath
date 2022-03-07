export const fetchReportedCapsules = async () => {
  const ownReportedCapsules = await fetch('/api/teacher/view/reported/capsules')
  if (await ownReportedCapsules.status === 200) {
    const reportedCapsules = await ownReportedCapsules.json()
    return reportedCapsules
  }
  return false
}
