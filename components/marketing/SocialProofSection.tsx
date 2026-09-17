import { Wallet, Users, Quote, Star, Heart, Sparkles, TrendingUp } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Minh Châu",
    location: "TP.HCM",
    avatar: "MC",
    rating: 5,
    bunny: "/mascots/icons/bunny-heart.webp",
    gradient: "from-rose-50 to-pink-50",
    accentColor: "#D13A6B",
    quote:
      "Mình hay mua đồ mẹ bé, mỗi tháng cũng vài đơn. Từ hồi dùng BunnyHoanTien tháng nào cũng rút được 80–150k, nhỏ thôi nhưng cộng lại cũng được. Quan trọng là không mất gì, cứ mua như bình thường, còn được thêm hoa hồng.",
  },
  {
    name: "Lan Phương",
    location: "Bình Dương",
    avatar: "LP",
    rating: 5,
    bunny: "/mascots/icons/bunny-delighted.webp",
    gradient: "from-amber-50 to-orange-50",
    accentColor: "#f59e0b",
    quote:
      "Lần đầu thấy hoàn tiền cao mình tưởng lừa đảo. Kết quả là đơn đầu tiên mua áo 120k, về 18k. Giờ mình giới thiệu cả nhóm mua sắm dùng luôn. Được thêm 5% giới thiệu bạn nữa.",
  },
  {
    name: "Hương Trà",
    location: "Hải Phòng",
    avatar: "HT",
    rating: 5,
    bunny: "/mascots/icons/bunny-sparkle.webp",
    gradient: "from-emerald-50 to-green-50",
    accentColor: "#10b981",
    quote:
      "Cái mình thích là dashboard rõ ràng, biết đơn nào đang chờ duyệt, đơn nào về rồi. Không phải đoán mò hay nhắn thắc mắc, mà có thắc mắc bạn admin cũng trả lời nhiệt tình luôn.",
  },
  {
    name: "Bảo Ngọc",
    location: "Vũng Tàu",
    avatar: "BN",
    rating: 5,
    bunny: "/mascots/icons/bunny-wink.webp",
    gradient: "from-blue-50 to-cyan-50",
    accentColor: "#0ea5e9",
    quote:
      "Mình hay mua flash sale nên ban đầu lo link không ghi nhận kịp. Nhưng xài riết thấy ổn, mẹo là sao chép link sale xong tạo link rồi mua như thường cho bạn nào chưa biết nha.",
  },
  {
    name: "Diễm My",
    location: "Long An",
    avatar: "DM",
    rating: 5,
    bunny: "/mascots/icons/bunny-surprised.webp",
    gradient: "from-purple-50 to-pink-50",
    accentColor: "#a855f7",
    quote:
      "Thật ra mình không kỳ vọng nhiều, chỉ nghĩ thêm được đồng nào hay đồng đó. Nhưng tháng trước rút tiền mà bất ngờ luôn, rút được 853k. Vui thiệt sự.",
  },
  {
    name: "Phương Linh",
    location: "Đà Lạt",
    avatar: "PL",
    rating: 5,
    bunny: "/mascots/icons/bunny-blink.webp",
    gradient: "from-indigo-50 to-blue-50",
    accentColor: "#6366f1",
    quote:
      "Mình đã giới thiệu cho 4 người bạn dùng, tất cả đều xài được bình thường. Không ai phàn nàn gì. Tụi nó kêu đăng ký nhanh mà dễ xài. Tự nhiên thấy cũng vui vui hí hí.",
  },
];

function formatVnd(n: number) {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);
}

