export const fetchLearnerInfo = async () => {
  let info = await fetch('/api/learner/my/info')
  info = await info.json()
  if (info) {
    return info.data
  }
  return {}
}
