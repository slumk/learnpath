export const initialData = {
  name: '',
  desc: '',
  publichandle: ''
}

export const upgradeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, ...{ name: action.payload } }
    case 'SET_DESC':
      return { ...state, ...{ desc: action.payload } }
    case 'SET_URL':
      return { ...state, ...{ publichandle: action.payload } }
    case 'SET_NICHE':
      return { ...state, ...{ niche: action.payload } }
    default:
      break
  }
}
