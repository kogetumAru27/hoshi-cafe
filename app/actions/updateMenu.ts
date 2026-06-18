"use server";
import { prisma } from "@/lib/prisma";
import { MenuType } from "../generated/prisma/client";
import { revalidatePath } from "next/cache";
export default async function updateMenu(formData:FormData){
    const menuId = formData.get("menuId") as string;
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const image = formData.get("image") as string | null;
    const category = formData.get("category") as MenuType;
    await prisma.menu.update({
        where:{id:menuId},
        data:{
            name,
            price,
            image,
            category
        }
    });
    revalidatePath("/staff");
}