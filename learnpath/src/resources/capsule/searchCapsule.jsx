import { useEffect, useReducer, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { buildThumbnailURL } from './fetchCapsules'
import likedIcon from '../../icons/liked.png'
import { returnHumanizedDateAndTime } from '../mod/pendingGrid'
import loadingIcon from '../../icons/loading_big.png'

const searchingState = {
  loading: true,
  got_response: [],
  found: false,
  is_failed: false
}

export const Loading = () => {
  document.title = 'Please Wait...'
  return (
    <div className='grid justify-center'>
      <img src={loadingIcon} width="80px" height="80px" className='mx-auto animate-spin' />
      <h3 className='font-semibold'>Please Wait...</h3>
      </div>
  )
}

const NotFound = () => {
  document.title = 'Not Found'
  return (
    <div className='grid h-screen'>
      <div className='place-self-center'>
      <h1 id='nothing-here' className='text-6xl'>Oops... No Results Found</h1>
      </div>
      </div>
  )
}
export const SearchResults = ({ capsule }) => {
  const [thumbnail, setThumbnailLink] = useState('')
  useEffect(async () => {
    setThumbnailLink(buildThumbnailURL(await capsule))
  }, [capsule])
  return (
      <div className='p-3 m-3 mt-2 container flex justify-center'>
        <div className='flex gap-2'>
        <Link to={'/capsule/' + capsule._id}>
          <img src={thumbnail} width="150px" height="200px" />
          </Link>
        <div className='grid'>
          <div className='flex flex-col'>
            <Link to={'/capsule/' + capsule._id}>
              <h3 className='text-2xl font-bold'>{capsule.label}</h3>
              </Link>
            <span className='italic text-sm'>{capsule.description}</span>
            <span className='italic'>Created At {returnHumanizedDateAndTime(capsule.created_date)}</span>
          </div>
          <div className='flex gap-1'>
            <img src={likedIcon} width='30px'/>
          <span className='self-center text-xl font-semibold'>{ capsule.upvote_count }</span>
          </div>
          </div>
      </div>
      </div>
  )
}

const searchCapsuleReducer = (state, action) => {
  switch (action.type) {
    case 'NOT_FOUND':
      return { loading: false, is_failed: true, got_response: [] }
    case 'GOT_RESULT':
      return { got_response: action.payload, loading: false }
  }
}

const SearchCapsule = () => {
  const { name } = useParams()
  const [searchState, dispatch] = useReducer(searchCapsuleReducer, searchingState)
  useEffect(async () => {
    const searchResponse = await fetch('/api/capsules/search/' + name)
    if (await searchResponse.status === 404) {
      return dispatch({ type: 'NOT_FOUND' })
    }
    const searchResults = await searchResponse.json()
    dispatch({ type: 'GOT_RESULT', payload: await searchResults })
    document.title = 'Search Results For ' + name
  }, [name])
  return (
    <div>
      {
        searchState.loading
          ? <Loading />
          : searchState.is_failed
            ? <NotFound />
            : searchState.got_response
              ? <div className='mt-8'>
                {(searchState.got_response.result).map((item) => <SearchResults key={item._id} capsule={item} />)}
              </div>
              : <div>Not Found </div>
      }
      </div>
  )
}
export default SearchCapsule
