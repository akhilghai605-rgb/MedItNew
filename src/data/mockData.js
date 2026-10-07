// MEDiT Mock Database & State Seed

export const SAMPLE_PRESCRIPTION_IMAGE = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000" style="background:#ffffff; font-family:'Helvetica Neue', Arial, sans-serif;">
  <!-- Border & Background -->
  <rect width="800" height="1000" fill="#ffffff"/>
  <rect x="25" y="25" width="750" height="950" rx="8" fill="none" stroke="#e2e8f0" stroke-width="2"/>
  
  <!-- Hospital Header -->
  <rect x="25" y="25" width="750" height="150" fill="#f0fdf4" rx="8"/>
  <circle cx="95" cy="100" r="45" fill="#10b981"/>
  <path d="M95 75 v50 M70 100 h50" stroke="#ffffff" stroke-width="8" stroke-linecap="round"/>
  
  <text x="165" y="80" font-size="28" font-weight="bold" fill="#065f46">MAX HEALTHCARE CLINIC</text>
  <text x="165" y="105" font-size="16" font-weight="600" fill="#047857">Department of Internal &amp; Pulmonary Medicine</text>
  <text x="165" y="128" font-size="13" fill="#64748b">Sector 12, Green Park, New Delhi - 110016 | Ph: +91 11 4982 3000</text>
  <text x="165" y="148" font-size="12" fill="#94a3b8">Govt. Regd: DL-HOSP-2018/4820</text>
  
  <line x1="25" y1="175" x2="775" y2="175" stroke="#10b981" stroke-width="3"/>

  <!-- Doctor & Patient Meta -->
  <g fill="#1e293b" font-size="14">
    <text x="55" y="215" font-weight="bold" font-size="17" fill="#0f172a">Dr. Rajesh Gupta, M.D., F.I.C.P.</text>
    <text x="55" y="235" font-size="13" fill="#475569">Senior Consultant Physician | Reg. No: MCI-49281 / DMC-2009</text>
    <text x="55" y="253" font-size="12" fill="#64748b">Consultation Hours: 10:00 AM - 02:00 PM, 06:00 PM - 08:30 PM</text>

    <!-- Date Box -->
    <rect x="580" y="195" width="165" height="65" rx="6" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1"/>
    <text x="595" y="220" font-size="12" fill="#64748b">Date: <tspan font-weight="bold" fill="#0f172a">Today</tspan></text>
    <text x="595" y="244" font-size="12" fill="#64748b">OPD No: <tspan font-weight="bold" fill="#0f172a">OPD-88421</tspan></text>
  </g>

  <!-- Patient Details Box -->
  <rect x="50" y="275" width="700" height="75" rx="6" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
  <text x="75" y="305" font-size="14" fill="#64748b">Patient Name: <tspan font-weight="bold" fill="#0f172a">Rahul Sharma</tspan></text>
  <text x="350" y="305" font-size="14" fill="#64748b">Age / Gender: <tspan font-weight="bold" fill="#0f172a">32 Y / Male</tspan></text>
  <text x="580" y="305" font-size="14" fill="#64748b">Weight: <tspan font-weight="bold" fill="#0f172a">74 kg</tspan></text>
  <text x="75" y="333" font-size="13" fill="#64748b">Diagnosis: <tspan font-weight="600" fill="#0f172a">Acute Upper Respiratory Infection &amp; Moderate Pyrexia (101.4°F)</tspan></text>

  <!-- Rx symbol -->
  <text x="55" y="395" font-size="44" font-weight="bold" fill="#059669" font-style="italic">℞</text>
  <line x1="110" y1="385" x2="745" y2="385" stroke="#e2e8f0" stroke-dasharray="4 4" stroke-width="1.5"/>

  <!-- Medicines list -->
  <g transform="translate(65, 415)">
    <!-- Med 1 -->
    <circle cx="10" cy="15" r="4" fill="#10b981"/>
    <text x="25" y="19" font-size="16" font-weight="bold" fill="#0f172a">1. Tab. Augmentin 625mg (Amoxicillin + Clavulanic Acid)</text>
    <text x="45" y="42" font-size="14" fill="#334155">Sig: 1 Tablet twice daily (1-0-1) after meals for 5 days</text>
    <text x="45" y="62" font-size="12" fill="#64748b">Note: Complete full course. Do not skip doses.</text>

    <!-- Med 2 -->
    <circle cx="10" cy="95" r="4" fill="#10b981"/>
    <text x="25" y="99" font-size="16" font-weight="bold" fill="#0f172a">2. Tab. Paracetamol 500mg (Dolo / Calpol)</text>
    <text x="45" y="122" font-size="14" fill="#334155">Sig: 1 Tablet thrice daily (1-1-1) or SOS for fever &gt; 100°F</text>
    <text x="45" y="142" font-size="12" fill="#64748b">Note: Maintain min 6 hrs gap between doses. Max 3g / day.</text>

    <!-- Med 3 -->
    <circle cx="10" cy="175" r="4" fill="#10b981"/>
    <text x="25" y="179" font-size="16" font-weight="bold" fill="#0f172a">3. Cap. Pantoprazole 40mg (Pan 40)</text>
    <text x="45" y="202" font-size="14" fill="#334155">Sig: 1 Capsule once daily (1-0-0) empty stomach, 30 min before breakfast x 5 days</text>
    
    <!-- Med 4 -->
    <circle cx="10" cy="245" r="4" fill="#10b981"/>
    <text x="25" y="249" font-size="16" font-weight="bold" fill="#0f172a">4. Tab. Cetirizine 10mg (Cetzine)</text>
    <text x="45" y="272" font-size="14" fill="#334155">Sig: 1 Tablet at bedtime (0-0-1) for 3 days if allergic rhinitis persists</text>
  </g>

  <!-- Special Clinical Notes -->
  <rect x="50" y="740" width="700" height="85" rx="6" fill="#fffbeb" stroke="#fef3c7" stroke-width="1.5"/>
  <text x="70" y="765" font-size="13" font-weight="bold" fill="#b45309">Advice &amp; Precautions:</text>
  <text x="70" y="788" font-size="13" fill="#78350f">• Warm saline gargles thrice daily. Steam inhalation twice daily.</text>
  <text x="70" y="808" font-size="13" fill="#78350f">• Hydrate adequately (3+ Litres of fluids). Review OPD in 5 days if fever persists.</text>

  <!-- Doctor Signature & Stamp Area -->
  <g transform="translate(520, 845)">
    <!-- Signature Curve -->
    <path d="M20 40 Q45 5 70 35 T120 20 T170 30 T200 15" fill="none" stroke="#1e3a8a" stroke-width="2.5" stroke-linecap="round"/>
    <!-- Stamp Box -->
    <rect x="10" y="55" width="200" height="60" rx="4" fill="none" stroke="#2563eb" stroke-dasharray="3 3" stroke-width="1.5"/>
    <text x="25" y="75" font-size="12" font-weight="bold" fill="#1d4ed8">Dr. Rajesh Gupta, M.D.</text>
    <text x="25" y="92" font-size="11" fill="#2563eb">Reg. No: MCI-49281</text>
    <text x="25" y="106" font-size="10" fill="#3b82f6">Max Hospital, New Delhi</text>
  </g>
  
  <text x="50" y="930" font-size="12" fill="#94a3b8">Valid for 30 days from issue date. Substitute with bioequivalent generics permitted under DPCO regulations.</text>
  <text x="50" y="950" font-size="11" font-weight="bold" fill="#059669">MEDiT Verification Ref: SEC-RX-DL-2026-9024</text>
