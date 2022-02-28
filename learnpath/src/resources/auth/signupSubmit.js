import { validateEntries } from './formValidator'

export const createLearner = async (state) => {
  if (validateEntries(state) !== true) {
    const responseMessage = validateEntries(state)
    return [false, responseMessage]
  }
  const { fullName, age, email, password2 } = state
  const reqBody = {
    name: fullName,
    age: age,
    email: email,
    password: password2,
    gender: state.gender,
    region: state.region
  }
  const isLearnerCreated = await fetch('/api/user/create/account',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqBody)
    })
  if (await isLearnerCreated.status === 202) {
    return [true, 'Successfully Created']
  }
  return [false, 'Try Again']
}
