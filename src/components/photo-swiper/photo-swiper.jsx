import React, { useRef, useEffect, useState, useCallback } from 'react'
import './photo-swiper.scss'

import PhotoSwipe from 'photoswipe'
import 'photoswipe/dist/photoswipe.css'

function initImgs (imgs) {
  imgs = JSON.parse(JSON.stringify(imgs))
  return imgs.map((item) => {
    if (!item.w) {
      item.w = 0
      item.h = 0
    }
    return item
  })
}

function PhotoSwiper (props, ref) {
  const scaler = useRef(null)
  const swipe = useRef(null)
  const [curIndex, setCurIndex] = useState(0)

  useEffect(() => {
    const imgs = initImgs(props.imgList)
    const pswp = new PhotoSwipe(scaler.current, false, imgs, {
      pinchToClose: false, // 手指内聚（捏）是关闭画廊的手势
      closeOnVerticalDrag: false, // 垂直拖放关闭画廊
      ...props.options,
      index: Number(props.index)
    })
    pswp.listen('gettingData', function (index, item) {
      if (!item.w || !item.h) {
        const img = new Image()
        img.onload = function () {
          item.w = this.width
          item.h = this.height
          pswp.updateSize(true)
        }
        img.src = item.src
      }
    })
    pswp.listen('afterChange', function () {
      setCurIndex(pswp.getCurrentIndex() || 0)
    })
    pswp.init()
    swipe.current = pswp
  }, [props.imgList, props.options, props.index])

  const close = useCallback(
    () => {
      console.log('close')
      window.history.back()
    },
    []
  )

  return (
    <div ref={scaler} style={props.pswpStyle} className='pswp' tabIndex='-1' role='dialog'>
      <div className='pswp__bg' />
      <div onClick={close} className='pswp__scroll-wrap'>
        <div className='pswp__container'>
          <div className='pswp__item' />
          <div className='pswp__item' />
          <div className='pswp__item' />
        </div>
        <div className='yolk-pswp__header' />
        <div className='yolk-pswp__footer'>
          <p>{curIndex + 1}/{props.imgList.length}</p>
        </div>
      </div>
    </div>
  )
}

export default React.memo(React.forwardRef(PhotoSwiper))
