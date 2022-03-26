import { Component, useContext } from 'react'
import { createPortal } from 'react-dom'
import { BubbleMessageContext } from '../../App'
const messageRoot = document.getElementById('message-root')

class BubbleMessageModal extends Component {
  constructor (props) {
    super(props)
    this.ele = document.createElement('div')
  }

  componentDidMount () {
    messageRoot.appendChild(this.ele)
  }

  componentWillUnmount () {
    messageRoot.removeChild(this.ele)
  }

  render () {
    return createPortal(
      this.props.children,
      this.ele
    )
  }
}

export const BubbleMessage = () => {
  const { bubbleMessage, isMessageShown, updateMessageDisplayStatus } = useContext(BubbleMessageContext)
  return (
    <div className={`${isMessageShown ? null : 'hidden'} w-full h-fit flex gap-5 justify-center flex-row fixed top-10 rounded-md p-1`}
    onClick={(e) => {
      e.preventDefault()
      updateMessageDisplayStatus(false)
    }}>
      <div className='w-1/2 p-2 px-4 rounded-full grid grid-cols-2 bg-green-100'>
        <div className='place-self-center flex gap-0.5'>
          <span>&#x2757;</span>
        <h1 className='italic'>
          {bubbleMessage}
          </h1>
          </div>
        <button
          className='place-self-end'>
        &#x274C;
        </button>
        </div>
    </div>
  )
}

export default BubbleMessageModal
