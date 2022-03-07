export const approvePending = async (idOfPendingEndi, isTeacher) => {
  if (isTeacher) {
    const isApproved = await fetch('/api/mod/approve/teacher/' + idOfPendingEndi,
      { method: 'PUT' })
    if (await isApproved.status === 202) {
      console.log('true')
      return true
    }
    return false
  } else {
    const isApproved = await fetch('/api/mod/approve/capsule/' + idOfPendingEndi,
      { method: 'PUT' })
    if (await isApproved.status === 202) {
      return true
    }
    return false
  }
}
