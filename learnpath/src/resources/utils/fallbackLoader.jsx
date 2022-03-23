import BigLoadingIcon from '../../icons/loading_big.png'
const FallBackLoader = () => {
  return (
        <div className="grid max-h-full place-content-center">
          <img src={BigLoadingIcon} width="50px" height="50px" className='animate-spin place-self-center' />
        </div>
  )
}
export default FallBackLoader
