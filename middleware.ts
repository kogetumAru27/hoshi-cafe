import { getToken } from "next-auth/jwt";
import { NextRequest,NextResponse } from "next/server";
export default async function middleware(request:NextRequest){
    const token = await getToken({req:request});
 if(request.nextUrl.pathname.startsWith("/staff")){
    if(!token || token?.role !== "STAFF"){
        return NextResponse.redirect(new URL("/",request.url))
    }
 }
 if(request.nextUrl.pathname.startsWith("/mypage")){
    if(!token){
        return NextResponse.redirect(new URL("/",request.url))
    }
 }
   return  NextResponse.next()
}
export const config = {
    matcher:"/:path*"
}