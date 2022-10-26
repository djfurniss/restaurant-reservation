import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { listTables, seat, updateResStatus } from "../utils/api";

export default function Seating() {
// --- hooks, state, misc. ---
    const history = useHistory();
    const [tables, setTables] = useState([]);
    const [seatData, setSeatData] = useState("");
    const [seatErr, setSeatErr] = useState(null);
    const { reservation_id } = useParams();

// --- useEffect ---
    useEffect(()=>{
        function getTables(){
            const abortController = new AbortController();
            listTables(abortController.signal)
            .then(setTables)
            .catch(err => setSeatErr(err.message))
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
                updateResStatus(reservation_id, "seated", abortController.signal)
            })
            .catch(err => setSeatErr(err.message))
        return () => abortController.abort()
    };

    const handleCancel = (e) => {
        e.preventDefault();
        history.go(-1);
    };

// --- return ---
    return(
        <div>
            <h1>Seat reservation #{reservation_id}</h1>
            {seatErr ? <p className="alert alert-danger">{seatErr}</p> : null}
            <form
                onSubmit={handleSubmit}>
                <label>Select a table</label>
                <select 
                    name="table_id"
                    onChange={handleInputChange}
                    value={seatData}>
                    <option value="">Choose a table</option>
                    {tables.map((table, _idx) => {
                        return <option
                            key={_idx}
                            value={table.table_id}>{table.table_name} - {table.capacity}</option>
                    })}
                </select>
                <button type="submit">Seat</button>
                <button onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    )
};