import React from "react"

import { ReactComponent as On } from "../../assets/checkbox-on.svg"
import { ReactComponent as Off } from "../../assets/checkbox-off.svg"

import styles from "./Checkbox.module.css"

const Checkbox = ({ label, toggleFilter, value, checked }) => {
  const checkboxView = checked ? <On /> : <Off />

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      toggleFilter(!checked, value)
    }
  }

  return (
    <div
      className={styles.wrapper}
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      onClick={() => toggleFilter(!checked, value)}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.marker}>{checkboxView}</div>
      <label className={styles.label}>{label}</label>
    </div>
  )
}

export default Checkbox
