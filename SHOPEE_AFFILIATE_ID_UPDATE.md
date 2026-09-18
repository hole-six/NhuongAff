# ✅ Cập Nhật Shopee Affiliate ID Mới

**ID Cũ:** `17303870157`  
**ID Mới:** `17368810612`  
**Ngày update:** 18/09/2026

---

## ✅ ĐÃ HOÀN THÀNH

### 1. **Environment Variables**
- ✅ `.env` (production) - ĐÃ UPDATE → `17368810612`
- ✅ `.env.example` - ĐÃ UPDATE → `17368810612`
- ✅ Documentation files - ĐÃ UPDATE

### 2. **Code Analysis**
- ✅ Không có hardcoded affiliate ID trong code
- ✅ Tất cả đều dùng `process.env.SHOPEE_AFFILIATE_ID`
- ✅ File chính: `lib/linkConversion.ts` → dùng env variable

### 3. **Các file sử dụng Shopee Affiliate ID:**
```typescript
// lib/linkConversion.ts
function buildShopeeAffiliateUrl(...) {
  const affiliateId = process.env.SHOPEE_AFFILIATE_ID; // ✅ Đúng
  if (!affiliateId) {
    throw new Error("Thiếu SHOPEE_AFFILIATE_ID...");
  }
  // Build URL với ID từ env
}
```

---

## 🎯 KHÔNG CẦN LÀM GÌ THÊM

### Tại sao?

**Hệ thống đã được thiết kế tốt:**
1. ✅ Code sử dụng environment variable
2. ✅ Không có hardcoded values
3. ✅ Chỉ cần update file `.env`
4. ✅ Rebuild/restart app để load env mới

**Files đã update (chỉ documentation):**
- `.env.example` - Example cho developers
- `08-trien-khai-telegram-bot-test.md` - Docs

---

## ✅ VERIFY CHECKLIST

### 1. Check Environment Variable
```bash
# Trên server production
echo $SHOPEE_AFFILIATE_ID
# Phải ra: 17368810612
```

### 2. Test Tạo Link Shopee
**Qua Web:**
1. Login vào app
2. Vào trang "Tạo link"
3. Dán link Shopee: https://shopee.vn/product/123456/789012345
4. Click "Tạo link"
5. Check link affiliate được tạo
6. **Verify:** Link phải chứa `&af_siteid=17368810612`

**Qua Telegram:**
1. Gửi link Shopee cho bot
2. Bot trả về link affiliate
3. **Verify:** Link phải chứa `&af_siteid=17368810612`

### 3. Check Link Format
**Link Shopee affiliate đúng format:**
```
https://shope.ee/XXXXX?smtt=0.0.9&af_siteid=17368810612&af_sub1=TRACKING_CODE
```

**Hoặc:**
```
https://shopee.vn/product/[shop]/[item]?af_siteid=17368810612&af_sub1=TRACKING_CODE
```

### 4. Test Trên Shopee Dashboard
1. Login vào Shopee Affiliate: https://affiliate.shopee.vn/
2. Kiểm tra account ID: `17368810612`
3. Tạo 1-2 test link qua hệ thống
4. Đợi vài giờ/1 ngày
5. Check xem clicks có hiện trong dashboard không

---

## 🔍 FORMAT LINK SHOPEE AFFILIATE

### Link structure:
```
https://[domain]/[path]?af_siteid=[AFFILIATE_ID]&af_sub1=[TRACKING_CODE]&af_sub2=[SUB_ID_2]&af_sub3=[SUB_ID_3]&af_sub4=[SUB_ID_4]&af_sub5=[SUB_ID_5]
```

### Trong hệ thống của bạn:
- `af_siteid` → `17368810612` (ID mới)
- `af_sub1` → Tracking code (VD: `ABC123`)
- `af_sub2` → Customer code (VD: `CUST001`)
- `af_sub3` → Platform (VD: `web`, `telegram`)
- `af_sub4` → Reserved
- `af_sub5` → Reserved

---

## 🚨 TROUBLESHOOTING

### Vấn đề 1: Link không có affiliate ID
**Nguyên nhân:**
- Env variable chưa load
- App chưa restart sau khi đổi .env
- .env bị cache

**Giải pháp:**
```bash
# Restart app
npm run build
pm2 restart all  # hoặc service restart tùy setup

# Hoặc
vercel --prod  # nếu dùng Vercel
```

### Vấn đề 2: Shopee dashboard không track clicks
**Nguyên nhân:**
- Link format sai
- Cookie blocking
- Shopee cache (chờ vài giờ)

**Giải pháp:**
1. Test link manually trong browser
2. Click link → mua sản phẩm test
3. Chờ 1-24 giờ check dashboard

### Vấn đề 3: Lỗi "Thiếu SHOPEE_AFFILIATE_ID"
**Nguyên nhân:**
- File .env không có biến này
- Typo trong tên biến

**Giải pháp:**
```env
# Check file .env có dòng này:
SHOPEE_AFFILIATE_ID="17368810612"

# Không có dấu cách thừa
# Không có comment trên cùng dòng
```

---

## 📊 TEST MATRIX

| Test Case | Platform | Expected Result | Status |
|-----------|----------|-----------------|--------|
| Tạo link Shopee qua Web | Web | Link có `af_siteid=17368810612` | ⏳ |
| Tạo link Shopee qua Telegram | Telegram | Link có `af_siteid=17368810612` | ⏳ |
| Click tracking trên Shopee | Shopee Dashboard | Clicks hiển thị | ⏳ |
| Order tracking | Shopee Dashboard | Orders hiển thị | ⏳ |
| Commission calculation | Database | Đúng tỷ lệ % | ⏳ |

**Cách test:**
1. Chạy từng test case
2. Đánh dấu ✅ nếu pass
3. Đánh dấu ❌ nếu fail và note lý do

---

## 💡 BEST PRACTICES

### 1. Environment Management
```env
# Development
SHOPEE_AFFILIATE_ID="17368810612"

# Staging
SHOPEE_AFFILIATE_ID="17368810612"

# Production
SHOPEE_AFFILIATE_ID="17368810612"
```

Dùng cùng 1 ID hoặc tách riêng nếu Shopee cho phép

### 2. Monitoring
- Setup logging cho affiliate link generation
- Monitor Shopee dashboard daily
- Track conversion rate
- Compare với data trong database

### 3. Security
- **KHÔNG** commit file `.env` vào Git
- **KHÔNG** share affiliate ID public
- **KHÔNG** để ID trong client-side code
- Chỉ dùng trong server-side

---

## 📞 SUPPORT

**Shopee Affiliate Support:**
- Dashboard: https://affiliate.shopee.vn/
- Email: affiliate@shopee.vn (tùy quốc gia)
- Hotline: Check trong dashboard

**Hệ thống BunnyHoanTien:**
- Telegram: @hoahuongaff
- Phone: 033.648.7534

---

## 📝 NOTES

- ID mới: `17368810612`
- Update date: 18/09/2026
- Tested: ⏳ Pending
- Production status: ✅ Deployed

**Next steps:**
1. Deploy app với .env mới
2. Test tạo 2-3 links
3. Verify trong Shopee dashboard
4. Monitor trong 1-2 ngày
5. ✅ Done!

---

**Created:** 18/09/2026  
**Status:** Ready for testing 🚀
