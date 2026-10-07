import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Package,
  Bike,
  User,
  RotateCcw,
  X
} from 'lucide-react';

export default function DemoTourModal() {
  const {
    demoModalOpen,
    setDemoModalOpen,
    demoGuideStep,
    setDemoGuideStep,
    setActiveRole,
    setCustomerTab,
    setPharmacyTab,
    setRiderTab,
    resetDemoData,
    orders,
    verifyPrescription,
    updatePharmacyOrderStatus,
    riderAcceptOrder,
    riderUpdateDeliveryStatus
  } = useApp();

  if (!demoModalOpen) return null;

  const currentOrder = orders.find(o => o.id === 'MED1024') || orders[0];

  const steps = [
    {
      num: 1,
      title: 'Customer Search & Cart',
      desc: 'Browse local medicines at Sharma Medical Store. Add Paracetamol and Augmentin 625mg (Prescription Required).',
      role: 'customer',
      tab: 'medicines',
      actionLabel: 'Go to Medicines',
      onRun: () => {
        setActiveRole('customer');
        setCustomerTab('medicines');
        setDemoGuideStep(1);
      }
    },
    {
      num: 2,
      title: 'Prescription Upload & AI Scan',
      desc: 'Upload doctor Rx. AI Assistant pre-screens medicines and flags warnings (Awaiting licensed pharmacist verification).',
      role: 'customer',
      tab: 'upload_rx',
      actionLabel: 'View AI Assistant Scan',
      onRun: () => {
        setActiveRole('customer');
        setCustomerTab('upload_rx');
        setDemoGuideStep(2);
      }
    },
    {
      num: 3,
      title: 'Licensed Pharmacist Verification',
      desc: 'Dr. Priyesh Sharma reviews the prescription canvas alongside AI suggestions and makes the human decision.',
      role: 'pharmacist',
      tab: 'verify_rx',
      actionLabel: 'Open Verification Desk',
      onRun: () => {
        setActiveRole('pharmacist');
        setPharmacyTab('verify_rx');
        setDemoGuideStep(3);
      }
    },
    {
      num: 4,
      title: 'Pharmacy Order Preparation',
      desc: 'Once approved, pharmacist packs medicines and marks order "Ready for Pickup" for nearby delivery riders.',
      role: 'pharmacist',
      tab: 'orders',
      actionLabel: 'Pack & Ready Order',
      onRun: () => {
        setActiveRole('pharmacist');
        setPharmacyTab('orders');
        if (currentOrder && currentOrder.status === 'Prescription Pending') {
          verifyPrescription(currentOrder.prescriptionId, 'Approved', 'Verified against MCI registry.');
        }
        setDemoGuideStep(4);
      }
    },
    {
      num: 5,
      title: 'Rider Acceptance & Delivery',
      desc: 'Rider Aman Kumar accepts the delivery request, marks picked up, and marks delivered at customer doorstep.',
      role: 'rider',
      tab: 'available',
      actionLabel: 'Open Rider Dispatch',
      onRun: () => {
        setActiveRole('rider');
        setRiderTab('available');
        if (currentOrder && currentOrder.status !== 'Ready for Pickup') {
          updatePharmacyOrderStatus(currentOrder.id, 'Ready for Pickup');
        }
        setDemoGuideStep(5);
      }
    },
    {
      num: 6,
      title: 'Customer Order Status',
      desc: 'Rahul Sharma views the clean, 5-stage order status: Order Placed → Pharmacist Verified → Preparing → Ready for Pickup → Delivered.',
      role: 'customer',
      tab: 'orders',
      actionLabel: 'View Delivered Order Status',
      onRun: () => {
        setActiveRole('customer');
        setCustomerTab('orders');
        if (currentOrder && currentOrder.status !== 'Delivered') {
          riderUpdateDeliveryStatus(currentOrder.id, 'Delivered');
        }
        setDemoGuideStep(6);
      }
    }
  ];

  return (
    <div className="modal-overlay" onClick={() => setDemoModalOpen(false)}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: 700 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src="/logo.png" alt="MediT" style={{ height: 36, width: 'auto', objectFit: 'contain' }} />
            <div>
              <h2 style={{ fontSize: '1.28rem', fontWeight: 800, color: 'var(--color-slate-900)' }}>
                Guided Evaluation Tour
              </h2>
              <p style={{ fontSize: '0.82rem', color: 'var(--color-slate-500)' }}>
                Experience the complete round-trip flow: Customer → Pharmacy → Pharmacist → Rider → Customer
              </p>
            </div>
          </div>
          <button
            onClick={() => setDemoModalOpen(false)}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-slate-400)' }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Steps List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          {steps.map(step => {
            const isCurrent = demoGuideStep === step.num;
            return (
              <div
                key={step.num}
                style={{
                  border: isCurrent ? '2px solid var(--color-primary-500)' : '1px solid var(--color-slate-200)',
                  background: isCurrent ? 'var(--color-primary-50)' : 'var(--color-slate-50)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '14px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 16,
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: 'var(--radius-full)',
                    background: isCurrent ? 'var(--color-primary-600)' : 'var(--color-slate-300)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.85rem'
                  }}>
                    {step.num}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-slate-900)' }}>
                        {step.title}
                      </span>
                      <span style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-full)',
                        background: 'rgba(15, 23, 42, 0.08)',
                        color: 'var(--color-slate-700)'
                      }}>
                        {step.role}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-slate-600)', marginTop: 2 }}>
                      {step.desc}
                    </div>
                  </div>
                </div>

                <button
                  className={`btn ${isCurrent ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '6px 14px', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
                  onClick={() => {
                    step.onRun();
                    setDemoModalOpen(false);
                  }}
                >
                  {step.actionLabel}
                  <ArrowRight size={14} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer controls */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid var(--color-slate-200)',
          paddingTop: 16
        }}>
          <button
            className="btn btn-secondary"
            onClick={() => {
              resetDemoData();
              setDemoModalOpen(false);
            }}
            style={{ fontSize: '0.82rem' }}
          >
            <RotateCcw size={15} />
            Reset Initial Demo Scenario
          </button>

          <button
            className="btn btn-primary"
            onClick={() => setDemoModalOpen(false)}
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
