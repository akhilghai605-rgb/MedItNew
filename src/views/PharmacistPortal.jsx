import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Sliders,
  FileText,
  AlertTriangle,
  User,
  Clock,
  Package,
  Layers,
  BarChart3,
  Edit2,
  Plus,
  Trash2,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Search,
  Check,
  Store
} from 'lucide-react';

export default function PharmacistPortal() {
  const {
    pharmacyTab,
    setPharmacyTab,
    pharmacyMetrics,
    prescriptions,
    orders,
    medicines,
    verifyPrescription,
    updatePharmacyOrderStatus,
    updateMedicine,
    addMedicine,
    selectedVerificationRxId,
    setSelectedVerificationRxId,
    setActiveRole,
    setRiderTab,
    setDemoGuideStep
  } = useApp();

  // Document Viewer controls state
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [highContrast, setHighContrast] = useState(false);

  // Pharmacist Decision notes state
  const [pharmacistNotes, setPharmacistNotes] = useState('');
  const [doctorMciVerified, setDoctorMciVerified] = useState(true);

  // Inventory modal states
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [addMedicineModal, setAddMedicineModal] = useState(false);
  const [newMedForm, setNewMedForm] = useState({
    name: '',
    brand: '',
    manufacturer: '',
    strength: '',
    category: 'Pain & Fever Relief',
    price: 50,
    mrp: 65,
    stock: 50,
    prescriptionRequired: false,
    dosageForm: 'Tablets',
    description: ''
  });

  // Current active prescription being verified
  const activeRx = prescriptions.find(p => p.id === selectedVerificationRxId) || prescriptions[0];
  const linkedOrder = orders.find(o => o.prescriptionId === activeRx?.id || o.id === activeRx?.orderId);

  // Pending Prescriptions Queue
  const pendingRxList = prescriptions.filter(p => p.pharmacistStatus === 'Pending Pharmacist Verification');
  const allRxList = prescriptions;

  const lowStockCount = medicines.filter(m => m.stock > 0 && m.stock <= 10).length;

  return (
    <div className="app-container">
      {/* Pharmacy Header & Metrics Bar */}
      <div style={{
        background: '#ffffff',
        border: '1px solid var(--color-slate-200)',
        borderRadius: 'var(--radius-xl)',
        padding: '20px 24px',
        marginBottom: 24,
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Store size={26} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-slate-900)' }}>
                  Sharma Medical Store
                </h2>
                <span className="badge badge-rx-otc">License #DL-PH-2022-991</span>
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--color-slate-500)' }}>
                Lead Pharmacist: <strong>Dr. Priyesh Sharma (Reg #PH-88231 / DL-2017)</strong> • Green Park Market, New Delhi
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button
              className={`btn ${pharmacyTab === 'verify_rx' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.85rem', padding: '8px 14px' }}
              onClick={() => setPharmacyTab('verify_rx')}
            >
              <ShieldCheck size={16} />
              Prescriptions ({pendingRxList.length})
            </button>
            <button
              className={`btn ${pharmacyTab === 'orders' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.85rem', padding: '8px 14px' }}
              onClick={() => setPharmacyTab('orders')}
            >
              <Package size={16} />
              Orders ({orders.length})
            </button>
            <button
              className={`btn ${pharmacyTab === 'inventory' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.85rem', padding: '8px 14px' }}
              onClick={() => setPharmacyTab('inventory')}
            >
              <Layers size={16} />
              Inventory ({medicines.length})
            </button>
            <button
              className={`btn ${pharmacyTab === 'earnings' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.85rem', padding: '8px 14px' }}
              onClick={() => setPharmacyTab('earnings')}
            >
              <BarChart3 size={16} />
              Earnings
            </button>
          </div>
        </div>

        {/* 4 Main Dashboard Cards as Requested */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          {/* Card 1: Today's Orders */}
          <div style={{ background: 'var(--color-slate-50)', padding: '16px 20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-slate-200)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-slate-500)', fontWeight: 700, textTransform: 'uppercase' }}>
              Today's Orders
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-slate-900)', marginTop: 4 }}>
              24
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-primary-600)', marginTop: 2 }}>
              Active local store queue
            </div>
          </div>

          {/* Card 2: Pending Prescriptions */}
          <div style={{
            background: pendingRxList.length > 0 ? '#fffbeb' : 'var(--color-slate-50)',
            padding: '16px 20px',
            borderRadius: 'var(--radius-md)',
            border: pendingRxList.length > 0 ? '1.5px solid #fde68a' : '1px solid var(--color-slate-200)'
          }}>
            <div style={{ fontSize: '0.78rem', color: pendingRxList.length > 0 ? '#92400e' : 'var(--color-slate-500)', fontWeight: 700, textTransform: 'uppercase' }}>
              Pending Prescriptions
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: pendingRxList.length > 0 ? '#d97706' : 'var(--color-slate-900)', marginTop: 4 }}>
              {pendingRxList.length || 5}
            </div>
            <div style={{ fontSize: '0.75rem', color: pendingRxList.length > 0 ? '#b45309' : 'var(--color-slate-500)', marginTop: 2 }}>
              Awaiting human pharmacist decision
            </div>
          </div>

          {/* Card 3: Today's Earnings */}
          <div style={{ background: 'var(--color-slate-50)', padding: '16px 20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-slate-200)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-slate-500)', fontWeight: 700, textTransform: 'uppercase' }}>
              Today's Earnings
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-slate-900)', marginTop: 4 }}>
              ₹8,450
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-slate-500)', marginTop: 2 }}>
              Gross revenue generated
            </div>
          </div>

          {/* Card 4: Low Stock */}
          <div style={{ background: 'var(--color-slate-50)', padding: '16px 20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-slate-200)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-slate-500)', fontWeight: 700, textTransform: 'uppercase' }}>
              Low Stock
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-slate-900)', marginTop: 4 }}>
              8
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-rose-600)', marginTop: 2 }}>
              Requires distributor refill
            </div>
          </div>
        </div>
      </div>

      {/* Tab 1: PRESCRIPTION VERIFICATION DASHBOARD (CORE CRITICAL SCREEN) */}
      {pharmacyTab === 'verify_rx' && (
        <div>
          {/* Pending Queue Ribbon */}
          <div style={{
            background: '#ffffff',
            border: '1px solid var(--color-slate-200)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px 20px',
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <ShieldCheck size={22} style={{ color: 'var(--color-primary-600)' }} />
              <div>
                <span style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--color-slate-900)' }}>
                  Prescription Verification Queue ({allRxList.length} total)
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-slate-500)', marginLeft: 8 }}>
                  Click any prescription card to inspect and verify.
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
              {allRxList.map(rx => (
                <button
                  key={rx.id}
                  onClick={() => setSelectedVerificationRxId(rx.id)}
                  style={{
                    background: selectedVerificationRxId === rx.id ? 'var(--color-primary-50)' : 'var(--color-slate-50)',
                    border: selectedVerificationRxId === rx.id ? '2px solid var(--color-primary-600)' : '1px solid var(--color-slate-200)',
                    borderRadius: 'var(--radius-md)',
                    padding: '8px 14px',
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--color-slate-900)' }}>
                    {rx.customerName}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: rx.pharmacistStatus.includes('Approved') ? 'var(--color-primary-700)' : 'var(--color-amber-700)', fontWeight: 600 }}>
                    {rx.pharmacistStatus}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Detailed Split Screen Verification Workspace */}
          {activeRx ? (
            <div className="verification-split-view">
              {/* LEFT PANE: High-Resolution Prescription Viewer */}
              <div className="prescription-viewer-pane">
                <div className="viewer-controls-bar">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <FileText size={18} style={{ color: 'var(--color-primary-600)' }} />
                    <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--color-slate-900)' }}>
                      Prescription Viewer ({activeRx.fileName})
                    </span>
                  </div>

                  {/* Zoom, Pan & Rotate Controls */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <button
                      className="btn btn-secondary"
                      style={{ padding: '4px 8px' }}
                      onClick={() => setZoomLevel(prev => Math.max(0.6, prev - 0.2))}
                      title="Zoom Out"
                    >
                      <ZoomOut size={15} />
                    </button>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, minWidth: 38, textAlign: 'center' }}>
                      {Math.round(zoomLevel * 100)}%
                    </span>
                    <button
                      className="btn btn-secondary"
                      style={{ padding: '4px 8px' }}
                      onClick={() => setZoomLevel(prev => Math.min(2.5, prev + 0.2))}
                      title="Zoom In"
                    >
                      <ZoomIn size={15} />
                    </button>
                    <button
                      className="btn btn-secondary"
                      style={{ padding: '4px 8px' }}
                      onClick={() => setRotation(prev => (prev + 90) % 360)}
                      title="Rotate 90deg"
                    >
                      <RotateCw size={15} />
                    </button>
                    <button
                      className={`btn ${highContrast ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                      onClick={() => setHighContrast(prev => !prev)}
                      title="Toggle High-Contrast Filter for Handwritten OCR Verification"
                    >
                      Contrast
                    </button>
                  </div>
                </div>

                {/* Document Display Canvas */}
                <div className="document-canvas-box">
                  <img
                    src={activeRx.fileUrl}
                    alt="Prescription document"
                    style={{
                      transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
                      filter: highContrast ? 'contrast(170%) brightness(95%)' : 'none'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: '0.75rem', color: 'var(--color-slate-500)' }}>
                  <span>Patient: {activeRx.customerName}</span>
                  <span>Issued by: {activeRx.doctorName} ({activeRx.doctorRegNo})</span>
                  <span>Uploaded: {activeRx.uploadedAt}</span>
                </div>
              </div>

              {/* RIGHT PANE: AI Assistant Extraction & Pharmacist Decision Station */}
              <div className="pharmacist-action-pane">
                {/* AI Assistant Extraction Card */}
                <div style={{
                  background: '#f8fafc',
                  border: '1.5px solid var(--color-primary-200)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '18px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Sparkles size={18} style={{ color: 'var(--color-primary-600)' }} />
                      <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--color-slate-900)' }}>
                        AI Assistant Analysis (Extraction Only)
                      </span>
                    </div>

                    <span className="badge badge-rx-otc" style={{ fontSize: '0.7rem' }}>
                      OCR Confidence: {activeRx.aiAnalysis.confidenceScore}%
                    </span>
                  </div>

                  {/* Warning Doctrine */}
                  <div style={{
                    background: '#fffbeb',
                    border: '1px solid #fde68a',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.78rem',
                    color: '#92400e',
                    marginBottom: 12
                  }}>
                    🛡️ <strong>Safety Constraint:</strong> AI output provides automated triage only. AI has NOT verified or approved this order.
                  </div>

                  {/* Extracted medicines list */}
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-slate-500)', textTransform: 'uppercase', marginBottom: 6 }}>
                      Detected Medicines &amp; Dosages
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {activeRx.aiAnalysis.extractedMedicines.map((m, idx) => (
                        <div key={idx} style={{
                          background: '#ffffff',
                          border: '1px solid var(--color-slate-200)',
                          borderRadius: 'var(--radius-sm)',
                          padding: '8px 12px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: '0.82rem'
                        }}>
                          <div>
                            <strong>{m.name}</strong>
                            <div style={{ fontSize: '0.74rem', color: 'var(--color-slate-500)' }}>{m.dosage}</div>
                          </div>
                          <span className="badge badge-rx-otc" style={{ height: 'fit-content' }}>
                            {m.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Potential issues / warnings */}
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-slate-600)' }}>
                    <strong>Screening Observations:</strong>
                    <ul style={{ paddingLeft: 18, marginTop: 4 }}>
                      {activeRx.aiAnalysis.potentialIssues.map((issue, idx) => (
                        <li key={idx} style={{ marginBottom: 2 }}>{issue}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* HUMAN LICENSED PHARMACIST VERIFICATION ACTION STATION */}
                <div style={{
                  background: '#ffffff',
                  border: '2px solid var(--color-primary-500)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '20px',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                    <ShieldCheck size={24} style={{ color: 'var(--color-primary-600)' }} />
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-slate-900)' }}>
                        Pharmacist Verification Controls
                      </h3>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-slate-500)' }}>
                        Final statutory authorization under Pharmacy Practice Regulations
                      </div>
                    </div>
                  </div>

                  {/* License Seal */}
                  <div className="pharmacist-license-seal" style={{ marginBottom: 14 }}>
                    <CheckCircle2 size={18} style={{ color: 'var(--color-primary-600)', flexShrink: 0 }} />
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-slate-700)' }}>
                      <strong>Reviewing Pharmacist:</strong> Dr. Priyesh Sharma (License #PH-88231)
                      <div>Pharmacy: Sharma Medical Store, Green Park</div>
                    </div>
                  </div>

                  {/* Clinical Checkbox */}
                  <div style={{ marginBottom: 14, fontSize: '0.82rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={doctorMciVerified}
                        onChange={e => setDoctorMciVerified(e.target.checked)}
                      />
                      <span>
                        Verified Doctor MCI Reg #MCI-49281 against State Medical Registry
                      </span>
                    </label>
                  </div>

                  {/* Clinical Pharmacist Notes */}
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-slate-700)', display: 'block', marginBottom: 4 }}>
                      Pharmacist Clinical Verification Notes:
                    </label>
                    <textarea
                      rows={2}
                      className="search-input-field"
                      style={{
                        width: '100%',
                        border: '1px solid var(--color-slate-300)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '8px',
                        fontSize: '0.82rem'
                      }}
                      placeholder="e.g. Valid 5-day antibiotic course verified against diagnosis; dosage appropriate for adult patient."
                      value={pharmacistNotes}
                      onChange={e => setPharmacistNotes(e.target.value)}
                    />
                  </div>

                  {/* Action Buttons: VISUALLY DISTINCT AS HUMAN DECISION */}
                  {activeRx.pharmacistStatus === 'Pending Pharmacist Verification' ? (
                    <div className="action-buttons-stack">
                      <button
                        className="btn btn-pharmacist-approve"
                        style={{ flex: 1.5, minWidth: 180 }}
                        onClick={() => {
                          verifyPrescription(activeRx.id, 'Approved', pharmacistNotes || 'Dosage and regimen clinically approved.');
                        }}
                      >
                        <ShieldCheck size={18} />
                        Approve Prescription
                      </button>

                      <button
                        className="btn btn-danger"
                        style={{ flex: 1 }}
                        onClick={() => {
                          const reason = prompt('Please enter rejection reason:', 'Prescription illegible or expired.');
                          if (reason) verifyPrescription(activeRx.id, 'Rejected', reason);
                        }}
                      >
                        <XCircle size={16} />
                        Reject Prescription
                      </button>

                      <button
                        className="btn btn-warning"
                        style={{ flex: 1 }}
                        onClick={() => {
                          const clarify = prompt('What clarification is needed from customer?', 'Please upload clearer image showing clinic stamp.');
                          if (clarify) verifyPrescription(activeRx.id, 'Clarification Requested', clarify);
                        }}
                      >
                        <HelpCircle size={16} />
                        Request Clarification
                      </button>
                    </div>
                  ) : (
                    <div style={{
                      background: activeRx.pharmacistStatus === 'Approved' ? '#ecfdf5' : '#fee2e2',
                      border: activeRx.pharmacistStatus === 'Approved' ? '1.5px solid #6ee7b7' : '1.5px solid #fca5a5',
                      padding: '14px',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div>
                        <div style={{ fontWeight: 800, color: activeRx.pharmacistStatus === 'Approved' ? '#065f46' : '#991b1b', fontSize: '0.95rem' }}>
                          ✓ Prescription {activeRx.pharmacistStatus} by Pharmacist
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--color-slate-600)', marginTop: 2 }}>
                          Signed by: {activeRx.pharmacistName || 'Dr. Priyesh Sharma (Reg #PH-88231)'} • {activeRx.verifiedAt || 'Today'}
                        </div>
                      </div>

                      {/* Quick jump to Packing */}
                      <button
                        className="btn btn-primary"
                        style={{ fontSize: '0.82rem', padding: '6px 14px' }}
                        onClick={() => setPharmacyTab('orders')}
                      >
                        Proceed to Order Packing →
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ padding: 40, textAlign: 'center', background: '#ffffff', borderRadius: 'var(--radius-lg)' }}>
              No prescription selected.
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Orders Management & Packing */}
      {pharmacyTab === 'orders' && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-slate-900)' }}>
                Pharmacy Orders &amp; Packing Queue
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-slate-500)' }}>
                Prepare sealed medication pouches and dispatch to nearby riders.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {orders.map(order => (
              <div
                key={order.id}
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--color-slate-200)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '20px',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div>
                    <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-slate-900)' }}>
                      Order #{order.id}
                    </span>
                    <span style={{ fontSize: '0.82rem', color: 'var(--color-slate-500)', marginLeft: 10 }}>
                      Customer: <strong>{order.customerName}</strong> ({order.deliveryAddress})
                    </span>
                  </div>

                  <span className={`badge ${
                    order.status === 'Delivered'
                      ? 'badge-status-delivered'
                      : order.status.includes('Pending')
                      ? 'badge-status-pending'
                      : 'badge-status-approved'
                  }`}>
                    {order.status}
                  </span>
                </div>

                {/* Items in this order */}
                <div style={{ background: 'var(--color-slate-50)', padding: '12px', borderRadius: 'var(--radius-md)', marginBottom: 16 }}>
                  {order.items.map((it, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', padding: '4px 0' }}>
                      <span>
                        <strong>{it.name}</strong> ({it.strength}) × {it.quantity}
                        {it.prescriptionRequired && (
                          <span className="badge badge-rx-required" style={{ marginLeft: 8, fontSize: '0.68rem' }}>
                            Rx Item
                          </span>
                        )}
                      </span>
                      <span style={{ fontWeight: 700 }}>₹{it.price * it.quantity}</span>
                    </div>
                  ))}
                  <div style={{
                    borderTop: '1px solid var(--color-slate-200)',
                    paddingTop: 8,
                    marginTop: 6,
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.9rem',
                    fontWeight: 800
                  }}>
                    <span>Order Value</span>
                    <span style={{ color: 'var(--color-primary-700)' }}>₹{order.totalAmount}</span>
                  </div>
                </div>

                {/* Workflow Action Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-slate-500)' }}>
                    Prescription Status:{' '}
                    <strong>
                      {order.prescriptionRequired
                        ? order.status === 'Prescription Pending'
                          ? '⚠️ Awaiting Pharmacist Review'
                          : '✓ Verified by Licensed Pharmacist'
                        : 'Not Required (OTC)'}
                    </strong>
                  </div>

                  <div style={{ display: 'flex', gap: 10 }}>
                    {order.status === 'Prescription Pending' && (
                      <button
                        className="btn btn-warning"
                        style={{ fontSize: '0.82rem', padding: '6px 14px' }}
                        onClick={() => {
                          setSelectedVerificationRxId(order.prescriptionId);
                          setPharmacyTab('verify_rx');
                        }}
                      >
                        <ShieldCheck size={15} />
                        Verify Attached Prescription
                      </button>
                    )}

                    {order.status === 'Prescription Approved' && (
                      <button
                        className="btn btn-primary"
                        style={{ fontSize: '0.82rem', padding: '8px 16px' }}
                        onClick={() => updatePharmacyOrderStatus(order.id, 'Preparing')}
                      >
                        <Package size={15} />
                        Start Packing Medicines
                      </button>
                    )}

                    {order.status === 'Preparing' && (
                      <button
                        className="btn btn-primary"
                        style={{ fontSize: '0.85rem', padding: '8px 18px', background: 'linear-gradient(135deg, #10b981, #059669)' }}
                        onClick={() => updatePharmacyOrderStatus(order.id, 'Ready for Pickup')}
                      >
                        <CheckCircle2 size={16} />
                        Mark Ready for Pickup
                      </button>
                    )}

                    {order.status === 'Ready for Pickup' && (
                      <button
                        className="btn btn-secondary"
                        style={{ fontSize: '0.82rem' }}
                        onClick={() => {
                          setActiveRole('rider');
                          setRiderTab('available');
                          setDemoGuideStep(5);
                        }}
                      >
                        Switch to Rider View to Accept Delivery →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Live Inventory Management */}
      {pharmacyTab === 'inventory' && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-slate-900)' }}>
                Pharmacy Inventory Management
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-slate-500)' }}>
                Changes here immediately update customer-facing marketplace stock in real-time.
              </p>
            </div>

            <button
              className="btn btn-primary"
              style={{ fontSize: '0.85rem' }}
              onClick={() => setAddMedicineModal(true)}
            >
              <Plus size={16} />
              Add New Medicine
            </button>
          </div>

          {/* Inventory Table */}
          <div style={{
            background: '#ffffff',
            border: '1px solid var(--color-slate-200)',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: 'var(--color-slate-50)', borderBottom: '1px solid var(--color-slate-200)', color: 'var(--color-slate-600)', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '14px 18px' }}>Medicine Name &amp; Strength</th>
                  <th style={{ padding: '14px 18px' }}>Manufacturer</th>
                  <th style={{ padding: '14px 18px' }}>Rx Class</th>
                  <th style={{ padding: '14px 18px', textAlign: 'right' }}>Stock Qty</th>
                  <th style={{ padding: '14px 18px', textAlign: 'right' }}>Unit Price</th>
                  <th style={{ padding: '14px 18px' }}>Status</th>
                  <th style={{ padding: '14px 18px', textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {medicines.map(med => {
                  const isOutOfStock = med.stock === 0;
                  const isLowStock = med.stock > 0 && med.stock <= 10;

                  return (
                    <tr key={med.id} style={{ borderBottom: '1px solid var(--color-slate-100)' }}>
                      <td style={{ padding: '14px 18px' }}>
                        <div style={{ fontWeight: 800, color: 'var(--color-slate-900)' }}>{med.name}</div>
                        <div style={{ fontSize: '0.76rem', color: 'var(--color-slate-500)' }}>{med.brand} • {med.strength}</div>
                      </td>
                      <td style={{ padding: '14px 18px', color: 'var(--color-slate-600)' }}>
                        {med.manufacturer}
                      </td>
                      <td style={{ padding: '14px 18px' }}>
                        {med.prescriptionRequired ? (
                          <span className="badge badge-rx-required">Rx Required</span>
                        ) : (
                          <span className="badge badge-rx-otc">OTC</span>
                        )}
                      </td>
                      <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                        <span style={{
                          fontWeight: 800,
                          color: isOutOfStock ? 'var(--color-rose-600)' : isLowStock ? 'var(--color-amber-600)' : 'var(--color-slate-900)'
                        }}>
                          {med.stock} units
                        </span>
                      </td>
                      <td style={{ padding: '14px 18px', textAlign: 'right', fontWeight: 800, color: 'var(--color-slate-900)' }}>
                        ₹{med.price}
                      </td>
                      <td style={{ padding: '14px 18px' }}>
                        {isOutOfStock ? (
                          <span style={{ color: 'var(--color-rose-600)', fontWeight: 700, fontSize: '0.78rem' }}>
                            Out of Stock
                          </span>
                        ) : isLowStock ? (
                          <span style={{ color: 'var(--color-amber-600)', fontWeight: 700, fontSize: '0.78rem' }}>
                            Low Stock
                          </span>
                        ) : (
                          <span style={{ color: 'var(--color-primary-700)', fontWeight: 700, fontSize: '0.78rem' }}>
                            In Stock
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '14px 18px', textAlign: 'center' }}>
                        <button
                          className="btn btn-secondary"
                          style={{ padding: '4px 12px', fontSize: '0.78rem' }}
                          onClick={() => setEditingMedicine(med)}
                        >
                          <Edit2 size={13} />
                          Edit Stock/Price
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Edit Medicine Modal */}
          {editingMedicine && (
            <div className="modal-overlay" onClick={() => setEditingMedicine(null)}>
              <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 16 }}>
                  Edit {editingMedicine.name}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Current Stock Units</label>
                    <input
                      type="number"
                      className="search-input-field"
                      style={{ border: '1px solid var(--color-slate-300)', padding: 8, borderRadius: 6, width: '100%' }}
                      value={editingMedicine.stock}
                      onChange={e => setEditingMedicine({ ...editingMedicine, stock: parseInt(e.target.value) || 0 })}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Selling Price (₹)</label>
                    <input
                      type="number"
                      className="search-input-field"
                      style={{ border: '1px solid var(--color-slate-300)', padding: 8, borderRadius: 6, width: '100%' }}
                      value={editingMedicine.price}
                      onChange={e => setEditingMedicine({ ...editingMedicine, price: parseFloat(e.target.value) || 0 })}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 12 }}>
                    <button className="btn btn-secondary" onClick={() => setEditingMedicine(null)}>Cancel</button>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        updateMedicine(editingMedicine.id, {
                          stock: editingMedicine.stock,
                          price: editingMedicine.price
                        });
                        setEditingMedicine(null);
                      }}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Add Medicine Modal */}
          {addMedicineModal && (
            <div className="modal-overlay" onClick={() => setAddMedicineModal(false)}>
              <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 16 }}>
                  Add Medicine to Inventory
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Medicine Name (e.g. Cefixime 200mg)</label>
                    <input
                      type="text"
                      className="search-input-field"
                      style={{ border: '1px solid var(--color-slate-300)', padding: 8, borderRadius: 6, width: '100%' }}
                      value={newMedForm.name}
                      onChange={e => setNewMedForm({ ...newMedForm, name: e.target.value })}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Brand (e.g. Zifi 200)</label>
                      <input
                        type="text"
                        className="search-input-field"
                        style={{ border: '1px solid var(--color-slate-300)', padding: 8, borderRadius: 6, width: '100%' }}
                        value={newMedForm.brand}
                        onChange={e => setNewMedForm({ ...newMedForm, brand: e.target.value })}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Manufacturer</label>
                      <input
                        type="text"
                        className="search-input-field"
                        style={{ border: '1px solid var(--color-slate-300)', padding: 8, borderRadius: 6, width: '100%' }}
                        value={newMedForm.manufacturer}
                        onChange={e => setNewMedForm({ ...newMedForm, manufacturer: e.target.value })}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Strength</label>
                      <input
                        type="text"
                        className="search-input-field"
                        style={{ border: '1px solid var(--color-slate-300)', padding: 8, borderRadius: 6, width: '100%' }}
                        value={newMedForm.strength}
                        onChange={e => setNewMedForm({ ...newMedForm, strength: e.target.value })}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Price (₹)</label>
                      <input
                        type="number"
                        className="search-input-field"
                        style={{ border: '1px solid var(--color-slate-300)', padding: 8, borderRadius: 6, width: '100%' }}
                        value={newMedForm.price}
                        onChange={e => setNewMedForm({ ...newMedForm, price: parseFloat(e.target.value) || 0 })}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Initial Stock</label>
                      <input
                        type="number"
                        className="search-input-field"
                        style={{ border: '1px solid var(--color-slate-300)', padding: 8, borderRadius: 6, width: '100%' }}
                        value={newMedForm.stock}
                        onChange={e => setNewMedForm({ ...newMedForm, stock: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700 }}>
                      <input
                        type="checkbox"
                        checked={newMedForm.prescriptionRequired}
                        onChange={e => setNewMedForm({ ...newMedForm, prescriptionRequired: e.target.checked })}
                      />
                      <span>Prescription Required (Schedule H / H1 Drug)</span>
                    </label>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 12 }}>
                    <button className="btn btn-secondary" onClick={() => setAddMedicineModal(false)}>Cancel</button>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        if (!newMedForm.name) return;
                        addMedicine(newMedForm);
                        setAddMedicineModal(false);
                      }}
                    >
                      Add to Pharmacy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Pharmacy Earnings & Charts */}
      {pharmacyTab === 'earnings' && (
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-slate-900)' }}>
              Revenue &amp; Payout Analytics
            </h2>
            <span className="badge badge-rx-otc">T+1 Daily Direct Settlement</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginBottom: 24 }}>
            <div style={{ background: '#ffffff', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-slate-200)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-slate-500)', fontWeight: 700 }}>Today's Revenue</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-slate-900)', marginTop: 4 }}>
                ₹{pharmacyMetrics.todayRevenue.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-primary-600)', marginTop: 2 }}>24 Orders Fulfilled</div>
            </div>

            <div style={{ background: '#ffffff', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-slate-200)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-slate-500)', fontWeight: 700 }}>This Week</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-slate-900)', marginTop: 4 }}>
                ₹{pharmacyMetrics.weeklyRevenue.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-slate-500)', marginTop: 2 }}>142 Orders Fulfilled</div>
            </div>

            <div style={{ background: '#ffffff', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-slate-200)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-slate-500)', fontWeight: 700 }}>This Month</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-slate-900)', marginTop: 4 }}>
                ₹{pharmacyMetrics.monthlyRevenue.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-primary-600)', marginTop: 2 }}>↑ 24% month-over-month</div>
            </div>
          </div>

          {/* Interactive SVG Revenue Graph */}
          <div style={{
            background: '#ffffff',
            border: '1px solid var(--color-slate-200)',
            borderRadius: 'var(--radius-xl)',
            padding: '24px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-slate-900)' }}>
                  Daily Revenue Trajectory (Last 7 Days)
                </h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-slate-500)' }}>
                  Net pharmacy medicine sales after 10% platform fee
                </span>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <span className="badge badge-rx-otc">Live POS Synced</span>
              </div>
            </div>

            {/* SVG Bar Chart */}
            <svg viewBox="0 0 700 220" width="100%" height="220" style={{ overflow: 'visible' }}>
              <line x1="40" y1="180" x2="680" y2="180" stroke="#e2e8f0" stroke-width="1.5" />
              <line x1="40" y1="120" x2="680" y2="120" stroke="#f1f5f9" stroke-width="1" stroke-dasharray="4 4" />
              <line x1="40" y1="60" x2="680" y2="60" stroke="#f1f5f9" stroke-width="1" stroke-dasharray="4 4" />

              {/* Data bars */}
              {[
                { day: 'Wed', val: 6200, height: 75, x: 70 },
                { day: 'Thu', val: 7100, height: 86, x: 160 },
                { day: 'Fri', val: 8400, height: 102, x: 250 },
                { day: 'Sat', val: 9900, height: 120, x: 340 },
                { day: 'Sun', val: 10800, height: 132, x: 430 },
                { day: 'Mon', val: 7800, height: 95, x: 520 },
                { day: 'Today', val: 8450, height: 104, x: 610, active: true }
              ].map((bar, i) => (
                <g key={i}>
                  <rect
                    x={bar.x - 22}
                    y={180 - bar.height}
                    width="44"
                    height={bar.height}
                    rx="6"
                    fill={bar.active ? '#059669' : '#cbd5e1'}
                    style={{ transition: 'all 0.3s ease' }}
                  />
                  <text x={bar.x} y="200" font-size="12" font-weight="600" text-anchor="middle" fill="#64748b">
                    {bar.day}
                  </text>
                  <text x={bar.x} y={170 - bar.height} font-size="11" font-weight="700" text-anchor="middle" fill={bar.active ? '#047857' : '#475569'}>
                    ₹{bar.val}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
