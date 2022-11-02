import React, { useState } from "react";
import { useHistory } from "react-router";
import { finishTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import OneTable from "../tables/OneTable";

/**
 * Responsible for rendering a list of tables
 * @param tables 
 * an array of tables passed from Dashboard
 * @returns {JSX.Element}
 */

export default function TableList ({ tables }) {
// --- state & hooks ---
    const history = useHistory();
    const [finishErr, setFinishErr] = useState(null);

// --- handler ---
    const handleFinish = (table_id) => {
        window.confirm("Is this table ready to seat new guests?") && 
        finishTable(table_id).catch(setFinishErr) && 
        history.go(0);
    };

    return (
        <div>
            <ErrorAlert error={finishErr}/>
            <table className="table table-striped table-borderless">
                <thead>
                    <tr>
                        <th scope="col">Table</th>
                        <th scope="col">Capacity</th>
                        <th scope="col">Availability</th>
                    </tr>
                </thead>
                <tbody>
                    {tables.map((table) => {
                       return <OneTable 
                        key={table.table_id} 
                        table={table} 
                        handleFinish={handleFinish}/>
                    })}
                </tbody>
            </table>
        </div>
    )
};