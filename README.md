# WOLF MOTORS — BUILT TO DOMINATE

A full-stack, responsive luxury automotive and prestige mobility platform for the Singapore market, featuring a Ferrari-inspired editorial white luxury aesthetic, authentic vector brand crest, and integrated enterprise management workspaces.

---

## Brand Identity & Aesthetic

- **Brand**: WOLF MOTORS
- **Tagline**: BUILT TO DOMINATE
- **Market**: Singapore (SGD)
- **Design Philosophy**:
  - **Editorial Luxury White Canvas**: Inspired by premium automotive design systems (`#FFFFFF` backgrounds, `#F8F9FA` surfaces).
  - **Aerodynamic Geometry**: Sharp rectangular precision (`rounded-none` / `rounded-[2px]`).
  - **Signature Palette**: Emerald Green (`#1E8265`), Rosso Corsa Crimson (`#E32119`), Obsidian (`#0A0A0A`).
  - **Authentic Symmetrical Crest**: Vector SVG wolf head emblem based on authentic geometric brand artwork.
  - **Minimalist Top Bar**: Centered brand mark with an animated 3-line full-screen luxury drawer menu.

---

## Key Features & Workspaces

### 1. Public Customer Experience
- **Cinematic Homepage**: Full-bleed hero composition, brand manifesto, featured fleet showcase, 8-class category discovery, and FAQ.
- **Fleet Catalogue (`/fleet`)**: Complete 24-vehicle collection with verified 1:1 photography, category tabs, and real-time filters.
- **Vehicle Detail & Dynamic Quote Configurator (`/fleet/[id]`)**: Itemized Singapore Dollar quotes, add-ons selection, deposit schedules, and pickup/return hub routing.
- **Booking Request Workflow (`/booking`)**: 4-step reservation journey with instant demo voucher generation.
- **Atelier Boutique & Merchandise (`/store`)**: Lifestyle accessories, carbon fiber gear, and apparel catalogue.
- **Shopping Cart & Demo Checkout (`/store/cart`)**: Real-time quantity controls, Singapore courier fee calculation, and delivery simulator.
- **Orders Registry (`/store/orders`)**: Dispatch tracking and demo order status history.

### 2. Business Management Portals
- **CRM Workspace (`/crm`)**: Interactive Kanban pipeline (New, Contacted, Qualified, Closed), client profiles, and campaign tracking.
- **Business Intelligence Analytics (`/analytics`)**: Real-time KPI summaries, fleet utilization rates, and daily revenue SVG bar charts.
- **Fleet & Maintenance Operations (`/operations`)**: Live hub assignments, odometer logs, and prioritized service work orders.
- **Parts & Warehouse Inventory (`/inventory`)**: SKU management, stock level adjustments, reorder thresholds, and supplier registries.

---

## 24 Verified Vehicle Fleet

| Category | Vehicles |
| :--- | :--- |
| **Sedan** | Mercedes-Benz E-Class, BMW 5 Series, Audi A6, Mercedes-Benz S-Class |
| **SUV** | BMW X5, Porsche Cayenne, Range Rover Sport, Volvo XC90 |
| **Hatchback** | Volkswagen Golf, Mini Cooper S, Audi RS 3 |
| **Coupe** | BMW M2, Porsche 911 Carrera, Mercedes-Benz CLE Coupe |
| **Convertible** | BMW 4 Series Convertible, Porsche 911 Carrera Cabriolet, Ferrari Roma Spider |
| **Supercar** | Lamborghini Huracán EVO, Ferrari 296 GTB, McLaren Artura |
| **Electric** | Porsche Taycan 4S, Tesla Model S, Mercedes-Benz EQE SUV |
| **Luxury MPV** | Mercedes-Benz V-Class |

*All 24 vehicles are mapped to verified high-resolution photographs stored locally in `public/vehicles/`.*

---

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Icons**: Lucide React

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## Disclaimer
All records, rates, bookings, patrons, metrics, products, and statuses are fictional illustrative demo data for prototype and demonstration purposes only.
