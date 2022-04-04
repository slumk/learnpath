import { useReducer } from 'react'
import { createCapsuleReducer, initialData } from './createCapsuleReducer'
import tickIcon from '../../icons/tick.png'
import { createCapsule } from './makeCapsule'

export const CreateCapsule = () => {
  const [formState, dispatch] = useReducer(createCapsuleReducer, initialData)
  const niches = [
    'Programming',
    'Mathematics',
    'Science',
    'English',
    'History',
    'Art',
    'Music',
    'Drama',
    'Physical Education',
    'Foreign Languages',
    'Other'
  ]
  const pushToTagsArray = (tags) => {
    const tagsArray = tags.split(',')
    dispatch({ type: 'SET_TAGS', payload: tagsArray })
  }
  if (!formState.isCreationSuccess) {
    return (
      <div className="w-100">
        <hr />
        <h1 className="text-center font-bold py-5 text-2xl">Create Capsule</h1>
        <img className='mx-auto pb-4' src={ formState.yt_src ? buildThumbnail(formState.yt_src) : null } />
        <form className="grid m-auto px-5 gap-4"
          onSubmit={async (e) => {
            e.preventDefault()
            if (await createCapsule(formState)) {
              return dispatch({ type: 'IT_WORKED' })
            }
            return dispatch({ type: 'MOONJI' })
          }}>
          <input type="text" className="placeholder:italic p-2 rounded-lg border-4 w-100" maxLength="40" placeholder="Enter Capsule Name"
          onChange={(e) => (dispatch({ type: 'SET_CAPSULE_LABEL', payload: e.target.value }))}/>
          <input type="text" className="placeholder:italic p-2 rounded-lg border-4 w-100" maxLength="40" placeholder="Enter YouTube Link (e:g: youtu.be)"
          onChange={(e) => (dispatch({ type: 'SET_YT_SRC', payload: e.target.value }))}/>
          <textarea placeholder='Enter Description (Max.Length 200)' maxLength="200" className="placeholder:italic p-2 rounded-lg border-4 w-100"
            onChange={(e) => (dispatch({ type: 'SET_DESC', payload: e.target.value }))} />
          <select
            className='py-2 px-1 rounded-full bg-amber-300'
          onChange={(e) => (dispatch({
            type: 'SET_NICHE',
            payload: e.target.value
          }))}>
            {niches.map((niche) => (
              <option key={niche}>{ niche }</option>
            ))}
            </select>
          <div className='flex flex-col gap-0.5'>
            <input type="text" className="placeholder:italic p-1 rounded-lg border-4 w-100" maxLength="40" placeholder="Add Tags"
              onBlur={(e) => pushToTagsArray(e.target.value)} />
            <span className='text-md italic'>( Seperate Tags By Commas )</span>
          </div>
          <div className='flex gap-5 justify-center'>
            <button type='submit' className='rounded-full border-4 border-black p-2 bg-green-200 hover:bg-green-500'>Create Capsule</button>
            <button type='reset' className='rounded-full border-4 border-black p-2 bg-red-200 hover:bg-red-500'>Reset</button>
          </div>
        </form>
        { formState.moonjya
          ? <div className='flex'>
          <span className='text-center'>Error Occured</span>
        </div>
          : null }
        </div>
    )
  }
  return (
    <div className='mx-auto container h-1/4'>
      <div className='grid place-content-center place-items-center'>
        <img src={tickIcon} />
        <h1 className='font-mono font-semibold'>
          Capsule Created, Awaiting Approval
        </h1>
      </div>
    </div>
  )
}

const buildThumbnail = (ytSource) => {
  const ytId = ytSource.slice(17) // it's good if the thumbnail url generated before saving in DB
  const ytUrl = 'https://img.youtube.com/vi/' + ytId + '/0.jpg'
  return ytUrl
}
