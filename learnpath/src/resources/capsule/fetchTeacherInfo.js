export const fetchTeacherInfo = async (teacherId) => {
  const teacherInfo = await fetch('/api/capsules/teacher/' + teacherId)
  if (await teacherInfo.status === 404) {
    return false
  }
  return await teacherInfo.json()
}

export const fetchTeacherName = async (teacherId) => {
  const teacher = await fetchTeacherInfo(teacherId)
  if (!(await teacher)) {
    return 'Deleted Account'
  }
  return await teacher.teacher_name
}
