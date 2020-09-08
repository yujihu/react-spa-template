import React, { useState, useEffect } from 'react'
import './scroll-show.scss'

import { throttle, on, off } from '@yolkpie/utils'

import { CSSTransition } from 'react-transition-group'

function ScrollShow (props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      setVisible(scrollTop > props.displayHeight)
    }, 300)
    on(window, 'scroll', handleScroll)
    return () => {
      off(window, 'scroll', handleScroll)
    }
  }, [props.displayHeight])

  return (
    <CSSTransition in={visible} timeout={300} classNames='fade' unmountOnExit>
      <div className={props.className}>
        {props.children}
      </div>
    </CSSTransition>
  )
}

export default React.memo(ScrollShow)
