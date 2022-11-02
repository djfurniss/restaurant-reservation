import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

export default function NewTable() {
// --- hooks, state, and misc. ---
    const history = useHistory();

    const INITIAL_TABLE_DATA = {
        table_name: "",
        capacity: 0
    };

    const [tableData, setTableData] = useState(INITIAL_TABLE_DATA);
    const [formErr, setFormErr] = useState(null);

// --- handlers ---
    const handleInputChange = ({ target }) => {
        setTableData({...tableData, [target.name]: target.value})
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const abortController = new AbortController();
        createTable(tableData, abortController.signal)
            .then(() => history.push("/"))
            .catch(setFormErr)
        return () => abortController.abort();
    };

// --- return ---
    return (
        <div className="container-fluid">
            <ErrorAlert error={formErr}/>
            <form
                onSubmit={handleSubmit}>
                    <label
                        htmlFor="table_name" 
                        className="form-label">Table Name</label>
                    <input 
                        name="table_name"
                        type="text"
                        value={tableData.table_name}
                        onChange={handleInputChange}
                        required
                        className="form-control"/>
                    <label
                        htmlFor="capacity" 
                        className="form-label">Table Capacity</label>

                    <input 
                        name="capacity"
                        type="number"
                        value={tableData.capacity}
                        onChange={handleInputChange}
                        required
                        className="form-control"/>        
                <div className="btn-group my-2" role="group">
                    <button 
                        type="submit" 
                        className="btn btn-secondary">Add Table</button>
                    <button 
                        onClick={()=>history.go(-1)}
                        className="btn btn-secondary">Cancel</button>
                </div>
            </form>
        </div>
    )
};

