import React from "react";
import OneReservation from "./OneReservation"

export default function ListReservations({ reservations, purpose }){
    return (
        <table className="table table-striped table-borderless">
            <thead className="table-light">
                <tr>
                <th scope="col">Reservation Name</th>
                <th scope="col">Phone</th>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Party Size</th>
                <th scope="col">Status</th>
                </tr>
            </thead>
            
            <tbody>
            {reservations.map(resv => {
                return <OneReservation key={resv.reservation_id} resv={resv} purpose={purpose}/>
            })}
            </tbody>
        </table>
    )
};