import { Component } from 'react'
import { createPortal } from 'react-dom'
const reportMessageRoot = document.getElementById('report-reason')

class ReportModal extends Component {
  constructor (props) {
    super(props)
    this.ele = document.createElement('div')
  }

  componentDidMount () {
    reportMessageRoot.appendChild(this.ele)
  }

  componentWillUnmount () {
    reportMessageRoot.removeChild(this.ele)
  }

  render () {
    return createPortal(
      this.props.children,
      this.ele
    )
  }
}

export default ReportModal
