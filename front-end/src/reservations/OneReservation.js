import { useHistory } from "react-router";

export default function OneReservation({ resv: {reservation_id, first_name, last_name, mobile_number, reservation_date, reservation_time, people} }){
    const history = useHistory()
    return (
        <tr>
            <td>{`${first_name} ${last_name}`}</td>
            <td>{mobile_number}</td>
            <td>{reservation_date}</td>
            <td>{reservation_time}</td>
            <td>{people}</td>
            <td><button 
                    onClick={()=>history.push(`/reservations/${reservation_id}/seat`)}
                    href={`/reservations/${reservation_id}/seat`}>Seat</button></td>
        </tr>
    )

};