"use client";
import { signIn,signOut,useSession } from "next-auth/react";
export default function LoginButton(){
    const {data:session} = useSession();
    if(session){
        return(
            <div className="flex flex-col items-center mt-8">
                <p className="text-white mb-2">{session.user.name}さん</p>
                <button onClick={() => signOut({callbackUrl:"/"})} className="border border-gray-300 px-4 py-2 rounded-full hover:bg-white hover:text-black transition">ログアウト</button>
            </div>
            
    )
}
 return(
    <button onClick={() => signIn("google")} className="border border-gray-300 px-4 py-2 rounded-full hover:bg-white hover:text-black transition">ログイン</button>
 )
}