</svg>
`)}`;

export const INITIAL_USERS = {
  customer: {
    id: 'cust_1',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+91 98765 43210',
    role: 'customer',
    address: 'Flat 402, Palm Heights, Green Park Main, New Delhi 110016',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
  },
  pharmacist: {
    id: 'pharm_1',
    name: 'Dr. Priyesh Sharma',
    licenseNo: 'PH-88231 / DL-2017',
    qualification: 'B.Pharm, Pharm.D Licensed Pharmacist',
    role: 'pharmacist',
    pharmacyName: 'Sharma Medical Store',
    pharmacyId: 'pharma_1',
    phone: '+91 98111 88442',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=120&q=80',
  },
  rider: {
    id: 'rider_1',
    name: 'Aman Kumar',
    phone: '+91 98112 23344',
    role: 'rider',
    vehicle: 'Honda Activa (DL-04-AB-1294)',
    rating: 4.8,
    completedDeliveries: 428,
    todayEarnings: 620,
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
  },
  admin: {
    id: 'admin_1',
    name: 'Dr. Aditi Roy',
    role: 'admin',
    department: 'Healthcare Compliance & Operations',
    email: 'compliance@medit.health',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
  }
};

export const INITIAL_PHARMACIES = [
  {
    id: 'pharma_1',
    name: 'Sharma Medical Store',
    pharmacistName: 'Dr. Priyesh Sharma (Reg #PH-88231)',
    address: 'Shop 14, Main Market, Green Park, New Delhi',
    distanceKm: 1.2,
    rating: 4.9,
    reviewsCount: 312,
    avgPrepTime: '12-15 mins',
    license: 'DL-PH-2022-991',
    isOpen: true,
    badges: ['Licensed Pharmacist On-site', 'Fast Dispatch', 'Cold Chain Certified']
  },
  {
    id: 'pharma_2',
    name: 'ApolloCare Chemist',
    pharmacistName: 'Dr. Meena Iyer (Reg #PH-77192)',
    address: 'Block C, Hauz Khas Enclave, New Delhi',
    distanceKm: 2.5,
    rating: 4.7,
    reviewsCount: 198,
    avgPrepTime: '15-20 mins',
    license: 'DL-PH-2020-412',
    isOpen: true,
    badges: ['24/7 Support', 'Verified Inventory']
  },
  {
    id: 'pharma_3',
    name: 'Sanjivani 24/7 Medicos',
    pharmacistName: 'Dr. Vikas Oberoi (Reg #PH-61405)',
    address: 'NDSE Part 1, South Extension, New Delhi',
    distanceKm: 3.8,
    rating: 4.8,
    reviewsCount: 440,
    avgPrepTime: '18-25 mins',
    license: 'DL-PH-2019-108',
    isOpen: true,
    badges: ['24/7 Open', 'Express Rider Bay']
  }
];

