import React from "react";
import OneReservation from "./OneReservation"

export default function ListReservations({ reservations }){
    
    return (
        <table>
            <tr>
                <th>Reservation Name</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Time</th>
                <th>Party Size</th>
            </tr>
            
            {reservations.map(resv => {
                return <OneReservation resv={resv}/>
            })}
        </table>
    )
};