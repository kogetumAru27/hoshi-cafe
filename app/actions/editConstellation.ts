"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { SeasonType } from "../generated/prisma/client";
export default async function editConstellation(formDate:FormData){
    const constellationId = formDate.get("constellationId") as string;
    const name = formDate.get("name") as string
    const image = formDate.get("image") as string | null;
    const season = formDate.get("season") as SeasonType;
    const magnitude = Number(formDate.get("magnitude"));
    const description = formDate.get("description") as string;
    const shape = formDate.get("shape") as string;
    await prisma.constellation.update({
        where:{id:constellationId},
        data:{
            name,
            image,
            season,
            magnitude,
            description,
            shape
        }
    });
    revalidatePath("/staff");
}