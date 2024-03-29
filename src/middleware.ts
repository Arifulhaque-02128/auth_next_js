import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const isPublicPath = (path === '/login' || path === '/signup' || path === "/verifyemail" || path === '/temp' || path === '/resetpass' || path === '/forgetPass')

    const token = req.cookies.get('token')?.value || ""

    if(isPublicPath && token) {
        return NextResponse.redirect(new URL('/', req.nextUrl))
    }

    else if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }
}

export const config = {
    matcher : ['/', '/profile/:id*', '/login', '/signup', '/verifyemail', '/temp', '/resetpass', '/forgetPass']
}