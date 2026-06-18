"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
export default async function createRese(formDate:FormData){
    const session = await getServerSession(authOptions);
    if(!session) return ;
    const date= formDate.get("date") as string;
    const time = formDate.get("time") as string;
    const startTime = new Date(`${date}T${time}:00`)

     await prisma.reservation.create({
        data:{
            userId:session.user.id,
            startTime,
            status:"RESERVED"
        }
    });
    revalidatePath("/reservation")
}