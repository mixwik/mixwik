import styles from './Video.module.scss'

const HomeVideo = () => {
  return (
    <video className={styles.video} autoPlay loop muted>
      <source src={require('../../public/sports2.webm')} type='video/webm' />
    </video>
  )
}

export default HomeVideo
