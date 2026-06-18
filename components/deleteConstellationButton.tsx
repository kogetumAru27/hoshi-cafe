"use client";
import Constellationdelete from "@/app/actions/deleteConstellation";
export default function DeleteButton({constellationId}:{constellationId:string}){
    return(
        <button onClick={async () => {
            if(window.confirm("削除しますか?")){
               return await Constellationdelete(constellationId)
            }
        }} className="p-4 px-4 py-2 border border-gray-200 hover:bg-gray-200 hover:text-black transition rounded-full cusor-pointer">削除</button>
    )
}