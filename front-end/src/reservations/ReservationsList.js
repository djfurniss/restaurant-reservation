import React, { useState } from "react";
import { useHistory } from "react-router";
import { updateStatus } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import OneReservation from "./OneReservation"

export default function ReservationsList({ reservations, purpose }){
    const history = useHistory();
    const [statusErr, setStatusErr] = useState(null)

    return (
        <div>
            <ErrorAlert error={statusErr}/>
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
                {reservations.length ? reservations.map(resv => {
                    return <OneReservation 
                        key={resv.reservation_id} 
                        resv={resv} 
                        purpose={purpose}
                        handleCancel={()=>{
                            updateStatus(resv.reservation_id, "cancelled")
                                .then(()=>history.go("/"))
                            .catch(setStatusErr)
                        }}/>
                }): <p>No reservations found</p>}
                </tbody>
            </table>
        </div>
    )
};