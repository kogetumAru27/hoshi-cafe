"use server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";
export default async function Cancel(){
    const session = await getServerSession(authOptions);
    await prisma.reservation.update({
        where:{id:session?.user.id},
        data:{
            status:"CANCEL"
        }
    });
    revalidatePath("/reservation");
}