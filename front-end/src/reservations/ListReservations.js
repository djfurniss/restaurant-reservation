import React from "react";
import OneReservation from "./OneReservation"

export default function ListReservations({ reservations }){

    return (
        <table>
            <thead>
                <tr>
                <th>Reservation Name</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Time</th>
                <th>Party Size</th>
                <th>Status</th>
                </tr>
            </thead>
            
            <tbody>
            {reservations.map(resv => {
                return <OneReservation key={resv.reservation_id} resv={resv}/>
            })}
            </tbody>
        </table>
    )
};