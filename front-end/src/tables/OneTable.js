import React from "react";

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
                    className="btn btn-sm btn-secondary">finish
                </button> 
                : null}
            </td>
        </tr>
    )
};