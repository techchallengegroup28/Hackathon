import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export function middleware(request: NextRequest) {
	const cookieStore = cookies()

	//Configura um middleware para validar se o cookie accessToken existe
	if (cookieStore.has("accessToken")) {
		return NextResponse.next();
	}
	
	return NextResponse.redirect(new URL('/login', request.url))
}

export const config = {
	matcher: ['/', '/conteudo-detalhes', '/admin/:path*'],
}