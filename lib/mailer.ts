import nodemailer from "nodemailer";

let cachedTransporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  if (cachedTransporter) return cachedTransporter;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !user || !pass) return null;

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  return cachedTransporter;
}

export async function sendMail(params: {
  to: string;
  subject: string;
  html: string;
}): Promise<{ ok: boolean; simulated: boolean; error?: string }> {
  const transporter = getTransporter();
  const fromName = process.env.SMTP_FROM_NAME || "BunnyHoanTien Hoan Tien";
  const fromAddress = process.env.SMTP_USER;

  if (!transporter || !fromAddress) {
    // Chưa cấu hình SMTP — không throw, chỉ báo simulated để không làm hỏng
    // luồng chính (giống pattern notifyCustomerTelegram best-effort).
    return { ok: true, simulated: true, error: "SMTP chưa được cấu hình" };
  }

  try {
    await transporter.sendMail({
      from: `"${fromName}" <${fromAddress}>`,
      to: params.to,
      subject: params.subject,
      html: params.html,
    });
    return { ok: true, simulated: false };
  } catch (error) {
    return {
      ok: false,
      simulated: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

const BRAND_COLOR = "#D13A6B";
const BRAND_COLOR_LIGHT = "#E8558A";
const BRAND_PINK_PALE = "#FFDFE8";
const BRAND_PINK_NEUTRAL = "#FFF0F4";

function emailShell(bodyHtml: string): string {
  return `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; background: linear-gradient(135deg, ${BRAND_PINK_NEUTRAL} 0%, ${BRAND_PINK_PALE} 100%); font-family: 'Lexend', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 600px; margin: 0 auto; padding: 24px 16px;">
    <tr>
      <td style="padding: 0;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 12px 40px rgba(209, 58, 107, 0.12);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, ${BRAND_PINK_NEUTRAL} 0%, ${BRAND_PINK_PALE} 100%); padding: 32px 24px; text-align: center; border-bottom: 2px solid ${BRAND_PINK_PALE};">
              <div style="margin-bottom: 16px;">
                <img src="https://hoahuongaff.click/mascots/icons/bunny-delighted.webp" alt="BunnyHoanTien" width="80" height="80" style="display: inline-block; border-radius: 50%; background: linear-gradient(135deg, #ffffff, ${BRAND_PINK_NEUTRAL}); padding: 12px; box-shadow: 0 6px 20px rgba(209, 58, 107, 0.15);">
              </div>
              <h1 style="margin: 0 0 8px; font-family: 'Lexend', sans-serif; font-size: 32px; font-weight: 900; color: ${BRAND_COLOR}; letter-spacing: -0.02em; line-height: 1.1;">
                BunnyHoanTien
              </h1>
              <p style="margin: 0; font-family: 'Lexend', sans-serif; font-size: 13px; font-weight: 600; color: #B92E5B; text-transform: uppercase; letter-spacing: 0.05em;">
                Hệ Thống Hoàn Tiền Thông Minh
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 32px 24px;">
              ${bodyHtml}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: ${BRAND_PINK_NEUTRAL}; padding: 24px; text-align: center; border-top: 2px solid ${BRAND_PINK_PALE};">
              <p style="margin: 0 0 8px; font-family: 'Lexend', sans-serif; font-size: 13px; font-weight: 600; color: #5C4652;">
                📞 <a href="tel:0336487534" style="color: ${BRAND_COLOR}; text-decoration: none;">033.648.7534</a> | 
                🌐 <a href="https://hoahuongaff.click" style="color: ${BRAND_COLOR}; text-decoration: none;">hoahuongaff.click</a>
              </p>
              <p style="margin: 0; font-family: 'Lexend', sans-serif; font-size: 11px; font-weight: 500; color: #9A8490; line-height: 1.6;">
                © 2024 BunnyHoanTien. Hệ thống hoàn tiền cho Shopee, TikTok Shop & Lazada.<br>
                Email tự động, vui lòng không trả lời trực tiếp.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();
}

export function buildPasswordResetEmail(params: { fullName: string; resetUrl: string; expiresInMinutes: number }): string {
  return emailShell(`
    <div style="text-align: center; margin-bottom: 24px;">
      <span style="display: inline-block; background: linear-gradient(135deg, ${BRAND_COLOR}, ${BRAND_COLOR_LIGHT}); color: white; padding: 10px 24px; border-radius: 999px; font-family: 'Lexend', sans-serif; font-size: 13px; font-weight: 700; box-shadow: 0 4px 12px rgba(209, 58, 107, 0.25);">
        🔒 Đặt Lại Mật Khẩu
      </span>
    </div>
    <h2 style="margin: 0 0 16px; font-family: 'Lexend', sans-serif; font-size: 22px; font-weight: 800; color: #2E1F26; text-align: center;">
      Xin chào, <span style="color: ${BRAND_COLOR}">${escapeHtml(params.fullName)}</span>!
    </h2>
    <p style="margin: 0 0 24px; font-family: 'Lexend', sans-serif; font-size: 15px; font-weight: 400; color: #5C4652; line-height: 1.7; text-align: center;">
      Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn. Bấm nút bên dưới để tạo mật khẩu mới<br>
      <span style="font-size: 13px; color: #9A8490;">(liên kết có hiệu lực trong ${params.expiresInMinutes} phút)</span>
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 auto 24px;">
      <tr>
        <td style="border-radius: 14px; background: linear-gradient(135deg, ${BRAND_COLOR}, ${BRAND_COLOR_LIGHT}); box-shadow: 0 6px 20px rgba(209, 58, 107, 0.3);">
          <a href="${params.resetUrl}" style="display: inline-block; padding: 16px 40px; font-family: 'Lexend', sans-serif; font-size: 15px; font-weight: 800; color: #ffffff; text-decoration: none; border-radius: 14px;">
            🔑 Đặt Lại Mật Khẩu
          </a>
        </td>
      </tr>
    </table>
    <div style="margin: 24px 0; padding: 16px; border-radius: 12px; background: #F0F9FF; border: 2px solid #BFDBFE;">
      <p style="margin: 0 0 8px; font-family: 'Lexend', sans-serif; font-size: 12px; font-weight: 600; color: #1E40AF;">
        📋 Nếu nút không hoạt động, sao chép link sau:
      </p>
      <p style="margin: 0; font-family: 'Lexend', sans-serif; font-size: 11px; font-weight: 500; color: ${BRAND_COLOR}; word-break: break-all;">${params.resetUrl}</p>
    </div>
    <p style="margin: 0; font-family: 'Lexend', sans-serif; font-size: 13px; line-height: 1.6; color: #9A8490; text-align: center;">
      ⚠️ Nếu bạn không yêu cầu đặt lại mật khẩu, hãy bỏ qua email này.<br>Mật khẩu hiện tại của bạn vẫn an toàn.
    </p>
  `);
}

export function buildPasswordChangedEmail(params: { fullName: string }): string {
  return emailShell(`
    <div style="text-align: center; margin-bottom: 24px;">
      <span style="display: inline-block; background: linear-gradient(135deg, #22C55E, #10B981); color: white; padding: 10px 24px; border-radius: 999px; font-family: 'Lexend', sans-serif; font-size: 13px; font-weight: 700; box-shadow: 0 4px 12px rgba(34, 197, 94, 0.25);">
        ✅ Mật Khẩu Đã Thay Đổi
      </span>
    </div>
    <h2 style="margin: 0 0 16px; font-family: 'Lexend', sans-serif; font-size: 22px; font-weight: 800; color: #2E1F26; text-align: center;">
      Xin chào, <span style="color: ${BRAND_COLOR}">${escapeHtml(params.fullName)}</span>!
    </h2>
    <p style="margin: 0; font-family: 'Lexend', sans-serif; font-size: 15px; font-weight: 400; color: #5C4652; line-height: 1.7; text-align: center;">
      Mật khẩu tài khoản của bạn vừa được thay đổi thành công. 
    </p>
    <div style="margin: 24px 0; padding: 16px; border-radius: 12px; background: #FEF2F2; border: 2px solid #FECACA;">
      <p style="margin: 0; font-family: 'Lexend', sans-serif; font-size: 13px; font-weight: 600; color: #991B1B; text-align: center;">
        ⚠️ Nếu đây không phải là bạn, vui lòng liên hệ hỗ trợ ngay lập tức!
      </p>
    </div>
  `);
}

export function buildAdminWithdrawRequestEmail(params: {
  customerName: string;
  customerCode: string;
  amount: number;
}): string {
  const amountText = new Intl.NumberFormat("vi-VN").format(Math.round(params.amount)) + "đ";
  return emailShell(`
    <div style="text-align: center; margin-bottom: 24px;">
      <span style="display: inline-block; background: linear-gradient(135deg, #F59E0B, #EF4444); color: white; padding: 10px 24px; border-radius: 999px; font-family: 'Lexend', sans-serif; font-size: 13px; font-weight: 700; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.25);">
        🔔 Yêu Cầu Rút Tiền
      </span>
    </div>
    <h2 style="margin: 0 0 16px; font-family: 'Lexend', sans-serif; font-size: 22px; font-weight: 800; color: #2E1F26; text-align: center;">
      Khách hàng yêu cầu rút tiền
    </h2>
    <div style="margin: 0 0 24px; padding: 20px; border-radius: 16px; background: linear-gradient(135deg, ${BRAND_PINK_NEUTRAL}, ${BRAND_PINK_PALE}); border: 2px solid ${BRAND_PINK_PALE};">
      <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; font-family: 'Lexend', sans-serif; font-size: 14px; color: #5C4652;">
        <tr>
          <td style="padding: 8px 0; font-weight: 600;">👤 Khách hàng:</td>
          <td style="padding: 8px 0; text-align: right; font-weight: 800; color: ${BRAND_COLOR};">${escapeHtml(params.customerName)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: 600;">🔖 Mã KH:</td>
          <td style="padding: 8px 0; text-align: right; font-weight: 800; color: ${BRAND_COLOR};">${escapeHtml(params.customerCode)}</td>
        </tr>
        <tr>
          <td style="padding: 16px 0 8px; font-weight: 600; font-size: 16px;">💰 Số tiền:</td>
          <td style="padding: 16px 0 8px; text-align: right; font-weight: 900; color: ${BRAND_COLOR}; font-size: 28px;">${amountText}</td>
        </tr>
      </table>
    </div>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 auto 16px;">
      <tr>
        <td style="border-radius: 14px; background: linear-gradient(135deg, ${BRAND_COLOR}, ${BRAND_COLOR_LIGHT}); box-shadow: 0 6px 20px rgba(209, 58, 107, 0.3);">
          <a href="https://hoahuongaff.click/admin/payments" style="display: inline-block; padding: 16px 40px; font-family: 'Lexend', sans-serif; font-size: 15px; font-weight: 800; color: #ffffff; text-decoration: none; border-radius: 14px;">
            ⚡ Xem Chi Tiết & Tạo Phiếu
          </a>
        </td>
      </tr>
    </table>
    <p style="margin: 0; font-family: 'Lexend', sans-serif; font-size: 13px; line-height: 1.6; color: #9A8490; text-align: center;">
      Truy cập Admin → Thanh toán để xử lý yêu cầu này.
    </p>
  `);
}

export function buildAdminNewRegistrationEmail(params: {
  fullName: string;
  email: string;
  customerCode: string;
  phone?: string | null;
  source: "email" | "google";
  referredByCode?: string | null;
  referrerName?: string | null;
  referrerEmail?: string | null;
}): string {
  const sourceLabel = params.source === "google" ? "🔐 Đăng ký qua Google" : "📧 Đăng ký qua Email";
  return emailShell(`
    <div style="text-align: center; margin-bottom: 24px;">
      <span style="display: inline-block; background: linear-gradient(135deg, #22C55E, #10B981); color: white; padding: 10px 24px; border-radius: 999px; font-family: 'Lexend', sans-serif; font-size: 13px; font-weight: 700; box-shadow: 0 4px 12px rgba(34, 197, 94, 0.25);">
        🎉 Khách Hàng Mới
      </span>
    </div>
    <h2 style="margin: 0 0 16px; font-family: 'Lexend', sans-serif; font-size: 22px; font-weight: 800; color: #2E1F26; text-align: center;">
      Khách hàng mới vừa đăng ký!
    </h2>
    <div style="margin: 0 0 24px; padding: 20px; border-radius: 16px; background: linear-gradient(135deg, ${BRAND_PINK_NEUTRAL}, ${BRAND_PINK_PALE}); border: 2px solid ${BRAND_PINK_PALE};">
      <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; font-family: 'Lexend', sans-serif; font-size: 14px; color: #5C4652;">
        <tr>
          <td style="padding: 8px 0; font-weight: 600;">👤 Họ tên:</td>
          <td style="padding: 8px 0; text-align: right; font-weight: 800; color: ${BRAND_COLOR};">${escapeHtml(params.fullName)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: 600;">📧 Email:</td>
          <td style="padding: 8px 0; text-align: right; font-weight: 700; color: #5C4652;">${escapeHtml(params.email)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: 600;">🔖 Mã KH:</td>
          <td style="padding: 8px 0; text-align: right; font-weight: 800; color: ${BRAND_COLOR};">${escapeHtml(params.customerCode)}</td>
        </tr>
        ${
          params.phone
            ? `<tr><td style="padding: 8px 0; font-weight: 600;">📱 Điện thoại:</td><td style="padding: 8px 0; text-align: right; font-weight: 700; color: #5C4652;">${escapeHtml(params.phone)}</td></tr>`
            : ""
        }
        <tr>
          <td style="padding: 8px 0; font-weight: 600;">🌐 Nguồn:</td>
          <td style="padding: 8px 0; text-align: right; font-weight: 700; color: #5C4652;">${sourceLabel}</td>
        </tr>
        ${
          params.referredByCode
            ? `<tr><td style="padding: 8px 0; font-weight: 600;">🎁 Giới thiệu:</td><td style="padding: 8px 0; text-align: right; font-weight: 700; color: #5C4652;">${escapeHtml(params.referrerName ?? "")}${params.referrerName ? " — " : ""}${escapeHtml(params.referredByCode)}</td></tr>
               ${
                 params.referrerEmail
                   ? `<tr><td style="padding: 8px 0; font-weight: 600;">📧 Email GT:</td><td style="padding: 8px 0; text-align: right; font-weight: 700; color: #5C4652;">${escapeHtml(params.referrerEmail)}</td></tr>`
                   : ""
               }`
            : ""
        }
      </table>
    </div>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
      <tr>
        <td style="border-radius: 14px; background: linear-gradient(135deg, ${BRAND_COLOR}, ${BRAND_COLOR_LIGHT}); box-shadow: 0 6px 20px rgba(209, 58, 107, 0.3);">
          <a href="https://hoahuongaff.click/admin/customers" style="display: inline-block; padding: 16px 40px; font-family: 'Lexend', sans-serif; font-size: 15px; font-weight: 800; color: #ffffff; text-decoration: none; border-radius: 14px;">
            👥 Xem Tất Cả Khách Hàng
          </a>
        </td>
      </tr>
    </table>
  `);
}

export function buildCustomerWithdrawRequestEmail(params: {
  fullName: string;
  amount: number;
  bankName?: string | null;
  bankAccountNumber?: string | null;
}): string {
  const amountText = new Intl.NumberFormat("vi-VN").format(Math.round(params.amount)) + "đ";
  const maskedAccount = params.bankAccountNumber
    ? "•••• " + params.bankAccountNumber.slice(-4)
    : null;
  return emailShell(`
    <div style="text-align: center; margin-bottom: 24px;">
      <span style="display: inline-block; background: linear-gradient(135deg, #3B82F6, #2563EB); color: white; padding: 10px 24px; border-radius: 999px; font-family: 'Lexend', sans-serif; font-size: 13px; font-weight: 700; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);">
        🔒 Yêu Cầu Rút Tiền
      </span>
    </div>
    <h2 style="margin: 0 0 16px; font-family: 'Lexend', sans-serif; font-size: 22px; font-weight: 800; color: #2E1F26; text-align: center;">
      Xin chào, <span style="color: ${BRAND_COLOR}">${escapeHtml(params.fullName)}</span>!
    </h2>
    <p style="margin: 0 0 24px; font-family: 'Lexend', sans-serif; font-size: 15px; font-weight: 400; color: #5C4652; line-height: 1.7; text-align: center;">
      Chúng tôi vừa ghi nhận yêu cầu rút tiền từ tài khoản của bạn
    </p>
    <div style="margin: 0 0 24px; text-align: center;">
      <p style="margin: 0; font-family: 'Lexend', sans-serif; font-size: 32px; font-weight: 900; color: ${BRAND_COLOR}; line-height: 1.2;">${amountText}</p>
    </div>
    ${
      params.bankName || maskedAccount
        ? `<div style="margin: 0 0 24px; padding: 20px; border-radius: 16px; background: linear-gradient(135deg, ${BRAND_PINK_NEUTRAL}, ${BRAND_PINK_PALE}); border: 2px solid ${BRAND_PINK_PALE};">
            <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; font-family: 'Lexend', sans-serif; font-size: 14px; color: #5C4652;">
              ${
                params.bankName
                  ? `<tr><td style="padding: 8px 0; font-weight: 600;">🏦 Ngân hàng:</td><td style="padding: 8px 0; text-align: right; font-weight: 800; color: ${BRAND_COLOR};">${escapeHtml(params.bankName)}</td></tr>`
                  : ""
              }
              ${
                maskedAccount
                  ? `<tr><td style="padding: 8px 0; font-weight: 600;">💳 Tài khoản:</td><td style="padding: 8px 0; text-align: right; font-weight: 700; color: #5C4652;">${escapeHtml(maskedAccount)}</td></tr>`
                  : ""
              }
            </table>
          </div>`
        : ""
    }
    <div style="margin: 24px 0; padding: 16px; border-radius: 12px; background: #FEF2F2; border: 2px solid #FECACA;">
      <p style="margin: 0; font-family: 'Lexend', sans-serif; font-size: 13px; font-weight: 600; color: #991B1B; line-height: 1.6; text-align: center;">
        ⚠️ <strong>Cảnh báo bảo mật!</strong><br>
        Nếu bạn <strong>không thực hiện</strong> yêu cầu này, tài khoản của bạn có thể đã bị truy cập trái phép. 
        Vui lòng liên hệ hỗ trợ ngay lập tức: <a href="tel:0336487534" style="color: ${BRAND_COLOR}; text-decoration: none; font-weight: 700;">033.648.7534</a>
      </p>
    </div>
    <p style="margin: 0; font-family: 'Lexend', sans-serif; font-size: 13px; line-height: 1.6; color: #9A8490; text-align: center;">
      Yêu cầu của bạn đang được xử lý. Chúng tôi sẽ thông báo ngay khi hoàn tất chuyển khoản.
    </p>
  `);
}

export function buildPaymentSentEmail(params: {
  fullName: string;
  amount: number;
  paymentCode: string;
  bankAccountNumber?: string | null;
  transferReference?: string | null;
}): string {
  const amountText = new Intl.NumberFormat("vi-VN").format(Math.round(params.amount)) + "đ";
  return emailShell(`
    <div style="text-align: center; margin-bottom: 24px;">
      <span style="display: inline-block; background: linear-gradient(135deg, #10B981, #059669); color: white; padding: 10px 24px; border-radius: 999px; font-family: 'Lexend', sans-serif; font-size: 13px; font-weight: 700; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);">
        💸 Đã Chuyển Tiền
      </span>
    </div>
    <h2 style="margin: 0 0 16px; font-family: 'Lexend', sans-serif; font-size: 22px; font-weight: 800; color: #2E1F26; text-align: center;">
      Xin chào, <span style="color: ${BRAND_COLOR}">${escapeHtml(params.fullName)}</span>!
    </h2>
    <p style="margin: 0 0 24px; font-family: 'Lexend', sans-serif; font-size: 15px; font-weight: 400; color: #5C4652; line-height: 1.7; text-align: center;">
      🎉 Chúng tôi vừa chuyển khoản thành công số tiền hoàn của bạn
    </p>
    <div style="margin: 0 0 24px; text-align: center;">
      <p style="margin: 0; font-family: 'Lexend', sans-serif; font-size: 36px; font-weight: 900; color: ${BRAND_COLOR}; line-height: 1.2;">${amountText}</p>
    </div>
    <div style="margin: 0 0 24px; padding: 20px; border-radius: 16px; background: linear-gradient(135deg, ${BRAND_PINK_NEUTRAL}, ${BRAND_PINK_PALE}); border: 2px solid ${BRAND_PINK_PALE};">
      <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; font-family: 'Lexend', sans-serif; font-size: 14px; color: #5C4652;">
        <tr>
          <td style="padding: 8px 0; font-weight: 600;">📋 Mã phiếu:</td>
          <td style="padding: 8px 0; text-align: right; font-weight: 800; color: ${BRAND_COLOR};">${escapeHtml(params.paymentCode)}</td>
        </tr>
        ${
          params.bankAccountNumber
            ? `<tr><td style="padding: 8px 0; font-weight: 600;">💳 Tài khoản nhận:</td><td style="padding: 8px 0; text-align: right; font-weight: 700; color: #5C4652;">${escapeHtml(params.bankAccountNumber)}</td></tr>`
            : ""
        }
        ${
          params.transferReference
            ? `<tr><td style="padding: 8px 0; font-weight: 600;">🔖 Mã giao dịch:</td><td style="padding: 8px 0; text-align: right; font-weight: 700; color: #5C4652;">${escapeHtml(params.transferReference)}</td></tr>`
            : ""
        }
      </table>
    </div>
    <div style="margin: 24px 0; padding: 16px; border-radius: 12px; background: #F0FDF4; border: 2px solid #BBF7D0;">
      <p style="margin: 0; font-family: 'Lexend', sans-serif; font-size: 13px; font-weight: 600; color: #166534; line-height: 1.6; text-align: center;">
        ✅ Kiểm tra tài khoản ngân hàng của bạn trong vài phút tới!
      </p>
    </div>
    <p style="margin: 0; font-family: 'Lexend', sans-serif; font-size: 13px; line-height: 1.6; color: #9A8490; text-align: center;">
      Cảm ơn bạn đã đồng hành cùng BunnyHoanTien! 🐰💕
    </p>
  `);
}

export function buildAccountCreatedByAdminEmail(params: {
  fullName: string;
  setPasswordUrl: string;
  expiresInDays: number;
}): string {
  return emailShell(`
    <div style="text-align: center; margin-bottom: 24px;">
      <span style="display: inline-block; background: linear-gradient(135deg, #8B5CF6, #7C3AED); color: white; padding: 10px 24px; border-radius: 999px; font-family: 'Lexend', sans-serif; font-size: 13px; font-weight: 700; box-shadow: 0 4px 12px rgba(139, 92, 246, 0.25);">
        🎉 Tài Khoản Mới
      </span>
    </div>
    <h2 style="margin: 0 0 16px; font-family: 'Lexend', sans-serif; font-size: 22px; font-weight: 800; color: #2E1F26; text-align: center;">
      Xin chào, <span style="color: ${BRAND_COLOR}">${escapeHtml(params.fullName)}</span>!
    </h2>
    <p style="margin: 0 0 24px; font-family: 'Lexend', sans-serif; font-size: 15px; font-weight: 400; color: #5C4652; line-height: 1.7; text-align: center;">
      Quản trị viên vừa tạo tài khoản <strong>BunnyHoanTien</strong> cho bạn. Bấm nút bên dưới để đặt mật khẩu và bắt đầu sử dụng<br>
      <span style="font-size: 13px; color: #9A8490;">(liên kết có hiệu lực trong ${params.expiresInDays} ngày)</span>
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 auto 24px;">
      <tr>
        <td style="border-radius: 14px; background: linear-gradient(135deg, ${BRAND_COLOR}, ${BRAND_COLOR_LIGHT}); box-shadow: 0 6px 20px rgba(209, 58, 107, 0.3);">
          <a href="${params.setPasswordUrl}" style="display: inline-block; padding: 16px 40px; font-family: 'Lexend', sans-serif; font-size: 15px; font-weight: 800; color: #ffffff; text-decoration: none; border-radius: 14px;">
            🔑 Đặt Mật Khẩu Ngay
          </a>
        </td>
      </tr>
    </table>
    <div style="margin: 24px 0; padding: 16px; border-radius: 12px; background: #F0F9FF; border: 2px solid #BFDBFE;">
      <p style="margin: 0 0 8px; font-family: 'Lexend', sans-serif; font-size: 12px; font-weight: 600; color: #1E40AF;">
        📋 Nếu nút không hoạt động, sao chép link sau:
      </p>
      <p style="margin: 0; font-family: 'Lexend', sans-serif; font-size: 11px; font-weight: 500; color: ${BRAND_COLOR}; word-break: break-all;">${params.setPasswordUrl}</p>
    </div>
    <p style="margin: 0; font-family: 'Lexend', sans-serif; font-size: 13px; line-height: 1.6; color: #9A8490; text-align: center;">
      Chào mừng bạn gia nhập cộng đồng BunnyHoanTien! 🐰✨
    </p>
  `);
}

export function buildReferralSuccessEmail(params: { referrerName: string; friendName: string }): string {
  return emailShell(`
    <div style="text-align: center; margin-bottom: 24px;">
      <span style="display: inline-block; background: linear-gradient(135deg, #EC4899, #DB2777); color: white; padding: 10px 24px; border-radius: 999px; font-family: 'Lexend', sans-serif; font-size: 13px; font-weight: 700; box-shadow: 0 4px 12px rgba(236, 72, 153, 0.25);">
        🎁 Mời Thành Công
      </span>
    </div>
    <h2 style="margin: 0 0 16px; font-family: 'Lexend', sans-serif; font-size: 22px; font-weight: 800; color: #2E1F26; text-align: center;">
      Xin chào, <span style="color: ${BRAND_COLOR}">${escapeHtml(params.referrerName)}</span>!
    </h2>
    <p style="margin: 0 0 24px; font-family: 'Lexend', sans-serif; font-size: 15px; font-weight: 400; color: #5C4652; line-height: 1.7; text-align: center;">
      🎉 <strong style="color: ${BRAND_COLOR};">${escapeHtml(params.friendName)}</strong> vừa đăng ký tài khoản <strong>BunnyHoanTien</strong> bằng link giới thiệu của bạn!
    </p>
    <div style="margin: 0 0 24px; padding: 20px; border-radius: 16px; background: linear-gradient(135deg, ${BRAND_PINK_NEUTRAL}, ${BRAND_PINK_PALE}); border: 2px solid ${BRAND_PINK_PALE};">
      <p style="margin: 0; font-family: 'Lexend', sans-serif; font-size: 14px; font-weight: 600; color: #5C4652; line-height: 1.7; text-align: center;">
        💰 Khi <strong>${escapeHtml(params.friendName)}</strong> hoàn tất đơn hàng đầu tiên và được duyệt,<br>
        <span style="color: ${BRAND_COLOR}; font-weight: 800;">hoa hồng giới thiệu</span> sẽ tự động cộng vào ví của bạn!
      </p>
    </div>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 auto 16px;">
      <tr>
        <td style="border-radius: 14px; background: linear-gradient(135deg, ${BRAND_COLOR}, ${BRAND_COLOR_LIGHT}); box-shadow: 0 6px 20px rgba(209, 58, 107, 0.3);">
          <a href="https://hoahuongaff.click/app/referral" style="display: inline-block; padding: 16px 40px; font-family: 'Lexend', sans-serif; font-size: 15px; font-weight: 800; color: #ffffff; text-decoration: none; border-radius: 14px;">
            🎁 Xem Chi Tiết Giới Thiệu
          </a>
        </td>
      </tr>
    </table>
    <p style="margin: 0; font-family: 'Lexend', sans-serif; font-size: 13px; line-height: 1.6; color: #9A8490; text-align: center;">
      Tiếp tục chia sẻ link giới thiệu để nhận thêm hoa hồng! 🚀
    </p>
  `);
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
