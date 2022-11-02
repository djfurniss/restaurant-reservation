import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readReservation, updateReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";

/**
 * Defines the /reservations/:reservation_id/edit page.
 * @param setDate 
 * a function to change the state of date
 * @returns {JSX.Element}
 */

export default function EditReservation({ setDate }){
// --- hooks, state, & misc. ---
    const { reservation_id } = useParams();
    const history = useHistory();
    const [formData, setFormData] = useState({});
    const [formErr, setFormErr] = useState(null);

// --- useEffect ---
    useEffect(()=>{
        const abortController = new AbortController();
        readReservation(reservation_id, abortController.signal)
        //destructuring only the variables needed from the DB, because all columns like created_at and updated_at come back from the request
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
                //setDate is used to set date's state to the reservation's date so when the user is pushed back to the dashboard, it loads with the new date of the reservation IF it was updated.
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