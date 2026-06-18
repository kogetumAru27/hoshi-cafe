import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import LoginButton from "@/components/LoguinButton";
export default async function Home(){
  //const session = await getServerSession(authOptions)
  const recomend = await prisma.menu.findMany({
    where:{isFeatured:true}
  });
  return(
    <div className="p-8 mb-2">
      <h1 className="align-center text-blue-500 ">polarisへようこそ</h1>
      <h2>今月のおすすめ</h2>
      {recomend.map(re => (
        <div key={re.id} className="border border-gray-200 shadow-md rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300">
          <div className="p-4">
          <p className="font-bold text-lg">{re.name}</p>
          <p className="text-gray-500">¥{re.price}</p>
          </div>
          {re.image && <img src={re.image} alt={re.name} className="w-full h-48 object-cover"/>}
        </div>
      ))}
      <p className="font-bold">ログインすると毎回お会計から5%引き</p>
      <LoginButton/>
    </div>
  )
}