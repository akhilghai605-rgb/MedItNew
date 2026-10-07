import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShoppingBag,
  Bike,
  Store,
  ShieldCheck,
  ArrowRight,
  Pill,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default function LandingView() {
  const { setActiveRole, setCustomerTab, setPharmacyTab, setRiderTab, setDemoModalOpen } = useApp();
  const [hoveredCard, setHoveredCard] = useState(null);

  const roles = [
    {
      id: 'customer',
      title: "I'm a Customer",
      description: "Search for medicines, upload prescriptions, and order from nearby pharmacies.",
      buttonText: "Order Medicines",
      icon: ShoppingBag,
      colorTheme: {
        primary: 'var(--color-primary-600)',
        bgBadge: 'var(--color-primary-50)',
        borderBadge: 'var(--color-primary-200)',
        buttonBg: 'var(--color-primary-600)',
        buttonHover: 'var(--color-primary-700)',
        accent: '#059669'
      },
      highlights: [
        'Search local medicine stock',
        'Upload doctor prescription',
        'Simple doorstep order status'
      ],
      onSelect: () => {
        setActiveRole('customer');
        setCustomerTab('home');
      }
    },
    {
      id: 'rider',
      title: "I'm a Rider",
      description: "Accept deliveries, complete orders, and manage your earnings.",
      buttonText: "Rider Dashboard",
      icon: Bike,
      colorTheme: {
        primary: '#0284c7',
        bgBadge: '#f0f9ff',
        borderBadge: '#bae6fd',
        buttonBg: '#0284c7',
        buttonHover: '#0369a1',
        accent: '#0ea5e9'
      },
      highlights: [
        'View available pickup requests',
        'One-tap pickup & delivery updates',
        'Track daily earnings & ratings'
      ],
      onSelect: () => {
        setActiveRole('rider');
        setRiderTab('available');
      }
    },
    {
      id: 'pharmacist',
      title: "I'm a Pharmacist",
      description: "Manage medicines, verify prescriptions, and manage pharmacy orders.",
      buttonText: "Pharmacy Dashboard",
      icon: Store,
      colorTheme: {
        primary: '#0f766e',
        bgBadge: '#f0fdfa',
        borderBadge: '#99f6e4',
        buttonBg: '#0f766e',
        buttonHover: '#115e59',
        accent: '#14b8a6'
      },
      highlights: [
        'Review AI-assisted prescription scans',
        'Make manual verification decisions',
        'Manage live inventory & order packing'
      ],
      onSelect: () => {
        setActiveRole('pharmacist');
        setPharmacyTab('verify_rx');
      }
    }
  ];

  return (
    <div style={{
      minHeight: 'calc(100vh - 180px)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '48px 20px',
      background: 'linear-gradient(180deg, #ffffff 0%, var(--color-slate-50) 100%)'
    }}>
      <div style={{ maxWidth: 1120, width: '100%', margin: '0 auto', textAlign: 'center' }}>

        {/* Brand Logo & Header */}
        <div style={{ marginBottom: 44 }}>
          {/* Logo badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            background: 'var(--color-primary-50)',
            border: '1px solid var(--color-primary-200)',
            padding: '6px 16px',
            borderRadius: 'var(--radius-full)',
            marginBottom: 20
          }}>
            <div style={{
              width: 22,
              height: 22,
              borderRadius: 'var(--radius-full)',
              background: 'var(--color-primary-600)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Pill size={13} />
            </div>
            <span style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--color-primary-800)', letterSpacing: '0.02em' }}>
              MEDiT HEALTH PLATFORM
            </span>
          </div>

          {/* Main Title Logo */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 14 }}>
            <img
              src="/logo.png"
              alt="MediT"
              style={{
                height: 'clamp(58px, 9vw, 84px)',
                width: 'auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0 4px 14px rgba(16, 185, 129, 0.18))'
              }}
            />
          </div>
          <h1 style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0 }}>
            MEDiT — Medicines. Nearby. Delivered.
          </h1>

          {/* Tagline */}
          <p style={{
            fontSize: 'clamp(1.2rem, 2.5vw, 1.55rem)',
            fontWeight: 700,
            color: 'var(--color-primary-700)',
            marginBottom: 14,
            letterSpacing: '-0.02em'
          }}>
            Medicines. Nearby. Delivered.
          </p>

          {/* Prompt */}
          <h2 style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
            fontWeight: 600,
            color: 'var(--color-slate-600)'
          }}>
            How are you using MEDiT?
          </h2>
        </div>

        {/* 3 Role Selection Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24,
          alignItems: 'stretch',
          marginBottom: 44
        }}>
          {roles.map(role => {
            const IconComponent = role.icon;
            const isHovered = hoveredCard === role.id;

            return (
              <div
                key={role.id}
                onClick={role.onSelect}
                onMouseEnter={() => setHoveredCard(role.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: '#ffffff',
                  border: isHovered
                    ? `2px solid ${role.colorTheme.accent}`
                    : '1px solid var(--color-slate-200)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '36px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                  boxShadow: isHovered
                    ? '0 20px 30px -10px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.05)'
                    : 'var(--shadow-sm)',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative'
                }}
              >
                <div>
                  {/* Role Icon */}
                  <div style={{
                    width: 58,
                    height: 58,
                    borderRadius: 'var(--radius-lg)',
                    background: role.colorTheme.bgBadge,
                    border: `1px solid ${role.colorTheme.borderBadge}`,
                    color: role.colorTheme.primary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 20,
                    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.2s ease'
                  }}>
                    <IconComponent size={28} />
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontSize: '1.45rem',
                    fontWeight: 800,
                    color: 'var(--color-slate-900)',
                    marginBottom: 10,
                    letterSpacing: '-0.02em'
                  }}>
                    {role.title}
                  </h3>

                  {/* Short Description */}
                  <p style={{
                    fontSize: '0.94rem',
                    color: 'var(--color-slate-600)',
                    lineHeight: 1.5,
                    marginBottom: 22
                  }}>
                    {role.description}
                  </p>

                  {/* Highlights Checklist */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    marginBottom: 28,
                    borderTop: '1px solid var(--color-slate-100)',
                    paddingTop: 16
                  }}>
                    {role.highlights.map((h, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.84rem', color: 'var(--color-slate-600)' }}>
                        <CheckCircle2 size={15} style={{ color: role.colorTheme.primary, flexShrink: 0 }} />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Primary Action Button */}
                <div>
                  <button
                    className="btn"
                    style={{
                      width: '100%',
                      padding: '14px 20px',
                      fontSize: '0.98rem',
                      fontWeight: 700,
                      color: '#ffffff',
                      background: isHovered ? role.colorTheme.buttonHover : role.colorTheme.buttonBg,
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      transition: 'all 0.2s ease',
                      boxShadow: isHovered ? '0 4px 12px rgba(15, 23, 42, 0.15)' : 'none'
                    }}
                  >
                    <span>{role.buttonText}</span>
                    <ArrowRight
                      size={18}
                      style={{
                        transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                        transition: 'transform 0.2s ease'
                      }}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clinical Safety Guarantee Bar */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(8px)',
          border: '1px solid var(--color-slate-200)',
          borderRadius: 'var(--radius-full)',
          padding: '10px 20px',
          boxShadow: 'var(--shadow-xs)',
          maxWidth: '90%'
        }}>
          <ShieldCheck size={18} style={{ color: 'var(--color-primary-600)', flexShrink: 0 }} />
          <span style={{ fontSize: '0.84rem', color: 'var(--color-slate-700)', fontWeight: 600 }}>
            AI-assisted analysis — Final verification must be performed by a licensed pharmacist.
          </span>
        </div>

      </div>
    </div>
  );
}
