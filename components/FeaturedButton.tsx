"use client";
import Togglefeatured from "@/app/actions/toggleFeatured";
export default function FeaturedButton({menuId,isFeatured}:{menuId:string,isFeatured:boolean}){
    return(
        
        <button onClick={() => { Togglefeatured(menuId,isFeatured)}} className="px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-500 hover:text-white transition mb-2">
            {isFeatured ?"おすすめ中":"おすすめにする"}
        </button>
        
    )
}