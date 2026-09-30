import os, math, zlib, struct

def make_png(width, height, rgba_data):
    def crc32(data):
        return zlib.crc32(data) & 0xffffffff
    png = b'\x89PNG\r\n\x1a\n'
    ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)
    png += struct.pack('>I4s', 13, b'IHDR') + ihdr_data + struct.pack('>I', crc32(b'IHDR' + ihdr_data))
    raw_data = bytearray()
    for y in range(height):
        raw_data.append(0)
        raw_data.extend(rgba_data[y * width * 4 : (y + 1) * width * 4])
    compressed = zlib.compress(bytes(raw_data), 9)
    png += struct.pack('>I4s', len(compressed), b'IDAT') + compressed + struct.pack('>I', crc32(b'IDAT' + compressed))
    png += struct.pack('>I4s', 0, b'IEND') + struct.pack('>I', crc32(b'IEND'))
    return png

def render_sorae_image(
    size=1024,
    has_bg=True,
    has_card=True,
    card_scale=0.82,
    mono=False,
    transparent_bg=False,
    glow=True,
    bar_scale=1.0,
    border_width_scale=1.0
):
    width = size
    height = size
    buf = bytearray(width * height * 4)
    cx, cy = width / 2.0, height / 2.0

    # Card dimensions
    card_w = size * card_scale
    card_h = size * card_scale
    card_r = card_w * 0.26
    border_w = max(1.5, size * 0.022 * card_scale * border_width_scale)

    # Bars setup
    pitch = size * 0.082 * card_scale * bar_scale
    bar_w = size * 0.046 * card_scale * bar_scale
    bar_r = bar_w / 2.0

    h3 = size * 0.42 * card_scale * bar_scale
    h2 = h3 * 0.73
    h1 = h3 * 0.40

    bars_spec = [
        (-2.0 * pitch, h1),
        (-1.0 * pitch, h2),
        ( 0.0 * pitch, h3),
        ( 1.0 * pitch, h2),
        ( 2.0 * pitch, h1),
    ]

    capsules = []
    for ox, bh in bars_spec:
        bcx = cx + ox
        bcy = cy
        half_seg = max(0.0, (bh / 2.0) - bar_r)
        capsules.append((bcx, bcy - half_seg, bcy + half_seg, bar_r))

    card_hw = card_w / 2.0 - card_r
    card_hh = card_h / 2.0 - card_r

    # Colors
    bg_color = (0, 0, 0, 0) if transparent_bg else ((13, 14, 18, 255) if has_bg else (0, 0, 0, 0))
    card_fill = (16, 16, 24, 255) if has_card else (0, 0, 0, 0)
    border_color = (112, 70, 205, 255) if has_card else (0, 0, 0, 0)
    bar_color = (255, 255, 255, 255) if mono else (147, 89, 255, 255)

    for y in range(height):
        row_offset = y * width * 4
        py = float(y) + 0.5
        for x in range(width):
            px = float(x) + 0.5
            idx = row_offset + x * 4

            r, g, b, a = bg_color

            if has_card:
                dx = abs(px - cx) - card_hw
                dy = abs(py - cy) - card_hh
                odx = max(0.0, dx)
                ody = max(0.0, dy)
                outer_d = math.sqrt(odx * odx + ody * ody)
                inner_d = min(0.0, max(dx, dy))
                dist_card = outer_d + inner_d - card_r

                if dist_card <= 0.5:
                    cov_card = max(0.0, min(1.0, 0.5 - dist_card))
                    dist_inner = dist_card + border_w
                    cov_fill = max(0.0, min(1.0, 0.5 - dist_inner))

                    cr = border_color[0] * (1.0 - cov_fill) + card_fill[0] * cov_fill
                    cg = border_color[1] * (1.0 - cov_fill) + card_fill[1] * cov_fill
                    cb = border_color[2] * (1.0 - cov_fill) + card_fill[2] * cov_fill
                    ca = 255.0 * cov_card

                    # Alpha blending
                    src_a = ca / 255.0
                    dst_a = a / 255.0
                    out_a = src_a + dst_a * (1.0 - src_a)

                    if out_a > 0.0:
                        r = int((cr * src_a + r * dst_a * (1.0 - src_a)) / out_a)
                        g = int((cg * src_a + g * dst_a * (1.0 - src_a)) / out_a)
                        b = int((cb * src_a + b * dst_a * (1.0 - src_a)) / out_a)
                        a = int(out_a * 255.0)

            # Check soundwave bars
            min_bar_d = 9999.0
            for bcx, y_min, y_max, br in capsules:
                clamped_y = max(y_min, min(y_max, py))
                cdx = px - bcx
                cdy = py - clamped_y
                d = math.sqrt(cdx * cdx + cdy * cdy) - br
                if d < min_bar_d:
                    min_bar_d = d

            if min_bar_d <= 0.5:
                cov_bar = max(0.0, min(1.0, 0.5 - min_bar_d))
                src_a = (bar_color[3] * cov_bar) / 255.0
                dst_a = a / 255.0
                out_a = src_a + dst_a * (1.0 - src_a)
                if out_a > 0.0:
                    r = int((bar_color[0] * src_a + r * dst_a * (1.0 - src_a)) / out_a)
                    g = int((bar_color[1] * src_a + g * dst_a * (1.0 - src_a)) / out_a)
                    b = int((bar_color[2] * src_a + b * dst_a * (1.0 - src_a)) / out_a)
                    a = int(out_a * 255.0)
            elif glow and not mono and min_bar_d < size * 0.1:
                glow_factor = max(0.0, 1.0 - min_bar_d / (size * 0.1)) * 0.20
                if transparent_bg and a < 50:
                    a = min(255, int(a + 255.0 * glow_factor))
                r = min(255, int(r + bar_color[0] * glow_factor))
                g = min(255, int(g + bar_color[1] * glow_factor))
                b = min(255, int(b + bar_color[2] * glow_factor))

            buf[idx] = r
            buf[idx+1] = g
            buf[idx+2] = b
            buf[idx+3] = a

    return make_png(width, height, buf)

