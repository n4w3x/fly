import React from "react"
import { useDispatch, useSelector } from "react-redux"

import { sorting } from "../../store/sortSlice"

import styles from "./Tabs.module.css"

const Tabs = () => {
  const dispatch = useDispatch()
  const sortValues = useSelector((state) => state.sort)

  const handleTabClick = (value) => {
    dispatch(sorting(value))
  }

  return (
    <div className={styles.wrapper}>
      {sortValues.map((item, id) => {
        return (
          <div
            key={id}
            className={`${styles.tab} ${item.checked ? styles["tab-current"] : ""}`}
            onClick={item.checked ? () => {} : () => handleTabClick(item.value)}
          >
            <span>{item.text}</span>
          </div>
        )
      })}
    </div>
  )
}

export default Tabs
