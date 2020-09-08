import React, { useLayoutEffect } from 'react'
import classNames from 'classnames'
import fixMask from './fixMask'
import './mask.scss'

function Mask (props) {
  const { transparent, className } = props
  useLayoutEffect(() => {
    const classes = document.body.className
    document.body.className = classNames(classes, 'mask-open')
    fixMask()

    return () => {
      const classes = document.body.className.replace(/(^| )mask-open( |$)/, ' ')
      document.body.className = classNames(classes).trim()
    }
  }, [])
  return (
    <div className={classNames('pm-mask', {
      'pm-mask--transparent': transparent
    }, className)}
    />
  )
}

export default React.memo(Mask)
