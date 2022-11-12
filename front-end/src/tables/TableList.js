import React, { useState } from "react";
import { useHistory } from "react-router";
import { finishTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import OneTable from "../tables/OneTable";
import "../stylesheets/tables.css";

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
        <div id="TableList">
            <ErrorAlert error={finishErr}/>
            {tables.map(table => {
                return <OneTable table={table} handleFinish={handleFinish}/>
            })}
        </div>
    )
};