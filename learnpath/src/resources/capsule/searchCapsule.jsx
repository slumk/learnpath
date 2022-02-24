import { useEffect, useReducer } from 'react'
import { useParams } from 'react-router-dom'
import { buildThumbnailURL, CapsuleGrid } from './fetchCapsules'

const searchingState = {
  loading: true,
  got_response: [],
  found: false,
  is_failed: false
}

const Loading = () => {
  document.title = 'Searching...'
  return (
    <div>
      Loading
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
const SearchResults = ({ capsule }) => {
  buildThumbnailURL(capsule)
  return (
      <CapsuleGrid key={capsule._id} capsule={capsule} />
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

export const SearchCapsule = () => {
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
              ? <div className='container mx-auto'>
                <h1 className='text-3xl mx-3 mt-2'>Search Results</h1>
               <div className='container mt-3 mx-auto text-center grid grid-cols-3 gap-2'>
                {(searchState.got_response.result).map((item) => <SearchResults key={item._id} capsule={item} />)}
                </div>
                </div>
              : <div>Not Found </div>
      }
      </div>
  )
}
