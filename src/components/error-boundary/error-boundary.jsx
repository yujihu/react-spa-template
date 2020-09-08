import React from 'react'
import styles from './error-boundary.module.scss'

import CountDown from '_c/count-down'

class ErrorBoundary extends React.Component {
  constructor (props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError (error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    console.log('---错误边界捕获到错误---', error)
    return { hasError: true }
  }

  componentDidCatch (error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
    console.log('---错误边界捕获到错误---', error, errorInfo)
  }

  handleOnEnd () {
    window.location.href = '//yujihu.top/'
  }

  render () {
    if (this.state.hasError) {
      return (
        <div className={styles.error}>
          <i className={styles.error__img} />
          <CountDown onEnd={this.handleOnEnd} leftTime={5000}>
            {({ secondNum }) => (
              <p className={styles.error__content}>
                页面发生异常，<span className={styles.popup__countdown}>{secondNum}</span>
                秒后跳转到首页
              </p>
            )}
          </CountDown>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
