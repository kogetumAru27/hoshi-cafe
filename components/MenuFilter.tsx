"use client"
import { useReducer } from "react";
import { MenuType } from "@/app/generated/prisma/client";
type Menu = {
    id:string,
    name:string,
    price:number,
    description:string,
    image:string | null,
    category: MenuType,
    createdAt: Date
}
type Menutype = "全て" | MenuType
const initialState ={
    search:"",
    type:"全て" as Menutype,
    sort:"新しい順"
}
type Action = {type:"setsearch",payload:string} | {type:"settype",payload:Menutype} | {type:"setsort",payload:string}
function redcur(state:typeof initialState,action:Action){
    switch(action.type){
        case "setsearch":
            return {...state,search:action.payload};
        case "settype":
            return {...state,type:action.payload};
        case "setsort":
            return {...state,sort:action.payload};
        default:
            return state;
    }
}
export default function MenuFilter({menus}:{menus:Menu[]}){
    const [state,dispatch] = useReducer(redcur,initialState);
    const filtered = menus
    .filter(me => {
        const seartchMatch = me.name.includes(state.search);
        const TypeMatch   = (state.type === "全て" || state.type === me.category);
        return seartchMatch && TypeMatch
    })
    .sort ((a,b) => state.sort === "新しい順"?new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime():new Date(a.createdAt).getTime()-new Date(b.createdAt).getTime());
    return(
        <div className="p-8">
            <input type="text" value={state.search} placeholder="検索" onChange={(e) => dispatch({type:"setsearch",payload:e.target.value})} 
            className="shadow-md px-4 py-2 rounded-lg items-center mb-2"/>
            <select value={state.sort} onChange={(e) => dispatch({type:"setsort",payload:e.target.value})}>
                <option value="新しい順">新商品</option>
                <option value="古い順">レギュラー商品</option>
            </select>
            <select value={state.type} onChange={(e) => dispatch({type:"settype",payload:e.target.value as MenuType})}>
            <option value="全て">全て</option>
            <option value="COFFEE">コーヒー</option>
            <option value="TEA">紅茶・お茶</option>
            <option value="DESSERT">デザート</option>
            <option value="MEAL">食事</option>
            </select>
            {filtered.map(fil => (
                <div key={fil.id} className="border border-gray-200 shadow-md rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300">
                    {fil.image && <img src={fil.image} alt={fil.name} className="w-full h-48 object-cover"/>}
                    <div className="p-4">
                    <p className="font-bold text-lg">{fil.name}</p>
                    <p className="text-gray-500">¥{fil.price}</p>
                    </div>
                </div>
            ))}
            {filtered.length === 0 && <p className="font-bold">見つかりませんでした</p>}
        </div>
    )
}