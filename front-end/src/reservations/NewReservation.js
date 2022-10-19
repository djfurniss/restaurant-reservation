import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";

export default function NewReservation(){
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
    // const [formErr, setFormErr] = useState([])

// --- handlers ---
    const handleInputChange = ({ target }) => {
        setFormData({...formData, [target.name]: target.value});
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        // if (!formErr){
        await createReservation(formData)
            setFormData(INITIAL_FORM_DATA);
            history.push("/");
        // }
    };

    const handleCancel = (e) => {
        e.preventDefault();
        history.push("/");
    };

// --- return ---
    return (
        <div>
        {/* //     {formErr &&  */}
        {/* //     formErr.map(err => <p>{err}</p>)} */}
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
                    required/>

                <label htmlFor="reservation_date">Date of reservation</label>
                <input
                    name="reservation_date"
                    type="date"
                    value={formData.reservation_date}
                    onChange={handleInputChange}
                    required/>

                <label htmlFor="reservation_time">Time of reservation</label>
                <input
                    name="reservation_time"
                    type="time"
                    value={formData.reservation_time}
                    onChange={handleInputChange}
                    required/>

                <label htmlFor="people">Party size</label>
                <input
                    name="people"
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