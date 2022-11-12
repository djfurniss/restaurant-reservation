import React from "react";
import { useHistory } from "react-router";
import moment from "moment";
import "../stylesheets/oneReservation.css";

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
        <div id="OneReservation">
            <div><h4>Name</h4>{resv.last_name}, {resv.first_name}</div>
            <div><h4>Phone</h4>{resv.mobile_number}</div>
            <div><h4>Date</h4> {moment(resv.reservation_date).format("MMMM D")}th</div>
            <div><h4>Time</h4> {resv.reservation_time}</div>
            <div><h4>Party size</h4> {resv.people}</div>
            <div><h4>Status</h4> {resv.status}</div>

            <div id="button-container">
                 {/* these two conditions are the same but are kept seperate so they can render their own buttons to keep the btn-group intact */}
                   {resv.status === "booked" &&
                        <button 
                            id="seat-res-button"
                            onClick={()=>history.push(`/reservations/${resv.reservation_id}/seat`)}
                            href={`/reservations/${resv.reservation_id}/seat`}>Seat</button>
                    }
                    {resv.status === "booked" &&
                        <button 
                            id="edit-res-button"
                            onClick={()=>history.push(`/reservations/${resv.reservation_id}/edit`)}
                            href={`/reservations/${resv.reservation_id}/edit`}>Edit</button>
                    }
                    
                    {resv.status !== "cancelled" && <button 
                        id="cancel-res-button"
                        onClick={()=>{
                            window.confirm("Do you want to cancel this reservation? This cannot be undone.") 
                            && handleCancel()
                        }}
                        data-reservation-id-cancel={resv.reservation_id}>Cancel</button>}
                </div>
        </div>
    )
};