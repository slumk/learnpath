export const commentCapsule = async (capsuleId, commentText) => {
  const wasCommentSuccessful = await fetch('/api/learner/comment/' + capsuleId,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ comment_text: commentText })
    })
  if (await wasCommentSuccessful.status === 200) {
    return true
  }
  return false
}
