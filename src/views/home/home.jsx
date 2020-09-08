import React, { useEffect } from 'react'
import styles from './home.module.scss'
import Toast from '_c/toast'

export default function Home () {
  useEffect(() => {
    Toast.success({
      message: '欢迎您',
      content: '启动项目成功'
    })
  }, [])

  return <div className={styles.home}>home</div>
}
