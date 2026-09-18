import {
  Users,
  Link2,
  Package,
  CircleDollarSign,
  Gift,
  CircleCheck,
  TriangleAlert,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/format";
import { BunnyMascot } from "@/components/ui/BunnyMascot";

export default async function AdminDashboardPage() {
  const [
    totalCustomers,
    totalLinks,
    totalOrders,
    commissionAgg,
    rewardAgg,
    profitAgg,
    paidAgg,
    unmappedOrders,
  ] = await Promise.all([
    prisma.customer.count(),
    prisma.trackingLink.count(),
    prisma.order.count(),
    prisma.order.aggregate({ _sum: { commissionAmount: true } }),
    prisma.order.aggregate({ _sum: { customerRewardAmount: true }, where: { payoutStatus: { not: "paid" } } }),
    prisma.order.aggregate({ _sum: { systemProfitAmount: true } }),
    prisma.order.aggregate({ _sum: { customerRewardAmount: true }, where: { payoutStatus: "paid" } }),
    prisma.order.count({ where: { OR: [{ customerId: null }, { trackingLinkId: null }] } }),
  ]);

  const commission = Number(commissionAgg._sum.commissionAmount ?? 0);
  const profit = Number(profitAgg._sum.systemProfitAmount ?? 0);
  const debt = Number(rewardAgg._sum.customerRewardAmount ?? 0);
  const paid = Number(paidAgg._sum.customerRewardAmount ?? 0);

  return (
    <div className="flex flex-col gap-lg fade-in relative">
      {/* Floating Bunny Decorations */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-40 z-0">
        <img src="/mascots/icons/bunny-delighted.webp" alt="" className="float-icon-1 absolute top-[10%] left-[5%] h-12 w-12 opacity-20" />
        <img src="/mascots/icons/bunny-sparkle.webp" alt="" className="float-icon-2 absolute top-[60%] right-[8%] h-14 w-14 opacity-25" />
        <img src="/mascots/icons/bunny-wink.webp" alt="" className="float-icon-3 absolute bottom-[20%] left-[10%] h-10 w-10 opacity-15" />
      </div>

      {/* ═══ HEADER ═══ */}
      <div className="relative overflow-hidden rounded-3xl p-xl sm:p-2xl shadow-xl"
        style={{ background: "linear-gradient(135deg, #FFF0F4 0%, #FFE5ED 50%, #FFDCE7 100%)" }}>
        {/* Animated Background Elements */}
        <div className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full bg-[#FFC4D6] opacity-30 animate-pulse-slow" />
        <div className="pointer-events-none absolute -bottom-6 right-32 h-24 w-24 rounded-full bg-[#F2809E] opacity-20 sparkle-2" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-40 w-40 rounded-full bg-[#FFDCE7] opacity-40 sparkle-1" />
        <div className="pointer-events-none absolute top-1/2 left-1/4 h-16 w-16 rounded-full bg-white opacity-20 sparkle-3" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-lg flex-wrap">
          <div className="flex items-center gap-lg">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D13A6B] to-[#E8558A] opacity-20 blur-2xl rounded-full animate-pulse-slow" />
              <img
                src="/mascots/icons/bunny-sparkle.webp"
                alt="Tổng quan"
                className="relative h-20 w-20 sm:h-24 sm:w-24 object-contain drop-shadow-2xl shrink-0 hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div>
              <p className="text-[12px] font-bold uppercase tracking-widest text-[#D13A6B]/70 mb-1 flex items-center gap-xs">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#D13A6B] animate-pulse" />
                Bảng điều khiển Admin
              </p>
              <h1 className="text-[26px] sm:text-[36px] font-black leading-tight bg-gradient-to-r from-[#2E1F26] via-[#D13A6B] to-[#E8558A] bg-clip-text text-transparent">
                Tổng quan hệ thống 🐰
              </h1>
              <p className="mt-1 text-[13px] text-[#9A8490] leading-relaxed font-medium">
                ✨ Hiệu suất affiliate và số dư công nợ toàn hệ thống
              </p>
            </div>
          </div>
          <div className="flex gap-sm flex-wrap items-center">
            <a href="/admin/orders/import">
              <button className="group flex items-center gap-xs rounded-2xl bg-white/90 backdrop-blur-sm border-2 border-[#D13A6B]/20 px-xl py-[12px] text-[13px] font-bold text-[#D13A6B] shadow-lg transition-all hover:bg-white hover:shadow-xl hover:border-[#D13A6B]/40 hover:-translate-y-0.5 active:scale-[0.97]">
                📊 Import đối soát
                <ArrowUpRight size={14} strokeWidth={2.5} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </a>
            <a href="/admin/payments">
              <button className="sheen gloss group flex items-center gap-xs rounded-2xl bg-gradient-to-r from-[#D13A6B] via-[#E8558A] to-[#D13A6B] px-xl py-[12px] text-[13px] font-bold text-white shadow-glow transition-all duration-200 ease-soft hover:shadow-2xl hover:-translate-y-0.5 active:scale-[0.97]">
                💰 Thanh toán
                <ArrowUpRight size={14} strokeWidth={2.5} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </a>
            <div className="hidden lg:grid h-[92px] w-[92px] place-items-center rounded-full bg-gradient-to-br from-white via-[#FFF0F4] to-white ring-2 ring-[#D13A6B]/20 shadow-2xl hover:scale-105 transition-transform duration-300 hover:rotate-6">
              <BunnyMascot size={72} />
            </div>
          </div>
        </div>
      </div>

      {/* ═══ 4 KPI CARDS ═══ */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-md relative z-10">
        {/* Khách hàng */}
        <div className="group relative overflow-hidden rounded-2xl bg-white p-lg shadow-lg ring-1 ring-black/[0.06] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:ring-blue-200">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-sky-50 to-blue-50 opacity-70" />
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-blue-200 opacity-20 group-hover:scale-150 transition-transform duration-500" />
          <div className="relative">
            <div className="flex items-start justify-between mb-md">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 transition-transform group-hover:scale-110 group-hover:rotate-6 duration-300 shadow-md">
                <img src="/mascots/icons/bunny-delighted.webp" alt="" className="h-8 w-8 object-contain" />
                <div className="absolute inset-0 bg-blue-300 opacity-0 group-hover:opacity-20 rounded-2xl blur transition-opacity" />
              </div>
              <span className="rounded-full bg-gradient-to-r from-blue-100 to-blue-200 px-sm py-[3px] text-[10px] font-bold text-blue-600 shadow-sm">👥 Thành viên</span>
            </div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-blue-400 mb-1">Khách hàng</div>
            <div className="text-[32px] font-black bg-gradient-to-br from-blue-600 to-blue-400 bg-clip-text text-transparent tabular-nums leading-tight">{totalCustomers}</div>
            <div className="mt-1 text-[11px] text-gray-500 font-medium">người dùng đã đăng ký</div>
          </div>
        </div>

        {/* Link Affiliate */}
        <div className="group relative overflow-hidden rounded-2xl bg-white p-lg shadow-lg ring-1 ring-black/[0.06] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:ring-violet-200">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-purple-50 to-violet-50 opacity-70" />
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-violet-200 opacity-20 group-hover:scale-150 transition-transform duration-500" />
          <div className="relative">
            <div className="flex items-start justify-between mb-md">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-violet-200 transition-transform group-hover:scale-110 group-hover:rotate-6 duration-300 shadow-md">
                <img src="/mascots/icons/bunny-wink.webp" alt="" className="h-8 w-8 object-contain" />
                <div className="absolute inset-0 bg-violet-300 opacity-0 group-hover:opacity-20 rounded-2xl blur transition-opacity" />
              </div>
              <span className="rounded-full bg-gradient-to-r from-violet-100 to-violet-200 px-sm py-[3px] text-[10px] font-bold text-violet-600 shadow-sm">🔗 Affiliate</span>
            </div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-violet-400 mb-1">Link Affiliate</div>
            <div className="text-[32px] font-black bg-gradient-to-br from-violet-600 to-violet-400 bg-clip-text text-transparent tabular-nums leading-tight">{totalLinks}</div>
            <div className="mt-1 text-[11px] text-gray-500 font-medium">link đang hoạt động</div>
          </div>
        </div>

        {/* Đơn hàng */}
        <div className="group relative overflow-hidden rounded-2xl bg-white p-lg shadow-lg ring-1 ring-black/[0.06] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:ring-amber-200">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 opacity-70" />
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-amber-200 opacity-20 group-hover:scale-150 transition-transform duration-500" />
          <div className="relative">
            <div className="flex items-start justify-between mb-md">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 transition-transform group-hover:scale-110 group-hover:rotate-6 duration-300 shadow-md">
                <img src="/mascots/icons/bunny-heart.webp" alt="" className="h-8 w-8 object-contain" />
                <div className="absolute inset-0 bg-amber-300 opacity-0 group-hover:opacity-20 rounded-2xl blur transition-opacity" />
              </div>
              <span className="rounded-full bg-gradient-to-r from-amber-100 to-amber-200 px-sm py-[3px] text-[10px] font-bold text-amber-600 shadow-sm">📦 Đơn hàng</span>
            </div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-1">Tổng đơn</div>
            <div className="text-[32px] font-black bg-gradient-to-br from-amber-600 to-amber-400 bg-clip-text text-transparent tabular-nums leading-tight">{totalOrders}</div>
            <div className="mt-1 text-[11px] text-gray-500 font-medium">đơn hàng đã ghi nhận</div>
          </div>
        </div>

        {/* Đã hoàn tiền */}
        <div className="group relative overflow-hidden rounded-2xl p-lg shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
          style={{ background: "linear-gradient(135deg, #e8f5e9 0%, #f1fdf2 50%, #e8f5e9 100%)", outline: "1px solid rgba(0,0,0,0.06)" }}>
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-emerald-200 opacity-20 group-hover:scale-150 transition-transform duration-500" />
          <div className="relative">
            <div className="flex items-start justify-between mb-md">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-200 transition-transform group-hover:scale-110 group-hover:rotate-6 duration-300 shadow-md">
                <img src="/mascots/icons/bunny-heart.webp" alt="" className="h-8 w-8 object-contain" />
                <div className="absolute inset-0 bg-emerald-300 opacity-0 group-hover:opacity-20 rounded-2xl blur transition-opacity" />
              </div>
              <span className="rounded-full bg-gradient-to-r from-emerald-100 to-emerald-200 px-sm py-[3px] text-[10px] font-bold text-emerald-600 shadow-sm">✅ Đã hoàn</span>
            </div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-1">Đã hoàn tiền</div>
            <div className="text-[26px] font-black bg-gradient-to-br from-emerald-600 to-emerald-400 bg-clip-text text-transparent tabular-nums leading-tight">{formatCurrency(paid)}</div>
            <div className="mt-1 text-[11px] text-gray-500 font-medium">đã chuyển khoản thành công</div>
          </div>
        </div>
      </div>

      {/* ═══ DOANH THU + VẬN HÀNH ═══ */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-lg">

        {/* Cột trái: TÀI CHÍNH */}
        <div className="lg:col-span-2 flex flex-col gap-lg">
          <div className="rounded-3xl bg-white shadow-sm ring-1 ring-black/[0.06] overflow-hidden">
            {/* Header */}
            <div className="relative overflow-hidden p-xl"
              style={{ background: "linear-gradient(135deg, #FFF3F7 0%, #FDE3EB 100%)" }}>
              <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-[#D13A6B] opacity-10" />
              <div className="relative z-10 flex items-center gap-sm mb-xl">
                <img src="/mascots/icons/bunny-blink.webp" alt="" className="h-10 w-10 object-contain" />
                <div>
                  <h2 className="text-[16px] font-bold text-gray-900">Doanh thu & Lợi nhuận</h2>
                  <p className="text-[12px] text-gray-400">Tổng hợp tài chính toàn hệ thống</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-xl lg:col-span-2">
                <div>
                  <div className="text-[12px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Tổng hoa hồng nhận về
                  </div>
                  <div className="flex items-end gap-sm">
                    <div className="text-[28px] sm:text-[36px] font-black tracking-tight text-gray-900 leading-none">
                      {formatCurrency(commission)}
                    </div>
                    <TrendingUp size={18} className="text-emerald-500 mb-1" />
                  </div>
                </div>
                <div>
                  <div className="text-[12px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Hệ thống thực giữ
                  </div>
                  <div className="flex items-end gap-sm">
                    <div className="text-[28px] sm:text-[36px] font-black tracking-tight text-[#D13A6B] leading-none">
                      {formatCurrency(profit)}
                    </div>
                    <CircleDollarSign size={18} className="text-[#D13A6B] mb-1" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
              <div className="p-xl">
                <div className="flex items-center gap-sm mb-md">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50">
                    <Gift size={16} className="text-rose-500" />
                  </div>
                  <span className="text-[14px] font-bold text-gray-900">Công nợ khách hàng</span>
                </div>
                <div className="text-[26px] font-black text-gray-900 tabular-nums">{formatCurrency(debt)}</div>
                <p className="text-[12px] text-gray-400 mt-1">Cần hoàn trả cho khách hàng</p>
                <a href="/admin/payments" className="mt-md inline-flex items-center gap-xs text-[12px] font-bold text-[#D13A6B] hover:text-[#B92E5B] transition-colors">
                  Xem chi tiết <ArrowUpRight size={12} strokeWidth={2.5} />
                </a>
              </div>
              <div className="p-xl">
                <div className="flex items-center gap-sm mb-md">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50">
                    <CircleCheck size={16} className="text-emerald-500" />
                  </div>
                  <span className="text-[14px] font-bold text-gray-900">Đã thanh toán</span>
                </div>
                <div className="text-[26px] font-black text-gray-900 tabular-nums">{formatCurrency(paid)}</div>
                <p className="text-[12px] text-gray-400 mt-1">Đã chuyển khoản thành công</p>
                <a href="/admin/reports" className="mt-md inline-flex items-center gap-xs text-[12px] font-bold text-[#D13A6B] hover:text-[#B92E5B] transition-colors">
                  Xem báo cáo <ArrowUpRight size={12} strokeWidth={2.5} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Cột phải: VẬN HÀNH */}
        <div className="flex flex-col gap-lg">
          <div className="rounded-3xl bg-white shadow-sm ring-1 ring-black/[0.06] p-xl flex flex-col gap-md">
            <div className="flex items-center gap-sm mb-sm">
              <img src="/mascots/icons/bunny-sparkle.webp" alt="" className="h-9 w-9 object-contain" />
              <h2 className="text-[15px] font-bold text-gray-900">Chỉ số vận hành</h2>
            </div>

            {[
              { href: "/admin/customers", icon: Users, label: "Khách hàng", value: totalCustomers, bg: "bg-blue-50", color: "text-blue-500" },
              { href: "/admin/links", icon: Link2, label: "Link Affiliate", value: totalLinks, bg: "bg-violet-50", color: "text-violet-500" },
              { href: "/admin/orders", icon: Package, label: "Đơn hàng", value: totalOrders, bg: "bg-amber-50", color: "text-amber-500" },
            ].map(({ href, icon: Icon, label, value, bg, color }) => (
              <a key={label} href={href}
                className="group flex items-center justify-between rounded-2xl bg-gray-50/80 border border-gray-100 p-lg hover:bg-rose-50/50 hover:border-[#D13A6B]/20 transition-all">
                <div className="flex items-center gap-md">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg} transition-transform group-hover:scale-110`}>
                    <Icon size={18} className={color} strokeWidth={1.75} />
                  </div>
                  <span className="text-[14px] font-semibold text-gray-800">{label}</span>
                </div>
                <div className="flex items-center gap-sm">
                  <span className="text-[20px] font-black text-gray-900 tabular-nums">{value}</span>
                  <ChevronRightIcon />
                </div>
              </a>
            ))}

            {unmappedOrders > 0 && (
              <a href="/admin/orders" className="group flex items-center justify-between rounded-2xl bg-red-50 border border-red-100 p-lg hover:bg-red-100/60 transition-all">
                <div className="flex items-center gap-md">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">
                    <TriangleAlert size={18} className="text-red-500" strokeWidth={1.75} />
                  </div>
                  <div>
                    <span className="text-[13px] font-bold text-red-700 block">Đơn lỗi / Chưa map</span>
                    <span className="text-[11px] text-red-400">Cần xử lý ngay</span>
                  </div>
                </div>
                <span className="text-[20px] font-black text-red-600 tabular-nums">{unmappedOrders}</span>
              </a>
            )}
          </div>

          {/* Quick actions */}
          <div className="rounded-3xl bg-white shadow-sm ring-1 ring-black/[0.06] p-xl">
            <h2 className="mb-md flex items-center gap-sm text-[14px] font-bold text-gray-700">
              <img src="/mascots/icons/bunny-heart.webp" alt="" className="h-7 w-7 object-contain" />
              Thao tác nhanh
            </h2>
            <div className="grid grid-cols-2 gap-sm">
              {[
                { href: "/admin/customers", label: "Khách hàng", bg: "bg-blue-50", text: "text-blue-600" },
                { href: "/admin/orders/import", label: "Import CSV", bg: "bg-amber-50", text: "text-amber-600" },
                { href: "/admin/payments", label: "Thanh toán", bg: "bg-emerald-50", text: "text-emerald-600" },
                { href: "/admin/reports", label: "Báo cáo", bg: "bg-violet-50", text: "text-violet-600" },
              ].map(({ href, label, bg, text }) => (
                <a key={href} href={href}
                  className={`flex flex-col items-center gap-xs rounded-2xl ${bg} p-md text-center transition-all hover:-translate-y-0.5 hover:shadow-sm`}>
                  <span className={`text-[12px] font-bold ${text}`}>{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper inline component tránh import thêm
function ChevronRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-gray-300 group-hover:text-[#D13A6B] transition-colors">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
