export const validateEntries = (entries) => {
  const isEveryoneHere = checkPresence(entries)
  if (!isEveryoneHere[0]) {
    return isEveryoneHere[1]
  }
  const emailExp = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
  const nameExp = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/
  const passExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
  if (nameExp.test(entries.fullName)) {
    return 'Name Is Invalid'
  }
  if (entries.age) {
    if (entries.age < 12 || entries.age > 70) {
      return 'Age Is Not Permitted'
    }
  }
  if (!(entries.password1 === entries.password2)) {
    return 'Passwords Don\'t Match'
  }
  if (entries.password1 === entries.password2) {
    if (!(passExp.test(entries.password1))) {
      return 'Password Don\'t Meet Requirements'
    }
  }
  if (!(emailExp.test(entries.email))) {
    return 'Please Enter A Valid Email'
  }
  return true
}

const checkPresence = (state) => {
  if (!state.fullName) {
    return [false, 'Please Enter Your Full Name']
  }
  if (!state.age) {
    return [false, 'Enter Age']
  }
  if (!state.email) {
    return [false, 'Please Enter Your Email']
  }
  if (!state.password1) {
    return [false, 'Please Enter Password']
  }
  return [true, 'All Are There']
}
