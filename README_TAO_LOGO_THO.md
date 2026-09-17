# 🐰 Hướng Dẫn Nhanh: Tạo Logo PWA Thỏ

## ✅ Đã Fix

### 1. Icon "Tạo link tức thì" không hiện ở trang chủ
- **Vấn đề**: Icon từ Icons8 dùng tên sai `flash-on.png`
- **Đã sửa**: Đổi thành `flash.png` ✅
- **File**: `components/marketing/LandingPage.tsx`

## 🎨 Tạo Logo PWA Thỏ

### Cách 1: Sử dụng Tool HTML (Khuyến nghị - Dễ nhất)

1. **Mở file**: `create_bunny_logo.html` bằng trình duyệt
2. **Kéo thả** file mascot thỏ vào (hoặc click chọn):
   - `public/mascots/icons/bunny-delighted.webp` (Khuyến nghị)
   - `public/mascots/icons/bunny-sparkle.webp`
   - `public/mascots/icons/bunny-wink.webp`
3. **Click** "Tạo tất cả icon PWA"
4. **Lưu** từng icon (click phải → Save image as):
   - `icon-192.png` (192×192)
   - `icon-512.png` (512×512)
   - `apple-touch-icon.png` (180×180)
   - `icontitle.png` (64×64)
5. **Thay thế** các file trong thư mục `public/`

### Cách 2: Sử dụng Python Script

```bash
# Cài đặt Pillow
pip install Pillow

# Chạy script
python create_bunny_logo_pwa.py
```

Script tự động tạo 4 file icon trong thư mục `public/`

### Cách 3: Sử dụng Online Tool

**RealFaviconGenerator** (Khuyến nghị):
1. Truy cập: https://realfavicongenerator.net/
2. Upload mascot thỏ từ `public/mascots/icons/bunny-delighted.webp`
3. Điều chỉnh:
   - Background: Gradient hoặc `#FFF0F4`
   - Padding: 10-15%
4. Download và thay thế file

**Favicon.io**:
1. Truy cập: https://favicon.io/favicon-converter/
2. Upload mascot thỏ
3. Download tất cả size

## 📂 File Cần Thay Thế

```
public/
├── icon-192.png          ← 192×192 pixels
├── icon-512.png          ← 512×512 pixels
├── apple-touch-icon.png  ← 180×180 pixels
└── icontitle.png         ← 64×64 pixels
```

## 🎨 Design Spec

### Màu Sắc
- **Nền gradient**: `#FFF0F4` → `#FFDFE8`
- **Hoặc nền trắng**: `#FFFFFF`
- **Theme color**: `#D13A6B` (primary)

### Layout
```
┌─────────────────────┐
│    padding 10-15%   │
│   ┌─────────────┐   │
│   │             │   │
│   │   🐰 Thỏ    │   │  ← 70-75% kích thước
│   │             │   │
│   └─────────────┘   │
│                     │
└─────────────────────┘
```

## 🧪 Kiểm Tra Sau Khi Thay

### Desktop
1. Clear cache: `Ctrl + Shift + Delete`
2. Hard refresh: `Ctrl + Shift + R`
3. Mở DevTools (F12) → **Application** → **Manifest**
4. Kiểm tra icon hiển thị đúng

### Mobile
1. Xóa PWA app cũ khỏi Home Screen (nếu có)
2. Mở website trên Safari/Chrome
3. "Add to Home Screen"
4. Kiểm tra icon mới

## 📋 Checklist

- [ ] Đã tạo 4 file icon (192, 512, 180, 64)
- [ ] Đã thay thế file trong `public/`
- [ ] Đã clear browser cache
- [ ] Icon hiển thị đúng trên tab browser
- [ ] PWA install test trên mobile
- [ ] Icon "Tạo link tức thì" hiển thị ở trang chủ

## 🎯 Mascot Khuyến Nghị

| File | Mô tả | Phù hợp cho |
|------|-------|-------------|
| `bunny-delighted.webp` | Vui vẻ, thân thiện | ⭐ PWA icon (Khuyến nghị nhất) |
| `bunny-sparkle.webp` | Năng động, sáng tạo | PWA icon |
| `bunny-wink.webp` | Dễ thương, thân mật | PWA icon |
| `bunny-heart.webp` | Yêu thích, tình cảm | Social sharing |
| `bunny-surprised.webp` | Bất ngờ, thú vị | Marketing material |

## 🔧 Troubleshooting

### Icon không cập nhật?
```bash
# Clear cache cứng
Ctrl + Shift + Delete
→ Chọn "Cached images and files"
→ Clear data

# Hard refresh
Ctrl + Shift + R

# Hoặc xóa Service Worker
DevTools → Application → Service Workers → Unregister
```

### PWA không cài được?
- Kiểm tra `public/manifest.webmanifest` (đã có ✅)
- Kiểm tra HTTPS (production)
- Clear browser data
- Thử trình duyệt khác

### Favicon không đổi?
- Clear DNS cache: `ipconfig /flushdns` (Windows)
- Thử Incognito mode
- Đợi 24-48h cho DNS propagate

## 📞 Hỗ Trợ

Nếu gặp vấn đề, liên hệ:
- **Hotline**: 033.648.7534
- **Telegram**: @hoahuongaff

---

**Lưu ý**: Manifest PWA và cấu hình icon đã được setup sẵn trong:
- `app/layout.tsx` - Metadata icons
- `public/manifest.webmanifest` - PWA manifest
- Chỉ cần thay file PNG là xong! 🎉
