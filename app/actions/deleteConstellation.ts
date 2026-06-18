"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
export default async function Constellationdelete (constellationId:string) {
    await prisma.constellation.delete({
        where:{
            id:constellationId
        }
    });
   revalidatePath("/staff") 
}