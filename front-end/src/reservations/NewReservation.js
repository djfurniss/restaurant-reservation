import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";

export default function NewReservation({ setDate }){
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
    const [formErr, setFormErr] = useState(null)

// --- handlers ---
    const handleInputChange = ({ target }) => {
        setFormData({...formData, [target.name]: target.value});
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

         //before sending the data back to the server, the value for people must be a number
        formData.people = Number(formData.people);
        await createReservation(formData)
            .then(newRes => {
                //use the date setter to set the date state to the newly created reservation's date so when the user is pushed back to the dashboard, it loads with the date of the new reservation.
                setDate(newRes.reservation_date)
                setFormData(INITIAL_FORM_DATA);
                history.push("/");
            })
            .catch(err => {
                setFormErr(err.message)
            })
    };
    
    const handleCancel = (e) => {
        e.preventDefault();
        history.go(-1);
    };

// --- return ---
    return (
        <div>
        {formErr && <p>{formErr}</p>}
            <form
                onSubmit={handleSubmit}>
                <label htmlFor="first_name">First name</label>
                <input
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    required/>

                <label htmlFor="last_name">Last name</label>
                <input 
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    required/>

                <label htmlFor="mobile_number">Mobile number</label>
                <input
                    name="mobile_number"
                    value={formData.mobile_number}
                    onChange={handleInputChange}
                    pattern="\d{3}-\d{3}-\d{4}"
                    placeholder="XXX-XXX-XXXX"
                    required/>

                <label htmlFor="reservation_date">Date of reservation</label>
                <input
                    name="reservation_date"
                    type="date"
                    value={formData.reservation_date}
                    onChange={handleInputChange}
                    pattern="\d{4}-\d{2}-\d{2}"
                    required/>

                <label htmlFor="reservation_time">Time of reservation</label>
                <input
                    name="reservation_time"
                    type="time"
                    value={formData.reservation_time}
                    onChange={handleInputChange}
                    pattern="[0-9]{2}:[0-9]{2}"
                    required/>

                <label htmlFor="people">Party size</label>
                <input
                    name="people"
                    type="number"
                    value={formData.people}
                    onChange={handleInputChange}
                    required/>

                <button
                    type="submit">Make reservation</button>
                <button
                    onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    )
};