import React from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_USERS } from '../data/mockData';
import {
  Pill,
  ShoppingBag,
  FileText,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Package,
  Bike,
  BarChart3,
  Search,
  Compass,
  RotateCcw,
  Sparkles,
  Layers,
  ChevronRight,
  Store,
  User,
  Home,
  Bell
} from 'lucide-react';
import NotificationPanel from './NotificationPanel';

export default function Navbar() {
  const {
    activeRole,
    setActiveRole,
    customerTab,
    setCustomerTab,
    pharmacyTab,
    setPharmacyTab,
    riderTab,
    setRiderTab,
    cart,
    orders,
    prescriptions,
    resetDemoData,
    setDemoModalOpen,
    demoGuideStep,
    unreadNotificationsCount,
    notificationPanelOpen,
    setNotificationPanelOpen
  } = useApp();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const pendingRxCount = prescriptions.filter(p => p.pharmacistStatus === 'Pending Pharmacist Verification').length;

  // Active user details based on role
  let currentUser = INITIAL_USERS.customer;
  if (activeRole === 'pharmacist') currentUser = INITIAL_USERS.pharmacist;
  if (activeRole === 'rider') currentUser = INITIAL_USERS.rider;
  if (activeRole === 'admin') currentUser = INITIAL_USERS.admin;

  return (
    <>
      {/* Top Demo & Role Switcher Bar */}
      <div className="demo-control-bar">
        <div className="demo-brand-tag" onClick={() => setActiveRole('landing')} style={{ cursor: 'pointer' }}>
          <img src="/logo.png" alt="MediT Logo" style={{ height: 20, width: 'auto', objectFit: 'contain' }} />
          <span className="demo-pill-badge">HACKATHON EVALUATION MODE</span>
        </div>

        {/* Instant Role Switching Pills */}
        <div className="role-switcher-group">
          <button
            className={`role-btn ${activeRole === 'landing' ? 'active' : ''}`}
            onClick={() => setActiveRole('landing')}
            title="View Product Landing Page"
          >
            Landing
          </button>
          <button
            className={`role-btn ${activeRole === 'customer' ? 'active' : ''}`}
            onClick={() => setActiveRole('customer')}
            title="Switch to Customer (Rahul Sharma)"
          >
            <span style={{ fontSize: '1rem' }}>🛒</span>
            Customer (Rahul)
          </button>
          <button
            className={`role-btn ${activeRole === 'pharmacist' ? 'active' : ''}`}
            onClick={() => setActiveRole('pharmacist')}
            title="Switch to Licensed Pharmacist (Dr. Priyesh Sharma)"
          >
            <ShieldCheck size={14} />
            Pharmacist (Dr. Priyesh)
            {pendingRxCount > 0 && (
              <span style={{
                background: 'var(--color-amber-500)',
                color: '#ffffff',
                borderRadius: '50%',
                padding: '1px 6px',
                fontSize: '0.65rem',
                fontWeight: 800
              }}>
                {pendingRxCount}
              </span>
            )}
          </button>
          <button
            className={`role-btn ${activeRole === 'rider' ? 'active' : ''}`}
            onClick={() => setActiveRole('rider')}
            title="Switch to Delivery Rider (Aman Kumar)"
          >
            <Bike size={14} />
            Rider (Aman)
          </button>
          <button
            className={`role-btn ${activeRole === 'admin' ? 'active' : ''}`}
            onClick={() => setActiveRole('admin')}
            title="Switch to Platform Admin & Safety Compliance"
          >
            <BarChart3 size={14} />
            Admin
          </button>
        </div>

        {/* Demo Tour and Reset Trigger */}
        <div className="demo-actions">
          <button
            className="btn-demo-tour"
            onClick={() => setDemoModalOpen(true)}
            title="Launch Interactive Step-by-Step Scenario"
          >
            <Compass size={15} />
            Auto-Tour Walkthrough
          </button>
          <button
            className="btn-demo-reset"
            onClick={resetDemoData}
            title="Reset to Initial Demo State"
          >
            <RotateCcw size={14} />
            Reset State
          </button>
        </div>
      </div>

      {/* Guided Walkthrough Indicator Banner */}
      <div className="tour-guidance-bar">
        <div className="tour-guidance-content">
          <span className="tour-step-pill">EVALUATION FLOW — STEP {demoGuideStep} OF 6</span>
          <span style={{ fontWeight: 600 }}>
            {demoGuideStep === 1 && 'Step 1: Rahul Sharma selects Paracetamol + Augmentin (Rx Required) at Sharma Medical Store.'}
            {demoGuideStep === 2 && 'Step 2: Upload Prescription → AI Assistant analyzes structure (Awaiting human pharmacist verification).'}
            {demoGuideStep === 3 && 'Step 3: Switch to Pharmacist → Review split-screen document canvas & click "Approve Prescription".'}
            {demoGuideStep === 4 && 'Step 4: Pharmacist packs medicines & marks order "Ready for Pickup" for nearby delivery riders.'}
            {demoGuideStep === 5 && 'Step 5: Switch to Rider → Aman Kumar accepts order, picks up, and marks delivered at doorstep.'}
            {demoGuideStep === 6 && 'Step 6: Return to Customer → View verified completion, rider receipt, and safety compliance seal!'}
          </span>
        </div>
        <button
          onClick={() => setDemoModalOpen(true)}
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            border: 'none',
            color: '#ffffff',
            padding: '3px 10px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.78rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4
          }}
        >
          View Guide Steps <ChevronRight size={14} />
        </button>
      </div>

      {/* Main App Navigation Header */}
      <header className="app-header">
        <div className="header-container">
          {/* Logo & Tagline */}
          <div className="brand-logo-area" onClick={() => setActiveRole('landing')} title="MEDiT Home">
            <img src="/logo.png" alt="MediT Logo" className="brand-logo-img" />
            <div className="brand-text-block">
              <span className="brand-tagline-text">Medicines. Nearby. Delivered.</span>
            </div>
          </div>

          {/* Role-Specific Navigation Tabs */}
          <nav className="nav-tabs-wrapper">
            {activeRole === 'customer' && (
              <>
                <button
                  className={`nav-tab-btn ${customerTab === 'home' ? 'active' : ''}`}
                  onClick={() => setCustomerTab('home')}
                >
                  <Search size={16} />
                  Home
                </button>
                <button
                  className={`nav-tab-btn ${customerTab === 'medicines' ? 'active' : ''}`}
                  onClick={() => setCustomerTab('medicines')}
                >
                  <Pill size={16} />
                  Medicines
                </button>
                <button
                  className={`nav-tab-btn ${customerTab === 'orders' ? 'active' : ''}`}
                  onClick={() => setCustomerTab('orders')}
                >
                  <Clock size={16} />
                  Orders
                </button>
                <button
                  className={`nav-tab-btn ${customerTab === 'profile' ? 'active' : ''}`}
                  onClick={() => setCustomerTab('profile')}
                >
                  <User size={16} />
                  Profile
                </button>
              </>
            )}

            {activeRole === 'pharmacist' && (
              <>
                <button
                  className={`nav-tab-btn ${pharmacyTab === 'verify_rx' ? 'active' : ''}`}
                  onClick={() => setPharmacyTab('verify_rx')}
                >
                  <ShieldCheck size={17} />
                  Prescription Verification
                  {pendingRxCount > 0 && (
                    <span style={{
                      background: 'var(--color-amber-500)',
                      color: '#ffffff',
                      borderRadius: 'var(--radius-full)',
                      padding: '2px 8px',
                      fontSize: '0.7rem',
                      fontWeight: 800
                    }}>
                      {pendingRxCount} Pending
                    </span>
                  )}
                </button>
                <button
                  className={`nav-tab-btn ${pharmacyTab === 'orders' ? 'active' : ''}`}
                  onClick={() => setPharmacyTab('orders')}
                >
                  <Package size={17} />
                  Orders & Packing
                </button>
                <button
                  className={`nav-tab-btn ${pharmacyTab === 'inventory' ? 'active' : ''}`}
                  onClick={() => setPharmacyTab('inventory')}
                >
                  <Layers size={17} />
                  Inventory Management
                </button>
                <button
                  className={`nav-tab-btn ${pharmacyTab === 'earnings' ? 'active' : ''}`}
                  onClick={() => setPharmacyTab('earnings')}
                >
                  <BarChart3 size={17} />
                  Pharmacy Earnings
                </button>
              </>
            )}

            {activeRole === 'rider' && (
              <>
                <button
                  className={`nav-tab-btn ${riderTab === 'available' ? 'active' : ''}`}
                  onClick={() => setRiderTab('available')}
                >
                  <Package size={17} />
                  Available Deliveries
                </button>
                <button
                  className={`nav-tab-btn ${riderTab === 'active' ? 'active' : ''}`}
                  onClick={() => setRiderTab('active')}
                >
                  <Bike size={17} />
                  Active Mission
                </button>
                <button
                  className={`nav-tab-btn ${riderTab === 'earnings' ? 'active' : ''}`}
                  onClick={() => setRiderTab('earnings')}
                >
                  <BarChart3 size={17} />
                  My Earnings & Tips
                </button>
              </>
            )}

            {activeRole === 'admin' && (
              <>
                <button className="nav-tab-btn active">
                  <BarChart3 size={17} />
                  Platform Control Tower
                </button>
              </>
            )}

            {activeRole === 'landing' && (
              <>
                <button
                  className="nav-tab-btn active"
                  onClick={() => setActiveRole('customer')}
                >
                  Enter Marketplace →
                </button>
              </>
            )}
          </nav>

          {/* User Profile Info & Cart Badge */}
          <div className="header-user-status">
            {/* Notification Bell Trigger & Dropdown */}
            <div className="notification-trigger-wrap" style={{ position: 'relative' }}>
              <button
                className={`btn-notification-trigger ${unreadNotificationsCount > 0 ? 'has-unread' : ''} ${notificationPanelOpen ? 'active' : ''}`}
                onClick={() => setNotificationPanelOpen(!notificationPanelOpen)}
                title="Notifications & Activity"
                aria-label={`Notifications (${unreadNotificationsCount} unread)`}
              >
                <Bell size={18} />
                {unreadNotificationsCount > 0 && (
                  <span className="notif-badge-pill">
                    {unreadNotificationsCount > 9 ? '9+' : unreadNotificationsCount}
                    <span className="notif-badge-ping" />
                  </span>
                )}
              </button>

              {/* Notification Panel Popover */}
              <NotificationPanel />
            </div>

            {activeRole === 'customer' && (
              <button
                className="btn btn-primary"
                style={{
                  padding: '8px 18px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.88rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-sm)'
                }}
                onClick={() => setCustomerTab('cart')}
                title="View Shopping Cart"
              >
                <ShoppingBag size={17} />
                <span>Cart ({totalCartCount})</span>
              </button>
            )}

            {activeRole !== 'landing' && (
              <div className="user-badge-profile">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="user-avatar-img"
                />
                <div>
                  <div className="user-meta-name">{currentUser.name}</div>
                  <div className="user-meta-role">
                    {activeRole === 'pharmacist' ? 'Licensed Pharmacist' : currentUser.role}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
