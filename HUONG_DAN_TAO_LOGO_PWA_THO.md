# Hướng Dẫn Tạo Logo PWA với Icon Thỏ

## 🐰 Các File Cần Tạo

Bạn cần tạo các file icon thỏ với kích thước sau để thay thế logo heo cũ:

1. **icon-192.png** (192x192 pixels)
2. **icon-512.png** (512x512 pixels)
3. **apple-touch-icon.png** (180x180 pixels)
4. **icontitle.png** (32x32 hoặc 64x64 pixels - favicon)

## 📂 Vị Trí File

Tất cả các file trên đặt trong thư mục:
```
public/
├── icon-192.png          ← Thay thế file này
├── icon-512.png          ← Thay thế file này
├── apple-touch-icon.png  ← Thay thế file này
└── icontitle.png         ← Thay thế file này
```

## 🎨 Hướng Dẫn Thiết Kế

### Nguồn Icon
Sử dụng một trong các mascot thỏ có sẵn:
- `public/mascots/icons/bunny-delighted.webp` (Khuyến nghị - vui vẻ)
- `public/mascots/icons/bunny-sparkle.webp` (Khuyến nghị - năng động)
- `public/mascots/icons/bunny-wink.webp` (Khuyến nghị - dễ thương)

### Yêu Cầu Thiết Kế

#### 1. **icon-192.png & icon-512.png** (PWA Icons)
- **Nền**: Gradient hồng từ `#FFF0F4` đến `#FFDFE8` hoặc nền trắng `#FFFFFF`
- **Thỏ**: Đặt ở giữa, chiếm 70-75% diện tích
- **Padding**: Để khoảng trống 10-15% xung quanh
- **Border radius**: Không cần (hệ thống sẽ tự cắt)
- **Format**: PNG với nền trong suốt hoặc nền màu

**Ví dụ layout:**
```
┌─────────────────────┐
│                     │
│    ┌─────────┐     │
│    │         │     │
│    │  🐰     │     │  ← Thỏ ở giữa
│    │         │     │
│    └─────────┘     │
│                     │
└─────────────────────┘
```

#### 2. **apple-touch-icon.png** (iOS Home Screen)
- **Kích thước**: 180x180 pixels
- **Thiết kế**: Giống icon-192.png nhưng nhỏ hơn
- **Lưu ý**: iOS tự động bo góc, không cần làm tay

#### 3. **icontitle.png** (Favicon)
- **Kích thước**: 64x64 pixels (hoặc 32x32)
- **Thiết kế**: Chỉ có đầu thỏ hoặc logo đơn giản
- **Nền**: Trong suốt hoặc trắng

## 🛠️ Công Cụ Tạo Icon

### Cách 1: Sử dụng Figma/Canva (Khuyến nghị)
1. Tạo canvas 512x512px
2. Import file `bunny-delighted.webp` hoặc `bunny-sparkle.webp`
3. Thêm nền gradient hồng (từ #FFF0F4 đến #FFDFE8)
4. Căn giữa thỏ, để padding 10-15% xung quanh
5. Export:
   - 512x512px → **icon-512.png**
   - 192x192px → **icon-192.png**
   - 180x180px → **apple-touch-icon.png**
   - 64x64px → **icontitle.png**

### Cách 2: Sử dụng Online Tool
- **RealFaviconGenerator**: https://realfavicongenerator.net/
  - Upload ảnh thỏ
  - Điều chỉnh padding, màu nền
  - Download tất cả size

- **Favicon.io**: https://favicon.io/
  - Upload ảnh thỏ
  - Generate tất cả size cần thiết

### Cách 3: Sử dụng AI (Nhanh nhất)
Prompt cho ChatGPT/Claude với DALL-E hoặc Midjourney:

```
Create a cute bunny mascot logo for a cashback app PWA icon.
- Square format 512x512px
- Gradient pink background from #FFF0F4 to #FFDFE8
- White/cream colored bunny character in center
- Bunny should be happy and welcoming
- Clean, modern, minimalist style
- 10-15% padding around edges
- Suitable for mobile app icon
```

## 🎨 Màu Sắc Thương Hiệu

Sử dụng màu sắc từ hệ thống:
- **Primary Rose**: `#D13A6B`
- **Primary Pale**: `#FFDFE8`
- **Primary Neutral**: `#FFF0F4`
- **Bunny Cream**: `#FFF6EF`
- **Bunny Blush**: `#F7B3BC`
- **Star Yellow**: `#FFD84D`

## 📋 Checklist Sau Khi Tạo Xong

- [ ] Đã tạo `icon-192.png` (192x192px)
- [ ] Đã tạo `icon-512.png` (512x512px)
- [ ] Đã tạo `apple-touch-icon.png` (180x180px)
- [ ] Đã tạo `icontitle.png` (64x64px hoặc 32x32px)
- [ ] Đã thay thế file cũ trong thư mục `public/`
- [ ] Kiểm tra PWA manifest tại `public/manifest.webmanifest` (đã cấu hình đúng)
- [ ] Test trên trình duyệt: Clear cache và reload
- [ ] Test PWA install trên mobile
- [ ] Kiểm tra favicon hiển thị đúng trên tab browser

## 🧪 Kiểm Tra

### Desktop
1. Mở Chrome DevTools (F12)
2. Vào tab **Application** > **Manifest**
3. Kiểm tra icon hiển thị đúng
4. Xem trong **Storage** > **Cache Storage**

### Mobile
1. Mở website trên Safari (iOS) hoặc Chrome (Android)
2. Chọn "Add to Home Screen"
3. Kiểm tra icon trên màn hình chính

### Favicon
1. Refresh trang (Ctrl + Shift + R để hard refresh)
2. Kiểm tra tab browser có icon thỏ

## 🔧 Xóa Cache (Nếu Icon Không Cập Nhật)

### Chrome
```
1. Ctrl + Shift + Delete
2. Chọn "Cached images and files"
3. Clear data
```

### Mobile
```
1. Xóa app khỏi Home Screen
2. Clear browser cache
3. Install lại PWA
```

## 📞 Lưu Ý Kỹ Thuật

- File PWA manifest đã được cấu hình tại `public/manifest.webmanifest`
- Theme color: `#D13A6B` (màu primary của hệ thống)
- Background color: `#FFFFFF` (trắng)
- Không cần chỉnh sửa manifest, chỉ cần thay file PNG

## ✅ Hoàn Tất

Sau khi thay thế tất cả các file icon:
1. Commit và push code
2. Deploy lên production
3. Clear cache trên browser
4. Test PWA install

---

**Lưu ý**: Nếu bạn cần tôi tạo icon bằng AI hoặc hướng dẫn chi tiết hơn, hãy cho tôi biết!
