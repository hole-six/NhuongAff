"use client";

import Link from "next/link";
import { Sparkles, CheckCircle2, Link2, ShoppingBag, Clock, Wallet, AlertCircle } from "lucide-react";

const steps = [
  {
    title: "Dán link sản phẩm",
    body: "Vào mục Hoàn tiền, dán link Shopee/TikTok/Lazada bạn muốn mua, chọn nền tảng và bấm Đổi link.",
    icon: Link2,
    bunny: "/mascots/icons/bunny-wink.webp",
    color: "from-pink-50 to-rose-50",
    iconBg: "bg-gradient-to-br from-pink-400 to-rose-400"
  },
  {
    title: "Bấm vào link vừa tạo",
    body: "Luôn bấm vào link hoàn tiền hệ thống trả về trước khi mua hàng để đơn được ghi nhận đúng.",
    icon: CheckCircle2,
    bunny: "/mascots/icons/bunny-delighted.webp",
    color: "from-purple-50 to-pink-50",
    iconBg: "bg-gradient-to-br from-purple-400 to-pink-400"
  },
  {
    title: "Hoàn tất mua hàng",
    body: "Thanh toán bình thường trên Shopee/TikTok/Lazada như mọi khi.",
    icon: ShoppingBag,
    bunny: "/mascots/icons/bunny-heart.webp",
    color: "from-amber-50 to-orange-50",
    iconBg: "bg-gradient-to-br from-amber-400 to-orange-400"
  },
  {
    title: "Chờ đối soát",
    body: "Định kỳ hệ thống đối soát đơn hàng từ sàn — đơn chỉ được xác nhận \"Tiền đã về\" khi Shopee/TikTok/Lazada đánh dấu trạng thái sản phẩm liên kết là \"Hoàn thành\", không phải chỉ đơn giản là đơn hàng giao thành công.",
    icon: Clock,
    bunny: "/mascots/icons/bunny-sleepy.webp",
    color: "from-blue-50 to-cyan-50",
    iconBg: "bg-gradient-to-br from-blue-400 to-cyan-400"
  },
  {
    title: "Nhận hoàn tiền",
    body: "Khi đơn được duyệt (tiền đã về), số tiền hoàn sẽ hiện trong Ví tiền của bạn và được thanh toán theo kỳ.",
    icon: Wallet,
    bunny: "/mascots/icons/bunny-sparkle.webp",
    color: "from-emerald-50 to-green-50",
    iconBg: "bg-gradient-to-br from-emerald-400 to-green-400"
  },
];

