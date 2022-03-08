export const banTeacher = async (teacherId) => {
  const reqBody = { teacher_id: teacherId }
  const isBanned = await fetch('/api/boss/ban/teacher',
    {
      method: 'PUT',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  if (await isBanned.status === 202) {
    return true
  }
  return false
}
