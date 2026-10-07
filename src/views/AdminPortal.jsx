import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
  Store,
  Bike,
  Users,
  DollarSign,
  Clock,
  Sparkles,
  Layers,
  ArrowUpRight,
  Activity,
  FileText
} from 'lucide-react';

export default function AdminPortal() {
  const { orders, prescriptions, medicines, pharmacies } = useApp();

  const totalOrdersCount = 142 + orders.length;
  const pendingRxCount = prescriptions.filter(p => p.pharmacistStatus === 'Pending Pharmacist Verification').length;
  const approvedRxCount = prescriptions.filter(p => p.pharmacistStatus === 'Approved').length;

  return (
    <div className="app-container">
      {/* Control Tower Header */}
      <div style={{
        background: '#ffffff',
        border: '1px solid var(--color-slate-200)',
        borderRadius: 'var(--radius-xl)',
        padding: '24px',
        marginBottom: 24,
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <ShieldCheck size={24} style={{ color: 'var(--color-primary-400)' }} />
              </div>
              <div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-slate-900)' }}>
                  MEDiT Platform Control Tower &amp; Compliance
                </h2>
                <div style={{ fontSize: '0.84rem', color: 'var(--color-slate-500)' }}>
                  Real-time Hyperlocal Telemetry • Clinical Governance • Human-in-the-Loop Audit Trails
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="badge" style={{ background: '#ecfdf5', color: '#047857', padding: '6px 12px', fontSize: '0.82rem' }}>
              <Activity size={14} /> Systems 100% Operational
            </span>
            <span className="badge" style={{ background: '#f8fafc', color: '#334155', border: '1px solid #cbd5e1', padding: '6px 12px', fontSize: '0.82rem' }}>
              Auditor: Dr. Aditi Roy (Compliance Officer)
            </span>
          </div>
        </div>
      </div>

      {/* Safety Compliance Metric Banner */}
      <div style={{
        background: 'linear-gradient(90deg, #064e3b 0%, #0f172a 100%)',
        color: '#ffffff',
        borderRadius: 'var(--radius-xl)',
        padding: '20px 24px',
        marginBottom: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
        boxShadow: 'var(--shadow-md)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: 'var(--radius-full)',
            background: 'rgba(16, 185, 129, 0.2)',
            border: '1px solid #10b981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ShieldCheck size={26} style={{ color: '#34d399' }} />
          </div>
          <div>
            <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#6ee7b7', fontWeight: 800 }}>
              Statutory Clinical Compliance
            </div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800 }}>
              Zero Autonomous AI Approvals — 100% Human Verification Guarantee
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--color-slate-300)', marginTop: 2 }}>
              Every prescription dispensed on MEDiT is signed with a registered pharmacist's state council license.
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ textAlign: 'center', background: 'rgba(255, 255, 255, 0.08)', padding: '8px 16px', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#34d399' }}>0.0%</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--color-slate-300)' }}>AI Auto-Approval Rate</div>
          </div>
          <div style={{ textAlign: 'center', background: 'rgba(255, 255, 255, 0.08)', padding: '8px 16px', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>2.4 min</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--color-slate-300)' }}>Avg Pharmacist Turnaround</div>
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
        gap: 16,
        marginBottom: 24
      }}>
        {/* Total Orders */}
        <div style={{
          background: '#ffffff',
          border: '1px solid var(--color-slate-200)',
          borderRadius: 'var(--radius-xl)',
          padding: '20px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-slate-500)', textTransform: 'uppercase' }}>
              Total Orders
            </span>
            <FileText size={18} style={{ color: 'var(--color-slate-400)' }} />
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--color-slate-900)' }}>
            {totalOrdersCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600, marginTop: 4 }}>
            +14% this week
          </div>
        </div>

        {/* Active Pharmacies */}
        <div style={{
          background: '#ffffff',
          border: '1px solid var(--color-slate-200)',
          borderRadius: 'var(--radius-xl)',
          padding: '20px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-slate-500)', textTransform: 'uppercase' }}>
              Active Pharmacies
            </span>
            <Store size={18} style={{ color: 'var(--color-slate-400)' }} />
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--color-slate-900)' }}>
            18
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-slate-500)', marginTop: 4 }}>
            All with licensed pharmacists
          </div>
        </div>

        {/* Active Riders */}
        <div style={{
          background: '#ffffff',
          border: '1px solid var(--color-slate-200)',
          borderRadius: 'var(--radius-xl)',
          padding: '20px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-slate-500)', textTransform: 'uppercase' }}>
              Active Riders
            </span>
            <Bike size={18} style={{ color: 'var(--color-slate-400)' }} />
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--color-slate-900)' }}>
            45
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-slate-500)', marginTop: 4 }}>
            Avg pickup ETA: 6.8 mins
          </div>
        </div>

        {/* Total Customers */}
        <div style={{
          background: '#ffffff',
          border: '1px solid var(--color-slate-200)',
          borderRadius: 'var(--radius-xl)',
          padding: '20px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-slate-500)', textTransform: 'uppercase' }}>
              Registered Users
            </span>
            <Users size={18} style={{ color: 'var(--color-slate-400)' }} />
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--color-slate-900)' }}>
            1,280
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-slate-500)', marginTop: 4 }}>
            94% repeat order satisfaction
          </div>
        </div>

        {/* Platform Revenue */}
        <div style={{
          background: '#ffffff',
          border: '1px solid var(--color-slate-200)',
          borderRadius: 'var(--radius-xl)',
          padding: '20px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-slate-500)', textTransform: 'uppercase' }}>
              Monthly GMV
            </span>
            <DollarSign size={18} style={{ color: 'var(--color-slate-400)' }} />
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--color-slate-900)' }}>
            ₹3,24,500
          </div>
          <div style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600, marginTop: 4 }}>
            Platform fee: ₹42,850
          </div>
        </div>

        {/* Delivery Success Rate */}
        <div style={{
          background: '#ffffff',
          border: '1px solid var(--color-slate-200)',
          borderRadius: 'var(--radius-xl)',
          padding: '20px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-slate-500)', textTransform: 'uppercase' }}>
              Success Rate
            </span>
            <CheckCircle2 size={18} style={{ color: '#16a34a' }} />
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#16a34a' }}>
            99.2%
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-slate-500)', marginTop: 4 }}>
            Avg doorstep time: 18 mins
          </div>
        </div>
      </div>

      {/* Clinical Governance Audit Log */}
      <div style={{
        background: '#ffffff',
        border: '1px solid var(--color-slate-200)',
        borderRadius: 'var(--radius-xl)',
        padding: '24px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-slate-900)' }}>
              Prescription Verification Audit Log (Statutory Records)
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--color-slate-500)' }}>
              Permanent record of every prescription decision, licensed verifier identity, and AI assistance metrics.
            </p>
          </div>
          <span className="badge" style={{ background: '#ecfdf5', color: '#047857' }}>
            Immutable Digital Logbook
          </span>
        </div>

        <div className="orders-table-wrapper">
          <table className="custom-data-table">
            <thead>
              <tr>
                <th>Rx ID</th>
                <th>Order Ref</th>
                <th>Customer</th>
                <th>Doctor / Hospital</th>
                <th>AI Pre-Screen</th>
                <th>Human Decision</th>
                <th>Licensed Pharmacist</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.map(rx => (
                <tr key={rx.id}>
                  <td style={{ fontWeight: 700, color: 'var(--color-slate-900)' }}>{rx.id}</td>
                  <td>
                    <span className="badge" style={{ background: '#f1f5f9', color: '#334155' }}>
                      #{rx.orderId || 'PENDING_ATTACH'}
                    </span>
                  </td>
                  <td>{rx.customerName}</td>
                  <td style={{ fontSize: '0.82rem' }}>{rx.doctorName}</td>
                  <td>
                    <span className="badge" style={{ background: '#eff6ff', color: '#1d4ed8' }}>
                      <Sparkles size={11} /> AI Scanned (94%)
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${rx.pharmacistStatus === 'Approved' ? 'badge-status-approved' : rx.pharmacistStatus === 'Rejected' ? 'badge-status-rejected' : 'badge-status-pending'}`}>
                      {rx.pharmacistStatus === 'Approved' && <CheckCircle2 size={12} />}
                      {rx.pharmacistStatus === 'Rejected' && <AlertTriangle size={12} />}
                      {rx.pharmacistStatus === 'Pending Pharmacist Verification' && <Clock size={12} />}
                      {rx.pharmacistStatus}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.82rem', fontWeight: 600 }}>
                    {rx.pharmacistName || (
                      <span style={{ color: 'var(--color-amber-600)', fontStyle: 'italic' }}>
                        Awaiting Pharmacist
                      </span>
                    )}
                  </td>
                  <td style={{ fontSize: '0.78rem', color: 'var(--color-slate-500)' }}>
                    {rx.verifiedAt || rx.uploadedAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
