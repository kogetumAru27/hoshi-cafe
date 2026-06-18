import { prisma } from "@/lib/prisma";
import ReservaForm from "@/components/ReservationForm";
const statusLabel: { [key: string]: string } = {
    RESERVED: "予約中",
    CANCEL: "キャンセル",
    COMPLETED: "完了"
}
export default async function reservation(){
    const reservations = await prisma.reservation.findMany({
        where:{ status: "RESERVED" },
        include:{ user: true }
    });
    return(
        <div className="p-8  max-w-lg mx-auto">
            <ReservaForm/>
            {reservations.map(re => (
                <div key={re.id} className="border border-gray-200 shadow-md rounded-2xl p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 mb-4">
                 <p className="font-bold">{re.startTime.toLocaleDateString("ja-JP")} {re.startTime.toLocaleTimeString("ja-JP", {hour: "2-digit", minute: "2-digit"})}</p>
                    <p className="text-gray-500">{re.user.name}</p>
                    <p className={re.status === "RESERVED" ? "text-green-500" : "text-red-500"}>{statusLabel[re.status]}</p>
                </div>
            ))}
        </div>
    )
}