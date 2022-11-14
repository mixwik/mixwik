import styles from './Video.module.scss'

const Video = () => {
  return (
    <video className={styles.video} autoPlay loop muted>
      <source src={(require('../../public/sports.mp4'))} type='video/mp4' />
    </video>
  )
}

export default Video
