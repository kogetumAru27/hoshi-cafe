"use client";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import editConstellation from "@/app/actions/editConstellation";
import { SeasonType } from "@/app/generated/prisma/client";
type Constellation = {
    id:string
    name:string,
    image:string | null,
    season:SeasonType
    magnitude:number,
    shape:string,
    description:string,
}
export default function EditForm({constellation}:{constellation:Constellation}){
    const [name,setName] =useState(constellation.name);
    const [image,setImage]= useState(constellation.image ?? "");
    const [magnitude,setmagnitude] = useState(String(constellation.magnitude));
    const [season,setseason]=useState(constellation.season);
    const [shape,setShape] = useState(constellation.shape);
    const [description,setDescription] = useState(constellation.description);
    return(
        <form action={editConstellation}>
            <input type="hidden" name="constellationId" value={constellation.id} />
            <input type="text" name="name" placeholder="名前" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-200 cursor-pointer shadow-md mb-2"/>
            <input type="hidden"value={image} name="image"/>
            <CldUploadWidget uploadPreset="hoshi-cafe" onSuccess={(result) => {
                const info = result.info as {secure_url:string}
                setImage(info.secure_url)
            }}>{({open}) => <button type="button" onClick={() => open()} className="px-4 py-2 border border-gray-200 rounded-2xl hover:bg-gray-200 hover:text-black mb-2">画像を変更</button>}</CldUploadWidget>
            {image && <img src={image} alt={name}/>}
            <input type="number" step="0.1" value={magnitude} name="magnitude"placeholder="星の明るさ" onChange={(e) => setmagnitude(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-200 cursor-pointer shadow-md mb-2" />
            <select value={season} name="season" onChange={(e) => setseason(e.target.value as SeasonType)} className="px-4 py-2 border border-gray-200 mb-2">
                <option value="SPRING">春</option>
                <option value="SUMMER">夏</option>
                <option value="AUTUMN">秋</option>
                <option value="WINTER">冬</option>
            </select>
            <input type="text" name="shape" value={shape} placeholder="形" onChange={(e)=> setShape(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-200 cursor-pointer shadow-md mb-2"/>
            <input type="text" name="description" value={description} placeholder="特徴" onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-200 cursor-pointer shadow-md mb-2"/>
            <button type="submit" className="px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-200 hover:text-black transition mb-2 " >変更</button>
        </form>
    ) 
}