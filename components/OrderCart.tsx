"use client";
import { useState } from "react";
import { MenuType } from "@/app/generated/prisma/client";
import createOrder from "@/app/actions/createOrder";
type CartItem = {
    menuId:string,
    name:string,
    price:number,
    quantity:number

}
type Menu = {
    id:string,
    name:string,
    price:number,
    image:string | null,
    category:MenuType
}
export default function OrderCart({menus}:{menus:Menu[]}){
    const [cart,setcartItem] = useState<CartItem[]>([]);//CartItemこれがこの中に入る
    const addToCart = (menu: Menu) => {
        setcartItem(nowcart => {
            const exists = nowcart.find(item => item.menuId === menu.id);
            if(exists){
                return nowcart.map(item => 
                    item.menuId === menu.id 
                    ? {...item, quantity: item.quantity + 1}
                    : item
                );
            }
            return [...nowcart, {menuId: menu.id, name: menu.name, price: menu.price, quantity: 1}];
        });
    };
    const total = cart.reduce((sum,item) => sum + item.price * item.quantity,0);
    return(
        <div className="flex gap-8 p-8">
        {/* メニュー一覧 */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 flex-1">
            {menus.map(menu => (
                <div key={menu.id} className="border border-gray-200 shadow-md rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
                    {menu.image && <img src={menu.image} alt={menu.name} className="w-full h-48 object-cover"/>}
                    <div className="p-4">
                        <p className="font-bold">{menu.name}</p>
                        <p className="text-gray-500">¥{menu.price}</p>
                        <button onClick={() => addToCart(menu)} className="mt-2 px-4 py-2 border border-gray-200 rounded-full hover:bg-gray-500 hover:text-white transition">カートに追加</button>
                    </div>
                </div>
            ))}
        </div>
    
        {/* カート */}
        <div className="w-72 border border-gray-200 shadow-md rounded-2xl p-4">
            <h2 className="font-bold mb-4">カート</h2>
            {cart.map(item => (
                <div key={item.menuId} className="border-b border-gray-200 py-2">
                    <p>{item.name}</p>
                    <p className="text-gray-500">¥{item.price} × {item.quantity}</p>
                </div>
            ))}
            <p className="font-bold mt-4">合計: ¥{total}</p>
            <button onClick={async () => {await createOrder(total, cart); setcartItem([])}} className="mt-4 w-full bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-700 transition">注文する</button>
        </div>
    </div>
    )
}