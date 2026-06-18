"use client";
import { MenuType } from "@/app/generated/prisma/client";
import { useState } from "react";
import AddMenu from "@/app/actions/addMenu";
import { CldUploadWidget } from "next-cloudinary";
export default function AddMenuForm(){
    const [name,setname] = useState("");
    const [price,setPrice] = useState("");
    const [description,setDescription] = useState("");
    const [category,setCatrgory] = useState<MenuType>("COFFEE");
    const  [imageUrl, setImageUrl] = useState("");
    return(
        <form action={AddMenu}>
            <input type="text" value={name} name="name" placeholder="メニュー" onChange={(e) => setname(e.target.value)} 
            className="border border-gray-200 cursor-pointer shadow-md rounded-2xl w-full px-4 py-2 mb-2"/>
            <input type="hidden" name="image" value={imageUrl}/>
            <CldUploadWidget uploadPreset="hoshi-cafe" onSuccess={(result) =>{
            console.log(result) 
            const info = result.info as { secure_url: string }
            setImageUrl(info.secure_url)}}>{({open}) => (<button type="button" onClick={() => open()} className="border border-white px-4 py-2 rounded-full hover:bg-white hover:text-black transition">画像をアップロード</button>)}</CldUploadWidget>
            <input type="text" value={price} placeholder="値段" name="price" onChange={(e) => setPrice(e.target.value)} 
            className="border border-gray-200 cursor-pointer shadow-md rounded-2xl w-full px-4 py-2 mb-2"/>
            <input type="text" value={description} placeholder="特徴" name="description" onChange={(e) => setDescription(e.target.value)} 
            className="border border-gray-200 cursor-pointer shadow-md rounded-2xl w-full px-4 py-2 mb-2"/>
            <select value={category} name="category" onChange={(e) => setCatrgory(e.target.value as MenuType)}>
                <option value="COFFEE">コーヒー</option>
                <option value="TEA">紅茶・お茶</option>
                <option value="DESSERT">スイーツ</option>
                <option value="MEAL">食事</option>
            </select>
            <button type="submit" className="px-4 py-2 cursor-pointer rounded-full border border-gray-200 hover:bg-gray-500 hover:text-white transition">追加</button>
        </form>
    )
}