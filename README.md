# MEDiT — Hyperlocal Medicine Delivery Platform

> **Medicines. Nearby. Delivered.**  
> *AI-Assisted. Pharmacist Verified.*

MEDiT is a production-style hyperlocal medicine delivery platform that bridges customers, licensed neighbourhood pharmacies, and delivery riders with a strict **Human-in-the-Loop Healthcare Guarantee**:

$$\text{Customer} \longrightarrow \text{Nearby Pharmacy} \longrightarrow \text{Licensed Pharmacist Verification} \longrightarrow \text{Rider} \longrightarrow \text{Customer}$$

---

## 🛡️ Critical Clinical Safety Rule

> **AI must NEVER independently approve, reject, or validate a prescription.**  
> **AI is only an assistant to the licensed pharmacist.**  
> **The final prescription verification decision must always be made manually by the licensed pharmacist.**

All application surfaces clearly display:
> *"AI-assisted analysis — Final verification must be performed by a licensed pharmacist."*

---

## 🚀 Key Features

### 1. Landing Experience
- Modern healthcare-tech hero with real-time delivery estimates (< 30 minutes).
- Visual Hyperlocal Chain Diagram depicting Customer → Pharmacy → Pharmacist → Rider → Customer.
- Human-in-the-Loop clinical comparison showcase: AI Assistance (OCR extraction, drug interaction alerts, clarity screening) vs Human Responsibility (clinical judgment, doctor registry cross-check, final dispensing sign-off).
- Interactive 6-step guided walkthrough modal.

### 2. Customer Portal (`Rahul Sharma`)
- **Medicine Marketplace**: Filter by category, price, stock status, and prescription requirement.
- **Dynamic Cart**: Subtotal, delivery fee (₹30), packaging fee (₹15), and prescription enforcement.
- **Prescription Upload**: Supports image/PDF upload, high-resolution preview, and simulated AI OCR extraction.
- **AI Prescription Assistant**: Extracts drug names, dosages, frequencies, and doctor registration, while clearly stating *"AI analysis complete — awaiting pharmacist verification"*.
- **Live Order Tracking**: 5-stage visual stepper (Prescription Verification → Order Prepared → Rider Assigned → Out for Delivery → Delivered) with live simulated rider telemetry.

### 3. Pharmacist Portal (`Dr. Priyesh Sharma — Reg #PH-88231`)
- **Verification Queue**: Pending prescription card list with customer information, requested medicines, and upload timestamps.
- **Split-Screen Verification Desk**:
  - **Left**: Medical document viewer with zoom in/out, 90° rotation, and high-contrast clinical filters.
  - **Right**: AI Assistant extraction breakdown alongside **Pharmacist Manual Decision Controls** (*Approve Prescription*, *Reject Prescription*, *Request Clarification*).
- **Order Preparation**: Mark orders as *Preparing* and broadcast *Ready for Pickup* to nearby riders.
- **Real-Time Inventory Management**: Edit stock, update prices, add new medications, and toggle availability (acts as the source of truth for customer marketplace).
- **Pharmacy Financials**: Today's revenue, monthly trends, and order metrics.

### 4. Rider Portal (`Aman Kumar — Honda Activa DL-04-AB-1294`)
- **Dashboard KPIs**: ⭐ 4.8 Rating, ₹620 Today's Earnings, 14 Deliveries, 6.2 Online Hours.
- **Order Acceptance**: Pickup from Sharma Medical Store, drop to Rahul Sharma, estimated earnings ₹45.
- **Active Mission Navigation**:
  - Visual status transitions: *Accepted* $\rightarrow$ *Picked Up* $\rightarrow$ *Out for Delivery* $\rightarrow$ *Delivered*.
  - Simulated interactive GPS route telemetry map.
  - One-tap customer and pharmacy calling.
  - Delivery OTP / confirmation with celebratory confetti and immediate wallet credit.
- **Rider Earnings & Trip History**: Daily, weekly, and monthly payouts with individual trip audit logs.

### 5. Platform Control Tower (`Dr. Aditi Roy — Compliance Officer`)
- Real-time KPIs: 142 Total Orders, 18 Pharmacies, 45 Active Riders, 1,280 Customers, 99.2% Success Rate.
- **Statutory Audit Log**: Immutable digital logbook verifying 100% human verification by registered pharmacists.

### 6. Real-Time Notification Center & Audio Alerts
- **Interactive Bell & Unread Badge**: Live notification bell with unread count pill and pulsing radar animation.
- **Actionable Deep-Linking**: Clicking any notification instantly navigates to the relevant persona desk (e.g. clicking an Rx alert jumps straight to Pharmacist Verification; clicking an order alert jumps to Customer Tracking).
- **Multi-Category Filtering**: Quick filter by *All*, *Unread*, *My Role*, *Rx Review*, *Orders*, or *Delivery*.
- **Synthesizer Medical Audio Chime**: Dual-frequency (D5 → A5) Web Audio chime with 1-tap sound toggle (🔊 / 🔇).
- **Web Desktop Notifications**: HTML5 Notifications API integration for native background desktop alerts.
- **Simulate Live Events**: 1-tap demo triggers (+ Rx Upload, + Order Ping, + Rider Task, + Low Stock) to immediately test live alert flows.

---

## 👥 Demo Personas

| Role | Name | Details | Initial Demo Action |
|---|---|---|---|
| **Customer** | Rahul Sharma | Flat 402, Palm Heights, Green Park | Order #MED1024 (Paracetamol + Augmentin Rx) |
| **Pharmacist** | Dr. Priyesh Sharma | Sharma Medical Store (Reg #PH-88231) | Verify Rx #rx_demo_1024 & pack order |
| **Rider** | Aman Kumar | Honda Activa (DL-04-AB-1294) | Accept broadcast & deliver to doorstep |
| **Compliance** | Dr. Aditi Roy | MEDiT Clinical Governance | Monitor audit log & zero-AI-approval policy |

---

## 🛠️ Technology Stack

- **Framework**: React 19 + Vite 8
- **Icons**: Lucide React
- **Design System**: Vanilla CSS Design Tokens (Clinical Emerald, Deep Slate, Medical Cyan, Glassmorphism, Micro-animations)
- **Effects**: Canvas Confetti
- **State Management**: Reactive React Context with localStorage persistence and 1-click state reset.

---

## 🏃 Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build
```

Dev server default URL: `http://localhost:5173/`
