import React from 'react'
import './skeleton.scss'

function Skeleton () {
  return (
    <div className='skeleton-container'>
      <div className='skeleton-animation' />
      <div className='skeleton-item skeleton-item-1' />
      <div className='skeleton-container-1'>
        <div className='skeleton-container-2'>
          <div className='skeleton-item skeleton-item-2' />
          <div className='skeleton-item skeleton-item-2' />
        </div>
        <div className='skeleton-container-3'>
          <div className='skeleton-container-4'>
            <div className='skeleton-item skeleton-item-3' />
            <div className='skeleton-item skeleton-item-4' />
          </div>
          <div className='skeleton-container-4'>
            <div className='skeleton-item skeleton-item-3' />
            <div className='skeleton-item skeleton-item-4' />
          </div>
        </div>
      </div>
      <div className='skeleton-item skeleton-item-5' />
      <div className='skeleton-item skeleton-item-6' />
    </div>
  )
}

export default Skeleton
