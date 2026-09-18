#!/usr/bin/env python3
"""
Tạo favicon.ico từ logo thỏ BunnyHoanTien
Tạo multiple sizes: 16x16, 32x32, 48x48 trong 1 file .ico

Usage:
    python create_favicon.py
"""

from PIL import Image
import os

def create_favicon():
    """Tạo favicon.ico từ icon-512.png"""
    
    # Input file
    input_file = "public/icon-512.png"
    output_file = "public/favicon.ico"
    
    if not os.path.exists(input_file):
        print(f"❌ Không tìm thấy file: {input_file}")
        print("💡 Hãy chắc chắn file public/icon-512.png tồn tại (logo thỏ)")
        return False
    
    try:
        # Load logo thỏ
        img = Image.open(input_file)
        print(f"✅ Đã load: {input_file}")
        print(f"   Kích thước gốc: {img.size}")
        
        # Convert sang RGBA nếu cần (để hỗ trợ transparency)
        if img.mode != 'RGBA':
            img = img.convert('RGBA')
            print(f"   Đã convert sang RGBA")
        
        # Tạo các sizes khác nhau cho favicon
        sizes = [(16, 16), (32, 32), (48, 48)]
        print(f"\n📐 Tạo favicon với {len(sizes)} sizes:")
        
        # Resize và lưu với anti-aliasing tốt nhất
        resized_images = []
        for size in sizes:
            resized = img.resize(size, Image.Resampling.LANCZOS)
            resized_images.append(resized)
            print(f"   ✓ {size[0]}x{size[1]}")
        
        # Save as .ico với multiple sizes
        img.save(
            output_file, 
            format='ICO', 
            sizes=sizes,
            append_images=resized_images[1:]  # Thêm các size còn lại
        )
        
        print(f"\n🎉 THÀNH CÔNG!")
        print(f"   Đã tạo: {output_file}")
        print(f"   Sizes: 16x16, 32x32, 48x48")
        
        # Check file size
        file_size = os.path.getsize(output_file)
        print(f"   File size: {file_size:,} bytes ({file_size / 1024:.1f} KB)")
        
        if file_size > 100 * 1024:  # > 100KB
            print(f"   ⚠️ File hơi lớn (nên < 100KB)")
        else:
            print(f"   ✅ File size OK")
        
        return True
        
    except Exception as e:
        print(f"\n❌ LỖI: {e}")
        return False

def create_app_icons():
    """Tạo app/icon.png và app/apple-icon.png cho Next.js 13+"""
    
    input_file = "public/icon-512.png"
    
    # Check input
    if not os.path.exists(input_file):
        print(f"❌ Không tìm thấy: {input_file}")
        return False
    
    # Create app folder if not exists
    os.makedirs("app", exist_ok=True)
    
    try:
        img = Image.open(input_file)
        
        # 1. app/icon.png (512x512)
        print("\n📱 Tạo app/icon.png...")
        if img.size != (512, 512):
            icon_512 = img.resize((512, 512), Image.Resampling.LANCZOS)
        else:
            icon_512 = img.copy()
        
        icon_512.save("app/icon.png", format='PNG', optimize=True)
        print("   ✅ app/icon.png (512x512)")
        
        # 2. app/apple-icon.png (180x180)
        print("\n🍎 Tạo app/apple-icon.png...")
        
        # Check nếu đã có apple-touch-icon.png
        if os.path.exists("public/apple-touch-icon.png"):
            apple_img = Image.open("public/apple-touch-icon.png")
            print("   ✓ Dùng public/apple-touch-icon.png có sẵn")
        else:
            apple_img = img.resize((180, 180), Image.Resampling.LANCZOS)
            print("   ✓ Resize từ icon-512.png")
        
        apple_img.save("app/apple-icon.png", format='PNG', optimize=True)
        print("   ✅ app/apple-icon.png (180x180)")
        
        return True
        
    except Exception as e:
        print(f"\n❌ LỖI: {e}")
        return False

def main():
    """Main function"""
    print("=" * 60)
    print("🐰 TẠO FAVICON VÀ ICONS CHO BUNNYHOANTIEN")
    print("=" * 60)
    
    # 1. Tạo favicon.ico
    success1 = create_favicon()
    
    # 2. Tạo app icons
    success2 = create_app_icons()
    
    print("\n" + "=" * 60)
    if success1 and success2:
        print("✅ HOÀN THÀNH TẤT CẢ!")
        print("\n📋 Files đã tạo:")
        print("   - public/favicon.ico (16,32,48)")
        print("   - app/icon.png (512x512)")
        print("   - app/apple-icon.png (180x180)")
        print("\n🚀 NEXT STEPS:")
        print("   1. Commit & push code")
        print("   2. Deploy lên production")
        print("   3. Test: https://hoahuongaff.click/favicon.ico")
        print("   4. Submit lên Google Search Console")
        print("   5. Chờ 1-7 ngày logo hiện trên Google")
    else:
        print("❌ CÓ LỖI XẢY RA")
        print("\n💡 Kiểm tra:")
        print("   - File public/icon-512.png có tồn tại không?")
        print("   - Đã cài Pillow chưa? pip install Pillow")
    print("=" * 60)

if __name__ == "__main__":
    main()
