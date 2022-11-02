import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsList from "../reservations/ReservationsList";
import TableList from "../tables/TableList"
import useQuery from "../utils/useQuery";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({date, setDate, today, previous, next}) {
// --- hooks / misc. ---
  const query = useQuery();
  const history = useHistory();
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  
// --- useEffect ---
useEffect(() => {
  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables(abortController.signal)
      .then(setTables)
    return () => abortController.abort();
  };
  
  // if the page is loaded with no query, one is generated with the default date
  if (!query.get("date")){
    query.set("date", date)
    // these two steps are taken to make sure the URL is updated and not just the value of the query
    var newRelativePathQuery = `${window.location.pathname}?${query.toString()}`
    history.push(newRelativePathQuery);
  };
  // otherwise, if there's a date in the query that's not the default date, this function will make sure the date state is updated to the date that's manually typed in the query
  updateQuery(query.get("date"));
  loadDashboard();
}, [date]); 

// --- helper functions ---
  /**
   * Since the query can be updated by changing state with clicking buttons OR by manually chaning the url, 
   * this function is defined outside of the useEffect to be used in it but also to be used by any handlers that need to update the query
   * 
   * @param {*} newDate 
   */
function updateQuery (newDate) {
  query.set("date", newDate)
  setDate(query.get("date"))
  // these two steps are taken to make sure the URL is updated and not just the value of the query
  var newRelativePathQuery = `${window.location.pathname}?${query.toString()}`
  history.push(newRelativePathQuery);
};
    
// --- return ---
  return (
    <main className="container-fluid">
      <h1>Reservations for {date}</h1>
      <ErrorAlert error={reservationsError} />

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

      {reservations.length ?
      <ReservationsList reservations={reservations} purpose={"dashboard"}/> :
      <p className="text-danger">No reservations</p>}

      <h1 className="mt-5">Tables</h1>
      {tables.length ?
      <TableList tables={tables}/> :
      <h2>No tables</h2>
      }

    </main>
  );
};

export default Dashboard;
