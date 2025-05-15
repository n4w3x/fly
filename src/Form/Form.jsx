import React from "react"
import { useDispatch, useSelector } from "react-redux"

import { toggleFilter, toggleAll } from "../store/filterSlice"
import Checkbox from "../UI/Checkbox/Checkbox"

import styles from "./Form.module.css"

const Form = () => {
  const dispatch = useDispatch()
  const checkboxList = useSelector((state) => state.filter)

  const toggleFilterHandler = (checked, value) => {
    const all = { ...checkboxList[0] }
    const points = checkboxList.slice(1)

    if (value === "all") {
      dispatch(toggleAll(checked))
    } else {
      if (all.checked && !checked) {
        dispatch(toggleFilter("all"))
      } else if (
        points.filter((item) => item.checked).length === 3 &&
        !all.checked &&
        checked
      ) {
        dispatch(toggleFilter("all"))
      }
      dispatch(toggleFilter(value))
    }
  }

  return (
    <form className={styles.form}>
      <fieldset className={styles.fieldset}>
        <legend>Количество пересадок</legend>
        <div className={styles.wrapper}>
          {checkboxList.map(({ label, value, checked }, id) => (
            <Checkbox
              key={id}
              value={value}
              label={label}
              checked={checked}
              toggleFilter={toggleFilterHandler}
            />
          ))}
        </div>
      </fieldset>
    </form>
  )
}

export default Form
