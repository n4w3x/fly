import { fetchApi, setSearchId } from "../api/api"

const getTicketsAC = (payload) => ({ type: "getTickets", payload })
const toggleErrorAC = (payload) => ({ type: "error", payload })
const toggleLoadingAC = (payload) => ({ type: "loading", payload })

export const getTicketsTC = () => async (dispatch) => {
  dispatch(toggleLoadingAC(true))

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
        dispatch(getTicketsAC(response.tickets))
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
        dispatch(toggleErrorAC(true))
        break
      }
    }
  }

  dispatch(toggleLoadingAC(false))
}
