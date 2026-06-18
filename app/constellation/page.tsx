import { prisma } from "@/lib/prisma";
import { Seasonfilter } from "@/components/ConstellationFilter";
const Seasonlabel:{[key:string]:string} ={
    SPRING:"春",
    SUMMER:"夏",
    AUTUMN:"秋",
    WINTER:"冬",
}
export default async function Constellation(){
    const constell = await prisma.constellation.findMany();
    return(
        <div>
            <Seasonfilter constellation={constell} />
        </div>
    )
}