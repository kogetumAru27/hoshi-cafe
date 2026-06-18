"use server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";
export default async function Cancel(reservationId: string){
    const session = await getServerSession(authOptions);
    if(!session) return;
     // 自分の予約かどうか確認
    const reservation = await prisma.reservation.findFirst({
        where:{id:reservationId,userId:session.user.id}
    });
    if(!reservation) return
    await prisma.reservation.update({
        where:{id:reservationId},
        data:{
            status:"CANCEL"
        }
    });
    revalidatePath("/mypage");
}