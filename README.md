# Gravity UI

**Physics-based 3D hover interactions for modern React applications.**

Gravity UI is a React + TypeScript UI experiment that explores **depth, motion, and realism** through interactive 3D hover cards.  
Built with a strong focus on **architecture, performance, and clean abstractions**, not just flashy animations.

> Think: *Stripe-level motion, Apple-like subtlety, developer-friendly code.*

---

##  Preview (Conceptual)

┌─────────────────────────┐
│ Project Card │
│ │
│ • Tilts with cursor │ ← Mouse movement controls rotation
│ • Lifts on hover │
│ • Smooth spring back │
│ │
└─────────────────────────┘


When you move your mouse:
- the card **tilts toward the cursor**
- subtle **depth and elevation** appear
- motion feels **physical, not scripted**

---

##  Core Ideas

Gravity UI is built around three principles:

### 1. Motion should feel physical
Animations are driven by **continuous input** (mouse position), not hardcoded keyframes.

### 2. Abstractions over hacks
Each animation lives inside a **reusable, typed component**, not inline spaghetti logic.

### 3. Performance first
No layout thrashing, no unnecessary re-renders — only transform-based animation.

---

### Motion Flow

1. Capture mouse position relative to the card  
2. Normalize values around the center  
3. Convert them into rotation angles  
4. Animate using spring-based physics  
5. Reset smoothly on mouse leave  

No magic. Just math + motion.

---

##  Tech Stack

- **React**
- **TypeScript**
- **Framer Motion** – physics-based animation
- **Tailwind CSS** – styling & depth
- **Vite / Next.js** – fast dev experience

---

## Getting Started

```bash
git clone https://github.com/your-username/gravity-ui.git
cd gravity-ui
npm install
npm run dev
