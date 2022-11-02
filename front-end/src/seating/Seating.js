import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { listTables, seat } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the /reservations/:reservation_id/seat page
 * @returns {JSX.Element}
 */

export default function Seating() {
// --- hooks, state, misc. ---
    const history = useHistory();
    const [tables, setTables] = useState([]);
    const [tablesErr, setTablesErr] = useState(null);
    const [seatData, setSeatData] = useState("");
    const [seatErr, setSeatErr] = useState(null);
    const { reservation_id } = useParams();

// --- useEffect ---
    useEffect(()=>{
        function getTables(){
            const abortController = new AbortController();
            listTables(abortController.signal)
                .then(setTables)
                .catch(setTablesErr)
            return () => abortController.abort();
        };

        getTables();
    }, []);

// --- handlers ---
    const handleInputChange = ({ target }) => {
        setSeatData(target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const abortController = new AbortController();
        seat(reservation_id, seatData, abortController.signal)
            .then(() => {
                history.push("/dashboard")
                setSeatData("")
            })
            .catch(setSeatErr)
        return () => abortController.abort()
    };

    const handleCancel = (e) => {
        e.preventDefault();
        history.go(-1);
    };

// --- return ---
    return(
        <div className="container-fluid">
            <h1>Seat reservation #{reservation_id}</h1>
            <ErrorAlert error={tablesErr}/>
            <ErrorAlert error={seatErr}/>
            <form
                onSubmit={handleSubmit}
                className="row row-cols-1 row-cols-md-2 align-items-center">
                <select 
                    name="table_id"
                    onChange={handleInputChange}
                    value={seatData}
                    className="form-control form-select col col-md-10">
                    <option value="">Choose a table</option>
                    {tables.map((table, _idx) => {
                        return <option
                            key={table.table_id}
                            value={table.table_id}>{table.table_name} - {table.capacity}</option>
                    })}
                </select>
                <div className="btn-group my-2 col col-md-2" role="group">
                    <button 
                        type="submit" 
                        className="btn btn-secondary">Seat</button>
                    <button 
                        onClick={handleCancel}
                        className="btn btn-secondary">Cancel</button>
                </div>
            </form>
        </div>
    )
};