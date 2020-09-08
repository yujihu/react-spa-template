import React, { useMemo, useCallback } from 'react'
import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group'
import Mask from '../mask'
import { createPortal } from 'react-dom'
import './popup.scss'

function Popup (props) {
  const { show, popupTransition, maskTransition, maskCloseable = true, onCancel, className, style, usePortal, children } = props

  const onMaskClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget && maskCloseable && onCancel) {
        onCancel(e)
      }
    },
    [maskCloseable, onCancel]
  )

  const content = useMemo(() => {
    return (
      <div>
        <CSSTransition in={show} timeout={300} classNames={maskTransition} unmountOnExit>
          <Mask onClick={onMaskClick} />
        </CSSTransition>

        <CSSTransition in={show} timeout={300} classNames={popupTransition} unmountOnExit>
          <div className={classNames('pm-popup', className)} style={style} onClick={onMaskClick}>
            {children}
          </div>
        </CSSTransition>
      </div>
    )
  }, [children, className, maskTransition, onMaskClick, popupTransition, show, style])
  if (usePortal) {
    return createPortal(content, document.body)
  }
  return content
}

export default React.memo(Popup)
