import { useHistory } from "react-router";

export default function OneReservation({ resv }){
    const history = useHistory();

    return (
        resv.status != "finished" && 
        <tr>
            <td>{`${resv.first_name} ${resv.last_name}`}</td>
            <td>{resv.mobile_number}</td>
            <td>{resv.reservation_date}</td>
            <td>{resv.reservation_time}</td>
            <td>{resv.people}</td>
            <td data-reservation-id-status={resv.reservation_id} >{resv.status}</td>
            {resv.status == "booked" &&
            <td>
                <button 
                    onClick={()=>history.push(`/reservations/${resv.reservation_id}/seat`)}
                    href={`/reservations/${resv.reservation_id}/seat`}>
                    Seat
                </button>
            </td>}
        </tr>
    )
};