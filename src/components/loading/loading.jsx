import React from 'react'
import styles from './loading.module.scss'

function Loading (props) {
  return (
    <div className={styles.container}>
      <div className={styles.loading} />
    </div>
  )
}

export default React.memo(Loading)
