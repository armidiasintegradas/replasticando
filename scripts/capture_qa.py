import os
import subprocess
import sys

CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
BASE_DIR = "/Users/alexribeiro/Desktop/replasticando"
OUTPUT_DIR = os.path.join(BASE_DIR, "reports/qa")

ROUTES = ["processo", "possibilidades", "profissionais"]
VIEWPORTS = [
    (1440, 900),
    (1024, 768),
    (768, 1024),
    (390, 844)
]

os.makedirs(OUTPUT_DIR, exist_ok=True)

for route in ROUTES:
    file_url = f"file://{BASE_DIR}/{route}.html"
    for width, height in VIEWPORTS:
        out_filename = f"{route}-{width}x{height}.png"
        out_path = os.path.join(OUTPUT_DIR, out_filename)
        
        cmd = [
            CHROME_PATH,
            "--headless=new",
            "--disable-gpu",
            "--no-sandbox",
            f"--window-size={width},{height}",
            f"--screenshot={out_path}",
            file_url
        ]
        
        print(f"[QA] Capturing {route} at {width}x{height} -> {out_filename}...")
        res = subprocess.run(cmd, capture_output=True, text=True)
        if os.path.exists(out_path):
            size = os.path.getsize(out_path)
            print(f"[QA] OK: {out_filename} ({size} bytes)")
        else:
            print(f"[QA] FAILED: {out_filename}\n{res.stderr}")
            sys.exit(1)

print("\n[QA] All 12 screenshots generated successfully!")
