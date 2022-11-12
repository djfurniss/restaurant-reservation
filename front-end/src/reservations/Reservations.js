import React, { useState } from "react";
import ReactModal from "react-modal";
import { useHistory } from "react-router";
import { updateStatus } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import OneReservation from "./OneReservation";
import { AiOutlineCloseCircle } from "react-icons/ai";

import "../stylesheets/reservations.css";

/**
 * Renders a list of reservations 
 * @param reservations
 * an array of reservations passed from either Dashboard page or Search
 * @param purpose
 * a string passed from it's parent component to know what it needs to do or not do
 * @returns {JSX.Element}
 */

export default function Reservations({ reservations, purpose }){
// --- hooks and state ---
    const history = useHistory();
    const [statusErr, setStatusErr] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [reservation, setReservation] = useState(null);

// ---return ---
    return (
        <div id="Reservations">
            <ErrorAlert error={statusErr}/>

        {reservations.map(resv => {
        // if this component is rendering for the dashboard, we don't want any reservations where the status is finished or cancelled, so null is returned for those
             return purpose === "dashboard" && resv.status === "finished" || purpose === "dashboard" && resv.status === "cancelled" ? null :
             (<div
                    key={resv.reservation_id}
                    id="reservationCard"
                    className={resv.status}
                    onClick={()=>{
                        setReservation(resv)
                        setModalIsOpen(true)}}>
                    <h3>{resv.last_name}, {resv.first_name}</h3>
                </div>)
            })
        }   
                
        {modalIsOpen && 
        <div id="modal">
            <AiOutlineCloseCircle
                    id="modalCloseIcon"
                    onClick={()=>setModalIsOpen(false)}/>
                <OneReservation 
                    resv={reservation} 
                    purpose="dashboard"
                    handleCancel={()=>{
                        updateStatus(reservation.reservation_id, "cancelled")
                            .then(()=>history.go("/"))
                            .catch(setStatusErr)
                    }}/>
        </div>
        }
        </div>
    )
};