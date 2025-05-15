import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import { fetchApi, setSearchId } from "../api/api"

export const getTicketsTC = createAsyncThunk(
  "api/getTickets",
  async (_, { rejectWithValue }) => {
    let errorsCount = 0
    const MAX_ERRORS = 5
    let stop = false
    const searchId = await setSearchId()
    while (!stop) {
      try {
        const response = await fetchApi(
          `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`
        )

        if (response.tickets && response.tickets.length > 0) {
          return response.tickets
        }
        if (response.stop) {
          stop = true
          sessionStorage.removeItem("searchId")
        }

        errorsCount = 0
      } catch (error) {
        errorsCount++
        console.error("Ошибка при получении билетов:", error)

        if (errorsCount >= MAX_ERRORS) {
          return rejectWithValue("Ошибка при получении билетов")
        }
      }
    }
  }
)
const initialState = {
  tickets: [],
  error: null,
  isLoading: false,
}
const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTicketsTC.pending, (state) => {
        if (state.tickets.length === 0) {
          state.isLoading = true
        } else {
          state.isFetching = true
        }
        state.error = null
      })
      .addCase(getTicketsTC.fulfilled, (state, action) => {
        state.isLoading = false
        state.isFetching = false
        if (Array.isArray(action.payload)) {
          state.tickets = [...state.tickets, ...action.payload]
        } else {
          console.error("Expected an array, but got:", action.payload)
        }
      })
      .addCase(getTicketsTC.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || "Произошла неизвестная ошибка"
      })
  },
})

export default apiSlice.reducer
