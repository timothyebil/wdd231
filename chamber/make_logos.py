import os

os.makedirs("chamber/images/member-logos", exist_ok=True)

# 1. Main Header Logo
with open("chamber/images/logo.svg", "w") as f:
    f.write('''<svg xmlns="http://w3.org" viewBox="0 0 100 100" width="50" height="50">
  <circle cx="50" cy="50" r="46" fill="#457b9d" stroke="#ffffff" stroke-width="4"/>
  <ellipse cx="50" cy="50" rx="38" ry="14" fill="none" stroke="#fef3c7" stroke-width="4" transform="rotate(-25 50 50)"/>
  <circle cx="50" cy="50" r="14" fill="#ffffff"/>
</svg>''')

# 2. All 7 Member Logos matching members.json
logos = [
    ("atek-medical.svg", "ATEK MEDICAL", "#b91c1c"),
    ("equator-solar.svg", "EQUATOR SOLAR", "#d97706"),
    ("lira-millers.svg", "LIRA MILLERS", "#15803d"),
    ("nile-basin.svg", "NILE BASIN ENG", "#1d3557"),
    ("nu-microfinance.svg", "NU-MICROFINANCE", "#0369a1"),
    ("savanna-logistics.svg", "SAVANNA LOGISTICS", "#4338ca"),
    ("sykway-tech.svg", "SYKWAY TECH", "#0f766e")
]

for filename, label, color in logos:
    svg_content = f'''<svg xmlns="http://w3.org" viewBox="0 0 200 80" width="150" height="60">
  <rect x="2" y="2" width="196" height="76" rx="8" fill="#f8f9fa" stroke="{color}" stroke-width="3"/>
  <circle cx="28" cy="40" r="14" fill="{color}"/>
  <text x="52" y="45" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#1e293b">{label}</text>
</svg>'''
    with open(f"chamber/images/member-logos/{filename}", "w") as f:
        f.write(svg_content)

print("All 8 SVG logos created successfully!")
