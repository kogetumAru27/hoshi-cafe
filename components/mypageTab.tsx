"use client";
import { useState } from "react";
import isRead from "@/app/actions/readNotification";
type Tab = "通知" | "注文履歴" | "予約履歴";
export default function Tabs({notificationContent,orderContent,reservationContent,notificationIds}:{notificationContent:React.ReactNode,orderContent:React.ReactNode,reservationContent:React.ReactNode, notificationIds: string[]}){
    const [activeTab,setActivitab] = useState<Tab>("通知");
    const handleNotificationTab = async () => {
        setActivitab("通知");
        for(const id of notificationIds){
            await isRead(id);
        }
    }
    return(
        <div className="flex-col gap-4 mb-6">
            {/*cssは後でやります*/}
            <button onClick={handleNotificationTab} className={`px-6 py-2 rounded-full border transition ${activeTab === "通知" ? "bg-slate-900 text-white" : "border-gray-200 hover:bg-gray-100"}`}>通知</button>
            <button onClick={() => setActivitab("注文履歴")} className={`px-6 py-2 rounded-full border transition ${activeTab === "注文履歴" ? "bg-slate-900 text-white" : "border-gray-200 hover:bg-gray-100"}`}>注文履歴</button>
            <button onClick={() => setActivitab("予約履歴")} className={`px-6 py-2 rounded-full border transition ${activeTab === "予約履歴" ? "bg-slate-900 text-white" : "border-gray-200 hover:bg-gray-100"}`}>予約履歴</button>
            {activeTab === "通知" && notificationContent}
            {activeTab === "注文履歴" && orderContent}
            {activeTab === "予約履歴" && reservationContent}
        </div>
        
    );
}