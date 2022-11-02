import React, { useState } from "react";
import { findReservationByNumber } from "../utils/api";
import ReservationsList from "../reservations/ReservationsList";
import ErrorAlert from "../layout/ErrorAlert";

export default function Search(){
    const [reservations, setReservations] = useState([]);
    const [reservationsErr, setReservationsErr] = useState(null);
    const [number, setNumber] = useState("")

    const handleInputChange = ({target: {value}}) => setNumber(value);

    const handleSubmit = (e) => {
        e.preventDefault()
        const abortController = new AbortController();
        findReservationByNumber(number, abortController.signal)
            .then(setReservations)
            .then(()=>setNumber(""))
            .catch(setReservationsErr)
        return () => abortController.abort();
    };

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

            <ReservationsList reservations={reservations} purpose={"search"}/>
        </div>
    )
};