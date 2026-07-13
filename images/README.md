# Duro Water Technologies — Image Assets

Premium royalty-free images are currently loaded via Unsplash CDN for fast setup.

## Folder Structure

```
images/
├── favicon.svg
├── products/       ← Place product photos here
├── gallery/        ← Gallery / installation photos
├── team/           ← Service engineer photos
├── testimonials/   ← Customer profile images
└── icons/          ← Custom icons if needed
```

## Recommended Local Replacements

Replace CDN URLs in HTML with local paths for production:

| Use Case | Suggested Filename | Source Ideas |
|----------|-------------------|--------------|
| Hero purifier | `hero-purifier.webp` | Water purifier product shot |
| About facility | `about-facility.webp` | Lab / plant interior |
| Domestic RO | `products/domestic-ro.webp` | Kitchen RO unit |
| Commercial RO | `products/commercial-ro.webp` | Office/hotel plant |
| Industrial RO | `products/industrial-ro.webp` | Factory RO skid |
| Softener | `products/softener.webp` | Softener tank |
| Gallery | `gallery/*.webp` | Installations & events |

## Tips

- Use WebP format for faster loading
- Compress images (max ~200KB for cards, ~400KB for hero)
- Always include `width`, `height`, `alt`, and `loading="lazy"` attributes
- Keep hero image as `loading="eager"` for LCP
