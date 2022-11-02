import React, { useState } from "react";
import { findReservationByNumber } from "../utils/api";
import ListReservations from "../reservations/ListReservations";

export default function Search(){
    const [reservations, setReservations] = useState([]);
    const [number, setNumber] = useState("")

    const handleInputChange = ({target: {value}}) => setNumber(value);

    const handleSubmit = (e) => {
        e.preventDefault()
        findReservationByNumber(number)
            .then(setReservations)
            .then(()=>setNumber(""))
    };

    return (
        <div className="container-fluid mt-3">
            <form onSubmit={handleSubmit} className="row justify-content-center my-3">
                <input 
                    name="mobile_number"
                    value={number}
                    onChange={handleInputChange}
                    placeholder="Enter a customer's phone number"
                    className="form-control w-50 mr-2"/>
                <button type="submit" className="btn btn-secondary">Find</button>
            </form>

            {reservations.length ?
            <ListReservations reservations={reservations} purpose={"search"}/> :
            <p className="text-danger text-center">No reservations found</p>}
        </div>
    )
};