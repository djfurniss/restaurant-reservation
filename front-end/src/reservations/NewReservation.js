import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import { getDay } from "../utils/date-time";
import ReservationForm from "./ReservationForm";

export default function NewReservation({ setDate, today }){
// --- hooks ---
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
        // isTuesday and isPast validations dynamically change as the user change the reservation date selection and they may need to be displayed at the same time
        // by default they are false; error messages conditionally rendered based on their states
    const [isTuesday, setIsTuesday] = useState(false);
    const [isInPast, setIsInPast] = useState(false);

// --- handlers ---
    const handleInputChange = ({ target }) => {
        setFormData({...formData, [target.name]: target.value});

        // specifcallly checks the reservation date as it changes
        if (target.name === "reservation_date"){
        // renders the error message if user selects a date before the current date
            if (target.value < today()){
                setIsInPast(true)
            }else setIsInPast(false) 
        //renders the error message if user selects a Tuesday
            if(getDay(target.value) === "Tuesday"){
                setIsTuesday(true)
            }else(setIsTuesday(false))
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const abortController = new AbortController();
        await createReservation(formData, abortController.signal)
            .then(newRes => {
                //use the date setter to set the date state to the newly created reservation's date so when the user is pushed back to the dashboard, it loads with the date of the new reservation.
                setDate(newRes.reservation_date)
                setFormData(INITIAL_FORM_DATA);
                history.push("/");
            })
            .catch(err => {
                // the api returns any errors and setFormErr changes state so that the error messages are rendered
                setFormErr(err.message)
            })
        return () => abortController.abort();
    };

// --- return ---
    return (
        <ReservationForm 
        purpose="create" 
        isTuesday={isTuesday} 
        isInPast={isInPast} 
        formData={formData} 
        formErr={formErr} 
        handleInputChange={handleInputChange} 
        handleSubmit={handleSubmit}/>
    )
};