"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "@/components/ui/Pagination";
import { ServerSearchInput } from "@/components/ui/ServerSearchInput";
import { Icons8Icon, PlatformLogo } from "@/components/icons/PlatformIcons";
import { BunnyFace } from "@/components/ui/BunnyFace";

type Order = {
  id: string;
  orderExternalId: string;
  productTitle: string | null;
  productImage: string | null;
  platformName: string;
  platformCode: string;
  sourceType: string;
  createdAt: string;
  orderAmount: string;
  customerRewardAmount: string;
  orderStatus: string;
  payoutStatus: string;
  daysLeft: number | null;
  completedAtText: string | null;
  readyAtText: string | null;
};

type Props = {
  orders: Order[];
  totalPages: number;
  currentPage: number;
  counts: { all: number; completed: number; pending: number; reconciling: number; processing: number; cancelled: number };
};

/** Một nguồn duy nhất cho nhãn/màu/icon của từng trạng thái, dùng chung cho cả
 *  tab lọc lẫn huy hiệu trên từng đơn — trước đây hai chỗ khai báo rời nhau nên
 *  dễ lệch chữ. Icon lấy từ Icons8 thay cho emoji (emoji hiển thị mỗi máy một
 *  kiểu và không đổi màu theo ngữ cảnh được). */
const STATUS = {
  pending: { slug: "hourglass", label: "Chờ sàn xác nhận", chip: "bg-amber-50 text-amber-700 ring-amber-200/70" },
  reconciling: { slug: "synchronize", label: "Đang đối soát", chip: "bg-blue-50 text-blue-700 ring-blue-200/70" },
  processing: { slug: "money", label: "Chờ chuyển khoản", chip: "bg-primary-neutral text-primary ring-primary/20" },
  completed: { slug: "checkmark", label: "Đã nhận tiền", chip: "bg-emerald-50 text-emerald-700 ring-emerald-200/70" },
  cancelled: { slug: "cancel", label: "Đã huỷ", chip: "bg-red-50 text-red-600 ring-red-200/70" },
} as const;

type StatusKey = keyof typeof STATUS;

function statusOf(order: Order): StatusKey {
  if (["cancelled", "rejected", "clawback"].includes(order.orderStatus)) return "cancelled";
  if (order.orderStatus === "approved") return order.payoutStatus === "paid" ? "completed" : "processing";
  if (order.orderStatus === "processing") return "reconciling";
  return "pending";
}

