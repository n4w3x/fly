import React, { useEffect, useState } from "react"
import { connect } from "react-redux"

import ShowMore from "../ShowMore/ShowMore"
import Spinner from "../../UI/Spinner/Spinner"
import { getTicketsTC } from "../../actions/apiActions"

import Ticket from "./Ticket/Ticket"
import styles from "./Tickets.module.css"

const Tickets = ({ tickets, sort, filter, error, isLoading, getTicketsTC }) => {
  const [count, setCount] = useState(5)

  useEffect(() => {
    getTicketsTC()
  }, [])

  const sortingValue = sort.filter((el) => el.checked)[0].value

  const filterTicketsList = (list, filterValue) => {
    const selectedStops = filterValue
      .filter((item) => item.checked)
      .map((item) => {
        switch (item.value) {
          case "direct":
            return 0
          case "one-stop":
            return 1
          case "two-stop":
            return 2
          case "three-stop":
            return 3
          default:
            return null
        }
      })

    if (selectedStops.length === 0) return []

    return list.filter((ticket) => {
      const stopsTo = ticket.segments[0].stops.length
      const stopsBack = ticket.segments[1].stops.length
      return (
        selectedStops.includes(stopsTo) && selectedStops.includes(stopsBack)
      )
    })
  }

  const sortingTicketsList = (list, sortingValue) => {
    if (sortingValue === "cheapest")
      return [...list].sort((a, b) => a.price - b.price)

    if (sortingValue === "fastest")
      return [...list].sort(
        (a, b) =>
          a.segments[0].duration +
          a.segments[1].duration -
          (b.segments[0].duration + b.segments[1].duration)
      )

    if (sortingValue === "optimal")
      return [...list].sort(
        (a, b) =>
          a.segments[0].stops.length +
          a.segments[1].stops.length -
          (b.segments[0].stops.length + b.segments[1].stops.length)
      )
  }

  const ticketsList = sortingTicketsList(
    filterTicketsList(tickets, filter),
    sortingValue
  ).slice(0, count)

  const onClick = () => {
    setCount((prevCount) => prevCount + 5)
  }

  const ticketView =
    ticketsList.length > 0 && !isLoading && !error ? (
      <>
        <ul className={styles.list}>
          {ticketsList.map((ticket, id) => (
            <li className={styles.item} key={id}>
              <Ticket ticket={ticket} />
            </li>
          ))}
        </ul>
        <ShowMore onClick={onClick} />
      </>
    ) : null

  const noMatchView =
    ticketsList.length === 0 && !error && !isLoading ? (
      <p className={styles["no-match"]}>
        Рейсов, подходящих под заданные фильтры, не найдено
      </p>
    ) : null

  const errorView = error ? (
    <p className={styles.error}>
      Что-то пошло не так, пожалуйста обновите страницу
    </p>
  ) : null

  const spinner = isLoading && !error ? <Spinner fontSize={60} /> : null

  return (
    <>
      {ticketView}
      {noMatchView}
      {errorView}
      {spinner}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    tickets: state.apiReducer.tickets,
    sort: state.sortReducer,
    filter: state.filterReducer,
    error: state.apiReducer.error,
    isLoading: state.apiReducer.isLoading,
  }
}

export default connect(mapStateToProps, { getTicketsTC })(Tickets)
