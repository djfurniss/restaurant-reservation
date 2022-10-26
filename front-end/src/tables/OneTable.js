import { useHistory } from "react-router";
import { finishTable } from "../utils/api";

export default function OneTable ({ table }) {
    const history = useHistory();
    return (
        <tr>
            <td>{table.table_name}</td>
            <td>{table.capacity}</td>
            <td data-table-id-status={table.table_id}>
                {table.reservation_id ? "Occupied" : "Free"}
            </td>
            {table.reservation_id && 
            <td>
                <button 
                    onClick={async()=>{
                        window.confirm("Is this table ready to seat new guests?") && 
                        await finishTable(table.table_id) && history.go(0)
                    }}
                    data-table-id-finish={table.table_id}
                    >finish
                </button>
            </td>}
        </tr>
    )
};