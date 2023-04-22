import styles from './Contacts.module.css'
import { TiSocialFacebookCircular } from 'react-icons/ti'
import { BsInstagram } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { useRef, useEffect } from 'react'
import { setContactUs } from '../../store/sections/sectionsAction'

export default function Contacts() {
  const dispatch = useDispatch()
  const contactRef = useRef(null)

  useEffect(() => {
    if (contactRef.current) {
      dispatch(setContactUs(contactRef))
    }
  }, [dispatch])

  return (
    <section ref={contactRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h2 className={styles.title}>Contacts</h2>

          <div className={styles.infos}>
            <div className={styles.address}>
              <h3 className={styles.addressTitle}>Address</h3>
              <span className={styles.addressContent}>
                Nikoghosyan Tigranyan 27
              </span>
              <span className={styles.addressContent}>0014</span>
              <span className={styles.addressContent}>Yerevan,Armenia</span>
              <span className={styles.addressContent}>+374 91011909</span>
            </div>
            <div className={styles.officeHourse}>
              <h3 className={styles.officeHourseTitle}>Office Hourse</h3>
              <span className={styles.officeHourseContent}>
                Monday-Saturday
              </span>
              <span className={styles.officeHourseContent}>10:00 - 19:00</span>
              <span className={styles.officeHourseContent}>Sunday</span>
              <span className={styles.officeHourseContent}>Closed</span>
            </div>
          </div>

          <div className={styles.socialMedia}>
            <div className={styles.socialMediaContent}>
              <h2 className={styles.socialMediaTitle}>Follow Us</h2>
              <div className={styles.socialMediaIcons}>
                <TiSocialFacebookCircular
                  className={styles.socialMediaIconFacebook}
                />
                <BsInstagram className={styles.socialMediaIconInstagram} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <iframe
            allowFullScreen
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3154.338657737359!2d44.51852300196301!3d40.21150078152246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406aa2b56fd3b6db%3A0xf509d5e641d55149!2s21%20Nikoghayos%20Tigranyan%20St%2C%20Yerevan!5e0!3m2!1sru!2sam!4v1680883715874!5m2!1sru!2sam"
            width="600"
            height="450"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className={styles.map}
          />
        </div>
      </div>
    </section>
  )
}
