import styles from './AlreadyLogined.module.css'
import { Link } from 'react-router-dom'
import { IoIosCloudDone } from 'react-icons/io'
import { motion } from 'framer-motion'

export default function AlreadyLogined() {
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

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      className={styles.container}>
      <motion.div
        variants={textAnimation}
        custom={1}
        className={styles.iconContainer}>
        <IoIosCloudDone className={styles.icon} />
      </motion.div>
      <motion.h1 variants={textAnimation} custom={2} className={styles.text}>
        Hello! It looks like you are already logged in as an administrator
      </motion.h1>
      <motion.div
        variants={textAnimation}
        custom={3}
        className={styles.linkContainer}>
        <Link to="/admin/admindashboard" className={styles.linkToDashboard}>
          Go to Admin dashboard
        </Link>
      </motion.div>
    </motion.div>
  )
}
