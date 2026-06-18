"use client";
import React, { useState } from "react";
type Tab = "menu" | "constellation";
export default function StaffTab({menuContent,constellationContent}:{menuContent:React.ReactNode,constellationContent:React.ReactNode}){
    const [activeTab,setActiveTab] = useState<Tab>("menu");
    return(
        <div>
        <div className="flex gap-4 mb-6">
            <button 
                onClick={() => setActiveTab("menu")}
                className={`px-6 py-2 rounded-full border transition ${activeTab === "menu" ? "bg-slate-900 text-white" : "border-gray-200 hover:bg-gray-100"}`}>
                メニュー管理
            </button>
            <button 
                onClick={() => setActiveTab("constellation")}
                className={`px-6 py-2 rounded-full border transition ${activeTab === "constellation" ? "bg-slate-900 text-white" : "border-gray-200 hover:bg-gray-100"}`}>
                星座管理
            </button>
        </div>
        {activeTab === "menu" && menuContent}
        {activeTab === "constellation" && constellationContent}
    </div>
    )
}