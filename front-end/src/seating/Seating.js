import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { listTables } from "../utils/api";

export default function Seating() {
    const history = useHistory();
    const [tables, setTables] = useState([]);
    const { reservation_id } = useParams();

    useEffect(()=>{
        function getTables(){
            const abortController = new AbortController();
            listTables(abortController.signal)
            .then(setTables)
            return () => abortController.abort();
        };

        getTables();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("submitted")
        // some api call to update a table on the tables table
        // .then...
        // history.push("/dashboard")
    };

    return(
        <div>
            <h1>Seat reservation #{reservation_id}</h1>
            <form
                onSubmit={handleSubmit}>
                <label>Select a table</label>
                <select name="table_id">
                    {tables.map((table, _idx) => {
                        return <option
                            key={_idx}
                            value={table.table_id}>{table.table_name} - {table.capacity}</option>
                    })}
                </select>
                <button type="submit">Seat</button>
                <button onClick={()=>history.go(-1)}>Cancel</button>
            </form>
        </div>
    )
};