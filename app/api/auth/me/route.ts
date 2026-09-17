import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

// Header marketing dùng endpoint này để biết khách đã đăng nhập hay chưa.
// Cố tình tách ra thành API thay vì đọc session ngay trong trang: các trang
// marketing đang được build tĩnh, nếu đọc cookie trực tiếp thì Next sẽ chuyển
// hết sang render động mỗi request, mất lợi thế tốc độ và SEO.
export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ authenticated: false }, { headers: { "Cache-Control": "no-store" } });
  }

  return NextResponse.json(
    { authenticated: true, role: session.role },
    { headers: { "Cache-Control": "no-store" } }
  );
}