export const INITIAL_MEDICINES = [
  {
    id: 'med_1',
    name: 'Paracetamol 500mg',
    brand: 'Dolo 500 / Calpol',
    manufacturer: 'Micro Labs Ltd.',
    strength: '500mg Tablet',
    category: 'Pain & Fever Relief',
    price: 25,
    mrp: 32,
    stock: 42,
    prescriptionRequired: false,
    pharmacyId: 'pharma_1',
    pharmacyName: 'Sharma Medical Store',
    distanceKm: 1.2,
    dosageForm: 'Tablets (Strip of 15)',
    description: 'Effective analgesic and antipyretic for relieving mild to moderate pain and fever.',
    composition: 'Paracetamol IP 500mg'
  },
  {
    id: 'med_2',
    name: 'Azithromycin 500mg',
    brand: 'Azee 500',
    manufacturer: 'Cipla Pharmaceuticals',
    strength: '500mg Tablet',
    category: 'Antibiotics',
    price: 120,
    mrp: 145,
    stock: 8, // Low Stock item for pharmacist dashboard demonstration
    prescriptionRequired: true,
    pharmacyId: 'pharma_1',
    pharmacyName: 'Sharma Medical Store',
    distanceKm: 1.2,
    dosageForm: 'Tablets (Strip of 3)',
    description: 'Macrolide antibiotic used for respiratory tract, ear, and throat infections.',
    composition: 'Azithromycin Dihydrate IP 500mg'
  },
  {
    id: 'med_3',
    name: 'Amoxicillin & Potassium Clavulanate 625mg',
    brand: 'Augmentin 625 Duo',
    manufacturer: 'GlaxoSmithKline (GSK)',
    strength: '625mg Tablet',
    category: 'Antibiotics',
    price: 185,
    mrp: 220,
    stock: 28,
    prescriptionRequired: true,
    pharmacyId: 'pharma_1',
    pharmacyName: 'Sharma Medical Store',
    distanceKm: 1.2,
    dosageForm: 'Tablets (Strip of 10)',
    description: 'Broad-spectrum penicillin antibiotic with beta-lactamase inhibitor for bacterial infections.',
    composition: 'Amoxicillin Trihydrate 500mg + Potassium Clavulanate 125mg'
  },
  {
    id: 'med_4',
    name: 'Pantoprazole Gastro-Resistant 40mg',
    brand: 'Pan 40',
    manufacturer: 'Alkem Laboratories',
    strength: '40mg Tablet',
    category: 'Gastrointestinal',
    price: 65,
    mrp: 82,
    stock: 50,
    prescriptionRequired: false,
    pharmacyId: 'pharma_1',
    pharmacyName: 'Sharma Medical Store',
    distanceKm: 1.2,
    dosageForm: 'Tablets (Strip of 10)',
    description: 'Proton pump inhibitor that reduces stomach acid production, treating GERD and acidity.',
    composition: 'Pantoprazole Sodium IP 40mg'
  },
  {
    id: 'med_5',
    name: 'Metformin Hydrochloride 500mg',
    brand: 'Glycomet 500 SR',
    manufacturer: 'USV Pvt Ltd.',
    strength: '500mg Sustained Release',
    category: 'Diabetes Care',
    price: 45,
    mrp: 55,
    stock: 64,
    prescriptionRequired: true,
    pharmacyId: 'pharma_1',
    pharmacyName: 'Sharma Medical Store',
    distanceKm: 1.2,
    dosageForm: 'Tablets (Strip of 20)',
    description: 'First-line medication for the treatment of type 2 diabetes mellitus.',
    composition: 'Metformin Hydrochloride IP 500mg'
  },
  {
    id: 'med_6',
    name: 'Telmisartan 40mg',
    brand: 'Telma 40',
    manufacturer: 'Glenmark Pharmaceuticals',
    strength: '40mg Tablet',
    category: 'Cardiac & Blood Pressure',
    price: 78,
    mrp: 98,
    stock: 35,
    prescriptionRequired: true,
    pharmacyId: 'pharma_1',
    pharmacyName: 'Sharma Medical Store',
    distanceKm: 1.2,
    dosageForm: 'Tablets (Strip of 15)',
    description: 'Angiotensin II receptor blocker used in the management of hypertension.',
    composition: 'Telmisartan IP 40mg'
  },
  {
    id: 'med_7',
    name: 'Cetirizine Hydrochloride 10mg',
    brand: 'Cetzine 10',
    manufacturer: 'Dr. Reddy\'s Laboratories',
    strength: '10mg Tablet',
    category: 'Allergy & Cold',
    price: 18,
    mrp: 24,
    stock: 85,
    prescriptionRequired: false,
    pharmacyId: 'pharma_1',
    pharmacyName: 'Sharma Medical Store',
    distanceKm: 1.2,
    dosageForm: 'Tablets (Strip of 10)',
    description: 'Second-generation antihistamine used to relieve allergy symptoms and runny nose.',
    composition: 'Cetirizine Dihydrochloride IP 10mg'
  },
  {
    id: 'med_8',
    name: 'ORS Electrolyte Powder 21.8g',
    brand: 'Electral Sachet',
    manufacturer: 'FDC Limited',
    strength: '21.8g Powder for 1L',
    category: 'First Aid & Hydration',
    price: 22,
    mrp: 26,
    stock: 120,
    prescriptionRequired: false,
    pharmacyId: 'pharma_1',
    pharmacyName: 'Sharma Medical Store',
    distanceKm: 1.2,
    dosageForm: 'Sachet 21.8g',
    description: 'WHO-recommended oral rehydration salts formula to restore electrolyte balance.',
    composition: 'Sodium Chloride, Potassium Chloride, Sodium Citrate, Dextrose'
  },
  {
    id: 'med_9',
    name: 'Montelukast Sodium & Levocetirizine',
    brand: 'Montair LC',
    manufacturer: 'Cipla Pharmaceuticals',
    strength: '10mg / 5mg Tablet',
    category: 'Respiratory Care',
    price: 160,
    mrp: 198,
    stock: 22,
    prescriptionRequired: true,
    pharmacyId: 'pharma_1',
    pharmacyName: 'Sharma Medical Store',
    distanceKm: 1.2,
    dosageForm: 'Tablets (Strip of 10)',
    description: 'Dual-action medication for allergic rhinitis, chronic asthma, and bronchial symptoms.',
    composition: 'Montelukast 10mg + Levocetirizine Dihydrochloride 5mg'
  },
  {
    id: 'med_10',
    name: 'Vitamin C 500mg + Zinc Chewable',
    brand: 'Limcee Plus',
    manufacturer: 'Abbott Healthcare',
    strength: '500mg Chewable',
    category: 'Vitamins & Supplements',
    price: 35,
    mrp: 45,
    stock: 92,
    prescriptionRequired: false,
    pharmacyId: 'pharma_1',
    pharmacyName: 'Sharma Medical Store',
    distanceKm: 1.2,
    dosageForm: 'Chewable Tablets (Strip of 15)',
    description: 'Immunity booster dietary supplement rich in Ascorbic Acid and Zinc.',
    composition: 'Ascorbic Acid IP 500mg + Zinc Citrate 5mg'
  },
  {
    id: 'med_11',
    name: 'Atorvastatin 10mg',
    brand: 'Atorva 10',
    manufacturer: 'Zydus Cadila',
    strength: '10mg Tablet',
    category: 'Cardiac Care',
    price: 110,
    mrp: 135,
    stock: 0, // Out of stock example for demonstration
    prescriptionRequired: true,
    pharmacyId: 'pharma_1',
    pharmacyName: 'Sharma Medical Store',
    distanceKm: 1.2,
    dosageForm: 'Tablets (Strip of 15)',
    description: 'Lipid-lowering statin used to prevent cardiovascular disease in high-risk patients.',
    composition: 'Atorvastatin Calcium IP 10mg'
  }
];

