import React from "react";
import { useHistory } from "react-router";

/**
 * Responsible for rendering a form used both by the NewReservation and the EditReservation page
 * @param purpose
 * a string passed from it's parent component to specify what it needs to do or not do
 * @param formData
 * the form information passed from either NewReservation or EditReservation page
 * @param setFormData
 * makes state changes to formData
 * @param handleSubmit
 * a reference to a function from the parent component (either creates new reservation or updates an existing one)
 * @returns {JSX.Element}
 */

export default function ReservationForm({purpose, formData, setFormData, handleSubmit}){
// --- hooks ---
    const history = useHistory();
    
// --- handler ---
    const handleInputChange = ({ target }) => setFormData({...formData, [target.name]: target.value});

// --- return ---
    return (
        <div className="container-fluid">
            <form onSubmit={handleSubmit} className="row">
                <label htmlFor="first_name" className="form-label">First name</label>
                <input
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    required
                    className="form-control"/>

                <label htmlFor="last_name" className="form-label">Last name</label>
                <input 
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    required
                    className="form-control"/>

                <label htmlFor="mobile_number" className="form-label">Mobile number</label>
                <input
                    name="mobile_number"
                    value={formData.mobile_number}
                    onChange={handleInputChange}
                    placeholder="XXX-XXX-XXXX"
                    required
                    className="form-control"/>

                <label htmlFor="reservation_date" className="form-label">Date of reservation</label>
                <input
                    name="reservation_date"
                    type="date"
                    value={formData.reservation_date}
                    onChange={handleInputChange}
                    required
                    className="form-control"/>

                <label htmlFor="reservation_time" className="form-label">Time of reservation</label>
                <input
                    name="reservation_time"
                    type="time"
                    value={formData.reservation_time}
                    onChange={handleInputChange}
                    required
                    className="form-control"/>

                <label htmlFor="people" className="form-label">Party size</label>
                <input
                    name="people"
                    type="number"
                    value={formData.people}
                    onChange={handleInputChange}
                    required
                    className="form-control"/>
                <div className="btn-group my-2" role="group">
                    <button
                        type="submit"
                        className="btn btn-secondary">{purpose === "edit" ? "Submit Changes" : "Create Reservation"}</button>
                    <button 
                        onClick={()=>history.go(-1)}
                        className="btn btn-secondary">Cancel</button>
                </div>    
            </form>
        </div>
    )
};