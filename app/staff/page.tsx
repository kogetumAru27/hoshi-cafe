import { prisma } from "@/lib/prisma";
import AddMenuForm from "@/components/AddMenuForm";
import FeaturedButton from "@/components/FeaturedButton";
import Deletemenu from "@/components/DeleteButton";
import Edittoggle from "@/components/EditToggle";
import AddConstellationForm from "@/components/AddConstellationForm";
import StaffTab from "@/components/StaffTabs";
import DeleteButton from "@/components/deleteConstellationButton";
import EditForm from "@/components/editformConstellation";
const seasonLabel:{[key:string]:string} ={
    SPRING:"春",
    SUMMER:"夏",
    AUTUMN:"秋",
    WINTER:"冬",
}
export default async function Staff(){
    const menus = await prisma.menu.findMany();
    const constellations = await prisma.constellation.findMany();
    return(
        <div className="p-8">
        <h1 className="font-bold">Staff Page</h1>
        <StaffTab menuContent={
            <div>
            <AddMenuForm/>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {menus.map(menu => (
                <div key={menu.id} className={`border shadow-md rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${menu.isFeatured ? "border-yellow-400 bg-yellow-50" : "border-gray-200"}`}>
                    {menu.image && <img src={menu.image} alt={menu.name} className="w-full h-48 object-cover"/>}
                    <p className="px-4 py-2">{menu.name}</p>
                    <p className="px-4 py-2">{menu.price}</p>
                    <FeaturedButton menuId={menu.id} isFeatured={menu.isFeatured} /> 
                    <Deletemenu menuId={menu.id}/>
                    <Edittoggle menu={menu}/>
                </div>
            ))}
            </div>
            </div>}
          constellationContent= {
            <div>
                <AddConstellationForm/>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {constellations.map(co => (
                <div key={co.id} className="border shadow-md rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ">
                    {co.image && <img src={co.image} alt={co.name} className="w-full h-48 object-cover"/>}
                    <p className="px-4 py-2">{co.name}</p>
                    <p className="px-4 py-2">{co.description}</p>
                    <p className="px-4 py-2">{co.shape}</p>
                    <p className="px-4 py-2">{co.magnitude}</p>
                    <p className="px-4 py-2">{seasonLabel[co.season]}</p>
                    <DeleteButton constellationId={co.id}/>
                    <EditForm constellation={co}/>
                </div>
            ))}
            </div>
            </div>
          }  />
    
        </div>
    )
}