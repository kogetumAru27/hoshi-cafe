"use client";
import createRese from "@/app/actions/createReservation";
import { useState } from "react";

export default function ReservaForm(){
    const [date, setDate] = useState("");
    const [time, setTime] = useState("19:00");
    
    
    return(
        <form action={createRese}>
            <input type="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} className="border border-gray-200 shadow-md rounded-lg px-4 py-2 mr-2"/>
            <select name="time" value={time} onChange={(e) => setTime(e.target.value)} className="border border-gray-200 shadow-md rounded-lg px-4 py-2 mr-2">
                <option value="19:00">19:00</option>
                <option value="19:30">19:30</option>
                <option value="20:00">20:00</option>
                <option value="20:30">20:30</option>
                <option value="21:00">21:00</option>
                <option value="21:30">21:30</option>
                <option value="22:00">22:00</option>
                <option value="22:30">22:30</option>
                <option value="23:00">23:00</option>
                <option value="23:30">23:30</option>
            </select>
            <button type="submit" className="border border-gray-200 rounded-2xl shadow-md px-4 py-2 hover:bg-gray-200 transition">送信</button>
        </form>
    )
}