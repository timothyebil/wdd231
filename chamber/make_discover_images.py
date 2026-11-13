import os
from PIL import Image, ImageDraw

os.makedirs("chamber/images/discover", exist_ok=True)

attractions = [
    ("barlonyo.webp", "Barlonyo Memorial Site", "Agweng, Lira District", "#1d3557"),
    ("lira-market.webp", "Lira Main Central Market", "Market Street, Lira City", "#2b5876"),
    ("ngetta-rock.webp", "Ngetta Rock Viewpoint", "Lira-Kitgum Highway", "#457b9d"),
    ("lira-university.webp", "Lira University Campus", "Ayere, Lira City", "#1e3a8a"),
    ("lake-kwania.webp", "Lake Kwania Fisheries", "Kwania Corridor", "#0f766e"),
    ("akii-bua-stadium.webp", "Akii-Bua Olympic Stadium", "Erute Road, Lira City", "#b91c1c"),
    ("industrial-park.webp", "Agro-Processing Park", "Soroti Road, Lira City", "#334155"),
    ("lango-palace.webp", "Lango Cultural Palace", "Senior Quarters, Lira City", "#78350f")
]

for filename, title, subtitle, bg in attractions:
    img = Image.new("RGB", (300, 200), color=bg)
    draw = ImageDraw.Draw(img)
    draw.rectangle([(12, 12), (288, 188)], outline="#ffffff", width=2)
    draw.text((28, 78), title, fill="#ffffff")
    draw.text((28, 108), subtitle, fill="#e2e8f0")
    img.save(f"chamber/images/discover/{filename}", "WEBP", quality=80)

print("Success: All 8 WebP images created in chamber/images/discover/!")
