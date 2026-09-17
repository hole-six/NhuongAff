#!/usr/bin/env python3
"""
Script tạo logo PWA với icon thỏ từ mascot có sẵn
Yêu cầu: pip install Pillow
"""

from PIL import Image, ImageDraw
import os

# Cấu hình
MASCOT_PATH = "public/mascots/icons/bunny-delighted.webp"  # Hoặc bunny-sparkle.webp
OUTPUT_DIR = "public"
GRADIENT_START = (255, 240, 244)  # #FFF0F4
GRADIENT_END = (255, 223, 232)    # #FFDFE8
BUNNY_SCALE = 0.75  # Thỏ chiếm 75% diện tích

def create_gradient_background(size, start_color, end_color):
    """Tạo nền gradient hồng"""
    base = Image.new('RGB', size, start_color)
    top = Image.new('RGB', size, end_color)
    mask = Image.new('L', size)
    mask_data = []
    for y in range(size[1]):
        for x in range(size[0]):
            # Gradient từ trên xuống dưới
            mask_data.append(int(255 * (y / size[1])))
    mask.putdata(mask_data)
    base.paste(top, (0, 0), mask)
    return base

def create_icon(mascot_path, output_path, size, scale=BUNNY_SCALE):
    """Tạo icon PWA với kích thước cụ thể"""
    print(f"Đang tạo {output_path} ({size}x{size})...")
    
    # Tạo nền gradient
    bg = create_gradient_background((size, size), GRADIENT_START, GRADIENT_END)
    
    try:
        # Load mascot thỏ
        mascot = Image.open(mascot_path).convert("RGBA")
        
        # Tính kích thước thỏ
        mascot_size = int(size * scale)
        mascot = mascot.resize((mascot_size, mascot_size), Image.Resampling.LANCZOS)
        
        # Tính vị trí để căn giữa
        position = ((size - mascot_size) // 2, (size - mascot_size) // 2)
        
        # Convert bg sang RGBA để paste
        bg = bg.convert("RGBA")
        bg.paste(mascot, position, mascot)
        
        # Convert về RGB và lưu
        bg = bg.convert("RGB")
        bg.save(output_path, "PNG", quality=95)
        print(f"✅ Đã tạo {output_path}")
        
    except FileNotFoundError:
        print(f"❌ Không tìm thấy file mascot: {mascot_path}")
        print(f"   Vui lòng chọn một trong các file sau:")
        print(f"   - public/mascots/icons/bunny-delighted.webp")
        print(f"   - public/mascots/icons/bunny-sparkle.webp")
        print(f"   - public/mascots/icons/bunny-wink.webp")
        return False
    
    return True

def create_favicon(mascot_path, output_path, size=64):
    """Tạo favicon nhỏ hơn (chỉ có thỏ, nền trong suốt)"""
    print(f"Đang tạo favicon {output_path} ({size}x{size})...")
    
    try:
        # Load mascot thỏ
        mascot = Image.open(mascot_path).convert("RGBA")
        
        # Resize với padding nhỏ hơn
        mascot = mascot.resize((size, size), Image.Resampling.LANCZOS)
        
        # Lưu với nền trong suốt
        mascot.save(output_path, "PNG", quality=95)
        print(f"✅ Đã tạo favicon {output_path}")
        return True
        
    except FileNotFoundError:
        print(f"❌ Không tìm thấy file mascot: {mascot_path}")
        return False

def main():
    """Tạo tất cả các icon PWA cần thiết"""
    print("🐰 Bắt đầu tạo logo PWA với icon thỏ...\n")
    
    # Kiểm tra file mascot tồn tại
    if not os.path.exists(MASCOT_PATH):
        print(f"❌ Không tìm thấy mascot: {MASCOT_PATH}")
        print("\n📋 Các mascot có sẵn:")
        mascot_dir = "public/mascots/icons"
        if os.path.exists(mascot_dir):
            for file in os.listdir(mascot_dir):
                if file.endswith('.webp'):
                    print(f"   - {os.path.join(mascot_dir, file)}")
        else:
            print(f"   Không tìm thấy thư mục {mascot_dir}")
        return
    
    # Tạo các icon
    icons = [
        ("icon-192.png", 192),
        ("icon-512.png", 512),
        ("apple-touch-icon.png", 180),
    ]
    
    success_count = 0
    for filename, size in icons:
        output_path = os.path.join(OUTPUT_DIR, filename)
        if create_icon(MASCOT_PATH, output_path, size):
            success_count += 1
    
    # Tạo favicon (nhỏ hơn, nền trong suốt)
    favicon_path = os.path.join(OUTPUT_DIR, "icontitle.png")
    if create_favicon(MASCOT_PATH, favicon_path, 64):
        success_count += 1
    
    print(f"\n✅ Hoàn tất! Đã tạo {success_count}/{len(icons) + 1} file icon")
    print("\n📋 Các bước tiếp theo:")
    print("   1. Kiểm tra các file icon trong thư mục public/")
    print("   2. Clear browser cache (Ctrl + Shift + Delete)")
    print("   3. Reload trang web (Ctrl + Shift + R)")
    print("   4. Test PWA install trên mobile")
    print("\n💡 Lưu ý: Nếu icon không cập nhật ngay, hãy:")
    print("   - Xóa PWA app khỏi Home Screen")
    print("   - Clear cache browser")
    print("   - Install lại PWA")

if __name__ == "__main__":
    try:
        main()
    except ImportError:
        print("❌ Thiếu thư viện Pillow!")
        print("📦 Cài đặt: pip install Pillow")
        print("\nHoặc sử dụng:")
        print("   pip3 install Pillow")
        print("   python -m pip install Pillow")
