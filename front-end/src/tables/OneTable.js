import { useHistory } from "react-router";
import { finishTable, updateResStatus } from "../utils/api";

export default function OneTable ({ table }) {
    const history = useHistory();

    const handleFinish = async() => {
        window.confirm("Is this table ready to seat new guests?") && 
        await finishTable(table.table_id) && 
        history.go(0)
    };

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
                    onClick={handleFinish}
                    data-table-id-finish={table.table_id}
                    className="btn btn-sm btn-secondary">finish
                </button> 
                : null}
            </td>
        </tr>
    )
};