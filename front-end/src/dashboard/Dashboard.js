import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ListReservations from "../reservations/ListReservations";
import { today, previous, next } from "../utils/date-time";
import useQuery from "../utils/useQuery";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard() {
// --- hooks / misc. ---
  const query = useQuery();
  let [date, setDate] = useState(today())
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  
// --- useEffect --- 
  useEffect(getQuery, []);
    // ^ in a separate useEffect with no dependencies so it uses setDate() once and the next useEffect can dynamically change and doesn't continuously setDate() using the satic query string in the URL
  useEffect(loadDashboard, [date]);
  
  function getQuery(){
      if (query.get("date")){
        setDate(query.get("date"))
      };
  };
    
  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  };

// --- return ---
  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>

      {reservations.length ?
      <ListReservations reservations={reservations}/> :
      <h1>No reservations</h1>}
      
      <ErrorAlert error={reservationsError} />
      <button onClick={()=>setDate(previous(date))}>Previous Day</button>
      <button onClick={()=>setDate(next(date))}>Next Day</button>
    </main>
  );
};

export default Dashboard;
