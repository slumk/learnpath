export const bookmarkCapsule = async (capsuleId) => {
  const isBookmarked = await fetch('/api/learner/bookmark/' + capsuleId, {
    method: 'PUT'
  })
  if (await isBookmarked.status === 202) {
    return true
  }
  return false
}

export const removeBookmark = async (capsuleId) => {
  const isRemoved = await fetch('/api/learner/bookmark/remove/' + capsuleId, {
    method: 'PUT'
  })
  if (await isRemoved.status === 202) {
    return true
  }
  return false
}
