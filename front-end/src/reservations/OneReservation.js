import React from "react";
import { useHistory } from "react-router";

/**
 * Responsible for rendering one reservation's information.
 * @param resv 
 * a single reservation
 * @param purpose
 * a string passed from it's parent component to know what it needs to or not render
 * @param handleCancel
 * a reference to a function that cancels a given reservation
 * @returns {JSX.Element}
 * a table row to be rendered into the tbody
 */

export default function OneReservation({ resv, purpose, handleCancel }){
// --- hooks ---
    const history = useHistory();
    
// ---return ---
    return (
        purpose === "dashboard" && resv.status === "finished" || resv.status === "cancelled" ? null :
        // if this component is rendering for the dashboard, we don't want any reservations where the status is finished or cancelled, so null is returned for those
        <tr>
            <td scope="row">{`${resv.first_name} ${resv.last_name}`}</td>
            <td>{resv.mobile_number}</td>
            <td>{resv.reservation_date}</td>
            <td>{resv.reservation_time}</td>
            <td>{resv.people}</td>
            <td data-reservation-id-status={resv.reservation_id}>{resv.status}</td>
            <td>
                <div className="btn-group mx-3" role="group">
                {/* these two conditions are the same but are kept seperate so they can render their own buttons to keep the btn-group intact */}
                    {resv.status === "booked" &&
                        <button 
                            onClick={()=>history.push(`/reservations/${resv.reservation_id}/seat`)}
                            href={`/reservations/${resv.reservation_id}/seat`}
                            className="btn btn-sm btn-secondary">Seat</button>
                    }
                    {resv.status === "booked" &&
                        <button 
                            onClick={()=>history.push(`/reservations/${resv.reservation_id}/edit`)}
                            href={`/reservations/${resv.reservation_id}/edit`}
                            className="btn btn-sm btn-secondary">Edit</button>
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