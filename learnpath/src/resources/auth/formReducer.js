export const initialData = {
  fullName: '',
  age: '',
  email: '',
  region: 'Asia Pacific',
  gender: '',
  password1: '',
  password2: ''
}

export const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FULL_NAME':
      return { ...state, ...action }
    case 'SET_AGE':
      return { ...state, ...action }
    case 'SET_GENDER':
      return { ...state, ...action }
    case 'SET_REGION':
      return { ...state, ...action }
    case 'SET_EMAIL':
      return { ...state, ...action }
    case 'SET_PASSWORD1':
      return { ...state, ...action }
    case 'SET_PASSWORD2':
      return { ...state, ...action }
    default:
      break
  }
}
