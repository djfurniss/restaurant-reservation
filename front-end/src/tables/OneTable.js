import React from "react";

/**
 * Responsible for rendering information for one table
 * @param table 
 * a single table
 * @param handleFinish 
 * a reference to a function that ends seating for a given table
 * @returns {JSX.Element}
 * a table row to be rendered into a tbody in TableList
 */

export default function OneTable ({ table, handleFinish }) {
    return (
        <tr>
            <td scope="row">{table.table_name}</td>
            <td>{table.capacity}</td>
            <td data-table-id-status={table.table_id}>
                {table.reservation_id ? "Occupied" : "Free"}
            </td>
            <td>
            {table.reservation_id 
            ? <button 
                onClick={()=>handleFinish(table.table_id)}
                data-table-id-finish={table.table_id}
                className="btn btn-sm btn-secondary">finish</button> 
            : null}
            </td>
        </tr>
    )
};