def save_file(path, data):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'wb') as f:
        f.write(data)
    print(f'Saved: {path} ({len(data)} bytes)')

print('Generating Sorae assets...')

# 1. Main App Icon (1024x1024)
save_file('assets/images/icon.png', render_sorae_image(1024, has_bg=True, has_card=True, card_scale=0.82))

# 2. Splash Icon (512x512) - Centered logo with ambient glow on dark background or transparent
save_file('assets/images/splash-icon.png', render_sorae_image(512, has_bg=False, has_card=False, transparent_bg=True, bar_scale=1.6))

# 3. Android Adaptive Foreground (512x512) - Scaled inside safe zone (card_scale=0.62) on transparent bg
save_file('assets/images/android-icon-foreground.png', render_sorae_image(512, has_bg=False, has_card=True, card_scale=0.64, transparent_bg=True))

# 4. Android Adaptive Background (512x512) - Dark #0d0e12 background
save_file('assets/images/android-icon-background.png', render_sorae_image(512, has_bg=True, has_card=False, transparent_bg=False, glow=False))

# 5. Android Adaptive Monochrome (432x432) - White bars on transparent
save_file('assets/images/android-icon-monochrome.png', render_sorae_image(432, has_bg=False, has_card=False, mono=True, transparent_bg=True, glow=False, bar_scale=1.4))

# 6. Web Favicon (48x48)
save_file('assets/images/favicon.png', render_sorae_image(48, has_bg=True, has_card=True, card_scale=0.88, glow=False))

# 7. Logo Glow (604x604) - Waveform with glow for animated-icon
save_file('assets/images/logo-glow.png', render_sorae_image(604, has_bg=False, has_card=False, transparent_bg=True, glow=True, bar_scale=1.5))

# 8. Expo Logo replacement (512x512)
save_file('assets/images/expo-logo.png', render_sorae_image(512, has_bg=False, has_card=False, transparent_bg=True, glow=False, bar_scale=1.5))

# 9. SVG Symbol for iOS expo.icon
svg_content = """<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="96" y="200" width="40" height="112" rx="20" fill="white"/>
  <rect x="168" y="152" width="40" height="208" rx="20" fill="white"/>
  <rect x="236" y="112" width="40" height="288" rx="20" fill="white"/>
  <rect x="304" y="152" width="40" height="208" rx="20" fill="white"/>
  <rect x="376" y="200" width="40" height="112" rx="20" fill="white"/>
</svg>
"""
with open('assets/expo.icon/Assets/expo-symbol 2.svg', 'w') as f:
    f.write(svg_content)
print('Saved: assets/expo.icon/Assets/expo-symbol 2.svg')

print('All assets generated successfully!')
