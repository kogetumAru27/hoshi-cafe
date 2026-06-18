"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
export default async function Togglefeatured(menuId:string, isFeatured:boolean){
    await prisma.menu.update({
        where:{id:menuId},
        data:{isFeatured:!isFeatured}
    });
    revalidatePath("/staff");
}