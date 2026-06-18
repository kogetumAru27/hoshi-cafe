"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
export default async function deleteMenu(menuId:string){
    const ok = await prisma.menu.findFirst({
        where:{id:menuId,isFeatured:true}
    });
    if(ok)return {error:"おすすめのメニューです。削除はできません"}
    await prisma.menu.delete({
        where:{id:menuId}
    });
    revalidatePath("/staff")
}