"use client";
import Cancel from "@/app/actions/cancelReservation";
export default function CancelButton({reservationId}:{reservationId:string}){
    return(
        <button onClick={async () => {
            if(window.confirm("キャンセルしますか")){
                return await Cancel(reservationId)
            }
        }} className="border border-gray-200 hover:bg-gray-200 hover:text-gray-800 transition px-4 py-2 rounded-full">キャンセル</button>
    )
}