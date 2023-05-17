// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest, _next: NextFetchEvent) {
  const { pathname } = request.nextUrl;
  const protectedPaths = ["/admin", "/profile"];
  const matchesProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (matchesProtectedPath) {
    const token: any = await getToken({ req: request });

    if (!token) {
      const url = new URL(`/`, request.url);
      url.searchParams.set("callbackUrl", encodeURI(request.url));
      return NextResponse.redirect(url);
    }

    if (token.user.role != "admin") {
      const url = new URL(`/`, request.url);
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}
