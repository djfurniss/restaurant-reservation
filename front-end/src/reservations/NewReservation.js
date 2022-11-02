import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import { getDay } from "../utils/date-time";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";

export default function NewReservation({ setDate, today }){
// --- hooks, state, & misc. ---
    const history = useHistory();

    const INITIAL_FORM_DATA = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "", 
        reservation_time: "",
        people: 0
    };

    const [formData, setFormData] = useState(INITIAL_FORM_DATA);
    // formErr state is simply for form validation and is set depending on what error comes back from the API
    const [formErr, setFormErr] = useState(null);

// --- handlers ---
    const handleSubmit = (e) => {
        e.preventDefault();
        const abortController = new AbortController();
        createReservation(formData, abortController.signal)
            .then(newRes => {
                //use the date setter to set the date state to the newly created reservation's date so when the user is pushed back to the dashboard, it loads with the date of the new reservation.
                setDate(newRes.reservation_date)
                setFormData(INITIAL_FORM_DATA);
                history.push("/");
            })
            .catch(setFormErr)
        return () => abortController.abort();
    };

// --- return ---
    return (
        <div>
        <ErrorAlert error={formErr}/>
        <ReservationForm 
            purpose="create"
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}/>
        </div>
    )
};