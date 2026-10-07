import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_USERS,
  INITIAL_PHARMACIES,
  INITIAL_MEDICINES,
  INITIAL_PRESCRIPTIONS,
  INITIAL_ORDERS,
  INITIAL_RIDER_STATS,
  INITIAL_PHARMACY_METRICS,
  SAMPLE_PRESCRIPTION_IMAGE,
  INITIAL_NOTIFICATIONS
} from '../data/mockData';

const AppContext = createContext();

const STORAGE_KEY = 'medit_state_v1';

// URL Route Parser & Path Builder for HTML5 Browser History
export function parsePath(pathname) {
  if (!pathname) return { role: 'landing', tab: 'home' };
  const clean = pathname.toLowerCase().replace(/\/+$/, '') || '/';
  
  if (clean === '/' || clean === '/home' || clean === '/landing') {
    return { role: 'landing', tab: 'home' };
  }
  
  if (clean.startsWith('/customer')) {
    const parts = clean.split('/').filter(Boolean);
    const sub = parts[1];
    let tab = 'home';
    if (sub === 'medicines') tab = 'medicines';
    else if (sub === 'cart') tab = 'cart';
    else if (sub === 'checkout') tab = 'checkout';
    else if (sub === 'upload-prescription' || sub === 'upload_rx' || sub === 'prescriptions') tab = 'upload_rx';
    else if (sub === 'orders' || sub === 'order-status') tab = 'orders';
    else if (sub === 'profile') tab = 'profile';
    return { role: 'customer', tab };
  }

  if (clean.startsWith('/rider')) {
    const parts = clean.split('/').filter(Boolean);
    const sub = parts[1];
    let tab = 'available';
    if (sub === 'active') tab = 'active';
    else if (sub === 'earnings') tab = 'earnings';
    return { role: 'rider', tab };
  }

  if (clean.startsWith('/pharmacy') || clean.startsWith('/pharmacist')) {
    const parts = clean.split('/').filter(Boolean);
    const sub = parts[1];
    let tab = 'verify_rx';
    if (sub === 'orders') tab = 'orders';
    else if (sub === 'inventory') tab = 'inventory';
    else if (sub === 'earnings') tab = 'earnings';
    return { role: 'pharmacist', tab };
  }

  if (clean.startsWith('/admin')) {
    return { role: 'admin', tab: 'overview' };
  }

  return { role: 'landing', tab: 'home' };
}

export function buildPath(role, tab) {
  if (!role || role === 'landing') return '/';
  if (role === 'customer') {
    if (!tab || tab === 'home') return '/customer';
    if (tab === 'medicines') return '/customer/medicines';
    if (tab === 'cart') return '/customer/cart';
    if (tab === 'checkout') return '/customer/checkout';
    if (tab === 'upload_rx') return '/customer/prescriptions';
    if (tab === 'orders') return '/customer/orders';
    if (tab === 'profile') return '/customer/profile';
    return '/customer';
  }
  if (role === 'rider') {
    if (!tab || tab === 'available') return '/rider';
    if (tab === 'active') return '/rider/active';
    if (tab === 'earnings') return '/rider/earnings';
    return '/rider';
  }
  if (role === 'pharmacist') {
    if (!tab || tab === 'verify_rx') return '/pharmacy';
    if (tab === 'orders') return '/pharmacy/orders';
    if (tab === 'inventory') return '/pharmacy/inventory';
    if (tab === 'earnings') return '/pharmacy/earnings';
    return '/pharmacy';
  }
  if (role === 'admin') return '/admin';
  return '/';
}

// Gentle 2-tone clinical chime synthesizer via Web Audio API
export function playNotificationSound() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    const now = ctx.currentTime;
    
    // Tone 1: D5 (587.33 Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, now);
    gain1.gain.setValueAtTime(0.12, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.3);

    // Tone 2: A5 (880 Hz)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880, now + 0.12);
    gain2.gain.setValueAtTime(0.14, now + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.12);
    osc2.stop(now + 0.5);
  } catch (e) {
    // Audio playback fails silently if user hasn't interacted
  }
}

export function triggerDesktopNotification(title, message) {
  if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
    try {
      new Notification(title, {
        body: message,
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2310b981"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 15h-2v-6h2zm0-8h-2V7h2z"/></svg>'
      });
    } catch (e) {
      // Ignored
    }
  }
}