const notes = [
  {
    title: "Luôn bấm lại link mỗi lần mua",
    body: "Mỗi lượt mua hàng cần bấm lại link hoàn tiền ngay trước khi vào Shopee/TikTok/Lazada. Nếu đã tắt trình duyệt hoặc mở lại app sau đó, link theo dõi có thể hết hiệu lực và đơn sẽ không được ghi nhận.",
    bunny: "/mascots/icons/bunny-surprised.webp",
  },
  {
    title: "Không dùng thêm app/link hoàn tiền khác",
    body: "Sàn thường tính hoa hồng cho lượt click hợp lệ gần nhất trước khi đặt hàng. Nếu bạn bấm thêm link từ ứng dụng hoàn tiền khác, mã giảm giá ngoài hệ thống, hoặc link chia sẻ từ người khác sau khi đã bấm link của BunnyHoanTien, đơn có thể bị tính cho nguồn khác.",
    bunny: "/mascots/icons/bunny-dizzy.webp",
  },
  {
    title: "Hoàn tất đơn trong phiên, không thoát giữa chừng",
    body: "Sau khi bấm link, nên hoàn tất đặt hàng trong cùng phiên truy cập. Thoát ứng dụng, tắt wifi hoặc chuyển sang app khác giữa lúc chuyển hướng có thể khiến sàn không ghi nhận được nguồn click.",
    bunny: "/mascots/icons/bunny-blink.webp",
  },
  {
    title: "Một số ngành hàng không được tính hoa hồng",
    body: "Shopee/TikTok/Lazada loại trừ hoa hồng với: nạp thẻ điện thoại, Shopee Xu/Ví, vé máy bay, một số sản phẩm Mall/Brand đặc biệt. Những đơn này vẫn lên hệ thống nhưng sẽ không có tiền hoàn.",
    bunny: "/mascots/icons/bunny-bashful.webp",
  },
  {
    title: "Đơn có thể bị huỷ hoa hồng ngay cả khi đã \"đã về\"",
    body: "Nếu sau đó bạn đổi trả hàng, huỷ đơn, hoặc sàn phát hiện gian lận, hoa hồng đã ghi nhận có thể bị thu hồi (clawback) — số tiền tương ứng sẽ được trừ lại khỏi ví nếu chưa thanh toán.",
    bunny: "/mascots/icons/bunny-surprised.webp",
  },
  {
    title: "Thời gian đối soát thường mất 7–20 ngày",
    body: "Shopee/TikTok/Lazada chỉ xác nhận hoa hồng sau khi hết thời hạn đổi trả của đơn hàng. Đơn ở trạng thái \"Chờ xác nhận\" là bình thường, không phải lỗi hệ thống — cứ chờ đến kỳ đối soát tiếp theo.",
    bunny: "/mascots/icons/bunny-sleepy.webp",
  },
];

