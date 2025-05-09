const _mainURL = "https://aviasales-test-api.kata.academy/"

export const fetchApi = (url) => {
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