export function AppProvider({ children }) {
  // Persistence / localStorage restoration
  const loadSavedState = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not load from localStorage:', e);
    }
    return null;
  };

  const saved = loadSavedState();

  // Initialize from current URL pathname (or fallback to saved)
  const initialRoute = typeof window !== 'undefined' ? parsePath(window.location.pathname) : { role: 'landing', tab: 'home' };
  const initialRole = typeof window !== 'undefined' && window.location.pathname === '/' ? 'landing' : (initialRoute.role || saved?.activeRole || 'landing');

  const [activeRole, setActiveRoleState] = useState(initialRole);
  const [customerTab, setCustomerTabState] = useState(initialRoute.role === 'customer' ? initialRoute.tab : (saved?.customerTab || 'home'));
  const [pharmacyTab, setPharmacyTabState] = useState(initialRoute.role === 'pharmacist' ? initialRoute.tab : (saved?.pharmacyTab || 'verify_rx'));
  const [riderTab, setRiderTabState] = useState(initialRoute.role === 'rider' ? initialRoute.tab : (saved?.riderTab || 'available'));

  // Universal Navigation Engine (Syncs with HTML5 Browser History)
  const navigate = (path, replace = false) => {
    const { role, tab } = parsePath(path);
    if (typeof window !== 'undefined') {
      if (replace) {
        window.history.replaceState({ path }, '', path);
      } else if (window.location.pathname !== path) {
        window.history.pushState({ path }, '', path);
      }
    }
    setActiveRoleState(role);
    if (role === 'customer') setCustomerTabState(tab);
    if (role === 'pharmacist') setPharmacyTabState(tab);
    if (role === 'rider') setRiderTabState(tab);
  };

  const goToLanding = () => {
    navigate('/');
  };

  const setActiveRole = (role) => {
    let targetTab = 'home';
    if (role === 'customer') targetTab = customerTab || 'home';
    if (role === 'pharmacist') targetTab = pharmacyTab || 'verify_rx';
    if (role === 'rider') targetTab = riderTab || 'available';
    const path = buildPath(role, targetTab);
    navigate(path);
  };

  const setCustomerTab = (tab) => {
    const path = buildPath('customer', tab);
    navigate(path);
  };

  const setPharmacyTab = (tab) => {
    const path = buildPath('pharmacist', tab);
    navigate(path);
  };

  const setRiderTab = (tab) => {
    const path = buildPath('rider', tab);
    navigate(path);
  };

  // Popstate listener: Handles native browser Back / Forward buttons without exiting
  useEffect(() => {
    const handlePopState = () => {
      const currentPath = window.location.pathname;
      const { role, tab } = parsePath(currentPath);
      setActiveRoleState(role);
      if (role === 'customer') setCustomerTabState(tab);
      if (role === 'pharmacist') setPharmacyTabState(tab);
      if (role === 'rider') setRiderTabState(tab);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const [medicines, setMedicines] = useState(saved?.medicines || INITIAL_MEDICINES);
  const [pharmacies] = useState(INITIAL_PHARMACIES);
  const [orders, setOrders] = useState(saved?.orders || INITIAL_ORDERS);
  const [prescriptions, setPrescriptions] = useState(saved?.prescriptions || INITIAL_PRESCRIPTIONS);
  const [cart, setCart] = useState(saved?.cart || [
    {
      medicineId: 'med_1',
      quantity: 2,
      medicine: INITIAL_MEDICINES.find(m => m.id === 'med_1')
    },
    {
      medicineId: 'med_3',
      quantity: 1,
      medicine: INITIAL_MEDICINES.find(m => m.id === 'med_3')
    }
  ]);
  const [selectedPharmacyId, setSelectedPharmacyId] = useState('pharma_1');
  const [riderStats, setRiderStats] = useState(saved?.riderStats || INITIAL_RIDER_STATS);
  const [pharmacyMetrics, setPharmacyMetrics] = useState(saved?.pharmacyMetrics || INITIAL_PHARMACY_METRICS);

  const [activeTrackingOrderId, setActiveTrackingOrderId] = useState('MED1024');
  const [selectedVerificationRxId, setSelectedVerificationRxId] = useState('rx_demo_1024');
  const [toasts, setToasts] = useState([]);
  const [demoGuideStep, setDemoGuideStep] = useState(1);
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  // Real-time Notifications & Audio Chime state
  const [notifications, setNotifications] = useState(saved?.notifications || INITIAL_NOTIFICATIONS);
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(saved?.soundEnabled !== undefined ? saved.soundEnabled : true);

  // Sync to localStorage
  useEffect(() => {
    try {
      const stateToSave = {
        activeRole,
        medicines,
        orders,
        prescriptions,
        cart,
        riderStats,
        pharmacyMetrics,
        notifications,
        soundEnabled
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }
  }, [activeRole, medicines, orders, prescriptions, cart, riderStats, pharmacyMetrics, notifications, soundEnabled]);

  // Toast notification system
  const addToast = (title, message, type = 'info', duration = 4500) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Notification Management Engine
  const requestDesktopPermission = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const perm = await Notification.requestPermission();
        if (perm === 'granted') {
          addToast('Desktop Alerts Enabled', 'You will receive real-time notifications even when switched away.', 'success');
        } else {
          addToast('Alerts Not Enabled', `Permission was ${perm}.`, 'warning');
        }
        return perm;
      } catch (e) {
        console.warn('Error requesting notification permission:', e);
      }
    } else {
      addToast('Not Supported', 'Desktop notifications are not supported in this browser.', 'warning');
    }
    return 'denied';
  };

  const addNotification = ({
    title,
    message,
    type = 'order',
    role = 'all',
    actionRole,
    actionTab,
    targetId
  }) => {
    const id = 'notif_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
    const newNotif = {
      id,
      title,
      message,
      time: 'Just now',
      timestamp: Date.now(),
      type, // 'prescription' | 'order' | 'delivery' | 'inventory' | 'system'
      read: false,
      role, // 'all' | 'customer' | 'pharmacist' | 'rider' | 'admin'
      actionRole,
      actionTab,
      targetId
    };

    setNotifications(prev => [newNotif, ...prev]);

    // Synchronized toast
    const toastType = (type === 'prescription' || type === 'system') ? 'info' : (type === 'inventory' ? 'warning' : 'success');
    addToast(title, message, toastType);

    // Play chime if sound enabled
    if (soundEnabled) {
      playNotificationSound();
    }

    // Native desktop alert
    triggerDesktopNotification(title, message);

    return newNotif;
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    addToast('Marked as Read', 'All notifications marked as read.', 'info');
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    addToast('Notifications Cleared', 'All notification history cleared.', 'info');
  };

  const handleNotificationClick = (notif) => {
    markNotificationAsRead(notif.id);
    setNotificationPanelOpen(false);

    if (notif.actionRole) {
      setActiveRole(notif.actionRole);
      if (notif.actionTab) {
        if (notif.actionRole === 'customer') setCustomerTab(notif.actionTab);
        if (notif.actionRole === 'pharmacist') setPharmacyTab(notif.actionTab);
        if (notif.actionRole === 'rider') setRiderTab(notif.actionTab);
      }
      if (notif.targetId) {
        if (notif.actionRole === 'customer' && notif.targetId.startsWith('MED')) {
          setActiveTrackingOrderId(notif.targetId);
        }
        if (notif.actionRole === 'pharmacist' && notif.targetId.startsWith('rx')) {
          setSelectedVerificationRxId(notif.targetId);
        }
      }
    }
  };

  const simulateNotification = (scenario) => {
    if (scenario === 'prescription') {
      addNotification({
        title: 'New Rx Uploaded: Dr. Mehta Clinic',
        message: 'Patient Amit Verma uploaded Rx for Azithromycin 500mg. Licensed pharmacist verification needed.',
        type: 'prescription',
        role: 'pharmacist',
        actionRole: 'pharmacist',
        actionTab: 'verify_rx',
        targetId: 'rx_demo_1024'
      });
    } else if (scenario === 'order') {
      addNotification({
        title: 'Order #MED1024 Update: Out for Delivery',
        message: 'Rider Aman Kumar is nearby with temperature-controlled medical pack. ETA ~8 mins.',
        type: 'delivery',
        role: 'customer',
        actionRole: 'customer',
        actionTab: 'orders',
        targetId: 'MED1024'
      });
    } else if (scenario === 'rider') {
      addNotification({
        title: '⚡ Urgent Delivery Request: ₹55 Payout',
        message: 'Sharma Medical Store -> Flat 102, Green Park. Paracetamol & ORS packet ready in dispatch bay.',
        type: 'delivery',
        role: 'rider',
        actionRole: 'rider',
        actionTab: 'available'
      });
    } else if (scenario === 'inventory') {
      addNotification({
        title: '⚠️ Low Stock Alert: Amoxicillin 625mg',
        message: 'Only 3 strips remaining in inventory. Threshold trigger: 10 strips.',
        type: 'inventory',
        role: 'pharmacist',
        actionRole: 'pharmacist',
        actionTab: 'inventory'
      });
    } else {
      addNotification({
        title: '🛡️ Clinical Compliance Logged',
        message: 'Pharmacist verification completed with MCI registry check. Order flagged 100% compliant.',
        type: 'system',
        role: 'admin',
        actionRole: 'admin',
        actionTab: 'overview'
      });
    }
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  // Reset demo state
  const resetDemoData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setMedicines(INITIAL_MEDICINES);
    setOrders(INITIAL_ORDERS);
    setPrescriptions(INITIAL_PRESCRIPTIONS);
    setCart([
      {
        medicineId: 'med_1',
        quantity: 2,
        medicine: INITIAL_MEDICINES.find(m => m.id === 'med_1')
      },
      {
        medicineId: 'med_3',
        quantity: 1,
        medicine: INITIAL_MEDICINES.find(m => m.id === 'med_3')
      }
    ]);
    setSelectedPharmacyId('pharma_1');
    setRiderStats(INITIAL_RIDER_STATS);
    setPharmacyMetrics(INITIAL_PHARMACY_METRICS);
    setActiveTrackingOrderId('MED1024');
    setSelectedVerificationRxId('rx_demo_1024');
    setNotifications(INITIAL_NOTIFICATIONS);
    setSoundEnabled(true);
    setNotificationPanelOpen(false);
    navigate('/', true);
    setDemoGuideStep(1);
    addToast('Demo State Reset', 'Fresh initial scenario loaded with Rahul Sharma order #MED1024.', 'success');
  };

  // Cart operations
  const addToCart = (medicine, qty = 1) => {
    if (medicine.stock < 1) {
      addToast('Out of Stock', `${medicine.name} is currently out of stock.`, 'error');
      return;
    }

    setCart(prev => {
      const existing = prev.find(item => item.medicineId === medicine.id);
      if (existing) {
        const nextQty = existing.quantity + qty;
        if (nextQty > medicine.stock) {
          addToast('Stock Limit', `Only ${medicine.stock} units available in stock.`, 'warning');
          return prev;
        }
        addToast('Cart Updated', `Increased quantity of ${medicine.name} to ${nextQty}.`, 'info');
        return prev.map(item => item.medicineId === medicine.id ? { ...item, quantity: nextQty } : item);
      } else {
        addToast('Added to Cart', `${medicine.name} added to cart.`, 'success');
        return [...prev, { medicineId: medicine.id, quantity: qty, medicine }];
      }
    });
  };

  const updateCartQty = (medicineId, qty) => {
    if (qty <= 0) {
      removeFromCart(medicineId);
      return;
    }
    const med = medicines.find(m => m.id === medicineId);
    if (med && qty > med.stock) {
      addToast('Stock Limit', `Only ${med.stock} units available.`, 'warning');
      return;
    }
    setCart(prev => prev.map(item => item.medicineId === medicineId ? { ...item, quantity: qty } : item));
  };

  const removeFromCart = (medicineId) => {
    setCart(prev => prev.filter(item => item.medicineId !== medicineId));
    addToast('Item Removed', 'Item removed from your cart.', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Check if cart contains any prescription required medicine
  const isCartPrescriptionRequired = cart.some(item => {
    const med = medicines.find(m => m.id === item.medicineId) || item.medicine;
    return med?.prescriptionRequired;
  });

  // Upload prescription
  const uploadPrescription = ({ fileName, fileUrl, fileType, doctorName, medicinesPrescribed, isDemoSample = false }) => {
    const rxId = 'rx_' + Date.now().toString(36);
    
    // Simulate AI extraction with realistic timing & structured output
    const extractedList = medicinesPrescribed || [
      { name: 'Augmentin 625mg', matchedDrug: 'Amoxicillin & Potassium Clavulanate 625mg', dosage: '1 tab twice daily x 5 days', status: 'Valid Dosage' },
      { name: 'Paracetamol 500mg', matchedDrug: 'Paracetamol 500mg', dosage: '1 tab thrice daily or SOS', status: 'Valid Dosage' },
      { name: 'Pantoprazole 40mg', matchedDrug: 'Pantoprazole Gastro-Resistant 40mg', dosage: '1 cap once daily before food x 5 days', status: 'Valid Dosage' }
    ];

    const newRx = {
      id: rxId,
      customerId: 'cust_1',
      customerName: 'Rahul Sharma',
      customerPhone: '+91 98765 43210',
      orderId: null, // will link upon order placement
      doctorName: doctorName || 'Dr. Rajesh Gupta, M.D.',
      doctorRegNo: 'MCI-49281',
      hospitalName: 'Max Healthcare Clinic, Green Park',
      issueDate: new Date().toISOString().split('T')[0],
      uploadedAt: 'Just now',
      fileUrl: fileUrl || SAMPLE_PRESCRIPTION_IMAGE,
      fileName: fileName || 'prescription_upload.svg',
      fileType: fileType || 'image/svg+xml',
      aiAnalysis: {
        status: 'completed',
        scannedAt: 'Just now',
        confidenceScore: 95,
        imageClarity: 'Good / High Contrast',
        doctorDetected: doctorName || 'Dr. Rajesh Gupta, M.D. (MCI-49281)',
        patientDetected: 'Rahul Sharma (32Y / M)',
        extractedMedicines: extractedList,
        potentialIssues: [
          'Doctor registration verified in MCI registry format.',
          'Rx clear and legible. Dosage parameters well defined.',
          'Safety check: Antibiotic course requires pharmacist verification.'
        ],
        // CRITICAL: Safety requirement
        safetyNotice: 'AI-assisted analysis — Final verification must be performed by a licensed pharmacist.'
      },
      pharmacistStatus: 'Pending Pharmacist Verification',
      pharmacistId: null,
      pharmacistName: null,
      pharmacistNotes: '',
      verifiedAt: null
    };

    setPrescriptions(prev => [newRx, ...prev]);
    setSelectedVerificationRxId(rxId);

    // Real-time notification for Pharmacist & Customer
    addNotification({
      title: 'AI Analysis Complete: Rx Uploaded',
      message: `Prescription #${rxId} uploaded by ${newRx.customerName}. AI extracted ${extractedList.length} items. Pharmacist verification pending.`,
      type: 'prescription',
      role: 'pharmacist',
      actionRole: 'pharmacist',
      actionTab: 'verify_rx',
      targetId: rxId
    });

    return newRx;
  };

  // Place Order from Cart
  const placeOrder = ({ attachedPrescriptionId, deliveryAddress, paymentMethod }) => {
    if (cart.length === 0) {
      addToast('Cart is Empty', 'Please add medicines to cart first.', 'warning');
      return null;
    }

    if (isCartPrescriptionRequired && !attachedPrescriptionId) {
      addToast('Prescription Required', 'Your cart contains prescription drugs. Please attach or upload a prescription.', 'error');
      return null;
    }

    // Deduct inventory
    setMedicines(prevMeds => {
      return prevMeds.map(m => {
        const inCart = cart.find(ci => ci.medicineId === m.id);
        if (inCart) {
          const newStock = Math.max(0, m.stock - inCart.quantity);
          return { ...m, stock: newStock };
        }
        return m;
      });
    });

    const orderId = 'MED' + Math.floor(1000 + Math.random() * 9000);
    const subtotal = cart.reduce((sum, item) => sum + (item.medicine.price * item.quantity), 0);
    const deliveryFee = 30;
    const packagingFee = 15;
    const totalAmount = subtotal + deliveryFee + packagingFee;

    const initialStatus = isCartPrescriptionRequired ? 'Prescription Pending' : 'Preparing';

    const newOrder = {
      id: orderId,
      customerId: 'cust_1',
      customerName: 'Rahul Sharma',
      customerPhone: '+91 98765 43210',
      deliveryAddress: deliveryAddress || 'Flat 402, Palm Heights, Green Park Main, New Delhi 110016',
      pharmacyId: selectedPharmacyId,
      pharmacyName: 'Sharma Medical Store',
      pharmacyAddress: 'Shop 14, Main Market, Green Park',
      riderId: null,
      riderName: null,
      riderPhone: null,
      prescriptionId: attachedPrescriptionId || null,
      prescriptionRequired: isCartPrescriptionRequired,
      status: initialStatus,
      items: cart.map(item => ({
        id: item.medicine.id,
        name: item.medicine.name,
        strength: item.medicine.strength,
        price: item.medicine.price,
        quantity: item.quantity,
        prescriptionRequired: item.medicine.prescriptionRequired
      })),
      itemSubtotal: subtotal,
      deliveryFee,
      packagingFee,
      totalAmount,
      paymentMethod: paymentMethod || 'UPI / Digital Payment',
      createdAt: 'Just now',
      timeline: [
        { time: 'Just now', title: 'Order Placed', detail: `Order #${orderId} created by customer.` },
        ...(isCartPrescriptionRequired ? [
          { time: 'Just now', title: 'Prescription Attached', detail: 'Sent to Sharma Medical Store for pharmacist verification.' }
        ] : [
          { time: 'Just now', title: 'Order Received by Pharmacy', detail: 'OTC order queued for preparation.' }
        ])
      ]
    };

    // Update prescription with orderId if attached
    if (attachedPrescriptionId) {
      setPrescriptions(prev => prev.map(rx => rx.id === attachedPrescriptionId ? { ...rx, orderId } : rx));
    }

    setOrders(prev => [newOrder, ...prev]);
    setActiveTrackingOrderId(orderId);
    clearCart();
    setDemoGuideStep(3); // Prompt to switch to Pharmacist

    // Trigger dual notifications for Customer & Pharmacist
    addNotification({
      title: `Order #${orderId} Confirmed`,
      message: `Your order was sent to ${newOrder.pharmacyName}. Status: ${initialStatus}.`,
      type: 'order',
      role: 'customer',
      actionRole: 'customer',
      actionTab: 'orders',
      targetId: orderId
    });

    addNotification({
      title: `New Incoming Order #${orderId}`,
      message: `${newOrder.customerName} ordered ${newOrder.items.length} items (${newOrder.prescriptionRequired ? 'Requires Pharmacist Verification' : 'OTC Order'}).`,
      type: 'order',
      role: 'pharmacist',
      actionRole: 'pharmacist',
      actionTab: newOrder.prescriptionRequired ? 'verify_rx' : 'orders',
      targetId: orderId
    });

    return newOrder;
  };

  // Pharmacist actions
  const verifyPrescription = (prescriptionId, decision, notes = '') => {
    // decision: 'Approved' | 'Rejected' | 'Clarification Requested'
    const pharmacist = INITIAL_USERS.pharmacist;
    const nowStr = 'Just now';

    let updatedRx = null;

    setPrescriptions(prev => prev.map(rx => {
      if (rx.id === prescriptionId) {
        updatedRx = {
          ...rx,
          pharmacistStatus: decision,
          pharmacistId: pharmacist.id,
          pharmacistName: `${pharmacist.name} (Reg #${pharmacist.licenseNo})`,
          pharmacistNotes: notes,
          verifiedAt: nowStr
        };
        return updatedRx;
      }
      return rx;
    }));

    // Update linked order status
    setOrders(prevOrders => prevOrders.map(order => {
      if (order.prescriptionId === prescriptionId) {
        if (decision === 'Approved') {
          return {
            ...order,
            status: 'Prescription Approved',
            timeline: [
              ...order.timeline,
              {
                time: nowStr,
                title: 'Prescription Verified by Licensed Pharmacist',
                detail: `Approved by ${pharmacist.name} (${pharmacist.licenseNo}). Ready for packing.`
              }
            ]
          };
        } else if (decision === 'Rejected') {
          return {
            ...order,
            status: 'Cancelled',
            timeline: [
              ...order.timeline,
              {
                time: nowStr,
                title: 'Prescription Rejected by Pharmacist',
                detail: `Reason: ${notes || 'Prescription does not meet legal or clinical verification criteria.'}`
              }
            ]
          };
        } else if (decision === 'Clarification Requested') {
          return {
            ...order,
            status: 'Prescription Pending',
            timeline: [
              ...order.timeline,
              {
                time: nowStr,
                title: 'Clarification Requested by Pharmacist',
                detail: `Note to customer: ${notes}`
              }
            ]
          };
        }
      }
      return order;
    }));

    if (decision === 'Approved') {
      addNotification({
        title: 'Prescription Approved by Pharmacist',
        message: `Dr. Priyesh Sharma approved Rx #${prescriptionId}. Your order is unlocked for preparation!`,
        type: 'prescription',
        role: 'customer',
        actionRole: 'customer',
        actionTab: 'orders',
        targetId: 'MED1024'
      });
      setDemoGuideStep(4);
    } else if (decision === 'Rejected') {
      addNotification({
        title: 'Prescription Rejected by Pharmacist',
        message: `Order cancelled. Note: ${notes || 'Verification failed clinical compliance check.'}`,
        type: 'prescription',
        role: 'customer',
        actionRole: 'customer',
        actionTab: 'orders'
      });
    } else {
      addNotification({
        title: 'Clarification Requested on Prescription',
        message: `Pharmacist requested clarification: "${notes}"`,
        type: 'prescription',
        role: 'customer',
        actionRole: 'customer',
        actionTab: 'orders'
      });
    }
  };

  // Pharmacy update order preparation status
  const updatePharmacyOrderStatus = (orderId, newStatus) => {
    // newStatus: 'Preparing' | 'Ready for Pickup'
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          status: newStatus,
          timeline: [
            ...order.timeline,
            {
              time: 'Just now',
              title: newStatus === 'Preparing' ? 'Pharmacy Preparing Medicines' : 'Order Packed & Ready for Pickup',
              detail: newStatus === 'Ready for Pickup' ? 'Sealed package placed in delivery bay. Broadcasted to nearby riders.' : 'Pharmacist assembling strip boxes with batch verification.'
            }
          ]
        };
      }
      return order;
    }));

    if (newStatus === 'Ready for Pickup') {
      // Alert Rider & Customer
      addNotification({
        title: `Order #${orderId} Ready for Pickup!`,
        message: `Medicines packed and placed in dispatch bay at Sharma Medical Store. Broadcasted to riders.`,
        type: 'delivery',
        role: 'rider',
        actionRole: 'rider',
        actionTab: 'available'
      });

      addNotification({
        title: `Order #${orderId} Packed & Sealed`,
        message: `Sharma Medical Store has completed packaging. Awaiting rider pickup.`,
        type: 'order',
        role: 'customer',
        actionRole: 'customer',
        actionTab: 'orders',
        targetId: orderId
      });

      setDemoGuideStep(5); // Switch to Rider
    } else {
      addNotification({
        title: `Order #${orderId} In Preparation`,
        message: `Pharmacist is assembling your medicines with batch number cross-checks.`,
        type: 'order',
        role: 'customer',
        actionRole: 'customer',
        actionTab: 'orders',
        targetId: orderId
      });
    }
  };

  // Rider actions
  const riderAcceptOrder = (orderId) => {
    const rider = INITIAL_USERS.rider;
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          riderId: rider.id,
          riderName: rider.name,
          riderPhone: rider.phone,
          status: 'Ready for Pickup', // Accepted by rider, headed to pharmacy
          timeline: [
            ...order.timeline,
            {
              time: 'Just now',
              title: `Delivery Accepted by Rider ${rider.name}`,
              detail: `${rider.name} (${rider.vehicle}) is en route to Sharma Medical Store.`
            }
          ]
        };
      }
      return order;
    }));

    addNotification({
      title: `Rider Assigned to Order #${orderId}`,
      message: `${rider.name} accepted your delivery and is en route to Sharma Medical Store.`,
      type: 'delivery',
      role: 'customer',
      actionRole: 'customer',
      actionTab: 'orders',
      targetId: orderId
    });
  };

  const riderUpdateDeliveryStatus = (orderId, newStatus) => {
    // newStatus: 'Picked Up' | 'Out for Delivery' | 'Delivered'
    const rider = INITIAL_USERS.rider;

    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        let detailText = '';
        if (newStatus === 'Picked Up') detailText = 'Order collected from pharmacist counter after barcode scan.';
        if (newStatus === 'Out for Delivery') detailText = 'Rider is on the way to customer address (ETA ~12 mins).';
        if (newStatus === 'Delivered') detailText = 'Delivered safely at customer doorstep. Delivery OTP confirmed.';

        return {
          ...order,
          status: newStatus,
          timeline: [
            ...order.timeline,
            {
              time: 'Just now',
              title: `Rider: ${newStatus}`,
              detail: detailText
            }
          ]
        };
      }
      return order;
    }));

    if (newStatus === 'Picked Up') {
      addNotification({
        title: `Order #${orderId} Picked Up`,
        message: `Rider ${rider.name} picked up your sealed order from the pharmacy counter.`,
        type: 'delivery',
        role: 'customer',
        actionRole: 'customer',
        actionTab: 'orders',
        targetId: orderId
      });
    } else if (newStatus === 'Out for Delivery') {
      addNotification({
        title: `Order #${orderId} Out for Delivery 🛵`,
        message: `Rider ${rider.name} is heading towards your location (ETA ~12 mins).`,
        type: 'delivery',
        role: 'customer',
        actionRole: 'customer',
        actionTab: 'orders',
        targetId: orderId
      });
    } else if (newStatus === 'Delivered') {
      // Update rider earnings
      setRiderStats(prev => ({
        ...prev,
        todayEarnings: prev.todayEarnings + 45,
        deliveriesToday: prev.deliveriesToday + 1,
        trips: [
          {
            id: 'TRP-' + Math.floor(100 + Math.random() * 900),
            orderId,
            pickup: 'Sharma Medical Store',
            drop: 'Rahul Sharma (Green Park)',
            payout: 45,
            time: 'Just now',
            rating: 5
          },
          ...prev.trips
        ]
      }));

      // Update pharmacy revenue
      setPharmacyMetrics(prev => ({
        ...prev,
        todayOrders: prev.todayOrders + 1,
        todayRevenue: prev.todayRevenue + 280,
        completedOrders: prev.completedOrders + 1
      }));

      addNotification({
        title: `Order #${orderId} Delivered Safely! 🎉`,
        message: `Delivered to Flat 402, Palm Heights. Get well soon!`,
        type: 'order',
        role: 'customer',
        actionRole: 'customer',
        actionTab: 'orders',
        targetId: orderId
      });

      addNotification({
        title: `₹45 Delivery Earnings Credited`,
        message: `Order #${orderId} completed successfully. ₹45 credited to your rider wallet.`,
        type: 'delivery',
        role: 'rider',
        actionRole: 'rider',
        actionTab: 'earnings'
      });

      setDemoGuideStep(6);
    }
  };

  // Inventory management (Pharmacy)
  const updateMedicine = (id, updates) => {
    setMedicines(prev => prev.map(m => {
      if (m.id === id) {
        const updated = { ...m, ...updates };
        if (updates.stock !== undefined && updates.stock <= 5) {
          addNotification({
            title: `Low Stock Alert: ${m.name}`,
            message: `Only ${updates.stock} units remaining at Sharma Medical Store. Restock suggested.`,
            type: 'inventory',
            role: 'pharmacist',
            actionRole: 'pharmacist',
            actionTab: 'inventory'
          });
        }
        return updated;
      }
      return m;
    }));
    addToast('Inventory Updated', 'Stock & pricing updated in real-time.', 'success');
  };

  const addMedicine = (newMed) => {
    const id = 'med_' + Date.now().toString(36);
    const item = {
      id,
      pharmacyId: 'pharma_1',
      pharmacyName: 'Sharma Medical Store',
      distanceKm: 1.2,
      ...newMed
    };
    setMedicines(prev => [item, ...prev]);
    addToast('Medicine Added', `${newMed.name} added to pharmacy inventory.`, 'success');
  };

  return (
    <AppContext.Provider
      value={{
        // Role & nav state
        activeRole,
        setActiveRole,
        customerTab,
        setCustomerTab,
        pharmacyTab,
        setPharmacyTab,
        riderTab,
        setRiderTab,
        navigate,
        goToLanding,
        
        // Data collections
        medicines,
        pharmacies,
        orders,
        prescriptions,
        cart,
        selectedPharmacyId,
        setSelectedPharmacyId,
        riderStats,
        pharmacyMetrics,
        activeTrackingOrderId,
        setActiveTrackingOrderId,
        selectedVerificationRxId,
        setSelectedVerificationRxId,

        // Cart Actions
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        isCartPrescriptionRequired,

        // Order Actions
        placeOrder,
        uploadPrescription,
        verifyPrescription,
        updatePharmacyOrderStatus,
        riderAcceptOrder,
        riderUpdateDeliveryStatus,

        // Inventory Actions
        updateMedicine,
        addMedicine,

        // Notifications & Alerts System
        notifications,
        unreadNotificationsCount,
        notificationPanelOpen,
        setNotificationPanelOpen,
        soundEnabled,
        setSoundEnabled,
        addNotification,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        deleteNotification,
        clearAllNotifications,
        handleNotificationClick,
        requestDesktopPermission,
        simulateNotification,
        playNotificationSound,

        // Toasts & Demo
        toasts,
        addToast,
        removeToast,
        resetDemoData,
        demoGuideStep,
        setDemoGuideStep,
        demoModalOpen,
        setDemoModalOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
