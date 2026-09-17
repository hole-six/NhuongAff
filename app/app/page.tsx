import { redirect } from "next/navigation";
import {
  Clock,
  Wallet,
  Package,
  ArrowUpRight,
  Link2,
  ChevronRight,
  Star,
  Store,
  Music2,
} from "lucide-react";
import QRCode from "qrcode";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/format";
import { InviteSection } from "@/components/customer/InviteSection";
import { PhoneNumberPrompt } from "@/components/customer/PhoneNumberPrompt";
import { BunnyMascot } from "@/components/ui/BunnyMascot";
import { BunnyFace } from "@/components/ui/BunnyFace";
import { Icons8Icon, PlatformLogo } from "@/components/icons/PlatformIcons";

// Platform color map để hiển thị ảnh placeholder
const PLATFORM_STYLE: Record<string, { color: string }> = {
  SHOPEE: { color: "#ee4d2d" },
  TIKTOK: { color: "#000000" },
  LAZADA: { color: "#0f146d" },
  TIKI: { color: "#1a73e8" },
};

export default async function CustomerHomePage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role === "admin" || !session.customerId) redirect("/admin");

  const [customer, activeRule, allOrders] = await Promise.all([
    prisma.customer.findUnique({
      where: { id: session.customerId },
      include: {
        // CHỈ dùng để hiển thị preview "Lịch sử đơn hàng" bên dưới (cần ảnh/
        // tên sản phẩm) — KHÔNG dùng số liệu này để tính tổng, vì take:6 sẽ
        // cắt mất đơn cũ hơn nếu khách có nhiều hơn 6 đơn. Số liệu thật lấy
        // từ allOrders (không giới hạn) ở dưới.
        orders: {
          orderBy: { createdAt: "desc" },
          take: 6,
          include: {
            trackingLink: { select: { productImage: true, productTitle: true } },
            platform: { select: { code: true, name: true } },
          },
        },
        trackingLinks: { orderBy: { createdAt: "desc" }, take: 3 },
      },
    }),
    prisma.commissionRule.findFirst({
      where: { active: true },
      orderBy: { createdAt: "desc" },
    }),
    // Toàn bộ đơn (không giới hạn) — dùng để tính đúng số dư/số đơn tổng,
    // trước đây tái dùng nhầm danh sách take:6 ở trên khiến khách có hơn 6
    // đơn bị hiện thiếu cả số đơn lẫn số tiền trên trang chủ.
    prisma.order.findMany({
      where: { customerId: session.customerId },
      select: { orderStatus: true, payoutStatus: true, customerRewardAmount: true },
    }),
  ]);

  const recentOrders = customer?.orders ?? [];
  const totalIncome = allOrders.reduce((s, o) => s + Number(o.customerRewardAmount), 0);
  const pendingIncome = allOrders
    .filter((o) => o.orderStatus === "pending")
    .reduce((s, o) => s + Number(o.customerRewardAmount), 0);
  const availableBalance = allOrders
    .filter((o) => o.orderStatus === "approved" && o.payoutStatus === "unpaid")
    .reduce((s, o) => s + Number(o.customerRewardAmount), 0);
  const paidTotal = allOrders
    .filter((o) => o.payoutStatus === "paid")
    .reduce((s, o) => s + Number(o.customerRewardAmount), 0);

  const firstName = (customer?.fullName ?? session.fullName).split(" ").at(-1) ?? "bạn";
  const customerCode = customer?.customerCode ?? "";
  const referralRate = activeRule?.referralRate ? Number(activeRule.referralRate) : 0.05;
  const maxReferralOrders = activeRule?.maxReferralOrders ?? 5;
  const referralValidityMonths = activeRule?.referralValidityMonths ?? 6;

  // Sinh QR server-side thành data URL (không cần client lib)
  const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL ?? "https://hoahuongaff.click"}/register?ref=${customerCode}`;
  let qrDataUrl = "";
  try {
    qrDataUrl = await QRCode.toDataURL(inviteUrl, {
      width: 280,
      margin: 2,
      color: { dark: "#2E1F26", light: "#ffffff" },
    });
  } catch (_) {}

  return (
    <div className="flex flex-col gap-lg fade-in">

      {!customer?.phone && <PhoneNumberPrompt />}

      {/* ═══ TOP HERO CONTAINER (GREETING + QUICK ACCESS + 4 STAT CARDS) ═══ */}
      <div
        className="relative overflow-hidden rounded-3xl p-lg sm:p-xl shadow-sm border border-[#FFD0DE]/50"
        style={{ background: "linear-gradient(135deg, #FFF3F7 0%, #FDE3EB 50%, #FFE8F0 100%)" }}
      >
        {/* Decorative background blobs */}
        <div className="pointer-events-none absolute -right-8 -top-8 h-44 w-44 rounded-full bg-[#FFC4D6] opacity-35 blur-xl" />
        <div className="pointer-events-none absolute -bottom-10 right-32 h-36 w-36 rounded-full bg-[#F2809E] opacity-20 blur-lg" />
        <div className="pointer-events-none absolute top-1/2 left-1/3 h-32 w-32 rounded-full bg-[#FFDCE7] opacity-30 blur-xl" />

        <div className="relative z-10 flex flex-col gap-xl">
          {/* Greeting Header & Quick Access Actions */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-lg">
            {/* Greeting info */}
            <div className="flex items-center gap-md">
              <BunnyFace mood="sparkle" size={80} className="drop-shadow-md shrink-0 transition-transform hover:scale-105" />
              <div>
                <p className="text-[12px] font-bold uppercase tracking-widest text-[#D13A6B]/70 mb-1">
                  Chào mừng trở lại
                </p>
                <h1 className="text-[24px] sm:text-[30px] font-black leading-tight text-[#2E1F26]">
                  Xin chào, <span className="text-[#D13A6B]">{firstName}</span>! 🎉
                </h1>
                <p className="mt-1 text-[13px] text-[#8C7481] leading-relaxed">
                  {allOrders.length === 0
                    ? "Chưa có đơn nào — chọn nút hoàn tiền ngay để bắt đầu!"
                    : `Bạn có ${allOrders.length} đơn đã ghi nhận. Tiếp tục kiếm tiền nhé! 🐰`}
                </p>
              </div>
            </div>

            {/* Quick Access Action Pills Bar */}
            <div className="flex items-center gap-xs sm:gap-sm flex-wrap">
              <a href="/app/refunds">
                <button className="sheen gloss flex items-center gap-xs rounded-2xl bg-gradient-to-r from-[#D13A6B] to-[#E84878] px-lg py-[10px] text-[13px] font-bold text-white shadow-md shadow-[#D13A6B]/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.97]">
                  <Icons8Icon slug="money" size={20} alt="" />
                  <span>Hoàn tiền ngay</span>
                  <ArrowUpRight size={15} strokeWidth={2.5} />
                </button>
              </a>

              <a href="/app/wallet">
                <button className="flex items-center gap-xs rounded-2xl bg-white/90 hover:bg-white px-md py-[10px] text-[13px] font-bold text-emerald-700 shadow-sm ring-1 ring-emerald-500/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.97]">
                  <Icons8Icon slug="bank-card-back-side" size={20} alt="" />
                  <span>Rút tiền</span>
                </button>
              </a>

              <a href="/app/orders">
                <button className="flex items-center gap-xs rounded-2xl bg-white/90 hover:bg-white px-md py-[10px] text-[13px] font-bold text-blue-700 shadow-sm ring-1 ring-blue-500/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.97]">
                  <Icons8Icon slug="shopping-bag" size={20} alt="" />
                  <span>Đơn hàng</span>
                </button>
              </a>

              <a href="/app/deals">
                <button className="flex items-center gap-xs rounded-2xl bg-white/90 hover:bg-white px-md py-[10px] text-[13px] font-bold text-purple-700 shadow-sm ring-1 ring-purple-500/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.97]">
                  <Icons8Icon slug="discount" size={20} alt="" />
                  <span>Ưu đãi hot</span>
                </button>
              </a>

              <div className="hidden xl:flex h-11 w-11 items-center justify-center rounded-2xl bg-white/80 ring-2 ring-[#D13A6B]/15 shadow-cute ml-xs">
                <BunnyMascot size={32} />
              </div>
            </div>
          </div>

          {/* Integrated 4 Stat Cards Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-sm sm:gap-md pt-xs">
            {/* Card 1: Chờ duyệt */}
            <div className="group relative overflow-hidden rounded-2xl bg-white/85 backdrop-blur-sm p-md sm:p-lg shadow-sm border border-rose-100/60 transition-all duration-200 hover:bg-white hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-start justify-between mb-sm">
                <Icons8Icon slug="hourglass" size={38} alt="" className="transition-transform group-hover:scale-110" />
                <span className="rounded-full bg-amber-100 px-xs sm:px-sm py-[2px] text-[10px] font-bold text-amber-600">Đang xử lý</span>
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">Chờ duyệt</div>
              <div className="text-[18px] sm:text-[22px] font-black text-gray-900 tabular-nums leading-tight">{formatCurrency(pendingIncome)}</div>
              <div className="mt-1 text-[11px] font-medium text-gray-400">
                {allOrders.filter((o) => o.orderStatus === "pending").length} đơn hàng
              </div>
            </div>

            {/* Card 2: Sẵn sàng rút */}
            <div className="group relative overflow-hidden rounded-2xl bg-white/85 backdrop-blur-sm p-md sm:p-lg shadow-sm border border-emerald-100/80 transition-all duration-200 hover:bg-white hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-start justify-between mb-sm">
                <div className="relative">
                  <Icons8Icon slug="money" size={38} alt="" className="transition-transform group-hover:scale-110" />
                  <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 shadow-sm">
                    <span className="text-[8px] font-black text-white">✓</span>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-100 px-xs sm:px-sm py-[2px] text-[10px] font-bold text-emerald-600">Rút được</span>
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">Sẵn sàng rút</div>
              <div className="text-[18px] sm:text-[22px] font-black text-gray-900 tabular-nums leading-tight">{formatCurrency(availableBalance)}</div>
              <div className="mt-1 text-[11px] font-medium text-gray-400">
                {allOrders.filter((o) => o.orderStatus === "approved" && o.payoutStatus === "unpaid").length} đơn hàng
              </div>
            </div>

            {/* Card 3: Đã rút */}
            <div className="group relative overflow-hidden rounded-2xl bg-white/85 backdrop-blur-sm p-md sm:p-lg shadow-sm border border-rose-100/60 transition-all duration-200 hover:bg-white hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-start justify-between mb-sm">
                <Icons8Icon slug="bank-card-back-side" size={38} alt="" className="transition-transform group-hover:scale-110" />
                <span className="rounded-full bg-rose-100 px-xs sm:px-sm py-[2px] text-[10px] font-bold text-rose-600">Đã nhận</span>
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">Đã rút</div>
              <div className="text-[18px] sm:text-[22px] font-black text-gray-900 tabular-nums leading-tight">{formatCurrency(paidTotal)}</div>
              <div className="mt-1 text-[11px] font-medium text-gray-400">
                {allOrders.filter((o) => o.payoutStatus === "paid").length} đơn hàng
              </div>
            </div>

            {/* Card 4: Tổng tích luỹ */}
            <div className="group relative overflow-hidden rounded-2xl bg-white/85 backdrop-blur-sm p-md sm:p-lg shadow-sm border border-purple-100/60 transition-all duration-200 hover:bg-white hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-start justify-between mb-sm">
                <Icons8Icon slug="money-bag" size={38} alt="" className="transition-transform group-hover:scale-110" />
                <span className="rounded-full bg-purple-100 px-xs sm:px-sm py-[2px] text-[10px] font-bold text-purple-600">Tổng cộng</span>
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">Tổng tích luỹ</div>
              <div className="text-[18px] sm:text-[22px] font-black text-gray-900 tabular-nums leading-tight">{formatCurrency(totalIncome)}</div>
              <div className="mt-1 text-[11px] font-medium text-gray-400">{allOrders.length} đơn hàng</div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ BOTTOM PANELS ═══ */}
      <div className="grid grid-cols-1 gap-lg xl:grid-cols-[2fr_1fr]">

        {/* LỊCH SỬ ĐƠN HÀNG với ảnh preview */}
        <div className="rounded-3xl bg-white p-md sm:p-xl shadow-sm ring-1 ring-black/[0.06] overflow-hidden">
          <div className="mb-lg flex items-center justify-between border-b border-gray-100 pb-md">
            <h2 className="flex items-center gap-sm text-[15px] font-bold text-gray-900">
              <Icons8Icon slug="shopping-bag" size={28} alt="" />
              Lịch sử đơn hàng
            </h2>
            <a
              href="/app/orders"
              className="flex items-center gap-[3px] text-[12px] font-bold text-[#D13A6B] hover:text-[#B92E5B] transition-colors"
            >
              Xem tất cả
              <ChevronRight size={14} strokeWidth={2.5} />
            </a>
          </div>

          {recentOrders.length === 0 ? (
            <div className="flex flex-col items-center py-2xl text-center">
              <BunnyFace mood="sleepy" size={72} className="mb-lg" />
              <div className="text-[14px] font-semibold text-gray-700">Chưa có đơn hàng nào</div>
              <div className="mt-xs text-[12px] text-gray-400">Chia sẻ link để bắt đầu kiếm tiền hoàn!</div>
            </div>
          ) : (
            <ul className="flex flex-col divide-y divide-gray-50">
              {recentOrders.map((order) => {
                const platformCode = order.platform?.code?.toUpperCase() ?? "";
                const platformColor = PLATFORM_STYLE[platformCode]?.color ?? "#D13A6B";
                const productImage = order.trackingLink?.productImage ?? null;
                const productTitle =
                  order.trackingLink?.productTitle ??
                  order.itemName ??
                  `Đơn hàng ${order.orderExternalId}`;

                return (
                  <li
                    key={order.id}
                    className="flex items-center gap-sm sm:gap-md py-md px-xs hover:bg-rose-50/30 rounded-xl transition-colors"
                  >
                    {/* Ảnh sản phẩm */}
                    <ProductThumb image={productImage} color={platformColor} platform={platformCode} />

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-[13px] font-semibold text-gray-800">{productTitle}</p>
                      <div className="flex items-center gap-xs mt-[2px]">
                        <span
                          className="text-[10px] font-bold uppercase"
                          style={{ color: platformColor }}
                        >
                          {order.platform?.name ?? platformCode}
                        </span>
                        <span className="text-gray-200">•</span>
                        <span className="text-[11px] text-gray-400">{formatDate(order.createdAt)}</span>
                      </div>
                    </div>

                    {/* Số tiền + trạng thái */}
                    <div className="flex flex-col items-end gap-[3px] shrink-0 max-w-[92px] sm:max-w-none">
                      <span className="text-[12px] sm:text-[13px] font-black text-emerald-600 whitespace-nowrap">
                        +{formatCurrency(order.customerRewardAmount)}
                      </span>
                      <span
                        className={`text-[9px] sm:text-[10px] font-bold px-xs sm:px-sm py-[2px] rounded-full whitespace-nowrap ${
                          order.orderStatus === "cancelled" || order.orderStatus === "rejected" || order.orderStatus === "clawback"
                            ? "bg-red-100 text-red-600"
                            : order.payoutStatus === "paid"
                            ? "bg-emerald-100 text-emerald-600"
                            : order.orderStatus === "processing"
                            ? "bg-blue-100 text-blue-600"
                            : order.orderStatus === "approved"
                            ? "bg-green-100 text-green-600"
                            : "bg-amber-100 text-amber-600"
                        }`}
                      >
                        {order.orderStatus === "cancelled" || order.orderStatus === "rejected" || order.orderStatus === "clawback"
                          ? "Đã huỷ"
                          : order.payoutStatus === "paid"
                          ? "Đã rút"
                          : order.orderStatus === "processing"
                          ? "Đang đối soát"
                          : order.orderStatus === "approved"
                          ? "Sẵn sàng rút"
                          : "Chờ duyệt"}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* PANEL PHẢI: Giới thiệu bạn bè với QR */}
        <div className="flex flex-col gap-lg">
          <InviteSection
            customerCode={customerCode}
            qrDataUrl={qrDataUrl}
            referralRate={referralRate}
            maxReferralOrders={maxReferralOrders}
            referralValidityMonths={referralValidityMonths}
            isPartner={customer?.isPartner ?? false}
          />
        </div>
      </div>
    </div>
  );
}

// Server-side component nhỏ để render ảnh sản phẩm (tránh hydration mismatch)
function ProductThumb({
  image,
  color,
  platform,
}: {
  image: string | null;
  color: string;
  platform: string;
}) {
  if (image) {
    // Có ảnh sản phẩm thì gắn thêm logo sàn nhỏ ở góc để biết đơn thuộc sàn nào.
    return (
      <div className="relative h-12 w-12 shrink-0">
        <img
          src={image}
          alt=""
          className="h-12 w-12 rounded-xl object-cover ring-1 ring-black/[0.06] shadow-sm"
        />
        <span className="absolute -bottom-1 -right-1 grid h-[22px] w-[22px] place-items-center rounded-full bg-white ring-1 ring-black/[0.06]">
          <PlatformLogo platform={platform} size={15} />
        </span>
      </div>
    );
  }

  // Không có ảnh thì lấy thẳng logo sàn làm ảnh đại diện, thay cho icon túi
  // chung chung vốn không cho biết đơn đến từ đâu.
  return (
    <div
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ring-1 ring-black/[0.04] shadow-sm"
      style={{ backgroundColor: `${color}14` }}
    >
      <PlatformLogo platform={platform} size={28} />
    </div>
  );
}
