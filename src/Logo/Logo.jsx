import React from "react"

import { ReactComponent as LogoImage } from "./../assets/logo.svg"
import styles from "./Logo.module.css"

const Logo = () => {
  return (
    <div className={styles.logo}>
      <LogoImage />
    </div>
  )
}

export default Logo
