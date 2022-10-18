export default function OneReservation({ resv: {first_name, last_name, mobile_number, reservation_date, reservation_time, people} }){
    return (
        <tr>
            <td>{`${first_name} ${last_name}`}</td>
            <td>{mobile_number}</td>
            <td>{reservation_date}</td>
            <td>{reservation_time}</td>
            <td>{people}</td>
        </tr>
    )

};