export const INITIAL_PRESCRIPTIONS = [
  {
    id: 'rx_demo_1024',
    customerId: 'cust_1',
    customerName: 'Rahul Sharma',
    customerPhone: '+91 98765 43210',
    orderId: 'MED1024',
    doctorName: 'Dr. Rajesh Gupta, M.D.',
    doctorRegNo: 'MCI-49281',
    hospitalName: 'Max Healthcare Clinic, Green Park',
    issueDate: '2026-10-07',
    uploadedAt: '10 mins ago',
    fileUrl: SAMPLE_PRESCRIPTION_IMAGE,
    fileName: 'prescription_dr_gupta_rahul.svg',
    fileType: 'image/svg+xml',
    // AI structured extraction (Simulated AI Assistant)
    aiAnalysis: {
      status: 'completed',
      scannedAt: '10 mins ago',
      confidenceScore: 94,
      imageClarity: 'Good / High Contrast',
      doctorDetected: 'Dr. Rajesh Gupta, M.D. (MCI-49281)',
      patientDetected: 'Rahul Sharma (32Y / M)',
      extractedMedicines: [
        {
          name: 'Augmentin 625mg',
          matchedDrug: 'Amoxicillin & Potassium Clavulanate 625mg',
          dosage: '1 tab twice daily x 5 days',
          status: 'Valid Dosage'
        },
        {
          name: 'Paracetamol 500mg',
          matchedDrug: 'Paracetamol 500mg',
          dosage: '1 tab thrice daily or SOS',
          status: 'Valid Dosage'
        },
        {
          name: 'Pantoprazole 40mg',
          matchedDrug: 'Pantoprazole Gastro-Resistant 40mg',
          dosage: '1 cap once daily before food x 5 days',
          status: 'Valid Dosage'
        }
      ],
      potentialIssues: [
        'Doctor registration MCI-49281 detected on document.',
        'Handwritten instruction on duration requires clinical verification.',
        'No dangerous drug-drug contraindications detected in extracted items.'
      ],
      safetyNotice: 'AI-assisted analysis — Final verification must be performed by a licensed pharmacist.'
    },
    // Pharmacist decision state
    pharmacistStatus: 'Pending Pharmacist Verification', // 'Pending Pharmacist Verification' | 'Approved' | 'Rejected' | 'Clarification Requested'
    pharmacistId: null,
    pharmacistName: null,
    pharmacistNotes: '',
    verifiedAt: null
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'MED1024',
    customerId: 'cust_1',
    customerName: 'Rahul Sharma',
    customerPhone: '+91 98765 43210',
    deliveryAddress: 'Flat 402, Palm Heights, Green Park Main, New Delhi 110016',
    pharmacyId: 'pharma_1',
    pharmacyName: 'Sharma Medical Store',
    pharmacyAddress: 'Shop 14, Main Market, Green Park',
    riderId: 'rider_1',
    riderName: 'Aman Kumar',
    riderPhone: '+91 98112 23344',
    prescriptionId: 'rx_demo_1024',
    prescriptionRequired: true,
    // Status flow:
    // 'Prescription Pending' -> 'Prescription Approved' -> 'Preparing' -> 'Ready for Pickup' -> 'Picked Up' -> 'Out for Delivery' -> 'Delivered'
    status: 'Prescription Pending',
    items: [
      {
        id: 'med_1',
        name: 'Paracetamol 500mg',
        strength: '500mg Tablet',
        price: 25,
        quantity: 2,
        prescriptionRequired: false
      },
      {
        id: 'med_3',
        name: 'Amoxicillin & Potassium Clavulanate 625mg',
        strength: '625mg Tablet',
        price: 185,
        quantity: 1,
        prescriptionRequired: true
      }
    ],
    itemSubtotal: 235,
    deliveryFee: 30,
    packagingFee: 15,
    totalAmount: 280,
    paymentMethod: 'UPI / Digital Payment (Verified)',
    createdAt: '12 mins ago',
    timeline: [
      { time: '12 mins ago', title: 'Order Placed by Customer', detail: 'Items selected from Sharma Medical Store. Prescription attached.' },
      { time: '10 mins ago', title: 'AI Assistant Pre-Screening', detail: 'Prescription scanned. Structured data prepared for pharmacist review.' }
    ]
  }
];

