const _mainURL = "https://aviasales-test-api.kata.academy/"

export const fetchApi = async (url) => {
  const res = await fetch(url)
  return await res.json()
}

export const setSearchId = () => {
  if (sessionStorage.getItem("searchId")) {
    return sessionStorage.getItem("searchId")
  }

  return fetchApi(`${_mainURL}search`).then(({ searchId }) => {
    sessionStorage.setItem("searchId", searchId)
    return searchId
  })
}
