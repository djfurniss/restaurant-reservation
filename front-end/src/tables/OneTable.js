import { useHistory } from "react-router";
import { finishTable, updateResStatus } from "../utils/api";

export default function OneTable ({ table }) {
    const history = useHistory();

    const handleFinish = async() => {
        window.confirm("Is this table ready to seat new guests?") && 
        await finishTable(table.table_id) && 
        await updateResStatus(table.reservation_id, "finished") &&
        history.go(0)
    };

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
                    onClick={handleFinish}
                    data-table-id-finish={table.table_id}
                    >finish
                </button>
            </td>}
        </tr>
    )
};