import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getDay } from "../utils/date-time";
import { readReservation, updateReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";

export default function EditReservation({ setDate, today }){
    const { reservation_id } = useParams();
    const history = useHistory();
    const [formData, setFormData] = useState({});
    const [formErr, setFormErr] = useState(null);
    const [isTuesday, setIsTuesday] = useState(false);
    const [isInPast, setIsInPast] = useState(false);
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
        await updateReservation(formData, reservation_id, abortController.signal)
            .then(({ reservation_date })=> {
                setDate(reservation_date)
                history.push("/")
            })
            .catch(({message}) => setFormErr(message))
        return () => abortController.abort();
    };

// --- return ---
    return (
        <div>
            <h1>Editing reservation #{reservation_id}</h1>
            <ReservationForm 
                purpose="edit" 
                isTuesday={isTuesday} 
                isInPast={isInPast} 
                formData={formData} 
                formErr={formErr} 
                handleInputChange={handleInputChange} 
                handleSubmit={handleSubmit}/>
        </div>
    )
};