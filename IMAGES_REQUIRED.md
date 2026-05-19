# ReWorkGaming - WebP Images Required

## Gaming Images (for Featured Section)

### Car Racing
- **File:** `images/racing-car.webp`
- **Dimensions:** 800x600px (landscape)
- **Content:** High-speed car racing screenshot or promotional image
- **Used in:** index.html (featured games), tournaments.html (racing tournament)

### Bike Racing
- **File:** `images/bike-racing.webp`
- **Dimensions:** 800x600px (landscape)
- **Content:** Motorcycle racing or bike racing game screenshot
- **Used in:** index.html (featured games), tournaments.html (bike racing tournament)

### Esports Games
- **File:** `images/cs2-game.webp`
- **Dimensions:** 800x600px
- **Content:** Counter-Strike 2 gameplay screenshot

- **File:** `images/valorant-game.webp`
- **Dimensions:** 800x600px
- **Content:** Valorant gameplay screenshot

- **File:** `images/lol-game.webp`
- **Dimensions:** 800x600px
- **Content:** League of Legends gameplay screenshot

## Blog Images

- **File:** `images/blog-racing.webp`
- **Dimensions:** 800x600px
- **Content:** Racing track or racing game promotional image

- **File:** `images/blog-bike.webp`
- **Dimensions:** 800x600px
- **Content:** Motorcycle racing or bike game promotional image

## Tournament Images

- **File:** `images/tournament.webp`
- **Dimensions:** 800x600px
- **Content:** General tournament/esports stage image

## Team Images (for Teams Section)

- **File:** `images/team1.webp` - `images/team6.webp`
- **Dimensions:** 800x600px
- **Content:** Gaming team photos or team logos

## General Images

- **File:** `images/logo.webp`
- **Dimensions:** 50x50px
- **Content:** ReWorkGaming logo

- **File:** `images/hero-image.webp`
- **Dimensions:** 1200x800px
- **Content:** Hero/banner image for home page

- **File:** `images/about.webp`
- **Dimensions:** 1000x700px
- **Content:** About page image

## Image Conversion Tips

All images should be converted to WebP format for optimal performance:

### From JPG to WebP (using cwebp):
```bash
cwebp input.jpg -o output.webp -q 80
```

### From PNG to WebP:
```bash
cwebp input.png -o output.webp -q 85
```

### Batch conversion:
```bash
for f in *.jpg; do cwebp "$f" -o "${f%.jpg}.webp" -q 80; done
```

## Browser Compatibility

WebP format support:
- Chrome/Edge: Full support
- Firefox: Full support (v65+)
- Safari: Full support (16+)

For older browser support, provide fallback JPG/PNG images.

## Optimizations

- Compress WebP images using quality setting 75-85
- Use appropriate dimensions to avoid stretching
- Optimize images before uploading (< 500KB recommended per image)
