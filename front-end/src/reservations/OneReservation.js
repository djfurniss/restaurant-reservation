import { useHistory } from "react-router";
import { updateStatus } from "../utils/api";

export default function OneReservation({ resv, purpose }){
    const history = useHistory();

    return (
        purpose === "dashboard" && resv.status === "finished" || resv.status === "cancelled" ? null :
        <tr>
            <td>{`${resv.first_name} ${resv.last_name}`}</td>
            <td>{resv.mobile_number}</td>
            <td>{resv.reservation_date}</td>
            <td>{resv.reservation_time}</td>
            <td>{resv.people}</td>
            <td data-reservation-id-status={`${resv.reservation_id}`} >{resv.status}</td>
            {resv.status === "booked" &&
            <td>
                <button 
                    onClick={()=>history.push(`/reservations/${resv.reservation_id}/seat`)}
                    href={`/reservations/${resv.reservation_id}/seat`}>
                    Seat
                </button>
            </td>}
            {resv.status === "booked" &&
             <td>
                <button 
                    onClick={()=>history.push(`/reservations/${resv.reservation_id}/edit`)}
                    href={`/reservations/${resv.reservation_id}/edit`}>
                    Edit
                    </button>
            </td>}
            <td>
                <button 
                    onClick={()=>{
                        window.confirm("Do you want to cancel this reservation? This cannot be undone.") 
                        && updateStatus(resv.reservation_id, "cancelled") 
                        && history.go(0)
                    }}
                    data-reservation-id-cancel={resv.reservation_id}>Cancel</button>
            </td>
        </tr>
    )
};