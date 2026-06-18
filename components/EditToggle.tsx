"use client";
import { useState } from "react";
import EditMenuform from "./EditMenuForm";
import { MenuType } from "@/app/generated/prisma/client";
type Menu ={
    id:string,
    name:string,
    price:number,
    image:string | null,
    category:MenuType
}
export default function Edittoggle({menu}:{menu:Menu}){
    const [isOpen,setIsOpen] = useState(false);
    return(
        <div>
            <button onClick={() => setIsOpen(!isOpen)} className="px-4 py-2 border border-gray-200 hover:bg-gray-500 hover:text-white transition rounded-full cursor-pointer"> {isOpen ? "閉じる" : "編集"}</button>
            {isOpen && <EditMenuform menu={menu}/>}
        </div>
    )
}