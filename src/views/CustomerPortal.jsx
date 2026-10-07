import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SAMPLE_PRESCRIPTION_IMAGE } from '../data/mockData';
import {
  Search,
  Plus,
  Minus,
  ShoppingCart,
  Trash2,
  FileText,
  UploadCloud,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Store,
  MapPin,
  Check,
  User,
  Star,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

export default function CustomerPortal() {
  const {
    customerTab,
    setCustomerTab,
    medicines,
    cart,
    addToCart,
    updateCartQty,
    removeFromCart,
    isCartPrescriptionRequired,
    placeOrder,
    uploadPrescription,
    prescriptions,
    orders,
    activeTrackingOrderId,
    setActiveTrackingOrderId,
    pharmacies,
    selectedPharmacyId,
    setSelectedPharmacyId,
    setActiveRole
  } = useApp();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Prescription Upload state
  const [previewUrl, setPreviewUrl] = useState(SAMPLE_PRESCRIPTION_IMAGE);
  const [isAiScanning, setIsAiScanning] = useState(false);
  const [attachedRxId, setAttachedRxId] = useState(prescriptions[0]?.id || null);

  // Address edit state
  const [deliveryAddress, setDeliveryAddress] = useState('Flat 402, Palm Heights, Green Park Main, New Delhi 110016');
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  // Focus active order
  const activeOrder = orders.find(o => o.id === activeTrackingOrderId) || orders[0];

  // Cart calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.medicine.price * item.quantity), 0);
  const deliveryFee = cart.length > 0 ? 30 : 0;
  const packagingFee = cart.length > 0 ? 15 : 0;
  const cartTotal = cartSubtotal + deliveryFee + packagingFee;

  // Filtered medicines
  const filteredMedicines = medicines.filter(med => {
    const matchesSearch = med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || med.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const categories = ['All', 'Pain & Fever Relief', 'Antibiotics', 'Gastrointestinal', 'Diabetes Care', 'Allergy & Cold', 'Vitamins & Supplements'];

  // Prescription file upload handler
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsAiScanning(true);
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
      setTimeout(() => {
        const newRx = uploadPrescription({
          fileName: file.name,
          fileUrl: reader.result,
          fileType: file.type
        });
        setAttachedRxId(newRx.id);
        setIsAiScanning(false);
      }, 900);
    };
    reader.readAsDataURL(file);
  };

  const handleUseSamplePrescription = () => {
    setIsAiScanning(true);
    setPreviewUrl(SAMPLE_PRESCRIPTION_IMAGE);
    setTimeout(() => {
      const newRx = uploadPrescription({
        fileName: 'prescription_dr_rajesh_gupta.svg',
        fileUrl: SAMPLE_PRESCRIPTION_IMAGE,
        fileType: 'image/svg+xml'
      });
      setAttachedRxId(newRx.id);
      setIsAiScanning(false);
    }, 800);
  };

  // Determine stage index for simple status
  // 0: Order Placed
  // 1: Pharmacist Verified
  // 2: Preparing
  // 3: Ready for Pickup
  // 4: Delivered
  const getStageIndex = (status) => {
    if (!status) return 0;
    if (status === 'Delivered') return 4;
    if (status === 'Ready for Pickup' || status === 'Picked Up' || status === 'Out for Delivery') return 3;
    if (status === 'Preparing') return 2;
    if (status === 'Prescription Approved' || status === 'Pharmacist Verified') return 1;
    return 0; // 'Prescription Pending' or 'Order Placed'
  };

  return (
    <div className="app-container" style={{ maxWidth: 1040, margin: '0 auto', padding: '24px 20px' }}>

      {/* =========================================================================
          VIEW 1: HOMEPAGE (Extremely Simple, Customer-Centric)
          ========================================================================= */}
      {customerTab === 'home' && (
        <div>
          {/* Top Hero Search Banner */}
          <div style={{
            background: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)',
            color: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            padding: '36px 32px',
            marginBottom: 28,
            boxShadow: 'var(--shadow-md)',
            position: 'relative'
          }}>
            <div style={{ maxWidth: 640 }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: 'rgba(255, 255, 255, 0.15)',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: 600,
                marginBottom: 14
              }}>
                <ShieldCheck size={14} style={{ color: '#34d399' }} />
                <span>Hyperlocal • Delivered from Nearby Pharmacies</span>
              </div>

              <h2 style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
                What medicine do you need?
              </h2>

              {/* Large search bar */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: '#ffffff',
                borderRadius: 'var(--radius-lg)',
                padding: '6px 14px',
                boxShadow: 'var(--shadow-lg)'
              }}>
                <Search size={22} style={{ color: 'var(--color-slate-400)', marginRight: 10 }} />
                <input
                  type="text"
                  placeholder="Search medicines (e.g. Paracetamol, Augmentin, Pan 40)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') setCustomerTab('medicines');
                  }}
                  style={{
                    border: 'none',
                    outline: 'none',
                    fontSize: '1rem',
                    width: '100%',
                    padding: '8px 0',
                    color: 'var(--color-slate-900)'
                  }}
                />
                <button
                  className="btn btn-primary"
                  onClick={() => setCustomerTab('medicines')}
                  style={{ padding: '8px 18px', fontSize: '0.9rem', borderRadius: 'var(--radius-md)' }}
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 16,
            marginBottom: 32
          }}>
            <div
              onClick={() => setCustomerTab('medicines')}
              style={{
                background: '#ffffff',
                border: '1px solid var(--color-slate-200)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: 'var(--shadow-xs)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-primary-400)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-slate-200)'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--color-primary-50)',
                  color: 'var(--color-primary-600)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Search size={22} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--color-slate-900)' }}>
                    Search Medicines
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-slate-500)' }}>
                    Browse catalogue with live stock
                  </div>
                </div>
              </div>
              <ChevronRight size={18} style={{ color: 'var(--color-slate-400)' }} />
            </div>

            <div
              onClick={() => setCustomerTab('upload_rx')}
              style={{
                background: '#ffffff',
                border: '1px solid var(--color-slate-200)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: 'var(--shadow-xs)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-primary-400)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-slate-200)'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: 'var(--radius-md)',
                  background: '#fef3c7',
                  color: '#d97706',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <UploadCloud size={22} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--color-slate-900)' }}>
                    Upload Prescription
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-slate-500)' }}>
                    Get pharmacist verification
                  </div>
                </div>
              </div>
              <ChevronRight size={18} style={{ color: 'var(--color-slate-400)' }} />
            </div>
          </div>

          {/* Active Order Notice (If any order is ongoing) */}
          {activeOrder && activeOrder.status !== 'Delivered' && (
            <div style={{
              background: '#ffffff',
              border: '1px solid #bfdbfe',
              borderRadius: 'var(--radius-lg)',
              padding: '16px 20px',
              marginBottom: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 12
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: 'var(--radius-full)',
                  background: '#eff6ff',
                  color: '#2563eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Clock size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--color-slate-900)' }}>
                    Current Order: #{activeOrder.id} ({activeOrder.pharmacyName})
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-slate-600)' }}>
                    Status: <strong>{activeOrder.status}</strong> • ₹{activeOrder.totalAmount}
                  </div>
                </div>
              </div>
              <button
                className="btn btn-secondary"
                style={{ fontSize: '0.84rem', padding: '6px 14px' }}
                onClick={() => setCustomerTab('orders')}
              >
                View Order Status →
              </button>
            </div>
          )}

          {/* Section: Nearby Pharmacies */}
          <div style={{ marginBottom: 36 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-slate-900)' }}>
                  Nearby Pharmacies
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--color-slate-500)' }}>
                  Licensed pharmacies within your local neighbourhood
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
              {pharmacies.map(pharm => (
                <div
                  key={pharm.id}
                  style={{
                    background: '#ffffff',
                    border: '1px solid var(--color-slate-200)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '20px',
                    boxShadow: 'var(--shadow-xs)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
                    <div>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-slate-900)', marginBottom: 2 }}>
                        {pharm.name}
                      </h4>
                      <div style={{ fontSize: '0.82rem', color: 'var(--color-slate-500)', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <MapPin size={13} /> {pharm.distanceKm} km away
                      </div>
                    </div>
                    <span className="badge" style={{ background: '#ecfdf5', color: '#047857' }}>
                      Open
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', color: 'var(--color-slate-600)', marginBottom: 16 }}>
                    <span style={{ color: '#d97706', fontWeight: 700 }}>⭐ {pharm.rating}</span>
                    <span>• {pharm.pharmacistName}</span>
                  </div>

                  <button
                    className="btn btn-secondary"
                    style={{ width: '100%', padding: '8px', fontSize: '0.86rem' }}
                    onClick={() => {
                      setSelectedPharmacyId(pharm.id);
                      setCustomerTab('medicines');
                    }}
                  >
                    View Medicines
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Popular Medicines */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-slate-900)' }}>
                  Popular Medicines
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--color-slate-500)' }}>
                  Commonly ordered medicines from Sharma Medical Store
                </p>
              </div>
              <button
                className="btn btn-secondary"
                style={{ fontSize: '0.82rem', padding: '6px 12px' }}
                onClick={() => setCustomerTab('medicines')}
              >
                View All Medicines →
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
              {medicines.slice(0, 4).map(med => {
                const cartItem = cart.find(c => c.medicineId === med.id);
                return (
                  <div
                    key={med.id}
                    style={{
                      background: '#ffffff',
                      border: '1px solid var(--color-slate-200)',
                      borderRadius: 'var(--radius-lg)',
                      padding: '18px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: 'var(--shadow-xs)'
                    }}
                  >
                    <div>
                      {med.prescriptionRequired ? (
                        <span className="badge badge-rx-required" style={{ marginBottom: 8, fontSize: '0.68rem' }}>
                          Prescription Required
                        </span>
                      ) : (
                        <span className="badge badge-rx-otc" style={{ marginBottom: 8, fontSize: '0.68rem' }}>
                          OTC
                        </span>
                      )}

                      <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--color-slate-900)', marginBottom: 4 }}>
                        {med.name}
                      </h4>

                      <div style={{ fontSize: '0.8rem', color: 'var(--color-slate-500)', marginBottom: 12 }}>
                        {med.strength} • {med.dosageForm}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
                      <div>
                        <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-slate-900)' }}>
                          ₹{med.price}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: 600 }}>
                          ✓ In Stock ({med.stock})
                        </div>
                      </div>

                      {cartItem ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <button
                            className="btn btn-secondary"
                            style={{ padding: '4px 8px', minWidth: 28 }}
                            onClick={() => updateCartQty(med.id, cartItem.quantity - 1)}
                          >
                            <Minus size={14} />
                          </button>
                          <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>{cartItem.quantity}</span>
                          <button
                            className="btn btn-secondary"
                            style={{ padding: '4px 8px', minWidth: 28 }}
                            onClick={() => updateCartQty(med.id, cartItem.quantity + 1)}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      ) : (
                        <button
                          className="btn btn-primary"
                          style={{ padding: '6px 14px', fontSize: '0.84rem' }}
                          onClick={() => addToCart(med)}
                        >
                          + Add
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 2: MEDICINES SEARCH & CATALOG (Clean, Direct, Non-Technical)
          ========================================================================= */}
      {customerTab === 'medicines' && (
        <div>
          {/* Header & Simple Search Input */}
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-slate-900)', marginBottom: 8 }}>
              Find Medicines
            </h2>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: '#ffffff',
              border: '1px solid var(--color-slate-300)',
              borderRadius: 'var(--radius-md)',
              padding: '8px 14px',
              boxShadow: 'var(--shadow-xs)'
            }}>
              <Search size={18} style={{ color: 'var(--color-slate-400)', marginRight: 10 }} />
              <input
                type="text"
                placeholder="Search by medicine name, brand, or salt (e.g. Paracetamol, Augmentin)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.95rem' }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ background: 'none', border: 'none', color: 'var(--color-slate-400)', cursor: 'pointer' }}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div style={{
            display: 'flex',
            gap: 8,
            overflowX: 'auto',
            paddingBottom: 8,
            marginBottom: 20
          }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  background: selectedCategory === cat ? 'var(--color-primary-600)' : '#ffffff',
                  color: selectedCategory === cat ? '#ffffff' : 'var(--color-slate-700)',
                  border: '1px solid',
                  borderColor: selectedCategory === cat ? 'var(--color-primary-600)' : 'var(--color-slate-300)',
                  borderRadius: 'var(--radius-full)',
                  padding: '6px 14px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Medicines Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {filteredMedicines.map(med => {
              const inCart = cart.find(ci => ci.medicineId === med.id);
              return (
                <div
                  key={med.id}
                  style={{
                    background: '#ffffff',
                    border: '1px solid var(--color-slate-200)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: 'var(--shadow-xs)'
                  }}
                >
                  <div>
                    {/* Badge */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                      {med.prescriptionRequired ? (
                        <span className="badge badge-rx-required">
                          Prescription Required
                        </span>
                      ) : (
                        <span className="badge badge-rx-otc">
                          OTC
                        </span>
                      )}
                      <span style={{ fontSize: '0.78rem', color: 'var(--color-slate-500)' }}>
                        {med.distanceKm} km away
                      </span>
                    </div>

                    {/* Name & Details */}
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-slate-900)', marginBottom: 4 }}>
                      {med.name}
                    </h3>

                    <div style={{ fontSize: '0.82rem', color: 'var(--color-slate-500)', marginBottom: 8 }}>
                      {med.brand} • {med.strength}
                    </div>

                    <div style={{ fontSize: '0.78rem', color: 'var(--color-slate-600)', marginBottom: 14 }}>
                      Store: <strong>{med.pharmacyName}</strong>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: '1px solid var(--color-slate-100)',
                    paddingTop: 14
                  }}>
                    <div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-slate-900)' }}>
                        ₹{med.price}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: med.stock > 0 ? '#16a34a' : '#e11d48', fontWeight: 600 }}>
                        {med.stock > 0 ? `✓ In Stock (${med.stock})` : '✕ Out of Stock'}
                      </div>
                    </div>

                    {inCart ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <button
                          className="btn btn-secondary"
                          style={{ padding: '6px 10px' }}
                          onClick={() => updateCartQty(med.id, inCart.quantity - 1)}
                        >
                          <Minus size={14} />
                        </button>
                        <span style={{ fontWeight: 800, fontSize: '0.92rem' }}>{inCart.quantity}</span>
                        <button
                          className="btn btn-secondary"
                          style={{ padding: '6px 10px' }}
                          onClick={() => updateCartQty(med.id, inCart.quantity + 1)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    ) : (
                      <button
                        className="btn btn-primary"
                        disabled={med.stock <= 0}
                        style={{ padding: '8px 18px', fontSize: '0.86rem' }}
                        onClick={() => addToCart(med)}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 3: CART (Familiar, Simple, Clear Breakdown)
          ========================================================================= */}
      {customerTab === 'cart' && (
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-slate-900)', marginBottom: 6 }}>
            Your Cart
          </h2>
          <p style={{ fontSize: '0.86rem', color: 'var(--color-slate-500)', marginBottom: 20 }}>
            Ordering from <strong>Sharma Medical Store</strong> (1.2 km away)
          </p>

          {cart.length === 0 ? (
            <div style={{
              background: '#ffffff',
              border: '1px solid var(--color-slate-200)',
              borderRadius: 'var(--radius-xl)',
              padding: '48px 20px',
              textAlign: 'center'
            }}>
              <ShoppingCart size={40} style={{ color: 'var(--color-slate-300)', margin: '0 auto 12px' }} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-slate-800)', marginBottom: 6 }}>
                Your cart is empty
              </h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--color-slate-500)', marginBottom: 18 }}>
                Explore medicines from nearby pharmacies to add to your order.
              </p>
              <button className="btn btn-primary" onClick={() => setCustomerTab('medicines')}>
                Browse Medicines
              </button>
            </div>
          ) : (
            <div style={{
              background: '#ffffff',
              border: '1px solid var(--color-slate-200)',
              borderRadius: 'var(--radius-xl)',
              padding: '24px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              {/* Cart Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
                {cart.map(item => (
                  <div
                    key={item.medicineId}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingBottom: 14,
                      borderBottom: '1px solid var(--color-slate-100)'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.96rem', color: 'var(--color-slate-900)' }}>
                        {item.medicine.name}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-slate-500)' }}>
                        ₹{item.medicine.price} each • {item.medicine.strength}
                      </div>
                      {item.medicine.prescriptionRequired && (
                        <span className="badge badge-rx-required" style={{ marginTop: 4, fontSize: '0.68rem' }}>
                          Prescription Required
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <button
                          className="btn btn-secondary"
                          style={{ padding: '4px 8px' }}
                          onClick={() => updateCartQty(item.medicineId, item.quantity - 1)}
                        >
                          <Minus size={14} />
                        </button>
                        <span style={{ fontWeight: 800, minWidth: 20, textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          className="btn btn-secondary"
                          style={{ padding: '4px 8px' }}
                          onClick={() => updateCartQty(item.medicineId, item.quantity + 1)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <div style={{ fontWeight: 800, fontSize: '1rem', minWidth: 60, textAlign: 'right' }}>
                        ₹{item.medicine.price * item.quantity}
                      </div>

                      <button
                        onClick={() => removeFromCart(item.medicineId)}
                        style={{ background: 'none', border: 'none', color: 'var(--color-slate-400)', cursor: 'pointer', padding: 4 }}
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Prescription Reminder Callout if required */}
              {isCartPrescriptionRequired && (
                <div style={{
                  background: '#fffbeb',
                  border: '1px solid #fde68a',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px 16px',
                  marginBottom: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12
                }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#92400e' }}>
                      Prescription Required
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#b45309' }}>
                      {attachedRxId
                        ? '✓ Prescription attached (verified by licensed pharmacist before dispatch).'
                        : 'This order requires a prescription. Upload it now or during checkout.'}
                    </div>
                  </div>
                  <button
                    className="btn btn-secondary"
                    style={{ fontSize: '0.8rem', padding: '6px 12px', whiteSpace: 'nowrap' }}
                    onClick={() => setCustomerTab('upload_rx')}
                  >
                    {attachedRxId ? 'View Prescription' : 'Upload Prescription'}
                  </button>
                </div>
              )}

              {/* Simple Bill Summary */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24, fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-slate-600)' }}>
                  <span>Subtotal</span>
                  <span>₹{cartSubtotal}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-slate-600)' }}>
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-slate-600)' }}>
                  <span>Packaging &amp; Handling</span>
                  <span>₹{packagingFee}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontWeight: 800,
                  fontSize: '1.2rem',
                  color: 'var(--color-slate-900)',
                  borderTop: '1px solid var(--color-slate-200)',
                  paddingTop: 10,
                  marginTop: 4
                }}>
                  <span>Total</span>
                  <span>₹{cartTotal}</span>
                </div>
              </div>

              {/* Checkout Action */}
              <button
                className="btn btn-primary"
                style={{ width: '100%', padding: '14px', fontSize: '1rem', fontWeight: 800 }}
                onClick={() => setCustomerTab('checkout')}
              >
                Continue to Checkout (₹{cartTotal}) →
              </button>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          VIEW 4: CHECKOUT (One Screen, One Obvious Action)
          ========================================================================= */}
      {customerTab === 'checkout' && (
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-slate-900)', marginBottom: 20 }}>
            Checkout
          </h2>

          <div style={{
            background: '#ffffff',
            border: '1px solid var(--color-slate-200)',
            borderRadius: 'var(--radius-xl)',
            padding: '24px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            {/* 1. Delivery Address */}
            <div style={{ marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid var(--color-slate-100)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-slate-900)', textTransform: 'uppercase' }}>
                  Delivery Address
                </span>
                <button
                  onClick={() => setIsEditingAddress(!isEditingAddress)}
                  style={{ background: 'none', border: 'none', color: 'var(--color-primary-600)', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer' }}
                >
                  {isEditingAddress ? 'Done' : 'Change'}
                </button>
              </div>

              {isEditingAddress ? (
                <textarea
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-slate-300)',
                    fontSize: '0.88rem'
                  }}
                  rows={2}
                />
              ) : (
                <div style={{ fontSize: '0.9rem', color: 'var(--color-slate-700)' }}>
                  {deliveryAddress}
                </div>
              )}
            </div>

            {/* 2. Pharmacy */}
            <div style={{ marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid var(--color-slate-100)' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-slate-900)', textTransform: 'uppercase', marginBottom: 4 }}>
                Fulfilling Pharmacy
              </div>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--color-slate-800)' }}>
                Sharma Medical Store
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-slate-500)' }}>
                1.2 km away • Licensed Pharmacist: Dr. Priyesh Sharma on duty
              </div>
            </div>

            {/* 3. Prescription Attachment */}
            <div style={{ marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid var(--color-slate-100)' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-slate-900)', textTransform: 'uppercase', marginBottom: 6 }}>
                Prescription
              </div>
              {isCartPrescriptionRequired ? (
                attachedRxId ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#16a34a', fontSize: '0.88rem', fontWeight: 700 }}>
                      <CheckCircle2 size={18} />
                      <span>Prescription Attached (Dr. Rajesh Gupta, M.D.)</span>
                    </div>
                    <button
                      onClick={() => setCustomerTab('upload_rx')}
                      style={{ background: 'none', border: 'none', color: 'var(--color-primary-600)', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 700 }}
                    >
                      Change
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ color: '#e11d48', fontSize: '0.86rem', fontWeight: 700 }}>
                      ⚠️ Prescription required before placing order
                    </div>
                    <button
                      className="btn btn-secondary"
                      style={{ fontSize: '0.8rem', padding: '6px 12px' }}
                      onClick={() => setCustomerTab('upload_rx')}
                    >
                      Upload Now
                    </button>
                  </div>
                )
              ) : (
                <div style={{ color: 'var(--color-slate-500)', fontSize: '0.86rem' }}>
                  ✓ Not required for OTC medicines
                </div>
              )}
            </div>

            {/* 4. Order Summary Items */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-slate-900)', textTransform: 'uppercase', marginBottom: 8 }}>
                Order Summary
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
                {cart.map(item => (
                  <div key={item.medicineId} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                    <span>{item.medicine.name} × {item.quantity}</span>
                    <span style={{ fontWeight: 700 }}>₹{item.medicine.price * item.quantity}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--color-slate-500)' }}>
                  <span>Delivery fee</span>
                  <span>₹{deliveryFee}</span>
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderTop: '1px solid var(--color-slate-200)',
                paddingTop: 10,
                fontSize: '1.2rem',
                fontWeight: 800,
                color: 'var(--color-slate-900)'
              }}>
                <span>Total Amount</span>
                <span>₹{cartTotal}</span>
              </div>
            </div>

            {/* Place Order Primary Action */}
            <button
              className="btn btn-primary"
              disabled={isCartPrescriptionRequired && !attachedRxId}
              style={{ width: '100%', padding: '16px', fontSize: '1.05rem', fontWeight: 800 }}
              onClick={() => {
                const newOrder = placeOrder({
                  attachedPrescriptionId: attachedRxId,
                  deliveryAddress,
                  paymentMethod: 'UPI / Cash on Delivery'
                });
                if (newOrder) {
                  setCustomerTab('orders');
                }
              }}
            >
              Place Order (₹{cartTotal})
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 5: PRESCRIPTION EXPERIENCE (Extremely Easy, Subtle AI)
          ========================================================================= */}
      {customerTab === 'upload_rx' && (
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-slate-900)', marginBottom: 6 }}>
            Prescription Upload
          </h2>
          <p style={{ fontSize: '0.86rem', color: 'var(--color-slate-500)', marginBottom: 20 }}>
            Upload your doctor's prescription for pharmacist verification.
          </p>

          <div style={{
            background: '#ffffff',
            border: '1px solid var(--color-slate-200)',
            borderRadius: 'var(--radius-xl)',
            padding: '28px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            {/* Upload Area */}
            <div style={{
              border: '2px dashed var(--color-slate-300)',
              borderRadius: 'var(--radius-lg)',
              padding: '28px 20px',
              textAlign: 'center',
              marginBottom: 20,
              background: 'var(--color-slate-50)'
            }}>
              <UploadCloud size={36} style={{ color: 'var(--color-primary-600)', margin: '0 auto 10px' }} />
              <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--color-slate-900)', marginBottom: 4 }}>
                Upload Prescription Document
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--color-slate-500)', marginBottom: 16 }}>
                Supports JPG, PNG, or PDF formats
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
                <label className="btn btn-primary" style={{ padding: '8px 18px', cursor: 'pointer' }}>
                  Select File
                  <input type="file" accept="image/*,.pdf" onChange={handleFileUpload} style={{ display: 'none' }} />
                </label>

                <button
                  className="btn btn-secondary"
                  style={{ padding: '8px 18px' }}
                  onClick={handleUseSamplePrescription}
                >
                  ⚡ Use Sample Prescription
                </button>
              </div>
            </div>

            {/* Upload Status Card */}
            {isAiScanning ? (
              <div style={{
                textAlign: 'center',
                padding: '20px',
                background: 'var(--color-slate-50)',
                borderRadius: 'var(--radius-md)'
              }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-slate-800)' }}>
                  Analyzing prescription...
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-slate-500)', marginTop: 4 }}>
                  Extracting doctor details and medicines for the pharmacist
                </div>
              </div>
            ) : attachedRxId ? (
              <div>
                <div style={{
                  background: '#ecfdf5',
                  border: '1px solid #a7f3d0',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px 18px',
                  marginBottom: 16,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12
                }}>
                  <CheckCircle2 size={24} style={{ color: '#059669', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.94rem', color: '#065f46' }}>
                      ✓ Prescription uploaded
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#047857' }}>
                      <strong>Waiting for pharmacist verification</strong>
                    </div>
                  </div>
                </div>

                {/* Subtle AI notice: AI helps. Pharmacist decides. */}
                <div style={{
                  background: 'var(--color-slate-50)',
                  border: '1px solid var(--color-slate-200)',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px 16px',
                  marginBottom: 20
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-slate-700)', marginBottom: 4 }}>
                    <Sparkles size={14} style={{ color: 'var(--color-primary-600)' }} />
                    <span>AI-assisted analysis complete</span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--color-slate-600)', margin: 0 }}>
                    AI assistant has analyzed the prescription. A licensed pharmacist will make the final verification.
                  </p>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-slate-500)', fontWeight: 700, marginTop: 6 }}>
                    AI helps. Pharmacist decides.
                  </div>
                </div>

                {/* Preview Thumbnail */}
                <div style={{
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  border: '1px solid var(--color-slate-200)',
                  maxHeight: 180,
                  marginBottom: 20
                }}>
                  <img src={previewUrl} alt="Prescription" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                  <button
                    className="btn btn-primary"
                    style={{ flex: 1, padding: '12px' }}
                    onClick={() => setCustomerTab(cart.length > 0 ? 'checkout' : 'medicines')}
                  >
                    {cart.length > 0 ? 'Proceed to Checkout →' : 'Browse Medicines →'}
                  </button>
                  <button
                    className="btn btn-secondary"
                    style={{ padding: '12px 18px' }}
                    onClick={() => setCustomerTab('orders')}
                  >
                    View Orders
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 6: ORDERS & SIMPLE ORDER STATUS (Strictly No Maps, No GPS)
          ========================================================================= */}
      {customerTab === 'orders' && (
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-slate-900)', marginBottom: 6 }}>
            Your Orders
          </h2>
          <p style={{ fontSize: '0.86rem', color: 'var(--color-slate-500)', marginBottom: 20 }}>
            Track the status of your medicine orders
          </p>

          {/* Active Order Simple Status Card */}
          {activeOrder && (
            <div style={{
              background: '#ffffff',
              border: '1px solid var(--color-slate-200)',
              borderRadius: 'var(--radius-xl)',
              padding: '28px',
              marginBottom: 28,
              boxShadow: 'var(--shadow-md)'
            }}>
              {/* Order Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: 16,
                borderBottom: '1px solid var(--color-slate-100)',
                marginBottom: 24
              }}>
                <div>
                  <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--color-slate-500)', fontWeight: 700 }}>
                    Active Order
                  </div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-slate-900)' }}>
                    Order #{activeOrder.id}
                  </h3>
                  <div style={{ fontSize: '0.84rem', color: 'var(--color-slate-600)', marginTop: 2 }}>
                    <strong>{activeOrder.pharmacyName}</strong>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-slate-900)' }}>
                    ₹{activeOrder.totalAmount}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-slate-500)' }}>
                    {activeOrder.paymentMethod}
                  </div>
                </div>
              </div>

              {/* Clean Order Status Stepper (5-Stage Simple Flow) */}
              <div style={{ marginBottom: 28 }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--color-slate-500)', textTransform: 'uppercase', marginBottom: 16 }}>
                  Order Status
                </div>

                {(() => {
                  const currentIdx = getStageIndex(activeOrder.status);
                  const stages = [
                    { label: 'Order Placed', desc: 'Received by Sharma Medical Store' },
                    { label: 'Pharmacist Verified', desc: 'Prescription verified by Dr. Priyesh Sharma' },
                    { label: 'Preparing', desc: 'Pharmacy packing your medicines' },
                    { label: 'Ready for Pickup', desc: 'Handed over to delivery rider' },
                    { label: 'Delivered', desc: 'Arrived at your doorstep' }
                  ];

                  return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                      {stages.map((stage, idx) => {
                        const isCompleted = idx < currentIdx;
                        const isCurrent = idx === currentIdx;
                        const isUpcoming = idx > currentIdx;

                        return (
                          <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                            {/* Status Icon */}
                            <div style={{
                              width: 28,
                              height: 28,
                              borderRadius: 'var(--radius-full)',
                              background: isCompleted ? '#ecfdf5' : isCurrent ? '#10b981' : '#f1f5f9',
                              color: isCompleted ? '#059669' : isCurrent ? '#ffffff' : '#94a3b8',
                              border: isCompleted ? '1px solid #a7f3d0' : isCurrent ? '2px solid #059669' : '1px solid #cbd5e1',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.85rem',
                              fontWeight: 800,
                              flexShrink: 0
                            }}>
                              {isCompleted ? '✓' : isCurrent ? '●' : '○'}
                            </div>

                            {/* Label & Description */}
                            <div style={{ flex: 1 }}>
                              <div style={{
                                fontWeight: isCurrent ? 800 : isCompleted ? 700 : 500,
                                fontSize: '0.94rem',
                                color: isCurrent ? 'var(--color-primary-800)' : isCompleted ? 'var(--color-slate-800)' : 'var(--color-slate-400)'
                              }}>
                                {stage.label}
                                {isCurrent && (
                                  <span className="badge" style={{ marginLeft: 8, background: '#ecfdf5', color: '#047857' }}>
                                    In Progress
                                  </span>
                                )}
                              </div>
                              <div style={{
                                fontSize: '0.78rem',
                                color: isCurrent || isCompleted ? 'var(--color-slate-500)' : 'var(--color-slate-400)'
                              }}>
                                {stage.desc}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>

              {/* Order Items List */}
              <div style={{
                background: 'var(--color-slate-50)',
                borderRadius: 'var(--radius-lg)',
                padding: '16px',
                border: '1px solid var(--color-slate-200)',
                marginBottom: 16
              }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--color-slate-700)', marginBottom: 8 }}>
                  Items in this Order:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {activeOrder.items.map((i, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                      <span>{i.name} × {i.quantity}</span>
                      <span style={{ fontWeight: 700 }}>₹{i.price * i.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Help & Switch Helper */}
              {activeOrder.status === 'Prescription Pending' && (
                <div style={{
                  background: '#fffbeb',
                  border: '1px solid #fde68a',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12
                }}>
                  <div style={{ fontSize: '0.82rem', color: '#92400e' }}>
                    Awaiting verification by Dr. Priyesh Sharma (Licensed Pharmacist).
                  </div>
                  <button
                    className="btn btn-secondary"
                    style={{ fontSize: '0.78rem', padding: '4px 10px' }}
                    onClick={() => setActiveRole('pharmacist')}
                  >
                    Switch to Pharmacist Desk
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Past Orders List */}
          {orders.length > 1 && (
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-slate-900)', marginBottom: 12 }}>
                Order History
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {orders.map(o => (
                  <div
                    key={o.id}
                    onClick={() => setActiveTrackingOrderId(o.id)}
                    style={{
                      background: '#ffffff',
                      border: '1px solid var(--color-slate-200)',
                      borderRadius: 'var(--radius-md)',
                      padding: '14px 18px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Order #{o.id}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-slate-500)' }}>
                        {o.pharmacyName} • ₹{o.totalAmount}
                      </div>
                    </div>
                    <span className="badge" style={{
                      background: o.status === 'Delivered' ? '#ecfdf5' : '#eff6ff',
                      color: o.status === 'Delivered' ? '#047857' : '#1d4ed8'
                    }}>
                      {o.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          VIEW 7: PROFILE (Simple Customer Info)
          ========================================================================= */}
      {customerTab === 'profile' && (
        <div style={{ maxWidth: 540, margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-slate-900)', marginBottom: 20 }}>
            My Account
          </h2>

          <div style={{
            background: '#ffffff',
            border: '1px solid var(--color-slate-200)',
            borderRadius: 'var(--radius-xl)',
            padding: '24px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
              <div style={{
                width: 52,
                height: 52,
                borderRadius: 'var(--radius-full)',
                background: 'var(--color-primary-600)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                fontWeight: 800
              }}>
                RS
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-slate-900)' }}>
                  Rahul Sharma
                </h3>
                <div style={{ fontSize: '0.84rem', color: 'var(--color-slate-500)' }}>
                  rahul.sharma@example.com • +91 98765 43210
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, borderTop: '1px solid var(--color-slate-100)', paddingTop: 16 }}>
              <div>
                <div style={{ fontSize: '0.76rem', color: 'var(--color-slate-500)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Saved Delivery Address
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--color-slate-800)', marginTop: 2 }}>
                  {deliveryAddress}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                <button
                  className="btn btn-secondary"
                  style={{ flex: 1, padding: '10px' }}
                  onClick={() => setCustomerTab('orders')}
                >
                  My Orders
                </button>
                <button
                  className="btn btn-secondary"
                  style={{ flex: 1, padding: '10px' }}
                  onClick={() => setCustomerTab('upload_rx')}
                >
                  My Prescriptions
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
