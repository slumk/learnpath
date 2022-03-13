import { Component } from 'react'
import { createPortal } from 'react-dom'
const modalRoot = document.getElementById('modal-root')

class Modal extends Component {
  constructor (props) {
    super(props)
    this.ele = document.createElement('div')
  }

  componentDidMount () {
    modalRoot.appendChild(this.ele)
  }

  componentWillUnmount () {
    modalRoot.removeChild(this.ele)
  }

  render () {
    return createPortal(
      this.props.children,
      this.ele
    )
  }
}

export default Modal
