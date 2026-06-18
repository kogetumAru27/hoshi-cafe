import { prisma } from "@/lib/prisma";
import MenuFilter from "@/components/MenuFilter";
export default async function Menu(){
    const menus = await prisma.menu.findMany()
    return(
        <div className="p-8">
            <h1>Menu</h1>
            <MenuFilter menus={menus}/>
        </div>
    )
}