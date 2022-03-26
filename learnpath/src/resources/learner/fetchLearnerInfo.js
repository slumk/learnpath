export const fetchLearnerInfo = async () => {
  let info = await fetch('/api/learner/my/info')
  if (await info.status === 200) {
    info = await info.json()
    return info.data
  }
  return false
}

export const chopBookmarksAndUpvoted = async () => {
  let bookmarks = await fetchLearnerInfo()
  bookmarks = bookmarks.bookmarks
  let upvoted = await fetchLearnerInfo()
  upvoted = upvoted.upvoted_capsules
  return [bookmarks, upvoted]
}
