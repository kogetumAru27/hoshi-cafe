import { prisma } from "@/lib/prisma";
export default async function Detail({params} : {params:Promise<{id:string}>}){
    const {id} = await params;
    const menus = await prisma.menu.findUnique({
        where:{id}
    });
    if(!menus) return <p>商品が見つかりませんでした</p>
    return(
        <div className="p-8">
            {menus.image && <img src={menus.image} alt={menus.name} className="w-full h-48 object-cover"/>}
            <div className="border border-gray-200 shadow-md rounded-2xl overflow-hidden hover:shadow-xl hover:scale-100 transition-all duration-300"> 
            <p>商品名:{menus.name}</p>
            <p>{menus.description}</p>
            <p>¥{menus.price}</p>
            <button className="mt-4 bg-slate-900 text-white px-6 py-2 rounded-full hover:bg-slate-700 transition">
                注文する
            </button>
            </div>
        </div>
    )
}