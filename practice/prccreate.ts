"use server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";
export default async function prc(formDate:FormData){
    const session = await getServerSession(authOptions);
    if(!session)return
    const startTime = new Date(formDate.get("startDate") as string)
    await prisma.reservation.create({
        data:{
            userId:session.user.id,
            status:"RESERVED",
            startTime
        }
    }
    );
    revalidatePath("/");
}