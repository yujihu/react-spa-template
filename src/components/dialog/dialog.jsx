import React, { useCallback } from 'react'
import classNames from 'classnames'
import Popup from '../popup'
import './dialog.scss'

function Dialog (props) {
  const {
    show,
    onClose,
    maskCloseable,
    className,
    style,
    maskTransition,
    dialogTransition,
    header,
    footer,
    children
  } = props

  const onMaskClick = useCallback(
    (e) => {
      if (!maskCloseable) return
      onClose && onClose(e)
    },
    [maskCloseable, onClose]
  )

  return (
    <Popup
      show={show}
      maskTransition={maskTransition}
      popupTransition={dialogTransition}
      maskCloseable={false}
      usePortal
    >
      <div className='pm-dialog' onClick={onMaskClick}>
        <div className={classNames('pm-dialog__content', className)} style={style}>
          {header && <div className='pm-dialog__header'>{header()}</div>}
          <div className='pm-dialog__body'>{children}</div>
          {footer && <div className='pm-dialog__footer'>{footer()}</div>}
        </div>
      </div>
    </Popup>
  )
}

Dialog.defaultProps = {
  style: {},
  show: false,
  maskCloseable: false,
  maskTransition: 'fade',
  dialogTransition: 'zoom'
}

export default React.memo(Dialog)
