import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { today, previous, next } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsList from "../reservations/ReservationsList";
import TableList from "../tables/TableList";

/**
 * Defines the /dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @param setDate 
 * a function to change the state of date
 * @returns {JSX.Element}
 */

export default function Dashboard({date, setDate}) {
// --- hooks, state, & misc. ---
  const query = useQuery();
  const history = useHistory();
  const [reservations, setReservations] = useState([]);
  const [reservationsErr, setReservationsErr] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesErr, setTablesErr] = useState(null);
  
// --- useEffect ---
  useEffect(() => {
    function loadDashboard() {
      const abortController = new AbortController();
    //clears any existing errors on page reload
      setReservationsErr(null);
      setTablesErr(null);
      listReservations({ date }, abortController.signal)
        .then(setReservations)
        .catch(setReservationsErr);
      listTables(abortController.signal)
        .then(setTables)
        .catch(setTablesErr);
      return () => abortController.abort();
    };
    
    // if the page is loaded with no query, one is generated with the default date
    if (!query.get("date")){
      query.set("date", date)
      // these two steps are taken to make sure the URL is updated and not just the value of the query
      // essentially, a new window.location is made from the query and history is used to push to that "page"
      var newRelativePathQuery = `${window.location.pathname}?${query.toString()}`
      history.push(newRelativePathQuery);
    };
    // otherwise, if there's a date in the query that's not the default date, this function will make sure the date state is updated to the date that's manually typed in the query
    updateQuery(query.get("date"));
    loadDashboard();
  }, [date]); 

// --- helper functions ---
  /**
   * Since the query can be updated by changing state with clicking buttons *OR* by manually chaning the url, 
   * This function is used inside the useEffect but defined outside of it so that it can also be used by any handlers that need to update the query
   * 
   * @param {*} newDate 
   * a date that date's state is going to change to
   */
  function updateQuery(newDate){
    query.set("date", newDate)
    setDate(query.get("date"))
    // these two steps are taken to make sure the URL is updated and not just the value of the query
    // essentially, a new window.location is made from the new query and history is used to push to that "page"
    var newRelativePathQuery = `${window.location.pathname}?${query.toString()}`
    history.push(newRelativePathQuery);
  };
    
// --- return ---
  return (
    <main className="container-fluid">
      <h1>Reservations for {date}</h1>

      <div className="btn-group" role="group">
        <button 
          onClick={()=>updateQuery(previous(date))}
          className="btn btn-secondary">Previous Day</button>
        <button 
          onClick={()=>updateQuery(today())}
          className="btn btn-secondary">Today</button>
        <button 
          onClick={()=>updateQuery(next(date))}
          className="btn btn-secondary">Next Day</button>
      </div>

      <ErrorAlert error={reservationsErr} />
      <ReservationsList reservations={reservations} purpose={"dashboard"}/>

      <h1 className="mt-5">Tables</h1>
      <ErrorAlert error={tablesErr} />
      {tables.length ?
      <TableList tables={tables}/> :
      <p>No tables</p>
      }
    </main>
  );
};
