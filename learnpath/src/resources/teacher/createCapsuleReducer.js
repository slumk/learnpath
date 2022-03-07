export const initialData = {
  label: '',
  yt_src: '',
  description: '',
  tags: [],
  isCreationSuccess: false,
  moonjya: false
}

export const createCapsuleReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CAPSULE_LABEL':
      return { ...state, ...{ label: action.payload } }
    case 'SET_YT_SRC':
      return { ...state, ...{ yt_src: action.payload } }
    case 'SET_DESC':
      return { ...state, ...{ description: action.payload } }
    case 'SET_TAGS':
      return { ...state, ...{ tags: action.payload } }
    case 'IT_WORKED':
      return { ...state, ...{ isCreationSuccess: true } }
    case 'MOONJI':
      return { ...state, ...{ moonjya: true } }
    default:
      break
  }
}
