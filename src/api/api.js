const _mainURL = "https://aviasales-test-api.kata.academy/"

const fetchApi = (url) => {
  return fetch(url).then((res) => res.json())
}

export const setSearchId = () => {
  if (sessionStorage.getItem("searchId")) {
    console.log("Using existing searchId from sessionStorage")
    return sessionStorage.getItem("searchId")
  }

  return fetchApi(`${_mainURL}search`).then(({ searchId }) => {
    console.log("Generated new searchId:", searchId)
    sessionStorage.setItem("searchId", searchId)
    return searchId
  })
}

const MAX_ERRORS = 5

export const getTickets = async () => {
  const searchId = await setSearchId()

  let allTickets = []
  let errorsCount = 0
  let stop = false

  console.log("Starting ticket retrieval...")

  while (!stop) {
    try {
      console.log(`Fetching tickets with searchId: ${searchId}`)
      const response = await fetchApi(`${_mainURL}tickets?searchId=${searchId}`)
      console.log("Server response:", response)

      if (response.stop) {
        console.log(
          "Received 'stop' flag from server. Ending ticket retrieval."
        )
        stop = true
        sessionStorage.removeItem("searchId")
      }

      if (response.tickets && response.tickets.length > 0) {
        console.log(`Received ${response.tickets.length} tickets.`)
        allTickets = [...allTickets, ...response.tickets]
      } else {
        console.log("No tickets found in this response.")
      }

      errorsCount = 0
    } catch (error) {
      console.error("Error fetching tickets:", error)
      errorsCount++

      if (errorsCount >= MAX_ERRORS) {
        throw new Error("Превышено количество ошибок при запросах")
      }
    }
  }

  return { tickets: allTickets }
}
