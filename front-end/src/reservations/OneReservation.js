import React, { useState } from "react";
import { useHistory } from "react-router";
// import { updateStatus } from "../utils/api";

export default function OneReservation({ resv, purpose, handleCancel }){
    const history = useHistory();
    // const [reservationErr, setReservationErr] = useState(null)

    return (
        purpose === "dashboard" && resv.status === "finished" || resv.status === "cancelled" ? null :
        <tr>
            <td scope="row">{`${resv.first_name} ${resv.last_name}`}</td>
            <td>{resv.mobile_number}</td>
            <td>{resv.reservation_date}</td>
            <td>{resv.reservation_time}</td>
            <td>{resv.people}</td>
            <td data-reservation-id-status={resv.reservation_id}>{resv.status}</td>
            <td>
                <div className="btn-group mx-3" role="group">
                    {resv.status === "booked" &&
                        <button 
                            onClick={()=>history.push(`/reservations/${resv.reservation_id}/seat`)}
                            href={`/reservations/${resv.reservation_id}/seat`}
                            className="btn btn-sm btn-secondary">
                            Seat
                        </button>
                    }
                    {resv.status === "booked" &&
                    
                        <button 
                            onClick={()=>history.push(`/reservations/${resv.reservation_id}/edit`)}
                            href={`/reservations/${resv.reservation_id}/edit`}
                            className="btn btn-sm btn-secondary">
                            Edit
                            </button>
                    }
                    
                        <button 
                            onClick={()=>{
                                window.confirm("Do you want to cancel this reservation? This cannot be undone.") 
                                && handleCancel()
                            }}
                            data-reservation-id-cancel={resv.reservation_id}
                            className="btn btn-sm btn-danger">Cancel</button>
                    
                </div>
            </td>
        </tr>
    )
};