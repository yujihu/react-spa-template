import React from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import classNames from 'classnames'
import Mask from '../mask'
import './toast.scss'

export default class Notification extends React.PureComponent {
  constructor (props) {
    super(props)
    this.close = this.close.bind(this)
    this.startCloseTimer = this.startCloseTimer.bind(this)
    this.clearCloseTimer = this.clearCloseTimer.bind(this)
    this.close = this.close.bind(this)
    this.state = {
      show: true
    }
  }

  close () {
    this.setState({
      show: false
    })
    this.clearCloseTimer()
    this.props.onClose && this.props.onClose()
  }

  startCloseTimer () {
    const { duration } = this.props
    if (duration) {
      this.closeTimer = window.setTimeout(() => {
        this.close()
      }, duration)
    }
  }

  clearCloseTimer () {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer)
      this.closeTimer = -1
    }
  }

  componentDidMount () {
    this.startCloseTimer()
  }

  componentWillUnmount () {
    this.clearCloseTimer()
  }

  render () {
    const { className, message, content, mask, style, icon } = this.props
    const { show } = this.state

    return (
      <>
        {mask && (
          <CSSTransition in={show} timeout={300} classNames='fade' unmountOnExit>
            <Mask transparent />
          </CSSTransition>
        )}
        <CSSTransition in={show} timeout={300} classNames='fade' unmountOnExit>
          <div className={classNames('pm-toast', className)} style={style}>
            <div className='pm-toast__notice'>
              <i className={
                classNames('pm-toast__icon', `pm-toast__icon--${icon}`)
              }
              />
              <div className='pm-toast__message'>{message}</div>
              {!!content && <div className='pm-toast__content'>{content}</div>}
            </div>
          </div>
        </CSSTransition>
      </>
    )
  }
}

Notification.defaultProps = {
  duration: 1500,
  mask: false,
  icon: 'none'
}

Notification.newInstance = (properties, callback) => {
  const div = document.createElement('div')
  document.body.appendChild(div)

  let called = false
  function ref (instance) {
    if (called) {
      return
    }
    called = true

    // eslint-disable-next-line
    callback && callback({
      component: instance,
      destroy () {
        ReactDOM.unmountComponentAtNode(div)
        div && div.parentNode && div.parentNode.removeChild(div)
      }
    })
  }

  ReactDOM.render(<Notification {...properties} ref={ref} />, div)
}
