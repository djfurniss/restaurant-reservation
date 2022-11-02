import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
// import { getDay } from "../utils/date-time";
import { readReservation, updateReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";

export default function EditReservation({ setDate, today }){
// --- hooks, state, & misc. ---
    const { reservation_id } = useParams();
    const history = useHistory();
    const [formData, setFormData] = useState({});
    const [formErr, setFormErr] = useState(null);

// --- useEffect ---
    useEffect(()=>{
        const abortController = new AbortController();
        readReservation(reservation_id, abortController.signal)
            .then(({ first_name, last_name, mobile_number, reservation_date, reservation_time, people }) => {
                setFormData({first_name, last_name, mobile_number, reservation_date, reservation_time, people})
            })
            .catch(setFormErr)
        return () => abortController.abort();
    }, [reservation_id]);

// --- handlers ---
    const handleSubmit = (e) => {
        e.preventDefault();
        const abortController = new AbortController();
        updateReservation(formData, reservation_id, abortController.signal)
            .then(({ reservation_date })=> {
                setDate(reservation_date)
                history.push("/")
            })
            .catch(setFormErr)
        return () => abortController.abort();
    };

// --- return ---
    return (
        <div>
            <h1>Editing reservation #{reservation_id}</h1>
            <ErrorAlert error={formErr}/>
            <ReservationForm 
                purpose="edit" 
                formData={formData} 
                setFormData={setFormData}
                handleSubmit={handleSubmit}/>
        </div>
    )
};