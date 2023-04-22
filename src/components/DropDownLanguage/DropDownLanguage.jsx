import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'
import styles from './DropDownLanguage.module.css'

const DropDownLanguage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('ENG')

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language)
    setIsOpen(false)
  }

  return (
    <div className={styles.dropdownContainer}>
      <div
        className={styles.selectedLanguage}
        onClick={() => setIsOpen(!isOpen)}>
        {selectedLanguage} {isOpen ? <FaAngleUp /> : <FaAngleDown />}
      </div>
      <CSSTransition
        in={isOpen}
        timeout={100}
        classNames={{
          enter: styles.dropdownEnter,
          enterActive: styles.dropdownEnterActive,
          exit: styles.dropdownExit,
          exitActive: styles.dropdownExitActive,
        }}
        unmountOnExit>
        <div className={styles.dropdownMenu}>
          <div
            className={styles.dropdownItem}
            onClick={() => handleLanguageChange('ENG')}>
            ENG
          </div>
          <div
            className={styles.dropdownItem}
            onClick={() => handleLanguageChange('ARM')}>
            ARM
          </div>
          <div
            className={styles.dropdownItem}
            onClick={() => handleLanguageChange('RUS')}>
            RUS
          </div>
        </div>
      </CSSTransition>
    </div>
  )
}

export default DropDownLanguage
