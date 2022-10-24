import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ListReservations from "../reservations/ListReservations";
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
    function updateQuery(){
      query.set("date", date);
      var newRelativePathQuery = `${window.location.pathname}?${query.toString()}`
      history.push(newRelativePathQuery);
    };

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

    updateQuery();
    loadDashboard();
  }, [date]);
    
// --- return ---
  return (
    <main>
      <h1>Dashboard</h1>
      <ErrorAlert error={reservationsError} />

      <button onClick={()=>setDate(previous(date))}>Previous Day</button>
      <button onClick={()=>setDate(today())}>Today</button>
      <button onClick={()=>setDate(next(date))}>Next Day</button>

      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>

      {reservations.length ?
      <ListReservations reservations={reservations}/> :
      <h1>No reservations</h1>}

      <h1>Tables</h1>
      {tables.length ?
      <TableList tables={tables}/> :
      <h2>No tables</h2>
      }

    </main>
  );
};

export default Dashboard;