export const INITIAL_RIDER_STATS = {
  rating: 4.8,
  todayEarnings: 620,
  deliveriesToday: 14,
  onlineHours: '6.2 hrs',
  acceptanceRate: '98%',
  trips: [
    { id: 'TRP-101', orderId: 'MED1019', pickup: 'ApolloCare Chemist', drop: 'Hauz Khas Enclave', payout: 48, time: '1 hr ago', rating: 5 },
    { id: 'TRP-102', orderId: 'MED1021', pickup: 'Sharma Medical Store', drop: 'Safdarjung Enclave', payout: 52, time: '2 hrs ago', rating: 5 },
    { id: 'TRP-103', orderId: 'MED1022', pickup: 'Sanjivani Medicos', drop: 'South Extension 1', payout: 45, time: '3.5 hrs ago', rating: 4.5 },
  ]
};

export const INITIAL_PHARMACY_METRICS = {
  todayOrders: 24,
  todayRevenue: 8450,
  pendingPrescriptions: 1,
  lowStockItems: 2,
  completedOrders: 19,
  weeklyRevenue: 54200,
  monthlyRevenue: 184500,
  avgOrderValue: 412
};

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif_1',
    title: 'Prescription Requires Verification',
    message: 'Order #MED1024 (Rahul Sharma) uploaded Augmentin 625mg Rx. Licensed review pending.',
    time: '8m ago',
    timestamp: Date.now() - 480000,
    type: 'prescription',
    read: false,
    role: 'pharmacist',
    actionRole: 'pharmacist',
    actionTab: 'verify_rx',
    targetId: 'rx_demo_1024'
  },
  {
    id: 'notif_2',
    title: 'Order Placed & Awaiting Verification',
    message: 'Your order #MED1024 was received by Sharma Medical Store. Licensed pharmacist review is underway.',
    time: '12m ago',
    timestamp: Date.now() - 720000,
    type: 'order',
    read: false,
    role: 'customer',
    actionRole: 'customer',
    actionTab: 'orders',
    targetId: 'MED1024'
  },
  {
    id: 'notif_3',
    title: 'Low Stock Alert: Cetirizine 10mg',
    message: 'Sharma Medical Store inventory: Cetirizine is down to 8 units. Automated reorder suggested.',
    time: '35m ago',
    timestamp: Date.now() - 2100000,
    type: 'inventory',
    read: false,
    role: 'pharmacist',
    actionRole: 'pharmacist',
    actionTab: 'inventory'
  },
  {
    id: 'notif_4',
    title: 'New Delivery Bonus Active',
    message: 'Peak hour in Green Park / Safdarjung: +₹15 surge per urgent delivery order.',
    time: '45m ago',
    timestamp: Date.now() - 2700000,
    type: 'delivery',
    read: true,
    role: 'rider',
    actionRole: 'rider',
    actionTab: 'available'
  },
  {
    id: 'notif_5',
    title: 'Clinical Safety Audit Passed',
    message: 'Zero AI auto-dispenses recorded today. 100% human-in-the-loop compliance across all partner pharmacies.',
    time: '2h ago',
    timestamp: Date.now() - 7200000,
    type: 'system',
    read: true,
    role: 'admin',
    actionRole: 'admin',
    actionTab: 'overview'
  }
];

