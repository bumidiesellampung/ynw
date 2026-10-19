import base64
import os
from PIL import Image

transparent_path = 'assets/images/logo-official-transparent.png'
with open(transparent_path, 'rb') as f:
    b64 = base64.b64encode(f.read()).decode('utf-8')

data_uri = f'data:image/png;base64,{b64}'

# 1. Daytime / Light Header Logo (logo.svg)
svg_light = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 66" fill="none">
  <!-- Official YnW Industrial Gear Emblem -->
  <image href="{data_uri}" x="0" y="0" width="95" height="66" />

  <!-- Company Name Typography -->
  <text x="105" y="28" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="900" fill="#102D50" letter-spacing="-0.5">
    PT <tspan fill="#F58220">YnW</tspan>
  </text>
  
  <text x="105" y="46" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="12.5" font-weight="800" fill="#1E3A8A" letter-spacing="1.2">
    MULTI TEKNIK PLASTINDO
  </text>
  
  <text x="105" y="60" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="8.5" font-weight="700" fill="#64748B" letter-spacing="2">
    TEKNIK • INDUSTRI • INOVASI
  </text>
</svg>'''

with open('assets/images/logo.svg', 'w', encoding='utf-8') as f:
    f.write(svg_light)

# 2. Dark Footer Logo (logo-white.svg)
svg_dark = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 66" fill="none">
  <!-- Official YnW Industrial Gear Emblem -->
  <image href="{data_uri}" x="0" y="0" width="95" height="66" />

  <!-- Company Name Typography White/Light -->
  <text x="105" y="28" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="900" fill="#FFFFFF" letter-spacing="-0.5">
    PT <tspan fill="#F58220">YnW</tspan>
  </text>
  
  <text x="105" y="46" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="12.5" font-weight="800" fill="#93C5FD" letter-spacing="1.2">
    MULTI TEKNIK PLASTINDO
  </text>
  
  <text x="105" y="60" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="8.5" font-weight="700" fill="#94A3B8" letter-spacing="2">
    TEKNIK • INDUSTRI • INOVASI
  </text>
</svg>'''

with open('assets/images/logo-white.svg', 'w', encoding='utf-8') as f:
    f.write(svg_dark)

# 3. Also generate standalone official logo icon (icon.png & favicon.ico)
emblem = Image.open(transparent_path)
# Make a square padded icon (e.g. 256x256)
max_dim = max(emblem.size)
square_size = int(max_dim * 1.1)
square_icon = Image.new('RGBA', (square_size, square_size), (0, 0, 0, 0))
offset_x = (square_size - emblem.size[0]) // 2
offset_y = (square_size - emblem.size[1]) // 2
square_icon.paste(emblem, (offset_x, offset_y), emblem)

# Save icons
square_icon.resize((192, 192), Image.LANCZOS).save('assets/images/icon.png')
square_icon.resize((64, 64), Image.LANCZOS).save('favicon.ico', format='ICO', sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
square_icon.resize((64, 64), Image.LANCZOS).save('assets/images/favicon.ico', format='ICO', sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])

# Also copy icon.svg
svg_icon = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {square_size} {square_size}" fill="none">
  <image href="{data_uri}" x="{offset_x}" y="{offset_y}" width="{emblem.size[0]}" height="{emblem.size[1]}" />
</svg>'''
with open('assets/images/icon.svg', 'w', encoding='utf-8') as f:
    f.write(svg_icon)

print("Generated all logo and favicon assets with official YnW emblem!")
