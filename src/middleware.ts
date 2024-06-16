import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
    const authToken = request.cookies.get("authenticated-token");
    // const test = config.matcher[4];
    if (authToken && request.nextUrl.pathname === "/login") {
        return NextResponse.redirect(new URL("/",request.url));
    }
    if (!authToken && request.nextUrl.pathname ==="/checkout"){
        return NextResponse.redirect(new URL("/login",request.url));
    }
}
export const config = {
    matcher: [
        "/login" ,  "/" , '/checkout'
    ]
}


