# THOR Risk Gauge — Usage Guide

## Quick Start

1. Open `gauge.html` in a browser
2. Change the score on **line ~180** (the `const SCORE = 8;` line)
3. Screenshot the gauge → use in Beehiiv newsletter

Or just tell Claude: *"Update the risk gauge to 6"* and it'll update the HTML + screenshot it.

---

## Files

| File | Purpose |
|---|---|
| `gauge.html` | Self-contained HTML gauge — open in browser, change score, screenshot |
| `methodology.md` | Full scoring framework documentation (4 components, weights, tables) |
| `thor-risk-gauge-8.png` | Pre-rendered PNG at score 8 (current) |
| `README.md` | This file |

---

## How to Update the Score

### Option A: Ask Claude
> "Set the THOR Risk Gauge to 6 and generate a new PNG"

Claude will:
1. Edit `gauge.html` to set `const SCORE = 6;`
2. Open it in the browser
3. Screenshot the gauge container
4. Save as `thor-risk-gauge-6.png`

### Option B: Manual
1. Open `gauge.html` in any text editor
2. Find this line near the bottom:
   ```javascript
   const SCORE = 8;
   ```
3. Change `8` to your desired score (1–10)
4. Open the file in Chrome/Safari
5. Take a screenshot (or use macOS screenshot: Cmd+Shift+4, drag over gauge)
6. Save as PNG

---

## Score Reference

| Score | Label | Color | When to Use |
|---|---|---|---|
| 1 | Extremely Bearish | 🔴 Deep Red | Near 100% cash, maximum risk-off |
| 2 | Very Bearish | 🔴 Red | Heavy cash, minimal exposure |
| 3 | Bearish | 🟠 Dark Orange | Reduced exposure, defensive tilt |
| 4 | Slightly Bearish | 🟠 Orange | Below-average exposure |
| 5 | Neutral | 🟡 Yellow | Balanced, no strong conviction |
| 6 | Slightly Bullish | 🟢 Yellow-Green | Above-average exposure |
| 7 | Bullish | 🟢 Light Green | Well-invested, growth-leaning |
| 8 | Very Bullish | 🟢 Green | Heavily invested, strong conviction |
| 9 | Extremely Bullish | 🟢 Dark Green | Near fully invested, aggressive |
| 10 | Maximum Bullish | 🟢 Darkest Green | Full investment, all models confirm |

---

## Scoring Formula (Quick Version)

```
Gauge = (0.40 × Equity Exposure) + (0.25 × Allocation Tilt) + (0.20 × Momentum Signal) + (0.15 × Positioning Trend)
```

**Each component scored 1–10:**
- **Equity Exposure (40%):** How invested are we? (0% = 1, 100% = 10)
- **Allocation Tilt (25%):** Defensive or offensive? (utilities = 2, Nasdaq = 8)
- **Momentum Signal (20%):** Are models confirming? (all sell = 1, all buy = 10)
- **Positioning Trend (15%):** Adding or reducing? (aggressive cuts = 1, aggressive adds = 10)

Full methodology in `methodology.md`.

**In practice:** Brad can assign the score based on gut + framework. The formula is a guide, not a straitjacket. The score should feel right given current positioning.

---

## Newsletter Placement Recommendation

### Best Position: Right after the market overview, before detailed analysis

```
📰 Newsletter Structure:
─────────────────────────
1. Subject line / header
2. Market snapshot (futures, key moves)
3. ⭐ THOR RISK GAUGE ⭐  ← HERE
4. "What we're watching"
5. Detailed analysis / commentary
6. Fund performance data
7. CTA / sign-off
```

### Why this position works:
- **Readers see it immediately** after the market context
- **Sets the tone** for the rest of the analysis ("we're at 8/10, here's why...")
- **Creates a visual anchor** — subscribers learn to look for it
- **Above the fold** in most email clients

### Beehiiv Implementation:
1. Upload the PNG as an image block
2. Center it, max width ~600px
3. Add a 1-line caption: *"The THOR Risk Gauge reflects our current fund positioning across $1.1B in managed assets."*
4. Optional: Make it a recurring content block in Beehiiv for easy reuse

### Alternative: Section header
Some newsletters put the risk indicator as a persistent header element (like a "confidence meter"). Could also work as a small sidebar element if the template supports it.

---

## Design Notes

- **600px wide** — fits standard email width
- **White background** — works on any email client
- **No external dependencies** — all fonts, styles, SVG are inline
- **High contrast** — readable on mobile
- **Clean branding** — THOR logo + AUM at bottom for credibility
- The gauge renders as a PNG image in email — no CSS/JS compatibility issues

---

## Updating AUM or Branding

In `gauge.html`, find the footer section:
```html
<div class="gauge-footer-text">Updated Daily · $1.1B AUM</div>
```
Change the AUM figure as needed.
