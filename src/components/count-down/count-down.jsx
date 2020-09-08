import React, { useEffect, useState } from 'react'
import { on, off } from '@yolkpie/utils'

/**
 * 填充两位
 */
const fill2 = (v) => {
  v += ''
  while (v.length < 2) {
    v = '0' + v
  }
  return v
}
/**
 * @description: 格式化剩余时间
 * @param {type} 剩余时间
 * @return: rest对象
 */
const formatRestTime = (t) => {
  const ts = t
  const rest = {
    dayStr: '00',
    hourStr: '00',
    minuteStr: '00',
    secondStr: '00',
    dayNum: 0,
    hourNum: 0,
    minuteNum: 0,
    secondNum: 0
  }
  if (ts <= 0) {
    return rest
  } else {
    const ds = 24 * 60 * 60
    const hs = 60 * 60
    const ms = 60

    const d = ts >= ds ? parseInt(ts / ds) : 0
    const h = ts - d * ds >= hs ? parseInt((ts - d * ds) / hs) : 0
    const m = ts - d * ds - h * hs >= ms ? parseInt((ts - d * ds - h * hs) / ms) : 0
    const s = parseInt(ts - d * ds - h * hs - m * ms)

    rest.dayNum = d
    rest.hourNum = h
    rest.minuteNum = m
    rest.secondNum = s
    if (d >= 0) rest.dayStr = fill2(d)
    if (h >= 0) rest.hourStr = fill2(h)
    if (m >= 0) rest.minuteStr = fill2(m)
    if (s >= 0) rest.secondStr = fill2(s)
  }
  return rest
}

function CountDown (props) {
  const { leftTime, onEnd } = props
  const [restTimeObj, setRestTimeObj] = useState(() => formatRestTime(Math.round(leftTime / 1000)))
  const [pageVisible, setPageVisible] = useState(true)
  useEffect(() => {
    let restTime = Math.round(leftTime / 1000)
    let timer = null
    const countDown = () => {
      if (restTime > 0) {
        restTime -= 1
        setRestTimeObj(formatRestTime(restTime))
      }
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      if (restTime > 0) {
        timer = setTimeout(countDown, 1000)
      } else {
        onEnd && onEnd()
      }
    }
    if (pageVisible) {
      timer = setTimeout(countDown, 1000)
    }
    return () => {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
    }
  }, [leftTime, onEnd, pageVisible])
  // 页面隐藏后停止倒计时，页面显示后开始倒计时
  useEffect(() => {
    function onVisibilitychange () {
      if (document.visibilityState === 'visible') {
        setPageVisible(true)
      } else {
        setPageVisible(false)
      }
    }
    on(document, 'visibilitychange', onVisibilitychange)
    return () => {
      off(document, 'visibilitychange', onVisibilitychange)
    }
  }, [])
  return <div className={props.className}>{props.children(restTimeObj)}</div>
}

export default React.memo(CountDown)
