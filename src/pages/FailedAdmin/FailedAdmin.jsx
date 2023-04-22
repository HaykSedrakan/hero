import styles from './FailedAdmin.module.css'
import { BsFillHouseLockFill } from 'react-icons/bs'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function FailedAdmin() {
  const navigate = useNavigate()
  const textAnimation = {
    hidden: {
      y: -100,
      opacity: 0,
    },
    visible: (custom) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: custom * 0.3,
      },
    }),
  }

  function handleGoBack(e) {
    navigate(-1)
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      className={styles.container}>
      <motion.div
        variants={textAnimation}
        custom={1}
        className={styles.iconContainer}>
        <BsFillHouseLockFill className={styles.icon} />
      </motion.div>
      <motion.h1 variants={textAnimation} custom={2} className={styles.text}>
        Sorry, you do not have access to the site's admin panel
      </motion.h1>
      <motion.button
        variants={textAnimation}
        custom={3}
        className={styles.goBack}
        onClick={handleGoBack}>
        Go Back
      </motion.button>
    </motion.div>
  )
}
