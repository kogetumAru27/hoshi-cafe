"use client";
import deleteMenu from "@/app/actions/deleteMenu";

export default function Deletemenu({menuId}:{menuId:string}){
    return(
        <button onClick={async () => {
            if(window.confirm("削除しますか？")){
                const result = await deleteMenu(menuId);
                if(result?.error){
                    alert(result.error);
                }
            }
        }} className="px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-500 hover:text-white transition">
            削除
        </button>
    )
}