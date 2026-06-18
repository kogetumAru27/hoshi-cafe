"use client";
import { SeasonType } from "@/app/generated/prisma/client";
import { useReducer } from "react";
type Constellation ={
    id:string,
    name:string,
    image:string | null
    description:string,
    magnitude:number,
    season:SeasonType,
    shape:string
}
const Seasonlabel:{[key:string]:string} ={
    SPRING:"春",
    SUMMER:"夏",
    AUTUMN:"秋",
    WINTER:"冬",
}
type FilterType = "全て" | SeasonType
const initialState = {
    search:"",
    season:"全て" as FilterType,
    sort:"明るい順"
}
type Action = {type:"setseason",payload:FilterType} | {type:"setsort",payload:string} | {type:"setsearch",payload:string}
function redcur(state:typeof initialState,action:Action){
    switch(action.type){
        case "setseason":
            return {...state,season:action.payload};
        case "setsort":
            return {...state,sort:action.payload};
        case "setsearch":
            return {...state,search:action.payload}
        default:
            return state
    }
}
export function Seasonfilter({constellation}:{constellation:Constellation[]}){
    const [state,dispatch] = useReducer(redcur,initialState);
    const filtered = constellation
    .filter(con => 
        con.name.includes(state.search) && 
        (state.season === "全て" || state.season === con.season)
    )
    .sort((a,b) => state.sort === "明るい順"?b.magnitude-a.magnitude:a.magnitude - b.magnitude);
    return(
        <div className="p-8">
            <input type="text" value={state.search} placeholder="検索" onChange={(e) => dispatch({type:"setsearch",payload:e.target.value})} className="border border-gray-200 shadow-md rounded-2xl px-4 py-2 w-full mb-2"/>
            <select value={state.season} onChange={(e) => dispatch({type:"setseason",payload:e.target.value as SeasonType})} className="px-4 py-2 border border-gray-200">
                <option value="全て">全て</option>
                <option value="SPRING">春</option>
                <option value="SUMMER">夏</option>
                <option value="AUTUMN">秋</option>
                <option value="WINTER">冬</option>
            </select>
            <select value={state.sort} onChange={(e) => dispatch({type:"setsort",payload:e.target.value})} className="px-4 py-2 border border-gray-200">
                <option value="明るい順">明るい順</option>
                <option value="暗い順">暗い順</option>
            </select>
            {filtered.map(fil => (
                <div key={fil.id} className="border border-gray-200 shadow-md rounded-2xl overflow-hidden hover:shadow-xl hover:scale-100 transition-all duration-300 p-4">
                    {fil.image && <img src={fil.image} alt={fil.name} className="w-full h-48 object-cover"/>}
                    <p>{fil.name}</p>
                    <p>{fil.magnitude}</p>
                    <p>{Seasonlabel[fil.season]}</p>
                    <p>{fil.description}</p>
                    <p>{fil.shape}</p>
                </div>
            ))}
            {filtered.length === 0 && <p className="text-blue-700 font-bold">該当する星座が見つかりませんでした。店長に声をかけてください</p>}
        </div>
    )
}