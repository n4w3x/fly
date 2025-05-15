import { configureStore } from "@reduxjs/toolkit"

import apiReducer from "./apiSlice"
import filterReducer from "./filterSlice"
import sortReducer from "./sortSlice"

const store = configureStore({
  reducer: {
    api: apiReducer,
    filter: filterReducer,
    sort: sortReducer,
  },
})

export default store
