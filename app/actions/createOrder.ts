"use server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

type CartItem = {
    menuId: string
    price: number
    quantity: number
}

export default async function createOrder(totalPrice: number, items: CartItem[]){
    const session = await getServerSession(authOptions);
    if(!session) return;
    
    await prisma.order.create({
        data:{
            userId: session.user.id,
            totalPrice,
            status: "PENDING",
            Items:{
                create: items.map(item => ({
                    menuId: item.menuId,
                    quantity: item.quantity,
                }))
            }
        }
    });
    revalidatePath("/mypage");
}