import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import LandingView from './views/LandingView';
import CustomerPortal from './views/CustomerPortal';
import PharmacistPortal from './views/PharmacistPortal';
import RiderPortal from './views/RiderPortal';
import AdminPortal from './views/AdminPortal';
import DemoTourModal from './components/DemoTourModal';
import ToastContainer from './components/ToastContainer';
import { ShieldCheck, Heart, Pill } from 'lucide-react';
import './index.css';

function MainContent() {
  const { activeRole, setActiveRole } = useApp();

  return (
    <div className="app-shell" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1, paddingBottom: 60 }}>
        {activeRole === 'landing' && <LandingView />}
        {activeRole === 'customer' && <CustomerPortal />}
        {activeRole === 'pharmacist' && <PharmacistPortal />}
        {activeRole === 'rider' && <RiderPortal />}
        {activeRole === 'admin' && <AdminPortal />}
      </main>

      {/* Footer */}
      <footer style={{
        background: 'var(--color-slate-900)',
        color: 'var(--color-slate-400)',
        borderTop: '1px solid var(--color-slate-800)',
        padding: '36px 20px',
        fontSize: '0.86rem'
      }}>
        <div style={{
          maxWidth: 1320,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 20
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              background: '#ffffff',
              padding: '4px 10px',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center'
            }}>
              <img src="/logo.png" alt="MediT Logo" style={{ height: 26, width: 'auto', objectFit: 'contain' }} />
            </div>
            <div>
              <div style={{ color: '#ffffff', fontWeight: 800, fontSize: '0.92rem' }}>
                MEDiT <span style={{ color: 'var(--color-primary-400)', fontSize: '0.8rem', fontWeight: 500 }}>Health Logistics</span>
              </div>
              <div style={{ fontSize: '0.78rem' }}>Medicines. Nearby. Delivered.</div>
            </div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '8px 16px',
            borderRadius: 'var(--radius-full)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            color: '#ffffff',
            fontSize: '0.8rem'
          }}>
            <ShieldCheck size={16} style={{ color: 'var(--color-primary-400)' }} />
            <span><strong>Clinical Safety Rule:</strong> AI-assisted analysis — Final verification must be performed by a licensed pharmacist.</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button
              onClick={() => setActiveRole('landing')}
              style={{ background: 'none', border: 'none', color: 'var(--color-slate-400)', cursor: 'pointer', fontSize: '0.84rem' }}
            >
              Landing
            </button>
            <button
              onClick={() => setActiveRole('customer')}
              style={{ background: 'none', border: 'none', color: 'var(--color-slate-400)', cursor: 'pointer', fontSize: '0.84rem' }}
            >
              Customer
            </button>
            <button
              onClick={() => setActiveRole('pharmacist')}
              style={{ background: 'none', border: 'none', color: 'var(--color-slate-400)', cursor: 'pointer', fontSize: '0.84rem' }}
            >
              Pharmacist
            </button>
            <button
              onClick={() => setActiveRole('rider')}
              style={{ background: 'none', border: 'none', color: 'var(--color-slate-400)', cursor: 'pointer', fontSize: '0.84rem' }}
            >
              Rider
            </button>
            <button
              onClick={() => setActiveRole('admin')}
              style={{ background: 'none', border: 'none', color: 'var(--color-slate-400)', cursor: 'pointer', fontSize: '0.84rem' }}
            >
              Admin
            </button>
          </div>
        </div>
      </footer>

      {/* Global Interactive Modals & Toast Container */}
      <DemoTourModal />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
