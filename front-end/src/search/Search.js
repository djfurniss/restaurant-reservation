import React, { useState } from "react";
import { findReservationByNumber } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import Reservations from "../reservations/Reservations";

/**
 * Defines the /search page
 * @returns {JSX.Element}
 */

export default function Search(){
// --- state --
    const [reservations, setReservations] = useState([]);
    const [reservationsErr, setReservationsErr] = useState(null);
    const [number, setNumber] = useState("");

// --- handlers ---
    const handleInputChange = ({target: {value}}) => setNumber(value);

    const handleSubmit = (e) => {
        e.preventDefault();
        const abortController = new AbortController();
        findReservationByNumber(number, abortController.signal)
            .then(setReservations)
            .then(()=>setNumber(""))
            .catch(setReservationsErr)
        return () => abortController.abort();
    };

// --- return ---
    return (
        <div className="container-fluid mt-3">
            <ErrorAlert error={reservationsErr}/>
            <form onSubmit={handleSubmit} className="row justify-content-center my-3">
                <input 
                    name="mobile_number"
                    value={number}
                    onChange={handleInputChange}
                    placeholder="Enter a customer's phone number"
                    className="form-control w-50 mr-2"/>
                <button type="submit" className="btn btn-secondary">Find</button>
            </form>

            <Reservations reservations={reservations} purpose={"search"}/>
        </div>
    )
};