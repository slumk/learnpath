import { FetchCapsules } from '../capsule/fetchCapsules'
import { SearchCapsule } from '../capsule/searchCapsule'
import { FooterPage } from './footerPage'

export const MainPageComponent = ({ searched }) => {
  if (searched) {
    return (
      <SearchCapsule name={searched} />
    )
  }
  return (
    <div>
      <FetchCapsules />
    <FooterPage />
      </div>
  )
}
