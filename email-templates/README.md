# 📧 BunnyHoanTien Email Templates

Email templates hiện đại với logo Bunny, font **Lexend**, và màu hồng sáng.

## 📦 Templates Có Sẵn

### 1. **bunny-modern-template.html** - Full Feature
Email template đầy đủ với:
- ✅ Logo Bunny hiện đại
- ✅ Font Lexend (Google Fonts)
- ✅ Gradient hồng sáng đẹp mắt
- ✅ Feature cards với icons
- ✅ CTA button gradient
- ✅ Stats bar
- ✅ Social links
- ✅ Responsive design

**Sử dụng cho**: Welcome email, Newsletter, Marketing campaigns

### 2. **bunny-notification-simple.html** - Notification
Email template đơn giản cho thông báo:
- ✅ Mini header với logo Bunny
- ✅ Title + Message + Button
- ✅ Compact footer
- ✅ Variables: {{TITLE}}, {{MESSAGE}}, {{BUTTON_TEXT}}, {{BUTTON_URL}}

**Sử dụng cho**: Thông báo đơn hàng, xác nhận rút tiền, alerts

---

## 🎨 Màu Sắc Hệ Thống

```css
Primary Rose:     #D13A6B
Rose Active:      #B92E5B  
Rose Light:       #E8558A
Pink Pale:        #FFDFE8
Pink Neutral:     #FFF0F4
Background:       #FFF0F4 → #FFDFE8 (gradient)
```

---

## 🔤 Font Lexend

Font được load từ Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
```

Font weights sử dụng:
- 400: Regular text
- 500-600: Medium emphasis
- 700-800: Bold headings
- 900: Extra bold titles

---

## 📱 Gửi Email qua Gmail

### Cách 1: Copy/Paste trực tiếp
1. Mở file `.html` trong browser
2. `Ctrl + A` → `Ctrl + C` (copy toàn bộ)
3. Mở Gmail → Compose
4. `Ctrl + V` (paste)
5. Send!

### Cách 2: Sử dụng Gmail API (Code)
```javascript
const nodemailer = require('nodemailer');
const fs = require('fs');

// Đọc template
const emailHTML = fs.readFileSync('./email-templates/bunny-modern-template.html', 'utf8');

// Config Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password' // Gmail App Password
  }
});

// Send email
const mailOptions = {
  from: 'BunnyHoanTien <your-email@gmail.com>',
  to: 'customer@example.com',
  subject: '🐰 Chào mừng đến với BunnyHoanTien!',
  html: emailHTML
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) console.log('Error:', error);
  else console.log('Email sent:', info.response);
});
```

### Cách 3: Sử dụng Template Variables
```javascript
// Đọc template notification
let emailHTML = fs.readFileSync('./email-templates/bunny-notification-simple.html', 'utf8');

// Thay thế variables
emailHTML = emailHTML
  .replace('{{TITLE}}', 'Đơn Hàng Của Bạn Đã Được Duyệt!')
  .replace('{{MESSAGE}}', 'Chúc mừng! Đơn hàng #12345 đã được duyệt và tiền hoàn đã được cộng vào ví của bạn.')
  .replace('{{BUTTON_TEXT}}', 'Xem Chi Tiết')
  .replace('{{BUTTON_URL}}', 'https://hoahuongaff.click/app/orders');

// Send...
```

---

## 🖼️ Chèn Ảnh vào Email

### Option 1: Sử dụng URL (Khuyến nghị)
```html
<img src="https://hoahuongaff.click/mascots/icons/bunny-delighted.webp" 
     alt="Bunny" 
     width="120" 
     height="120">
```
✅ **Ưu điểm**: Luôn load được, không tăng kích thước email  
❌ **Nhược điểm**: Cần internet để hiển thị

### Option 2: Base64 Embed (Không khuyến nghị cho Gmail)
```html
<img src="data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAw..." 
     alt="Bunny">
```
✅ **Ưu điểm**: Hiển thị offline  
❌ **Nhược điểm**: Tăng kích thước email, có thể bị Gmail block

### Option 3: CID Attachment (Tốt nhất cho Nodemailer)
```javascript
const mailOptions = {
  from: 'BunnyHoanTien <your-email@gmail.com>',
  to: 'customer@example.com',
  subject: '🐰 Welcome!',
  html: '<img src="cid:bunny-logo">',
  attachments: [{
    filename: 'bunny.webp',
    path: './public/mascots/icons/bunny-delighted.webp',
    cid: 'bunny-logo' // Same as img src
  }]
};
```
✅ **Ưu điểm**: Hiển thị tốt, không cần internet  
✅ **Tốt nhất**: Cho email quan trọng

---

## ✅ Best Practices

### 1. **Testing**
- Test trên Gmail, Outlook, Apple Mail
- Test trên mobile và desktop
- Sử dụng [Litmus](https://litmus.com) hoặc [Email on Acid](https://www.emailonacid.com)

### 2. **Optimization**
- Giữ kích thước email < 100KB
- Optimize images (WebP → JPEG cho email)
- Inline CSS cho email marketing
- Fallback fonts: `'Lexend', -apple-system, sans-serif`

### 3. **Deliverability**
- Không spam keywords: "FREE", "CLICK HERE", "!!!"
- Có plaintext version
- Unsubscribe link rõ ràng
- SPF/DKIM/DMARC setup

### 4. **Mobile First**
- Max width: 600px
- Touch-friendly buttons (min 44x44px)
- Readable font size (min 14px)
- Single column layout

---

## 🎯 Use Cases

### Welcome Email
```
Template: bunny-modern-template.html
Subject: 🐰 Chào mừng đến với BunnyHoanTien!
Timing: Ngay sau đăng ký
```

### Order Confirmation
```
Template: bunny-notification-simple.html
Subject: ✅ Đơn hàng #12345 đã được tạo
Variables:
  TITLE: "Đơn Hàng Đã Được Tạo!"
  MESSAGE: "Đơn hàng #12345 của bạn đang chờ duyệt..."
  BUTTON_TEXT: "Xem Đơn Hàng"
  BUTTON_URL: "/app/orders"
```

### Withdrawal Success
```
Template: bunny-notification-simple.html
Subject: 💰 Rút tiền thành công!
Variables:
  TITLE: "Rút Tiền Thành Công!"
  MESSAGE: "57.000đ đã được chuyển về tài khoản của bạn."
  BUTTON_TEXT: "Xem Ví Tiền"
  BUTTON_URL: "/app/wallet"
```

---

## 📞 Support

Nếu cần tùy chỉnh template:
- **Hotline**: 033.648.7534
- **Email**: support@hoahuongaff.click
- **Telegram**: @hoahuongaff

---

**Made with 💖 by BunnyHoanTien Team**
