"use client";
import { MenuType } from "@/app/generated/prisma/client";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import updateMenu from "@/app/actions/updateMenu";
type Menu = {
    id:string,
    name:string,
    price:number,
    image:string | null,
    category:MenuType
}
export default function EditMenuform({menu}:{menu:Menu}){
    const [name,setName] = useState(menu.name);
    const [price,setPrice] =  useState(String(menu.price)) ;
    const [image,setImageUrl] = useState(menu.image ?? "");
    const [category,setCategory] = useState<MenuType>(menu.category);
    return(
       <form action={updateMenu}>
        <input type="hidden" name="menuId" value={menu.id} />
        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="メニュー" className="border border-gray-200 cursor-pointer shadow-md rounded-2xl w-full px-4 py-2 mb-2"/>
        <input type="hidden" name="image" value={image}/>
        <CldUploadWidget uploadPreset="hoshi-cafe" onSuccess={(result) =>{
         console.log(result) 
        const info = result.info as { secure_url: string }
        setImageUrl(info.secure_url)}}>{({open}) => (<button type="button" onClick={() => open()} className="border border-white px-4 py-2 rounded-full hover:bg-white hover:text-black transition">画像を変更</button>)}</CldUploadWidget>
        <input type="text" value={price} name="price" placeholder="値段" onChange={(e) => setPrice(e.target.value)} className="border border-gray-200 cusor-pointer shosow-md rounded-2xl w-full px-4 py-2"/>
        <select value={category} name="category" onChange={(e) => setCategory(e.target.value as MenuType)} className="px-4 py-2 border border-gray-200 cursor-pointer">
                <option value="COFFEE">コーヒー</option>
                <option value="TEA">紅茶・お茶</option>
                <option value="DESSERT">スイーツ</option>
                <option value="MEAL">食事</option>
        </select>
        <button type="submit" className="px-4 py-2 border border-gray-200 hover:bg-gray-200 hover:text-white transition rounded-full cursor-pointer">変更</button>
       </form>
    )
}
