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
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    name="mobile_number"
                    value={number}
                    onChange={handleInputChange}
                    placeholder="Enter a customer's phone number"/>
                <button type="submit">Find</button>
            </form>

            {reservations.length ?
            <ListReservations reservations={reservations} purpose={"search"}/> :
            <h1>No reservations found</h1>}
        </div>
    )
};