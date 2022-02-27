import errorImage from '../../icons/error.png'
export const ErrorPage = () => (
    <div className="h-screen container mx-auto flex flex-col place-content-center">
        <div className='relative'>
        <img src={errorImage} width="450px" height="450px" className='mx-auto'/>
        <h1 className="text-6xl text-center">
            Oops, Something Happened
            </h1>
        </div>
    </div>
)
