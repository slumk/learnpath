export const upvoteCapsule = async (capsuleId) => {
  const upvoteStatus = await fetch('/api/learner/upvote/' + capsuleId,
    { method: 'PUT' }
  )
  if (await upvoteStatus.status === 202) {
    return true
  }
  return false
}

export const minusUpvoteCapsule = async (capsuleId) => {
  const status = await fetch('/api/learner/upvote/minus/' + capsuleId,
    { method: 'PUT' }
  )
  if (await status.status === 202) {
    return true
  }
  return false
}