export function CustomerOrdersClient({ orders, totalPages, currentPage, counts }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "all";

  const handleTabChange = (tab: string) => {
    const params = new URLSearchParams(searchParams);
    if (tab === "all") params.delete("tab");
    else params.set("tab", tab);
    params.delete("page");
    router.replace(`${pathname}?${params.toString()}`);
  };

  const getStatusHint = (order: Order) => {
    const s = statusOf(order);
    if (s === "cancelled" || s === "completed" || s === "processing") return null;
    if (s === "reconciling") {
      if (order.completedAtText && order.readyAtText) {
        return `Hoàn thành ngày ${order.completedAtText} — đủ điều kiện rút từ ngày ${order.readyAtText} (theo quy định 15 ngày đối soát, phòng trường hợp đổi/trả hàng).`;
      }
      return "Sàn đã xác nhận đơn hoàn thành. Theo quy định, tiền hoàn chỉ chắc chắn về ví sau thời gian đối soát, phòng trường hợp đổi/trả hàng.";
    }
    return "Sàn chưa xác nhận đơn đã hoàn thành giao hàng — tiền hoàn ước tính bên dưới chưa chắc chắn, có thể thay đổi hoặc không được ghi nhận nếu đơn bị huỷ.";
  };

  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-xl fade-in pb-3xl">
      {/* ── Tiêu đề ── */}
      <div className="flex flex-wrap items-center gap-md">
        <h1 className="text-[28px] font-black tracking-tight text-ink sm:text-[32px]">Đơn hàng</h1>
        <span className="inline-flex h-7 items-center rounded-pill bg-primary-neutral px-md text-[13px] font-black text-primary ring-1 ring-primary/15">
          {counts.all} đơn
        </span>
      </div>

      {/* ── Tìm kiếm ── */}
      <ServerSearchInput placeholder="Tìm mã đơn hoặc tên sản phẩm..." />

      {/* ── Bộ lọc trạng thái ── */}
      <div className="-mx-md flex w-full max-w-[100vw] flex-nowrap items-center gap-sm overflow-x-auto px-md pb-sm scrollbar-hide md:mx-0 md:flex-wrap md:px-0">
        <TabButton active={currentTab === "all"} onClick={() => handleTabChange("all")} label="Tất cả" count={counts.all} />
        {(Object.keys(STATUS) as StatusKey[]).map((key) => (
          <TabButton
            key={key}
            active={currentTab === key}
            onClick={() => handleTabChange(key)}
            label={STATUS[key].label}
            count={counts[key]}
            slug={STATUS[key].slug}
          />
        ))}
      </div>

      {/* ── Giải thích theo tab ── */}
      {currentTab === "pending" && (
        <InfoBox tone="amber">
          Sàn <strong>chưa xác nhận</strong> bạn đã nhận hàng/hoàn tất đơn. Số tiền hoàn hiển thị chỉ là{" "}
          <strong>ước tính</strong> — có thể thay đổi hoặc mất nếu đơn bị huỷ/hoàn trả trước khi sàn xác nhận.
        </InfoBox>
      )}
      {currentTab === "reconciling" && (
        <InfoBox tone="blue">
          Sàn đã xác nhận đơn <strong>hoàn thành</strong> — số tiền hoàn đã chắc chắn hơn nhiều, nhưng theo quy định
          vẫn cần đợi hết thời gian đối soát (Shopee/TikTok Shop/Lazada, phòng trường hợp đổi/trả hàng) trước khi
          được cộng vào ví và cho rút.
        </InfoBox>
      )}
      {currentTab === "processing" && (
        <InfoBox tone="rose">
          Tiền hoàn đã <strong>chắc chắn về ví</strong> và sẵn sàng rút — hệ thống đang chờ được xử lý chuyển khoản.
          Vào mục <strong>Ví tiền</strong> để gửi yêu cầu rút.
        </InfoBox>
      )}
      {currentTab === "completed" && (
        <InfoBox tone="emerald">Đơn đã hoàn tất — tiền hoàn đã được chuyển khoản thành công vào tài khoản của bạn.</InfoBox>
      )}
      {currentTab === "cancelled" && (
        <InfoBox tone="red">
          Đơn không được ghi nhận hoàn tiền — do sàn huỷ/hoàn trả, hoặc hoa hồng bị sàn đòi lại sau khi đã duyệt.
        </InfoBox>
      )}

      {/* ── Danh sách ── */}
      {orders.length === 0 ? (
        <div className="flex min-h-[380px] flex-col items-center justify-center gap-md rounded-3xl bg-white p-xl text-center shadow-cute ring-1 ring-primary/[0.07]">
          <span className="grid h-[104px] w-[104px] place-items-center rounded-full bg-primary-neutral">
            <BunnyFace mood="sleepy" size={84} className="float" />
          </span>
          <p className="text-[15px] font-bold text-ink">Chưa có đơn hàng nào</p>
          <p className="max-w-[320px] text-[13px] leading-relaxed text-mute">
            Tạo link hoàn tiền rồi mua như bình thường — đơn sẽ tự hiện ở đây.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-md">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} hint={getStatusHint(order)} />
          ))}
        </div>
      )}

      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </div>
  );
}

