import { prisma } from "@/lib/prisma";
import OrderCart from "@/components/OrderCart";
export default async function Ordermenu(){
    const menus = await prisma.menu.findMany();
    return(
        <div>
            <OrderCart menus={menus}/>
        </div>
    )
}