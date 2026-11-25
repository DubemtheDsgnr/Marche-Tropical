"""Builds index.html, a single self contained page, from the files in src/ and data/."""
import json, pathlib
R = pathlib.Path(__file__).parent
read = lambda p: (R / p).read_text(encoding="utf-8")
logo = json.loads(read("data/logo.json"))["logo"]
html = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Marché Tropical</title>
<meta name="description" content="African, Caribbean and Asian groceries from Remich, delivered across Luxembourg.">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap">
<style>{read("src/base.css")}{read("src/theme.css")}{read("src/motion.css")}</style>
</head>
<body>
{read("src/body.html").replace("__LOGO__", logo)}
<script>
const PRODUCTS = {read("data/products.json")};
const IMG = {read("data/images.json")};
{read("src/packshot.js")}
{read("src/i18n.js")}
{read("src/illustrations.js")}
{read("src/app.js")}
</script>
</body>
</html>
"""
(R / "index.html").write_text(html, encoding="utf-8")
print(f"index.html written ({len(html) // 1024} KB)")
