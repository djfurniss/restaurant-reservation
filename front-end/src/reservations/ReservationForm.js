import React from "react";
import { useHistory } from "react-router";
import { today } from "../utils/date-time";

export default function ReservationForm({
    purpose, 
    isTuesday, 
    isInPast, 
    formData, 
    formErr, 
    handleInputChange,
    handleSubmit}){
    const history = useHistory();
    return (
        <div className="container-fluid">
            {/*isTueday and isInPast only need to be rendered if it already isnt via formErr
            the server returns identical error messages for the api
            so in the catch, the same message will display as the formErr and
            would be rendered more than once. This prevents that.*/}
        {isTuesday && !formErr ? <p className="alert alert-danger">We are closed on Tuesdays, please select another day.</p> : null}
        {isInPast && !formErr ? <p className="alert alert-danger">Please schedule a reservation at a future date.</p> : null}
        {formErr ? <p className="alert alert-danger">{formErr}</p> : null}
            <form
                onSubmit={handleSubmit}
                className="row">
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
                    min={today()}
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