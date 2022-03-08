export const fetchLearnerInfo = async () => {
  let info = await fetch('/api/learner/my/info')
  info = await info.json()
  if (info) {
    return info.data
  }
  return {}
}

export const chopBookmarksAndUpvoted = async () => {
  let bookmarks = await fetchLearnerInfo()
  bookmarks = bookmarks.bookmarks
  let upvoted = await fetchLearnerInfo()
  upvoted = upvoted.upvoted_capsules
  return [bookmarks, upvoted]
}
