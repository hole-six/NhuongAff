"use client";

import { useState, useEffect } from "react";
import { formatCurrency, formatDate } from "@/lib/format";
import { Users, TrendingUp, CheckCircle2, Copy, Share2, Gift, Sparkles, Heart, Crown, Clock, Award, Info } from "lucide-react";
import { useModal } from "@/components/ui/ModalProvider";
import { Button } from "@/components/ui/Button";

type Friend = {
  id: string;
  fullName: string;
  customerCode: string;
  joinedAt: string;
  bonusOrderCount: number;
  totalEarned: number;
};

type FriendOrderTimelineEntry = {
  id: string;
  friendName: string;
  friendCode: string;
  orderExternalId: string;
  itemName: string | null;
  shopName: string | null;
  orderStatus: string;
  createdAt: string;
  bonusState: "received" | "clawed_back" | "not_eligible" | "pending_eligible" | "pending_capped";
  bonusAmount: number;
};

interface Props {
  customerCode: string;
  totalFriends: number;
  totalCommission: number;
  referralRate: number;
  maxReferralOrders: number;
  referralValidityMonths: number;
  isPartner: boolean;
  friends: Friend[];
  friendOrderTimeline: FriendOrderTimelineEntry[];
}

const ORDER_STATUS_LABEL: Record<string, { text: string; className: string }> = {
  approved: { text: "Đã hoàn tất", className: "bg-green-50 text-green-600 border-green-200" },
  pending: { text: "Chờ xác nhận", className: "bg-amber-50 text-amber-600 border-amber-200" },
  processing: { text: "Đang đối soát", className: "bg-blue-50 text-blue-600 border-blue-200" },
  clawback: { text: "Đã thu hồi", className: "bg-red-50 text-red-500 border-red-200" },
};

const BONUS_STATE_LABEL: Record<FriendOrderTimelineEntry["bonusState"], { text: string; className: string }> = {
  received: { text: "Đã nhận", className: "text-green-600" },
  clawed_back: { text: "Đã thu hồi", className: "text-red-500" },
  not_eligible: { text: "Không đủ điều kiện", className: "text-gray-400" },
  pending_eligible: { text: "Dự kiến", className: "text-blue-500" },
  pending_capped: { text: "Đã đạt giới hạn", className: "text-gray-400" },
};

