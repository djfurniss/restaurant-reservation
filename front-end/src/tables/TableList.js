import React from "react";
import OneTable from "../tables/OneTable";

export default function TableList ({ tables }) {
    return (
        <div>
            <table className="table table-striped table-borderless">
                <thead>
                    <tr>
                        <th scope="col">Table</th>
                        <th scope="col">Capacity</th>
                        <th scope="col">Availability</th>
                    </tr>
                </thead>
                <tbody>
                    {tables.map((table, _idx) => {
                       return <OneTable key={_idx} table={table} />
                    })}
                </tbody>
            </table>
        </div>
    )
};