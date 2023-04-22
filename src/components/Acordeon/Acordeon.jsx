import styles from './Acordeon.module.css'
import { useState } from 'react'
import { BiPlus } from 'react-icons/bi'
import { BsPersonVcard } from 'react-icons/bs'
import { IoChevronForward } from 'react-icons/io5'

export default function Acordeon() {
  const [isActive, setIsActive] = useState('')
  return (
    <section>
      <div className={`${styles.faq} ${isActive === 'first' && styles.active}`}>
        <div
          className={styles.question}
          onClick={() => setIsActive(isActive === 'first' ? '' : 'first')}>
          <BsPersonVcard className={styles.mainIcon} />

          <div className={styles.test}>
            <h3
              onClick={() => setIsActive(isActive === 'first' ? '' : 'first')}>
              What is a Javascript
            </h3>

            <div
              className={`${styles.iconBox} ${
                isActive === 'first' ? styles.active : ''
              }`}>
              {isActive === 'first' ? (
                <IoChevronForward className={styles.icon} />
              ) : (
                <BiPlus className={styles.icon} />
              )}
            </div>
          </div>
        </div>
        <div className={styles.answer}>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate
            rerum minus explicabo libero cumque, rem distinctio ducimus unde
            debitis non dolores maxime ex repudiandae dolor qui praesentium amet
            suscipit delectus.
          </p>
        </div>
      </div>

      <div
        className={`${styles.faq} ${isActive === 'second' && styles.active}`}>
        <div
          className={styles.question}
          onClick={() => setIsActive(isActive === 'second' ? '' : 'second')}>
          <BsPersonVcard className={styles.mainIcon} />

          <div className={styles.test}>
            <h3>What is a React and Redux</h3>

            <div
              className={`${styles.iconBox} ${
                isActive === 'second' ? styles.active : ''
              }`}>
              {isActive === 'second' ? (
                <IoChevronForward className={styles.icon} />
              ) : (
                <BiPlus className={styles.icon} />
              )}
            </div>
          </div>
        </div>
        <div className={styles.answer}>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate
            rerum minus explicabo libero cumque, rem distinctio ducimus unde
            debitis non dolores maxime ex repudiandae dolor qui praesentium amet
            suscipit delectus.
          </p>
        </div>
      </div>

      <div className={`${styles.faq} ${isActive === 'three' && styles.active}`}>
        <div
          className={styles.question}
          onClick={() => setIsActive(isActive === 'three' ? '' : 'three')}>
          <BsPersonVcard className={styles.mainIcon} />

          <div className={styles.test}>
            <h3
              onClick={() => setIsActive(isActive === 'three' ? '' : 'three')}>
              Learn mySql and Express.js
            </h3>

            <div
              className={`${styles.iconBox} ${
                isActive === 'three' ? styles.active : ''
              }`}>
              {isActive === 'three' ? (
                <IoChevronForward className={styles.icon} />
              ) : (
                <BiPlus className={styles.icon} />
              )}
            </div>
          </div>
        </div>
        <div className={styles.answer}>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate
            rerum minus explicabo libero cumque, rem distinctio ducimus unde
            debitis non dolores maxime ex repudiandae dolor qui praesentium amet
            suscipit delectus.
          </p>
        </div>
      </div>
    </section>
  )
}
