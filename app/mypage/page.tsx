import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import CancelButton from "@/components/cancelButton";
import Tabs from "@/components/mypageTab";
export default async function Mypage(){
    const session = await getServerSession(authOptions);
    if(!session)return <p>ログインしてください</p>
    const order = await prisma.order.findMany({
        where:{userId:session?.user.id},
        include:{
            Items:{
                include:{menu:true}
            }
        }

    });
    const starrevalation = await prisma.reservation.findMany({
        where:{userId:session?.user.id}
    });
    const notification = await prisma.notification.findMany({
        where:{
            userId:session.user.id,
        }
    })
    return(
        <Tabs notificationIds={notification.map(no => no.id)} notificationContent={
        <div className="p-8">
            {notification.length > 0 &&(
                <div className="mb-8">
                    <h2 className="font-bold text-lg mb-4">通知</h2>
                    {notification.map(no => (
                        <div key={no.id} className={`border shadow-md rounded-2xl p-4 mb-2 ${
                            no.isRead
                            ? "border-gray-200 bg-gray-50 opacity-50"
                            : no.type === "ORDER_READY" 
                                ? "border-yellow-400 bg-yellow-50" 
                                : "border-blue-400 bg-blue-50"
                        }`}>
                            <p>{no.type === "ORDER_READY" ? "🍽️" : "🔭"} {no.message}</p>
                        </div>
                    ))}

                </div>
            )}
            </div>
            }
            orderContent={ 
            <div>
            <h2 className="font-bold text-lg mb-4">注文履歴</h2>
            {order.map(ord => (
                <div key={ord.id} className="border border-gray-200 shadow-md rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 p-4 mb-4">
                    {ord.Items.map(item => (
                        <div key={item.id} className="p-8">
                            {item.menu.image && <img src={item.menu.image} alt={item.menu.name} className="w-16 h-16 object-cover rounded-lg"/>}
                            <p className="px-4 py-2 mb-2">{item.menu.name}</p>
                            <p className="px-4 py-2 mb-2">¥{item.menu.price}</p>
                        </div>
                    ))}
                </div>
            ))}
            </div>}
             reservationContent ={
            <div>
            <h2 className="font-bold text-lg mb-4">予約履歴</h2>
            {starrevalation.map(star => (
                <div key={star.id} className="border border-gray-200 shadow-md rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 p-4 mb-2">
                    <p className="px-4 py-2 mb-2">{star.startTime.toDateString()}</p>
                    <p className="px-4 py-2 mb-2">{star.status}</p>
                    {star.status === "RESERVED" && <CancelButton reservationId={star.id}/>}
                </div>
            ))}
            </div>
         } />
    )
}