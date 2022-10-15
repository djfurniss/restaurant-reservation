import React from "react";

export default function NewReservation(){

    return (
        <div>
            <form
                onSubmit={()=>{}}>
                <label
                    htmlFor="first_name">First Name</label>
                <input
                    name="first_name"/>

                <label
                    htmlFor="last_name">Last Name</label>
                <input 
                    name="last_name"/>

                <label
                    htmlFor="mobile_number">Mobile Number</label>
                <input
                    name="mobile_number"/>

                <label
                    htmlFor="reservation_date">Date of reservation</label>
                <input
                    name="reservation_date"/>

                <label
                    htmlFor="reservation_time">Time of reservation</label>
                <input
                    name="reservation_time"/>

                <label
                    htmlFor="people">Party size</label>
                <input
                    name="people"/>

                <button
                    type="submit">Make Reservation</button>
                <button
                    onClick={()=>{}}>Cancel</button>
            </form>
        </div>
    )
}