"use client";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { SeasonType } from "@/app/generated/prisma/client";
import CreateConstellation from "@/app/actions/createConstellation";
export default function AddConstellationForm(){
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [season,setSeason] = useState<SeasonType>("SPRING");
    const [imageUrl,setImageUrl] = useState("");
    const [magnitude,setMagunitude] = useState("");
    const [shape,setShape] = useState("");
    return(
        <form action={CreateConstellation} className="p-4">
            <input type="text" value={name} placeholder="星座の名前"name="name" onChange={(e) => setName(e.target.value)} className="px-4 py-2 w-full shadow-md border border-gray-200 mb-3"/>
            <input type="text" value={description} placeholder="特徴"name="description" onChange={(e) => setDescription(e.target.value)} className="px-4 py-2 w-full shadow-md border border-gray-200 mb-3"/>
            <input type="hidden" name="image" value={imageUrl} />
            <CldUploadWidget uploadPreset="hoshi-cafe" onSuccess={(result) => {
                const info = result.info as {secure_url:string}
                setImageUrl(info.secure_url)
            }}>{({open}) => (<button type="button" onClick={() => open()} className="border border-gray-200 px-4 py-2 rounded-full hover:bg-gray-200 hover:text-white transition">画像をアップロード</button>)}</CldUploadWidget>
            <select value={season} name="season" onChange={(e) => setSeason(e.target.value as SeasonType)} className="px-4 py-2 border border-gray-200">
                <option value="SPRING">春</option>
                <option value="SUMMER">夏</option>
                <option value="AUTUMN">秋</option>
                <option value="WINTER">冬</option>
            </select>
            <input type="number" name="magnitude" step="0.1" placeholder="明るさ（例：1.5）" value={magnitude} onChange={(e) => setMagunitude(e.target.value)} className="px-4 py-2 w-full shadow-md border border-gray-200 mb-3"/>
            <input type="text" value={shape} placeholder="形" name="shape" onChange={(e) => setShape(e.target.value)} className="px-4 py-2 w-full shadow-md border border-gray-200 mb-3"/>
            <button type="submit" className="px-4 py-2 cursor-pointer rounded-full border border-gray-200 hover:bg-gray-500 hover:text-white transition">送信</button>
        </form>
    )
}