"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { SeasonType } from "../generated/prisma/client";
export default async function CreateConstellation(formData:FormData){
    const name = formData.get("name") as string;
    const image = formData.get("image") as string | null;
    const description = formData.get("description") as string;
    const magnitude = Number(formData.get("magnitude"));
    const shape = formData.get("shape") as string;
    const season = formData.get("season") as SeasonType;
     await prisma.constellation.create({
        data:{
            name,
            image,
            description,
            magnitude,
            shape,
            season
        }
    });
    revalidatePath("/staff")
}