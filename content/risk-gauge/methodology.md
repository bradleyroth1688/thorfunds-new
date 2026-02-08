# THOR Risk Gauge — Scoring Methodology

## Overview

The **THOR Risk Gauge** is a proprietary 1–10 positioning score that communicates THOR's current conviction level across its managed ETFs. Unlike market sentiment indices (CNN Fear & Greed, AAII Sentiment), the THOR Risk Gauge reflects **actual fund positioning** — what THOR is doing with real capital, not survey data.

**Scale:**
- **1** = Extremely Bearish (near 100% cash / maximum defensive)
- **5** = Neutral (balanced positioning)
- **10** = Extremely Bullish (fully invested / maximum offensive)

---

## Scoring Framework

### Composite Score Formula

The THOR Risk Gauge is a **weighted average of four components**, each scored 1–10:

```
THOR Risk Gauge = (0.40 × Equity Exposure) + (0.25 × Allocation Tilt) + (0.20 × Momentum Signal) + (0.15 × Positioning Trend)
```

The result is rounded to the nearest integer (1–10).

---

### Component 1: Equity Exposure Score (40% weight)

**What it measures:** The percentage of fund assets invested in equities vs. cash/equivalents.

**Why it matters:** This is the single strongest signal of conviction. THOR funds can move to 100% cash — when they're fully invested, they're bullish. Period.

| Equity Exposure % | Score |
|---|---|
| 0–10% | 1 |
| 11–20% | 2 |
| 21–30% | 3 |
| 31–40% | 4 |
| 41–55% | 5 |
| 56–65% | 6 |
| 66–75% | 7 |
| 76–85% | 8 |
| 86–95% | 9 |
| 96–100% | 10 |

**Data source:** Current portfolio allocation from THIR and THLV holdings.

---

### Component 2: Allocation Tilt Score (25% weight)

**What it measures:** The character of equity holdings — offensive (growth, cyclical) vs. defensive (low vol, utilities, staples, treasuries).

**Why it matters:** Being 80% invested in utilities is very different from 80% in tech. The tilt reveals risk appetite beyond the headline number.

| Tilt Description | Score |
|---|---|
| Pure defensive (staples, utilities, treasuries, min-vol) | 1–2 |
| Defensive lean (low-vol indexes, dividend focus) | 3–4 |
| Balanced / broad market | 5–6 |
| Growth lean (Nasdaq-heavy, cyclicals) | 7–8 |
| Pure offensive (concentrated growth, leveraged, small-cap) | 9–10 |

**For THIR specifically:**
- Rotated into defensive indexes (e.g., S&P Low Vol, Dividend Aristocrats) → lower score
- Rotated into growth indexes (e.g., Nasdaq-100, Russell 2000) → higher score
- Broad market (S&P 500) → neutral (5–6)

**For THLV specifically:**
- By design, THLV tilts defensive — score typically 3–5
- Fully invested THLV = moderate bullish (the fund IS the low-vol tilt)
- Cash in THLV = extreme caution even within the defensive mandate

---

### Component 3: Momentum Signal Score (20% weight)

**What it measures:** Whether THOR's models are confirming or diverging from the current positioning direction.

**Why it matters:** A fund can be 80% invested but with models flashing caution — that's different from 80% invested with models confirming uptrend. This captures the *confidence* behind the positioning.

| Signal State | Score |
|---|---|
| Strong sell / risk-off across all models | 1–2 |
| Cautionary / mixed signals, some models weakening | 3–4 |
| Neutral / models in transition | 5 |
| Constructive / most models confirming | 6–7 |
| Strong buy / risk-on across all models | 8–10 |

**Data source:** THOR's proprietary rotation and momentum models (internal).

---

### Component 4: Positioning Trend Score (15% weight)

**What it measures:** The direction of recent allocation changes — are positions being added or reduced?

**Why it matters:** A fund at 70% equity and *increasing* is more bullish than one at 70% and *decreasing*. Direction of travel matters.

| Recent Positioning Change | Score |
|---|---|
| Aggressively reducing exposure (>15% decrease in past 2 weeks) | 1–2 |
| Gradually reducing exposure (5–15% decrease) | 3–4 |
| Stable / no material changes | 5 |
| Gradually increasing exposure (5–15% increase) | 6–7 |
| Aggressively increasing exposure (>15% increase in past 2 weeks) | 8–10 |

**Data source:** Comparison of current vs. prior period allocations.

---

## Fund-Specific Considerations

### THIR (Index Rotation ETF) — $150M+ AUM
- Primary driver of the gauge — active rotation decisions are the strongest signal
- Index selection (growth vs. value vs. broad) feeds Component 2
- Cash vs. invested feeds Component 1
- Rotation frequency and direction feeds Component 4

### THLV (Equal Weight Low Volatility ETF)
- Structural defensive tilt — Component 2 score is inherently lower
- Cash allocation is the key variable for Components 1 and 4
- Models confirming low-vol outperformance = higher Component 3

### Blended Gauge
The composite gauge blends both funds weighted by AUM:

```
If desired: Gauge = (THIR_AUM / Total_AUM) × THIR_Gauge + (THLV_AUM / Total_AUM) × THLV_Gauge
```

For simplicity in the newsletter, Brad assigns a single score reflecting overall firm positioning.

---

## Score Interpretation

| Score | Label | What It Means |
|---|---|---|
| 1 | Extremely Bearish | Near 100% cash. Maximum risk-off. Expect significant downside. |
| 2 | Very Bearish | Heavy cash, minimal exposure. Strong defensive posture. |
| 3 | Bearish | Reduced exposure, defensive tilt. Cautious outlook. |
| 4 | Slightly Bearish | Below-average exposure. Leaning cautious. |
| 5 | Neutral | Balanced positioning. No strong directional conviction. |
| 6 | Slightly Bullish | Above-average exposure. Constructive outlook. |
| 7 | Bullish | Well-invested, growth-leaning. Positive conviction. |
| 8 | Very Bullish | Heavily invested, offensive tilt. Strong conviction. |
| 9 | Extremely Bullish | Near fully invested, aggressive positioning. |
| 10 | Maximum Bullish | Fully invested, maximum growth tilt, all models confirming. |

---

## Update Frequency

- **Daily** (for newsletter): Brad sets the score based on current positioning
- **Intraday changes:** Only update if a material rotation occurs (>5% allocation shift)
- **Methodology review:** Quarterly, to ensure components and weights still reflect THOR's process

---

## Comparison to Other Indices

| Index | What It Measures | THOR Gauge Difference |
|---|---|---|
| CNN Fear & Greed | Market-wide sentiment (7 indicators) | THOR measures its **own** positioning, not market mood |
| AAII Sentiment | Survey of individual investors | THOR uses **actual capital deployment**, not opinions |
| NAAIM Exposure | Active managers' avg equity exposure | Similar concept, but THOR is fund-specific with tilt data |
| VIX | Implied volatility / fear | THOR incorporates forward conviction, not just fear pricing |

**Key differentiator:** The THOR Risk Gauge represents where a $1.1B manager is putting real money. It's not a sentiment survey — it's positioning with conviction.

---

## Compliance Note

The THOR Risk Gauge is an informational summary of fund positioning for newsletter subscribers. It is not investment advice, a buy/sell recommendation, or a guarantee of future performance. Past positioning does not predict future results. Subscribers should review fund prospectuses and consult advisors before making investment decisions.
