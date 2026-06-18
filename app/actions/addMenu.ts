"use server";
import { prisma } from "@/lib/prisma";
import { MenuType } from "../generated/prisma/client";
import { revalidatePath } from "next/cache";
export default async function AddMenu(formData:FormData){
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const description = formData.get("description") as string;
    const category = formData.get("category") as MenuType;
    const image = formData.get("image") as string | null;
    await prisma.menu.create({
        data:{
            name,
            price,
            description,
            category,
            image
        }
    })
    revalidatePath("/staff")

}