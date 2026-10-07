import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bike,
  Star,
  DollarSign,
  Package,
  MapPin,
  Store,
  CheckCircle2,
  Phone,
  ArrowRight,
  TrendingUp,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RiderPortal() {
  const {
    riderTab,
    setRiderTab,
    orders,
    riderStats,
    riderAcceptOrder,
    riderUpdateDeliveryStatus,
    setActiveRole,
    setCustomerTab,
    setActiveTrackingOrderId
  } = useApp();

  const [activeOrderId, setActiveOrderId] = useState(null);

  // Available orders for rider:
  // Must be 'Ready for Pickup' and unassigned or assigned to rider_1
  const availableOrders = orders.filter(
    o => o.status === 'Ready for Pickup' && (!o.riderId || o.riderId !== 'rider_1')
  );

  // Active orders assigned to this rider that are not yet delivered
  const activeOrders = orders.filter(
    o => o.riderId === 'rider_1' && (o.status === 'Ready for Pickup' || o.status === 'Picked Up')
  );

  const currentActiveOrder = activeOrders.find(o => o.id === activeOrderId) || activeOrders[0] || null;

  const handleAccept = (orderId) => {
    riderAcceptOrder(orderId);
    setActiveOrderId(orderId);
    setRiderTab('active');
  };

  const handleMarkPickedUp = (orderId) => {
    riderUpdateDeliveryStatus(orderId, 'Picked Up');
  };

  const handleMarkDelivered = (orderId) => {
    riderUpdateDeliveryStatus(orderId, 'Delivered');
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // fallback
    }
  };

  return (
    <div className="app-container" style={{ maxWidth: 840, margin: '0 auto', padding: '24px 20px' }}>

      {/* Header Profile Strip */}
      <div style={{
        background: '#ffffff',
        border: '1px solid var(--color-slate-200)',
        borderRadius: 'var(--radius-xl)',
        padding: '20px 24px',
        marginBottom: 24,
        boxShadow: 'var(--shadow-xs)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 'var(--radius-full)',
              background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(2, 132, 199, 0.25)'
            }}>
              <Bike size={24} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-slate-900)' }}>
                  Aman Kumar
                </h2>
                <span className="badge" style={{ background: '#ecfdf5', color: '#047857' }}>
                  Online
                </span>
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--color-slate-500)', marginTop: 2 }}>
                Rider Partner • Honda Activa (DL-04-AB-1294) • Green Park Zone
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            {activeOrders.length > 0 && (
              <button
                className="btn btn-primary"
                onClick={() => setRiderTab('active')}
                style={{ background: 'var(--color-accent-600)', padding: '8px 16px', fontSize: '0.86rem' }}
              >
                Active Delivery ({activeOrders.length})
              </button>
            )}
            <button
              className="btn btn-secondary"
              onClick={() => {
                setActiveRole('customer');
                setCustomerTab('orders');
              }}
              style={{ padding: '8px 14px', fontSize: '0.84rem' }}
            >
              Switch to Customer
            </button>
          </div>
        </div>

        {/* 3 Main Dashboard Metric Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
          marginTop: 20
        }}>
          {/* Today's Earnings */}
          <div style={{
            background: 'var(--color-slate-50)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px',
            border: '1px solid var(--color-slate-200)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-slate-500)', fontWeight: 700, textTransform: 'uppercase' }}>
              Today's Earnings
            </div>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--color-slate-900)', margin: '4px 0' }}>
              ₹{riderStats.todayEarnings}
            </div>
            <div style={{ fontSize: '0.74rem', color: '#16a34a', fontWeight: 600 }}>
              +₹45 per delivery
            </div>
          </div>

          {/* Rating */}
          <div style={{
            background: 'var(--color-slate-50)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px',
            border: '1px solid var(--color-slate-200)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-slate-500)', fontWeight: 700, textTransform: 'uppercase' }}>
              Rating
            </div>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--color-slate-900)', margin: '4px 0' }}>
              ⭐ {riderStats.rating}
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--color-slate-500)' }}>
              From customer reviews
            </div>
          </div>

          {/* Deliveries */}
          <div style={{
            background: 'var(--color-slate-50)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px',
            border: '1px solid var(--color-slate-200)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-slate-500)', fontWeight: 700, textTransform: 'uppercase' }}>
              Deliveries
            </div>
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--color-slate-900)', margin: '4px 0' }}>
              {riderStats.deliveriesToday}
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--color-slate-500)' }}>
              Completed today
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <button
          className={`btn ${riderTab === 'available' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setRiderTab('available')}
          style={{ padding: '8px 16px', fontSize: '0.88rem' }}
        >
          Available Deliveries ({availableOrders.length})
        </button>
        <button
          className={`btn ${riderTab === 'active' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setRiderTab('active')}
          style={{ padding: '8px 16px', fontSize: '0.88rem' }}
        >
          Active Delivery {activeOrders.length > 0 && `(1)`}
        </button>
        <button
          className={`btn ${riderTab === 'earnings' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setRiderTab('earnings')}
          style={{ padding: '8px 16px', fontSize: '0.88rem' }}
        >
          Earnings History
        </button>
      </div>

      {/* =========================================================================
          TAB 1: AVAILABLE DELIVERIES (Simple Order Cards)
          ========================================================================= */}
      {riderTab === 'available' && (
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-slate-900)', marginBottom: 14 }}>
            Available Deliveries
          </h3>

          {availableOrders.length === 0 ? (
            <div style={{
              background: '#ffffff',
              border: '1px solid var(--color-slate-200)',
              borderRadius: 'var(--radius-xl)',
              padding: '40px 20px',
              textAlign: 'center'
            }}>
              <Package size={36} style={{ color: 'var(--color-slate-300)', margin: '0 auto 10px' }} />
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-slate-800)', marginBottom: 4 }}>
                No Available Deliveries Right Now
              </h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--color-slate-500)', maxWidth: 440, margin: '0 auto 16px' }}>
                Orders appear here after the licensed pharmacist has verified the prescription and packed the medicine.
              </p>
              {orders.some(o => o.status === 'Prescription Pending') && (
                <button
                  className="btn btn-secondary"
                  onClick={() => setActiveRole('pharmacist')}
                  style={{ fontSize: '0.82rem' }}
                >
                  Switch to Pharmacist to Verify Order
                </button>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {availableOrders.map(order => (
                <div
                  key={order.id}
                  style={{
                    background: '#ffffff',
                    border: '1px solid var(--color-slate-200)',
                    borderRadius: 'var(--radius-xl)',
                    padding: '22px',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                    <div>
                      <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--color-slate-900)' }}>
                        Order #{order.id}
                      </span>
                      <span className="badge" style={{ marginLeft: 10, background: '#ecfdf5', color: '#047857' }}>
                        Ready for Pickup
                      </span>
                    </div>

                    <div style={{
                      background: 'var(--color-primary-50)',
                      color: 'var(--color-primary-800)',
                      borderRadius: 'var(--radius-md)',
                      padding: '4px 12px',
                      fontWeight: 800,
                      fontSize: '1.1rem'
                    }}>
                      ₹45
                    </div>
                  </div>

                  {/* Pickup & Drop Points */}
                  <div style={{
                    background: 'var(--color-slate-50)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '16px',
                    marginBottom: 16,
                    border: '1px solid var(--color-slate-200)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <Store size={18} style={{ color: 'var(--color-primary-600)', marginTop: 2, flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: 'var(--color-slate-500)', fontWeight: 700 }}>
                          Pickup Pharmacy (1.2 km away)
                        </div>
                        <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--color-slate-900)' }}>
                          {order.pharmacyName}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-slate-600)' }}>
                          {order.pharmacyAddress}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <MapPin size={18} style={{ color: '#2563eb', marginTop: 2, flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: 'var(--color-slate-500)', fontWeight: 700 }}>
                          Customer Drop (3.4 km)
                        </div>
                        <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--color-slate-900)' }}>
                          {order.customerName}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-slate-600)' }}>
                          {order.deliveryAddress}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Package Summary */}
                  <div style={{ fontSize: '0.84rem', color: 'var(--color-slate-600)', marginBottom: 16 }}>
                    Package: {order.items.length} items ({order.items.map(i => `${i.name} × ${i.quantity}`).join(', ')})
                  </div>

                  {/* Accept Button */}
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button
                      className="btn btn-primary"
                      style={{ flex: 1, padding: '12px', fontSize: '0.96rem', fontWeight: 800 }}
                      onClick={() => handleAccept(order.id)}
                    >
                      Accept Delivery (₹45)
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          TAB 2: ACTIVE DELIVERY (Simple, Action-Focused: Pick Up → Delivered)
          ========================================================================= */}
      {riderTab === 'active' && (
        <div>
          {!currentActiveOrder ? (
            <div style={{
              background: '#ffffff',
              border: '1px solid var(--color-slate-200)',
              borderRadius: 'var(--radius-xl)',
              padding: '40px 20px',
              textAlign: 'center'
            }}>
              <Bike size={36} style={{ color: 'var(--color-slate-300)', margin: '0 auto 10px' }} />
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-slate-800)', marginBottom: 4 }}>
                No Active Delivery in Progress
              </h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--color-slate-500)', marginBottom: 14 }}>
                Accept an order from the available requests to begin.
              </p>
              <button className="btn btn-primary" onClick={() => setRiderTab('available')}>
                View Available Deliveries
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
              {/* Active Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: '0.76rem', textTransform: 'uppercase', color: 'var(--color-slate-500)', fontWeight: 700 }}>
                    Active Order
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-slate-900)' }}>
                    Order #{currentActiveOrder.id}
                  </h3>
                </div>
                <span className="badge" style={{
                  background: currentActiveOrder.status === 'Picked Up' ? '#eff6ff' : '#ecfdf5',
                  color: currentActiveOrder.status === 'Picked Up' ? '#1d4ed8' : '#047857',
                  padding: '4px 12px',
                  fontSize: '0.82rem'
                }}>
                  {currentActiveOrder.status}
                </span>
              </div>

              {/* Order Locations */}
              <div style={{
                background: 'var(--color-slate-50)',
                borderRadius: 'var(--radius-lg)',
                padding: '16px',
                marginBottom: 20,
                border: '1px solid var(--color-slate-200)',
                display: 'flex',
                flexDirection: 'column',
                gap: 12
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <Store size={18} style={{ color: 'var(--color-primary-600)', marginTop: 2 }} />
                  <div>
                    <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: 'var(--color-slate-500)', fontWeight: 700 }}>
                      Pickup
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--color-slate-900)' }}>
                      {currentActiveOrder.pharmacyName}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-slate-600)' }}>
                      {currentActiveOrder.pharmacyAddress}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <MapPin size={18} style={{ color: '#2563eb', marginTop: 2 }} />
                  <div>
                    <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: 'var(--color-slate-500)', fontWeight: 700 }}>
                      Dropoff
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--color-slate-900)' }}>
                      {currentActiveOrder.customerName}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-slate-600)' }}>
                      {currentActiveOrder.deliveryAddress}
                    </div>
                  </div>
                </div>
              </div>

              {/* Package Details */}
              <div style={{ fontSize: '0.84rem', color: 'var(--color-slate-600)', marginBottom: 24 }}>
                <strong>Package:</strong> {currentActiveOrder.items.map(i => `${i.name} × ${i.quantity}`).join(', ')} • Sealed by Pharmacist
              </div>

              {/* Primary Action Buttons: Mark Picked Up -> Mark Delivered */}
              {currentActiveOrder.status === 'Ready for Pickup' && (
                <div>
                  <button
                    className="btn btn-primary"
                    style={{
                      width: '100%',
                      padding: '14px',
                      fontSize: '1rem',
                      fontWeight: 800,
                      background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)'
                    }}
                    onClick={() => handleMarkPickedUp(currentActiveOrder.id)}
                  >
                    Mark Picked Up from Pharmacy
                  </button>
                  <p style={{ fontSize: '0.78rem', color: 'var(--color-slate-500)', textAlign: 'center', marginTop: 8 }}>
                    Click once you have received the sealed medicine package from Dr. Priyesh.
                  </p>
                </div>
              )}

              {currentActiveOrder.status === 'Picked Up' && (
                <div>
                  <button
                    className="btn btn-primary"
                    style={{
                      width: '100%',
                      padding: '14px',
                      fontSize: '1rem',
                      fontWeight: 800,
                      background: 'linear-gradient(135deg, #059669 0%, #047857 100%)'
                    }}
                    onClick={() => handleMarkDelivered(currentActiveOrder.id)}
                  >
                    Mark Delivered at Customer Doorstep
                  </button>
                  <p style={{ fontSize: '0.78rem', color: 'var(--color-slate-500)', textAlign: 'center', marginTop: 8 }}>
                    Click once you have handed the medicines to Rahul Sharma.
                  </p>
                </div>
              )}

              {currentActiveOrder.status === 'Delivered' && (
                <div style={{
                  background: '#ecfdf5',
                  border: '1px solid #a7f3d0',
                  borderRadius: 'var(--radius-md)',
                  padding: '20px',
                  textAlign: 'center'
                }}>
                  <CheckCircle2 size={32} style={{ color: '#059669', margin: '0 auto 8px' }} />
                  <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#065f46', marginBottom: 4 }}>
                    Delivery Completed!
                  </div>
                  <div style={{ fontSize: '0.84rem', color: '#047857', marginBottom: 14 }}>
                    ₹45 credited to your earnings wallet.
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setActiveRole('customer');
                      setActiveTrackingOrderId(currentActiveOrder.id);
                      setCustomerTab('orders');
                    }}
                  >
                    Switch to Customer to View Delivered Order →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          TAB 3: EARNINGS & HISTORY
          ========================================================================= */}
      {riderTab === 'earnings' && (
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-slate-900)', marginBottom: 14 }}>
            Earnings &amp; Completed Deliveries
          </h3>

          <div style={{
            background: '#ffffff',
            border: '1px solid var(--color-slate-200)',
            borderRadius: 'var(--radius-xl)',
            padding: '20px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {riderStats.trips.map(trip => (
                <div
                  key={trip.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: 12,
                    borderBottom: '1px solid var(--color-slate-100)'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-slate-900)' }}>
                      Trip #{trip.id} (Order #{trip.orderId})
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-slate-500)' }}>
                      {trip.pickup} → {trip.drop}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 800, color: '#16a34a', fontSize: '0.96rem' }}>
                      +₹{trip.payout}
                    </div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--color-slate-400)' }}>
                      ⭐ {trip.rating}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