export function ReferralClient({ customerCode, totalFriends, totalCommission, referralRate, maxReferralOrders, referralValidityMonths, isPartner, friends, friendOrderTimeline }: Props) {
  const modal = useModal();
  const [referralLink, setReferralLink] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setReferralLink(`${window.location.origin}/register?ref=${customerCode}`);
  }, [customerCode]);

  const handleCopy = () => {
    if (!referralLink) return;
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    modal.alert({
      title: "Thành công",
      message: "Đã copy link giới thiệu! Hãy gửi cho bạn bè của bạn.",
      iconType: "success"
    });
  };

  return (
    <div className="relative min-h-screen pb-2xl">
      {/* Decorative floating bunnies */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" style={{ opacity: 0.35 }}>
        <img src="/mascots/icons/bunny-heart.webp" alt="" className="absolute top-[5%] left-[4%] w-16 h-16 opacity-30 float" />
        <img src="/mascots/icons/bunny-delighted.webp" alt="" className="absolute top-[15%] right-[6%] w-14 h-14 opacity-25 float" style={{ animationDelay: '1s' }} />
        <img src="/mascots/icons/bunny-wink.webp" alt="" className="absolute top-[40%] left-[2%] w-12 h-12 opacity-20 float" style={{ animationDelay: '2.5s' }} />
        <img src="/mascots/icons/bunny-sparkle.webp" alt="" className="absolute bottom-[35%] right-[5%] w-16 h-16 opacity-30 float" style={{ animationDelay: '0.5s' }} />
        <img src="/mascots/icons/bunny-blink.webp" alt="" className="absolute bottom-[12%] left-[8%] w-10 h-10 opacity-25 float" style={{ animationDelay: '1.8s' }} />
      </div>

      <div className="relative z-10 flex flex-col gap-3xl fade-in max-w-6xl mx-auto">
        {/* Hero Header with Gradient */}
        <div className="relative overflow-hidden rounded-[32px] p-2xl gradient-hero-bunny shadow-cute-lg border border-primary/10">
          <div className="absolute top-4 right-4">
            <img src="/mascots/icons/bunny-heart.webp" alt="" className="w-24 h-24 opacity-40 bounce-in" />
          </div>
          <div className="absolute bottom-4 left-4">
            <img src="/mascots/icons/bunny-delighted.webp" alt="" className="w-20 h-20 opacity-35 float" />
          </div>
          
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-lg py-sm rounded-full bg-white/80 backdrop-blur-sm border border-primary/20 mb-lg shadow-sm">
              <Gift size={16} className="text-primary" />
              <span className="text-[13px] font-bold text-primary">Chương trình giới thiệu</span>
            </div>
            <h1 className="display-md mb-md bg-gradient-to-r from-[#D13A6B] via-[#E8558A] to-[#D13A6B] bg-clip-text text-transparent">
              Mời bạn bè — Nhận quà liền tay
            </h1>
            <p className="body-lg text-body max-w-2xl">
              Chia sẻ niềm vui mua sắp và nhận thêm <span className="font-black text-primary">{referralRate * 100}% hoa hồng</span> từ mọi đơn hàng của bạn bè. Càng nhiều bạn, càng nhiều tiền!
            </p>
          </div>
        </div>

        {/* Stats Cards với Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
          {/* Total Friends Card */}
          <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 p-xl shadow-cute-lg border border-blue-200/50 lift">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-300/20 rounded-full blur-2xl" />
            <div className="absolute top-3 right-3 opacity-40 group-hover:opacity-60 transition-opacity duration-300">
              <img src="/mascots/icons/bunny-delighted.webp" alt="" className="w-16 h-16 object-contain wiggle" />
            </div>
            
            <div className="relative">
              <div className="flex items-center gap-md mb-lg">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-500 shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Users size={28} className="text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-[13px] font-bold uppercase tracking-wider text-blue-700">Tổng bạn bè</h3>
                  <p className="text-[11px] text-blue-600">Đã mời thành công</p>
                </div>
              </div>
              
              <div className="text-[48px] font-black text-blue-900 leading-none mb-sm">
                {totalFriends}
              </div>
              <p className="text-[13px] text-blue-700 font-medium">
                {totalFriends === 0 ? "Chưa có ai" : totalFriends === 1 ? "người bạn" : "người bạn"}
              </p>
            </div>
          </div>

          {/* Total Commission Card */}
          <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 p-xl shadow-cute-lg border border-emerald-200/50 lift">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-emerald-300/20 rounded-full blur-2xl" />
            <div className="absolute top-3 right-3 opacity-40 group-hover:opacity-60 transition-opacity duration-300">
              <img src="/mascots/icons/bunny-sparkle.webp" alt="" className="w-16 h-16 object-contain bounce-in" />
            </div>
            
            <div className="relative">
              <div className="flex items-center gap-md mb-lg">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-500 shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp size={28} className="text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-[13px] font-bold uppercase tracking-wider text-emerald-700">Tổng hoa hồng</h3>
                  <p className="text-[11px] text-emerald-600">Đã nhận được</p>
                </div>
              </div>
              
              <div className="text-[48px] font-black text-emerald-900 leading-none mb-sm">
                {formatCurrency(totalCommission)}
              </div>
              <p className="text-[13px] text-emerald-700 font-medium">
                Từ {friends.reduce((sum, f) => sum + f.bonusOrderCount, 0)} đơn hàng
              </p>
            </div>
          </div>
        </div>

        {/* Referral Link Box - Super Eye-catching */}
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100 p-2xl shadow-cute-lg border-2 border-rose-200">
          <div className="absolute top-0 right-0 w-40 h-40 bg-rose-300/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-300/30 rounded-full blur-3xl" />
          <div className="absolute top-4 right-4">
            <img src="/mascots/icons/bunny-wink.webp" alt="" className="w-20 h-20 opacity-50 float" />
          </div>
          
          <div className="relative">
            <div className="flex items-center gap-md mb-lg">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-400 to-pink-500 shadow-glow flex items-center justify-center">
                <Share2 size={28} className="text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-[20px] font-black text-rose-900">Link giới thiệu của bạn</h2>
                <p className="text-[13px] text-rose-700">Chia sẻ ngay để nhận quà</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-md mb-lg">
              <div className="flex-1 relative group">
                <input 
                  type="text" 
                  value={referralLink} 
                  readOnly 
                  className="w-full h-14 rounded-2xl bg-white/80 backdrop-blur-sm px-lg text-[15px] font-mono font-bold text-gray-900 border-2 border-rose-300/50 focus:outline-none focus:border-rose-400 shadow-sm"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
              <button
                onClick={handleCopy}
                className="group relative overflow-hidden h-14 px-2xl rounded-2xl bg-gradient-to-r from-[#D13A6B] to-[#B92E5B] text-white font-bold shadow-glow hover:shadow-xl transition-all hover:scale-105 active:scale-100"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {copied ? (
                    <>
                      <CheckCircle2 size={20} />
                      Đã copy!
                    </>
                  ) : (
                    <>
                      <Copy size={20} />
                      Sao chép
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </button>
            </div>

            <div className="flex items-start gap-md rounded-2xl bg-white/60 backdrop-blur-sm p-lg border border-rose-200/50">
              <div className="w-8 h-8 rounded-full bg-rose-200 flex items-center justify-center shrink-0">
                <Sparkles size={16} className="text-rose-600" />
              </div>
              <p className="text-[14px] text-rose-800 leading-relaxed">
                <strong>Mẹo:</strong> Gửi link này cho bạn bè qua Zalo, Facebook, Telegram. Khi họ đăng ký và mua hàng, bạn tự động nhận hoa hồng!
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 p-2xl shadow-cute-lg border border-amber-200">
          <div className="absolute top-4 left-4">
            <img src="/mascots/icons/bunny-surprised.webp" alt="" className="w-16 h-16 opacity-40 bounce-in" />
          </div>

          <div className="relative">
            <h2 className="display-xs text-amber-900 mb-xl">🎁 Phần thưởng của bạn</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
              <div className="flex items-start gap-md rounded-2xl bg-white/70 backdrop-blur-sm p-lg border border-amber-200/50">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shrink-0">
                  <Award size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-amber-900 mb-1">Nhận thêm {referralRate * 100}% hoa hồng</h3>
                  <p className="text-[13px] text-amber-700 leading-relaxed">
                    Bạn nhận thêm {referralRate * 100}% trên số tiền hoàn mà bạn bè nhận được — cộng trực tiếp vào ví.
                  </p>
                </div>
              </div>

              {isPartner ? (
                <div className="flex items-start gap-md rounded-2xl bg-gradient-to-br from-emerald-100 to-green-100 p-lg border border-emerald-300/50">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shrink-0">
                    <Crown size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-emerald-900 mb-1">🤝 Đối tác — không giới hạn</h3>
                    <p className="text-[13px] text-emerald-700 leading-relaxed">
                      Nhận hoa hồng trên <strong>tất cả</strong> đơn hàng, không giới hạn số đơn và thời gian.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-start gap-md rounded-2xl bg-white/70 backdrop-blur-sm p-lg border border-amber-200/50">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shrink-0">
                      <CheckCircle2 size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-bold text-amber-900 mb-1">{maxReferralOrders} đơn đầu tiên/người</h3>
                      <p className="text-[13px] text-amber-700 leading-relaxed">
                        Áp dụng cho {maxReferralOrders} đơn hàng đầu tiên của mỗi người bạn.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-md rounded-2xl bg-white/70 backdrop-blur-sm p-lg border border-amber-200/50">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center shrink-0">
                      <Clock size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-bold text-amber-900 mb-1">Thời hạn {referralValidityMonths} tháng</h3>
                      <p className="text-[13px] text-amber-700 leading-relaxed">
                        Đơn phải phát sinh trong {referralValidityMonths} tháng kể từ lúc đăng ký.
                      </p>
                    </div>
                  </div>
                </>
              )}

              <div className="flex items-start gap-md rounded-2xl bg-white/70 backdrop-blur-sm p-lg border border-amber-200/50">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shrink-0">
                  <Heart size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-amber-900 mb-1">Bạn bè không bị ảnh hưởng</h3>
                  <p className="text-[13px] text-amber-700 leading-relaxed">
                    Người được mời vẫn nhận đủ 100% tiền hoàn như bình thường.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Friends List */}
        {friends.length > 0 && (
          <div className="relative overflow-hidden rounded-[32px] bg-white p-2xl shadow-cute-lg border border-primary/10">
            <div className="absolute -top-6 -right-6">
              <img src="/mascots/icons/bunny-bashful.webp" alt="" className="w-20 h-20 opacity-30 float" />
            </div>

            <div className="relative">
              <div className="flex items-center justify-between mb-xl">
                <div className="flex items-center gap-md">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-500 shadow-lg flex items-center justify-center">
                    <Users size={24} className="text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h2 className="text-[20px] font-black text-gray-900">Danh sách bạn bè</h2>
                    <p className="text-[13px] text-gray-500">Những người bạn đã mời thành công</p>
                  </div>
                </div>
                <span className="rounded-full bg-blue-100 px-lg py-sm text-[14px] font-bold text-blue-600">
                  {friends.length} người
                </span>
              </div>

              <div className="mb-lg flex items-start gap-md rounded-2xl bg-blue-50 px-lg py-md border border-blue-200">
                <Info size={18} className="text-blue-600 shrink-0 mt-0.5" />
                <p className="text-[13px] text-blue-700 leading-relaxed">
                  Số đơn và hoa hồng chỉ cập nhật khi đơn của bạn bè đã <strong>"Đã hoàn tất"</strong> (sau khoảng 15 ngày đối soát). Đơn đang <strong>"Chờ xác nhận"</strong> hoặc <strong>"Đang đối soát"</strong> là bình thường.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-md max-h-[500px] overflow-y-auto pr-sm">
                {friends.map((f, idx) => (
                  <div
                    key={f.id}
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-lg border border-gray-200 hover:border-primary/30 hover:shadow-md transition-all"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <div className="flex items-center gap-md">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 shadow-md flex items-center justify-center text-white text-[16px] font-black shrink-0 group-hover:scale-110 transition-transform">
                        {f.fullName.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[15px] font-bold text-gray-900">
                          {f.fullName}
                        </div>
                        <div className="flex items-center gap-2 text-[12px] text-gray-500">
                          <span className="font-mono">{f.customerCode}</span>
                          <span>·</span>
                          <span>{formatDate(f.joinedAt)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-md pt-md border-t border-gray-200 flex items-center justify-between">
                      <div className="text-[12px] text-gray-600">
                        {!isPartner && `${f.bonusOrderCount}/${maxReferralOrders} đơn`}
                        {isPartner && `${f.bonusOrderCount} đơn`}
                      </div>
                      <div className={`text-[15px] font-black ${f.totalEarned > 0 ? "text-green-600" : "text-gray-300"}`}>
                        {f.totalEarned > 0 ? `+${formatCurrency(f.totalEarned)}` : "Chưa có"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Friend Orders Timeline */}
        {friendOrderTimeline.length === 0 ? (
          <div className="rounded-[32px] bg-gradient-to-br from-gray-50 to-gray-100 p-3xl text-center border-2 border-dashed border-gray-300">
            <img src="/mascots/icons/bunny-sleepy.webp" alt="" className="w-24 h-24 mx-auto mb-lg opacity-60" />
            {totalFriends === 0 ? (
              <>
                <h3 className="text-[20px] font-black text-gray-700 mb-sm">Chưa có ai đăng ký</h3>
                <p className="text-[14px] text-gray-500 mb-xl max-w-md mx-auto">
                  Gửi link cho bạn bè ngay để nhận quà! Mỗi người đăng ký và mua hàng, bạn đều được hưởng hoa hồng.
                </p>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 px-xl py-md rounded-2xl bg-gradient-to-r from-[#D13A6B] to-[#B92E5B] text-white font-bold shadow-glow hover:shadow-xl transition-all hover:scale-105"
                >
                  <Copy size={18} />
                  Copy link ngay
                </button>
              </>
            ) : (
              <>
                <h3 className="text-[20px] font-black text-gray-700 mb-sm">Bạn đã mời được {totalFriends} người</h3>
                <p className="text-[14px] text-gray-500 max-w-md mx-auto">
                  Chưa thấy đơn nào của bạn bè. Ngay khi họ mua hàng qua link đã đăng ký, đơn sẽ hiện ở đây.
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="relative overflow-hidden rounded-[32px] bg-white p-2xl shadow-cute-lg border border-primary/10">
            <div className="absolute -top-6 -left-6">
              <img src="/mascots/icons/bunny-blink.webp" alt="" className="w-20 h-20 opacity-30 float" />
            </div>

            <div className="relative">
              <div className="flex items-center justify-between mb-xl flex-wrap gap-md">
                <div className="flex items-center gap-md">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-500 shadow-lg flex items-center justify-center">
                    <TrendingUp size={24} className="text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h2 className="text-[20px] font-black text-gray-900">Đơn hàng của bạn bè</h2>
                    <p className="text-[13px] text-gray-500">Theo dõi tiến trình hoa hồng</p>
                  </div>
                </div>
                <span className="text-[12px] text-blue-500 font-bold">
                  💡 Số tiền ở đơn chưa xong là dự kiến
                </span>
              </div>

              <div className="max-h-[500px] overflow-auto">
                <table className="w-full min-w-[800px] text-left">
                  <thead className="sticky top-0 bg-gray-50 z-10">
                    <tr className="border-b-2 border-gray-200">
                      <th className="pb-md pr-md text-[12px] font-bold uppercase tracking-wider text-gray-500">Bạn bè</th>
                      <th className="pb-md pr-md text-[12px] font-bold uppercase tracking-wider text-gray-500">Sản phẩm</th>
                      <th className="pb-md pr-md text-[12px] font-bold uppercase tracking-wider text-gray-500">Ngày</th>
                      <th className="pb-md pr-md text-[12px] font-bold uppercase tracking-wider text-gray-500">Trạng thái</th>
                      <th className="pb-md pl-md text-right text-[12px] font-bold uppercase tracking-wider text-gray-500">Hoa hồng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {friendOrderTimeline.map((entry, idx) => {
                      const orderStatus = ORDER_STATUS_LABEL[entry.orderStatus] ?? { text: entry.orderStatus, className: "bg-gray-100 text-gray-500 border-gray-200" };
                      const bonus = BONUS_STATE_LABEL[entry.bonusState];
                      const showAmount = entry.bonusState === "received" || entry.bonusState === "clawed_back" || entry.bonusState === "pending_eligible";
                      
                      return (
                        <tr 
                          key={entry.id} 
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                          style={{ animationDelay: `${idx * 30}ms` }}
                        >
                          <td className="py-lg pr-md align-top">
                            <div className="font-bold text-[14px] text-gray-900">{entry.friendName}</div>
                            {entry.friendCode && (
                              <div className="font-mono text-[11px] text-gray-400">{entry.friendCode}</div>
                            )}
                          </td>
                          <td className="py-lg pr-md align-top max-w-[250px]">
                            <div className="truncate font-bold text-[14px] text-gray-900" title={entry.itemName ?? undefined}>
                              {entry.itemName ?? `Đơn ${entry.orderExternalId}`}
                            </div>
                            <div className="truncate text-[12px] text-gray-400">
                              {entry.shopName && `${entry.shopName} · `}
                              <span className="font-mono">{entry.orderExternalId}</span>
                            </div>
                          </td>
                          <td className="py-lg pr-md align-top text-[13px] text-gray-500 whitespace-nowrap">
                            {formatDate(entry.createdAt)}
                          </td>
                          <td className="py-lg pr-md align-top">
                            <span className={`inline-block whitespace-nowrap rounded-xl px-md py-sm text-[11px] font-bold border ${orderStatus.className}`}>
                              {orderStatus.text}
                            </span>
                          </td>
                          <td className="py-lg pl-md align-top text-right whitespace-nowrap">
                            {showAmount && (
                              <div className={`text-[15px] font-black mb-1 ${
                                entry.bonusState === "clawed_back" ? "text-red-500 line-through" : 
                                entry.bonusState === "received" ? "text-green-600" : 
                                "text-blue-500"
                              }`}>
                                {entry.bonusState === "pending_eligible" ? "~" : "+"}
                                {formatCurrency(entry.bonusAmount)}
                              </div>
                            )}
                            <div className={`text-[11px] font-bold ${bonus.className}`}>
                              {bonus.text}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* How it Works */}
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 p-2xl shadow-cute-lg border border-purple-200">
          <div className="absolute top-4 right-4">
            <img src="/mascots/icons/bunny-surprised.webp" alt="" className="w-20 h-20 opacity-40 wiggle" />
          </div>

          <div className="relative">
            <h2 className="display-xs text-purple-900 mb-xl">🚀 Cách thức hoạt động</h2>
            
            <div className="relative ml-6 border-l-4 border-primary/30 pl-xl py-md space-y-2xl">
              <div className="relative">
                <div className="absolute -left-[38px] top-1 w-7 h-7 rounded-full bg-gradient-to-br from-[#D13A6B] to-[#B92E5B] shadow-glow flex items-center justify-center text-white text-[13px] font-black">
                  1
                </div>
                <div className="rounded-2xl bg-white/70 backdrop-blur-sm p-lg border border-purple-200/50">
                  <h3 className="text-[16px] font-bold text-purple-900 mb-2">📋 Lấy link mời</h3>
                  <p className="text-[14px] text-purple-700 leading-relaxed">
                    Copy link giới thiệu cá nhân của bạn ở phần trên — link này chứa mã riêng của bạn.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-[38px] top-1 w-7 h-7 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 shadow-lg flex items-center justify-center text-white text-[13px] font-black">
                  2
                </div>
                <div className="rounded-2xl bg-white/70 backdrop-blur-sm p-lg border border-purple-200/50">
                  <h3 className="text-[16px] font-bold text-purple-900 mb-2">📢 Gửi cho bạn bè</h3>
                  <p className="text-[14px] text-purple-700 leading-relaxed">
                    Chia sẻ link qua Zalo, Facebook, Telegram hoặc bất kỳ đâu. Càng nhiều người nhấp vào, càng tốt!
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-[38px] top-1 w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 shadow-lg flex items-center justify-center text-white text-[13px] font-black">
                  3
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-emerald-100 to-green-100 p-lg border border-emerald-300/50">
                  <h3 className="text-[16px] font-bold text-emerald-900 mb-2 flex items-center gap-2">
                    🎉 Nhận quà thụ động
                  </h3>
                  <p className="text-[14px] text-emerald-700 leading-relaxed">
                    Tự động nhận {referralRate * 100}% hoa hồng mỗi khi bạn bè mua sắm thành công. Không cần làm gì thêm!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
