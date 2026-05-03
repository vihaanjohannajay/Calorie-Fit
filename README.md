# 🥗 CalorieFit — Smart Meal Planner

> A step-by-step daily meal optimizer powered by the **0-1 Knapsack algorithm** (Dynamic Programming). Built as a college DAA (Design and Analysis of Algorithms) project.

---

## 🚀 Live Demo

Deployed on Vercel: **[caloriefit.vercel.app](https://caloriefit.vercel.app)**

---

## 📱 Features

### Meal Planning
- **Step-by-step meal builder** — select foods separately for Breakfast, Lunch, Dinner, and Snacks
- **Same food across multiple meals** — foods appear in all relevant meal steps (e.g. Roti shows in both Lunch and Dinner)
- **Per-meal 0-1 Knapsack optimization** — each meal slot runs its own DP algorithm with a calorie sub-budget
- **240+ foods** — Indian, Western, Asian, Fast Food, Fruits, Beverages with full nutrition data
- **Portion control** — adjust servings per food (1× to 10×)
- **Swap suggestions** — swap any result food for a similar alternative

### Nutrition Tracking
- **Full macro breakdown** — Calories, Protein, Carbs, Fat, Sugar, Fiber
- **Vitamins & Minerals panel** — visual % daily value for Vit A/C/D/B6/B12, Iron, Calcium, Potassium, Zinc, Folate, Magnesium, Niacin, Selenium, Omega-3 (display only — not part of optimization)
- **Nutrition grade** — A/B/C/D/F based on how well your plan hits macro targets
- **"Why picked?" explanations** — per food reasoning from the algorithm

### DAA / Algorithm Features
- **0-1 Knapsack DP** with animated step-by-step DP table visualizer
- **Greedy vs DP comparison** — animated side-by-side showing why DP beats greedy
- **Pseudocode viewer** with live line highlighting during animation
- **Recurrence relation display** — `dp[i][j] = max(dp[i-1][j], dp[i-1][j-w] + v)` with live cell values
- **Complexity display** — O(n·W) time/space with actual numbers for each run
- **Sensitivity sliders** — adjust protein/carb/sugar/fiber weights and re-optimize
- **Algorithm report** — downloadable .txt report of each optimization run

### Logging & Analytics
- **Daily log** — save meal plans and track history
- **28-day calorie heatmap**
- **7-day macro trend chart** (SVG line chart)
- **Personal bests** — best grade, highest score, longest streak, most fiber
- **Weekly deficit/surplus tracker** — estimates kg lost/gained
- **Water intake tracker** — 8-glass daily goal

### App Features
- **PWA** — installable on Android, iPhone, and desktop (works offline)
- **Onboarding flow** — 3-step setup with TDEE calculation (Mifflin-St Jeor BMR)
- **Dark / Light mode**
- **English / Hindi** toggle
- **Meal templates** — save and reload named meal selections
- **Custom food entry** — add your own foods with full nutrition data
- **Share as image** — download a PNG of your meal plan
- **"Surprise me"** — random food selection per meal step
- **Cuisine of the day** — daily rotating suggestion
- **Confetti** on good nutrition grades 🎉

---

## 🧠 Algorithm Details

CalorieFit runs the **0-1 Knapsack** algorithm independently for each meal slot:

| Meal | Calorie budget |
|------|---------------|
| Breakfast | 25% of daily target |
| Lunch | 35% of daily target |
| Dinner | 30% of daily target |
| Snacks | 10% of daily target |

**Nutrition score formula** (per food):
```
score = (protein × w_protein)
      + (carb_moderation × w_carb)
      - (sugar × w_sugar)
      + (fiber × w_fiber)
      + (calorie_efficiency_bonus)
```
Weights are user-adjustable via the Algo tab sliders.

**Time complexity:** O(n·W) per meal slot  
**Space complexity:** O(n·W), reducible to O(W) with 1D rolling array

---

## 🗂️ Project Structure

```
caloriefit/
├── index.html        # App shell, nav, page containers
├── app.js            # All logic — food DB, knapsack, UI rendering
├── style.css         # Full stylesheet, dark/light theme, all components
├── sw.js             # Service worker for PWA offline support
├── manifest.json     # PWA manifest
├── vercel.json       # Vercel deployment config
└── icons/
    ├── icon-192.png
    └── icon-512.png
```

---

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | Vanilla HTML, CSS, JavaScript (no frameworks) |
| Algorithm | 0-1 Knapsack via Dynamic Programming |
| Storage | localStorage (PWA offline persistence) |
| Hosting | Vercel |
| PWA | Service Worker + Web App Manifest |

No npm, no build step, no dependencies. Open `index.html` directly in any browser.

---

## 🏃 Running Locally

```bash
git clone https://github.com/YOUR_USERNAME/caloriefit.git
cd caloriefit
# Open index.html in your browser — that's it
```

Or use a local server for PWA features:
```bash
npx serve .
# Visit http://localhost:3000
```

---

## 📦 Deploying to Vercel

```bash
git init
git add .
git commit -m "Initial deploy"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/caloriefit.git
git push -u origin main
```

Then import the repo at [vercel.com/new](https://vercel.com/new) — Framework: **Other**, no build command needed.

---

## 📸 Screenshots

> Add screenshots here after deployment

---

## 📄 License

MIT — free to use, modify, and distribute.

---

*Built for DAA coursework — demonstrating the 0-1 Knapsack algorithm in a real-world meal planning application.*