export function SocialProofSection({ totalPaidOut, totalCustomers }: { totalPaidOut: number; totalCustomers: number }) {
  return (
    <section className="relative py-3xl bg-gradient-to-br from-canvas via-canvas-soft to-primary-neutral/30 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[15%] right-[8%] w-80 h-80 bg-purple-300/15 rounded-full blur-3xl" />
        <div className="absolute top-[50%] left-[50%] w-96 h-96 bg-rose-300/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-lg">
        {/* Live counter với animation đỉnh */}
        <div className="grid sm:grid-cols-2 gap-lg mb-3xl">
          {/* Total Paid Out Card */}
          <div className="group relative overflow-hidden rounded-[32px] bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 p-2xl border-2 border-emerald-200/50 shadow-cute-lg hover:shadow-2xl transition-all hover:-translate-y-2">
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-emerald-300/20 rounded-full blur-2xl" />
            <div className="absolute bottom-4 right-4 opacity-20">
              <img src="/mascots/icons/bunny-sparkle.webp" alt="" className="w-20 h-20 object-contain float" />
            </div>
            
            <div className="relative flex items-center gap-xl">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-400 to-green-500 shadow-glow group-hover:scale-110 transition-transform">
                <Wallet size={36} className="text-white" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[13px] font-bold uppercase tracking-wider text-emerald-700 mb-sm">💰 Đã hoàn tiền</p>
                <p className="text-[32px] sm:text-[40px] font-black text-emerald-900 tabular-nums leading-none">
                  {formatVnd(totalPaidOut)}
                </p>
                <p className="text-[12px] text-emerald-600 font-medium mt-sm">Và vẫn đang tăng mỗi ngày!</p>
              </div>
            </div>
          </div>

          {/* Total Customers Card */}
          <div className="group relative overflow-hidden rounded-[32px] bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 p-2xl border-2 border-rose-200/50 shadow-cute-lg hover:shadow-2xl transition-all hover:-translate-y-2">
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-rose-300/20 rounded-full blur-2xl" />
            <div className="absolute bottom-4 right-4 opacity-20">
              <img src="/mascots/icons/bunny-heart.webp" alt="" className="w-20 h-20 object-contain bounce-in" />
            </div>
            
            <div className="relative flex items-center gap-xl">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-rose-400 to-pink-500 shadow-glow group-hover:scale-110 transition-transform">
                <Users size={36} className="text-white" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[13px] font-bold uppercase tracking-wider text-rose-700 mb-sm">👥 Người dùng</p>
                <p className="text-[32px] sm:text-[40px] font-black text-rose-900 tabular-nums leading-none">
                  {totalCustomers.toLocaleString("vi-VN")}
                </p>
                <p className="text-[12px] text-rose-600 font-medium mt-sm">Đã nhận tiền thật!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Header */}
        <div className="text-center mb-2xl fade-in">
          <div className="inline-flex items-center gap-2 px-xl py-md rounded-full bg-white/80 backdrop-blur-sm border border-primary/20 mb-lg shadow-sm">
            <Star size={18} className="text-primary" fill="currentColor" />
            <span className="text-[13px] font-bold text-primary">Đánh giá từ khách hàng</span>
          </div>
          <h2 className="text-[32px] sm:text-[44px] font-black text-ink tracking-tight mb-md">
            Khách hàng nói gì về{" "}
            <span className="bg-gradient-to-r from-primary to-[#B92E5B] bg-clip-text text-transparent">
              BunnyHoanTien
            </span>
          </h2>
          <p className="text-[16px] text-body max-w-2xl mx-auto">
            Hàng nghìn người đã tin tưởng và nhận được tiền hoàn thực sự từ mọi đơn hàng 🎉
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-xl">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={t.name}
              className={`group relative overflow-hidden rounded-[32px] bg-gradient-to-br ${t.gradient} p-xl border-2 border-white shadow-cute hover:shadow-2xl transition-all hover:-translate-y-2`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Decorative bunny watermark */}
              <div className="absolute -bottom-4 -right-4 opacity-15 pointer-events-none">
                <img src={t.bunny} alt="" className="w-28 h-28 object-contain" />
              </div>

              <div className="relative">
                {/* Quote icon */}
                <div className="flex items-center justify-between mb-lg">
                  <div 
                    className="flex h-12 w-12 items-center justify-center rounded-2xl shadow-md"
                    style={{ backgroundColor: `${t.accentColor}15` }}
                  >
                    <Quote size={24} style={{ color: t.accentColor }} strokeWidth={2.5} />
                  </div>
                  
                  {/* Stars */}
                  <div className="flex items-center gap-xs">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className="text-amber-400" 
                        fill="currentColor" 
                        strokeWidth={0}
                      />
                    ))}
                  </div>
                </div>

                {/* Quote text */}
                <p className="text-[15px] text-body leading-relaxed mb-xl">
                  "{t.quote}"
                </p>

                {/* User info */}
                <div className="flex items-center gap-md pt-lg border-t-2 border-white">
                  <div 
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white text-[16px] font-black shadow-md"
                    style={{ backgroundColor: t.accentColor }}
                  >
                    {t.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="text-[15px] font-bold text-ink">{t.name}</p>
                    <p className="text-[13px] text-mute flex items-center gap-xs">
                      📍 {t.location}
                    </p>
                  </div>
                  <div className="shrink-0">
                    <Heart 
                      size={20} 
                      style={{ color: t.accentColor }} 
                      fill="currentColor"
                      className="group-hover:scale-125 transition-transform"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-3xl text-center fade-in">
          <div className="inline-flex flex-col items-center gap-lg rounded-[32px] bg-white/90 backdrop-blur-sm p-2xl border-2 border-primary/10 shadow-cute-lg">
            <div className="flex -space-x-4">
              {TESTIMONIALS.slice(0, 4).map((t, i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-full ring-4 ring-white shadow-md flex items-center justify-center text-white text-[13px] font-black"
                  style={{ 
                    backgroundColor: t.accentColor,
                    transform: `translateY(${i % 2 === 0 ? '-4px' : '0px'})`
                  }}
                >
                  {t.avatar}
                </div>
              ))}
            </div>
            <div>
              <p className="text-[20px] font-black text-ink mb-sm">
                Tham gia cùng <span className="text-primary">{totalCustomers.toLocaleString("vi-VN")}+</span> người khác
              </p>
              <p className="text-[14px] text-body">
                Bắt đầu nhận hoàn tiền từ mọi đơn hàng hôm nay! 🚀
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
