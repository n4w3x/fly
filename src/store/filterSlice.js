import { createSlice } from "@reduxjs/toolkit"

const initialState = [
  { label: "Все", value: "all", checked: false },
  { label: "Без пересадок", value: "direct", checked: true },
  { label: "1 пересадка", value: "one-stop", checked: true },
  { label: "2 пересадки", value: "two-stop", checked: true },
  { label: "3 пересадки", value: "three-stop", checked: false },
]

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    toggleAll: (state, action) => {
      return state.map((el) =>
        el.checked !== action.payload
          ? { ...el, checked: !el.checked }
          : { ...el }
      )
    },

    toggleFilter: (state, action) => {
      return state.map((el) =>
        el.value === action.payload
          ? { ...el, checked: !el.checked }
          : { ...el }
      )
    },
  },
})

export const { toggleAll, toggleFilter } = filterSlice.actions

export default filterSlice.reducer
