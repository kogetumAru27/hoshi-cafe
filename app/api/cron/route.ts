import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){
    const now = new Date();
    
    //時間が過ぎたら予約をCOMPLETEDに変更
    await prisma.reservation.updateMany({
        where:{
            startTime:{lt:now},
            status:"RESERVED"
        },
        data:{status:"COMPLETED"}
    });
    //readyの通知を作成
    const readyOrders = await prisma.order.findMany({
        where:{status:"READY",isNotified:false}
    });
    for(const order of readyOrders){
        await prisma.notification.create({
            data:{
                userId:order.userId,
                message:"ご注文が完了しました！",
                type:"ORDER_READY",
                isRead:false
            }
        });
        await prisma.order.update({
            where:{id:order.id},
            data:{isNotified:true}
        })
    }
    const soon = new Date(now.getTime() + 30 * 60 *1000);
    const upcomingReservations = await prisma.reservation.findMany({
        where:{
            startTime:{gt:now,lt:soon},
            status:"RESERVED",
            isNotified:false
        }
    });
    for(const reservation of upcomingReservations){
        await prisma.notification.create({
            data:{
                userId:reservation.userId,
                type:"RESERVATION_AVAILABLE",
                message:"望遠鏡の順番がもうすぐです！準備をお願いします。",
                isRead:false
            }
        });
        await prisma.reservation.update({
            where:{id:reservation.id},
            data:{isNotified:true}
        })
    }
    return NextResponse.json({ok:true})
     
}