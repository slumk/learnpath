import { Component } from 'react'
import { createPortal } from 'react-dom'
const modalRoot = document.getElementById('modal-root')

class Modal extends Component {
  constructor (props) {
    super(props)
    this.endi = document.createElement('div')
  }

  componentDidMount () {
    modalRoot.appendChild(this.endi)
  }

  componentWillUnmount () {
    modalRoot.removeChild(this.endi)
  }

  render () {
    return createPortal(
      this.props.children,
      this.endi
    )
  }
}

export default Modal
