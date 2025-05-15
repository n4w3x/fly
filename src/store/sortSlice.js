import { createSlice } from "@reduxjs/toolkit"

const initialState = [
  { value: "cheapest", text: "Самый дешевый", checked: true },
  { value: "fastest", text: "Самый быстрый", checked: false },
  { value: "optimal", text: "Оптимальный", checked: false },
]

const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    sorting: (state, action) => {
      return state.map((el) =>
        el.value === action.payload
          ? { ...el, checked: true }
          : { ...el, checked: false }
      )
    },
  },
})

export const { sorting } = sortSlice.actions

export default sortSlice.reducer