export default function CustomerGuidePage() {
  return (
    <div className="relative min-h-screen pb-2xl">
      {/* Decorative bunny reactions floating */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" style={{ opacity: 0.4 }}>
        <img src="/mascots/icons/bunny-heart.webp" alt="" className="absolute top-[10%] left-[8%] w-12 h-12 opacity-30 float" />
        <img src="/mascots/icons/bunny-wink.webp" alt="" className="absolute top-[25%] right-[12%] w-16 h-16 opacity-25 float" style={{ animationDelay: '1s' }} />
        <img src="/mascots/icons/bunny-sparkle.webp" alt="" className="absolute bottom-[30%] left-[5%] w-14 h-14 opacity-20 float" style={{ animationDelay: '2s' }} />
        <img src="/mascots/icons/bunny-delighted.webp" alt="" className="absolute top-[60%] right-[8%] w-12 h-12 opacity-30 float" style={{ animationDelay: '1.5s' }} />
        <img src="/mascots/icons/bunny-blink.webp" alt="" className="absolute bottom-[15%] right-[15%] w-10 h-10 opacity-25 float" style={{ animationDelay: '0.5s' }} />
      </div>

      <div className="relative z-10 flex flex-col gap-3xl">
        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-[32px] p-2xl gradient-hero-bunny shadow-cute-lg border border-primary/10">
          <div className="absolute top-4 right-4">
            <img src="/mascots/icons/bunny-delighted.webp" alt="" className="w-20 h-20 opacity-50 wiggle" />
          </div>
          <div className="absolute bottom-4 left-4">
            <img src="/mascots/icons/bunny-wink.webp" alt="" className="w-16 h-16 opacity-40 float" />
          </div>
          
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-lg py-sm rounded-full bg-white/80 backdrop-blur-sm border border-primary/20 mb-lg shadow-sm">
              <Sparkles size={16} className="text-primary" />
              <span className="text-[13px] font-bold text-primary">Hướng dẫn sử dụng</span>
            </div>
            <h1 className="display-md mb-md bg-gradient-to-r from-[#D13A6B] to-[#B92E5B] bg-clip-text text-transparent">
              5 bước siêu dễ để nhận hoàn tiền
            </h1>
            <p className="body-lg text-body max-w-2xl">
              Chỉ cần làm theo hướng dẫn này, bạn sẽ nhận được tiền hoàn từ mọi đơn hàng Shopee, TikTok Shop và Lazada. Đơn giản, nhanh chóng và hoàn toàn miễn phí!
            </p>
          </div>
        </div>

        {/* Steps với animation đẹp */}
        <div className="flex flex-col gap-2xl">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.title} 
                className="fade-in group"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${step.color} p-xl shadow-cute border border-white/60 lift`}>
                  {/* Corner bunny decoration */}
                  <div className="absolute -top-2 -right-2 w-20 h-20 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                    <img src={step.bunny} alt="" className="w-full h-full object-contain wiggle" />
                  </div>

                  <div className="relative flex items-start gap-lg">
                    {/* Step number with icon */}
                    <div className="flex flex-col items-center gap-md shrink-0">
                      <div className={`relative w-16 h-16 rounded-2xl ${step.iconBg} shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <div className="absolute inset-0 bg-white/20 rounded-2xl" />
                        <Icon size={28} className="text-white relative z-10" strokeWidth={2.5} />
                        <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center font-black text-[14px] text-ink">
                          {i + 1}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <h2 className="display-xs mb-sm text-ink-deep">{step.title}</h2>
                      <p className="text-[15px] leading-relaxed text-body">{step.body}</p>
                    </div>
                  </div>

                  {/* Connecting line */}
                  {i < steps.length - 1 && (
                    <div className="absolute -bottom-8 left-8 w-0.5 h-8 bg-gradient-to-b from-primary/30 to-transparent" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Important Notes Section */}
        <div className="relative rounded-[32px] bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-2xl shadow-cute-lg border border-orange-100">
          <div className="absolute top-4 right-4">
            <img src="/mascots/icons/bunny-surprised.webp" alt="" className="w-16 h-16 opacity-40 bounce-in" />
          </div>

          <div className="flex items-start gap-md mb-xl">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg flex items-center justify-center shrink-0">
              <AlertCircle size={24} className="text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="display-xs text-amber-900 mb-sm">⚠️ Lưu ý quan trọng để chắc chắn được hoàn tiền</h2>
              <p className="text-[14px] text-amber-700">Đọc kỹ trước khi mua — tránh mất tiền hoàn vì những lỗi rất dễ gặp.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            {notes.map((note, idx) => (
              <div 
                key={note.title}
                className="group relative rounded-2xl bg-white/80 backdrop-blur-sm p-lg shadow-sm border border-amber-200/50 hover:shadow-md hover:border-amber-300 transition-all duration-300"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="absolute -top-3 -left-3 w-12 h-12 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                  <img src={note.bunny} alt="" className="w-full h-full object-contain" />
                </div>
                
                <div className="pl-6">
                  <h3 className="text-[15px] font-bold text-amber-900 mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    {note.title}
                  </h3>
                  <p className="text-[14px] text-amber-800 leading-relaxed">{note.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Support Box */}
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100 p-xl shadow-cute-lg border border-rose-200">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-300/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-300/30 rounded-full blur-3xl" />
          
          <div className="relative flex flex-col sm:flex-row items-center gap-lg">
            <div className="shrink-0">
              <img src="/mascots/icons/bunny-heart.webp" alt="" className="w-20 h-20 object-contain bounce-in" />
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-[20px] font-black text-rose-900 mb-2">💬 Vẫn còn thắc mắc?</h3>
              <p className="text-[14px] text-rose-700 leading-relaxed">
                Xem thông tin liên hệ hỗ trợ hoặc trò chuyện cùng cộng đồng BunnyHoanTien. Chúng tôi luôn sẵn sàng giúp bạn!
              </p>
            </div>

            <Link
              href="/app/notifications"
              className="shrink-0 group relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#D13A6B] to-[#B92E5B] px-2xl py-lg text-center font-bold text-white shadow-glow transition-all hover:shadow-xl hover:scale-105 active:scale-100"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles size={18} />
                Nhận hỗ trợ ngay
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