function OrderCard({ order, hint }: { order: Order; hint: string | null }) {
  const key = statusOf(order);
  const st = STATUS[key];
  const isReferral = order.sourceType === "referral";
  const daysText =
    order.daysLeft === 0 ? "hôm nay" : order.daysLeft === 1 ? "1 ngày nữa" : `${order.daysLeft} ngày nữa`;

  return (
    <article
      className={`lift grid grid-cols-1 gap-lg rounded-3xl bg-white p-lg shadow-cute ring-1 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-2xl lg:p-xl ${
        isReferral ? "ring-purple-200/70" : "ring-primary/[0.07]"
      }`}
    >
      {/* Khối trái: ảnh/logo + thông tin đơn */}
      <div className="flex min-w-0 items-start gap-lg">
        <div className="relative shrink-0">
          {isReferral ? (
            <span className="grid h-[58px] w-[58px] place-items-center rounded-2xl bg-purple-50 ring-1 ring-purple-100">
              <Icons8Icon slug="gift" size={32} alt="" />
            </span>
          ) : order.productImage ? (
            <>
              <img
                src={order.productImage}
                alt=""
                className="h-[58px] w-[58px] rounded-2xl object-cover ring-1 ring-ink/[0.06]"
              />
              <span className="absolute -bottom-1 -right-1 grid h-[24px] w-[24px] place-items-center rounded-full bg-white ring-1 ring-ink/[0.06]">
                <PlatformLogo platform={order.platformCode} size={16} />
              </span>
            </>
          ) : (
            // Không có ảnh sản phẩm thì hiện thẳng logo sàn — biết ngay đơn của sàn nào
            <span className="grid h-[58px] w-[58px] place-items-center rounded-2xl bg-canvas-soft ring-1 ring-ink/[0.06]">
              <PlatformLogo platform={order.platformCode} size={34} />
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-sm gap-y-xxs">
            <span
              className={`text-[11px] font-black uppercase tracking-wider ${
                isReferral ? "text-purple-600" : "text-mute"
              }`}
            >
              {isReferral ? "Hoa hồng giới thiệu" : order.platformName}
            </span>
            <span className="text-primary-pale">•</span>
            <span className="text-[12px] font-medium text-mute">{order.createdAt}</span>
          </div>

          {!isReferral && order.productTitle && (
            <p className="mt-xxs truncate text-[15px] font-bold text-ink">{order.productTitle}</p>
          )}

          <p
            className={`font-mono text-mute ${
              !isReferral && order.productTitle ? "mt-xxs text-[11px]" : "mt-xxs text-[14px] font-bold text-ink"
            }`}
          >
            {order.orderExternalId}
          </p>

          <div className="mt-sm flex flex-wrap items-center gap-sm">
            <span
              className={`inline-flex items-center gap-xs rounded-pill px-md py-[5px] text-[12px] font-bold ring-1 ${st.chip}`}
            >
              <Icons8Icon slug={st.slug} size={15} alt="" />
              {st.label}
              {key === "reconciling" && order.daysLeft !== null && <span className="font-medium">· còn {daysText}</span>}
            </span>
          </div>

          {isReferral && (
            <p className="mt-sm max-w-[420px] text-[12px] leading-snug text-purple-500/90">
              Không phải đơn bạn mua — đây là tiền thưởng vì bạn đã giới thiệu người này cho BunnyHoanTien. Xem chi
              tiết tại mục &quot;Mời bạn&quot;.
            </p>
          )}

          {hint && <p className="mt-sm max-w-[520px] text-[12px] leading-snug text-amber-600/90">{hint}</p>}
        </div>
      </div>

      {/* Khối phải: hai con số, luôn thẳng cột giữa các đơn */}
      <div className="grid shrink-0 grid-cols-2 gap-lg border-t border-primary-pale/50 pt-lg lg:min-w-[260px] lg:border-l lg:border-t-0 lg:pl-2xl lg:pt-0">
        <div>
          <p className="text-[11px] font-black uppercase tracking-wider text-mute">
            {isReferral ? "Đơn của F1" : "Giá trị đơn"}
          </p>
          <p className="mt-xxs text-[15px] font-bold tabular-nums text-ink">{order.orderAmount}</p>
        </div>
        <div className="lg:text-right">
          <p
            className={`text-[11px] font-black uppercase tracking-wider ${
              isReferral ? "text-purple-600" : "text-primary"
            }`}
          >
            {isReferral ? "Hoa hồng nhận" : "Tiền hoàn"}
          </p>
          <p
            className={`mt-xxs text-[18px] font-black tabular-nums ${
              isReferral ? "text-purple-600" : "text-primary"
            }`}
          >
            {order.customerRewardAmount}
          </p>
        </div>
      </div>
    </article>
  );
}

const INFO_BOX_TONES = {
  amber: "bg-amber-50 border-amber-200 text-amber-800",
  blue: "bg-blue-50 border-blue-200 text-blue-800",
  rose: "bg-primary-neutral border-primary/20 text-primary",
  emerald: "bg-emerald-50 border-emerald-200 text-emerald-800",
  red: "bg-red-50 border-red-200 text-red-700",
};

function InfoBox({ tone, children }: { tone: keyof typeof INFO_BOX_TONES; children: React.ReactNode }) {
  return (
    <div className={`rounded-2xl border px-lg py-md text-[13px] font-medium leading-relaxed ${INFO_BOX_TONES[tone]}`}>
      {children}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  label,
  count,
  slug,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
  slug?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex h-11 shrink-0 items-center gap-xs whitespace-nowrap rounded-pill px-lg text-[13px] font-bold transition-all duration-200 ease-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
        active
          ? "bg-primary text-white shadow-glow"
          : "bg-white text-body shadow-cute ring-1 ring-primary/[0.07] hover:text-primary"
      }`}
    >
      {slug && <Icons8Icon slug={slug} size={16} alt="" />}
      {label}
      <span
        className={`inline-flex h-5 min-w-[22px] items-center justify-center rounded-pill px-xs text-[11px] font-black ${
          active ? "bg-white/25 text-white" : "bg-primary-neutral text-primary"
        }`}
      >
        {count}
      </span>
    </button>
  );
}
