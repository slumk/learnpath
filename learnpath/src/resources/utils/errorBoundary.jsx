import { Component } from 'react'
import { ErrorPage } from './errorPage'

export class ErrorBoundary extends Component {
  constructor (props) {
    super(props)
    this.state = { gotError: false }
  }

  componentDidCatch () {
    this.setState({ gotError: true })
  }

  render () {
    if (this.state.gotError) {
      return (
              <ErrorPage />
      )
    }
    return this.props.children
  }
}
