import Notification from './toast'
let messageInstance = null

function getInstance (props, callback) {
  if (messageInstance) {
    messageInstance.destroy()
    messageInstance = null
  }

  Notification.newInstance(props, (notification) => {
    return callback && callback(notification)
  })
}

function notice ({
  message,
  content,
  icon = 'none',
  duration = 3000,
  onClose,
  mask = false
}) {
  if (!message) return
  function close () {
    if (messageInstance) {
      messageInstance.destroy()
      messageInstance = null
    }
    if (onClose) {
      onClose()
    }
  }
  getInstance({
    message,
    content,
    icon,
    duration,
    onClose: close,
    mask
  }, (notification) => {
    messageInstance = notification
  })
}

export default {
  show ({
    message,
    duration,
    onClose,
    mask
  }) {
    return notice({
      message,
      duration,
      onClose,
      mask
    })
  },
  success ({
    message,
    content,
    icon = 'success',
    duration,
    onClose,
    mask
  }) {
    return notice({
      message,
      content,
      icon,
      duration,
      onClose,
      mask
    })
  },
  fail ({
    message,
    content,
    icon = 'warn',
    duration,
    onClose,
    mask
  }) {
    return notice({
      message,
      content,
      icon,
      duration,
      onClose,
      mask
    })
  },
  hide () {
    if (messageInstance) {
      messageInstance.destroy()
      messageInstance = null
    }
  }
}
