import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bell,
  BellRing,
  BellOff,
  CheckCheck,
  CheckCircle2,
  Clock,
  Trash2,
  X,
  Sparkles,
  ShieldCheck,
  Bike,
  Package,
  Pill,
  AlertTriangle,
  Volume2,
  VolumeX,
  ArrowRight,
  Monitor,
  ExternalLink,
  Layers,
  Inbox
} from 'lucide-react';

export default function NotificationPanel() {
  const {
    notifications,
    unreadNotificationsCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
    clearAllNotifications,
    handleNotificationClick,
    soundEnabled,
    setSoundEnabled,
    requestDesktopPermission,
    simulateNotification,
    notificationPanelOpen,
    setNotificationPanelOpen,
    activeRole
  } = useApp();

  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'role' | 'prescription' | 'order' | 'delivery'
  const [desktopPerm, setDesktopPerm] = useState(
    typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'default'
  );
  const panelRef = useRef(null);

  // Close when pressing Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && notificationPanelOpen) {
        setNotificationPanelOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [notificationPanelOpen, setNotificationPanelOpen]);

  // Close when clicking outside panel
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        !e.target.closest('.notification-trigger-btn')
      ) {
        setNotificationPanelOpen(false);
      }
    };

    if (notificationPanelOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [notificationPanelOpen, setNotificationPanelOpen]);

  if (!notificationPanelOpen) return null;

  // Filter notifications
  const filteredNotifications = notifications.filter((notif) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return !notif.read;
    if (activeFilter === 'my_role') {
      return notif.role === activeRole || notif.role === 'all';
    }
    if (activeFilter === 'prescription') return notif.type === 'prescription';
    if (activeFilter === 'orders') return notif.type === 'order';
    if (activeFilter === 'delivery') return notif.type === 'delivery';
    if (activeFilter === 'system') return notif.type === 'system' || notif.type === 'inventory';
    return true;
  });

  const handleRequestPermission = async () => {
    const perm = await requestDesktopPermission();
    if (perm) setDesktopPerm(perm);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'prescription':
        return <Pill size={16} className="text-emerald" />;
      case 'delivery':
        return <Bike size={16} className="text-teal" />;
      case 'order':
        return <Package size={16} className="text-blue" />;
      case 'inventory':
        return <AlertTriangle size={16} className="text-amber" />;
      case 'system':
        return <ShieldCheck size={16} className="text-purple" />;
      default:
        return <Bell size={16} className="text-blue" />;
    }
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case 'prescription':
        return { label: 'Rx Clinical', bg: 'rgba(16, 185, 129, 0.12)', text: '#059669', border: '#a7f3d0' };
      case 'delivery':
        return { label: 'Rider & Transit', bg: 'rgba(13, 148, 136, 0.12)', text: '#0d9488', border: '#99f6e4' };
      case 'order':
        return { label: 'Order Event', bg: 'rgba(2, 132, 199, 0.12)', text: '#0284c7', border: '#bae6fd' };
      case 'inventory':
        return { label: 'Stock Warning', bg: 'rgba(245, 158, 11, 0.12)', text: '#d97706', border: '#fde68a' };
      case 'system':
        return { label: 'Platform Safety', bg: 'rgba(147, 51, 234, 0.12)', text: '#7c3aed', border: '#e9d5ff' };
      default:
        return { label: 'Notification', bg: 'rgba(100, 116, 139, 0.12)', text: '#475569', border: '#cbd5e1' };
    }
  };

  return (
    <div className="notification-panel-overlay">
      <div className="notification-panel" ref={panelRef} role="dialog" aria-label="Notifications Dropdown">
        {/* Panel Header */}
        <div className="notification-panel-header">
          <div className="notification-title-group">
            <div className="notification-header-icon-wrap">
              <BellRing size={18} />
            </div>
            <div>
              <div className="notification-header-title">
                Notifications
                {unreadNotificationsCount > 0 && (
                  <span className="notification-header-badge">
                    {unreadNotificationsCount} New
                  </span>
                )}
              </div>
              <div className="notification-header-sub">
                Live alerts for orders, clinical Rx, riders & safety
              </div>
            </div>
          </div>

          {/* Header Controls (Sound, Desktop Alerts, Read All, Close) */}
          <div className="notification-header-actions">
            <button
              className={`btn-icon-control ${soundEnabled ? 'active' : ''}`}
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? 'Mute alert chime sound' : 'Enable audio chime'}
              aria-label="Toggle Sound"
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            {typeof window !== 'undefined' && 'Notification' in window && (
              <button
                className={`btn-icon-control ${desktopPerm === 'granted' ? 'active-perm' : ''}`}
                onClick={handleRequestPermission}
                title={
                  desktopPerm === 'granted'
                    ? 'Desktop browser alerts active'
                    : 'Click to enable native desktop notifications'
                }
                aria-label="Desktop Notifications"
              >
                <Monitor size={16} />
              </button>
            )}

            {unreadNotificationsCount > 0 && (
              <button
                className="btn-mark-all-read"
                onClick={markAllNotificationsAsRead}
                title="Mark all notifications as read"
              >
                <CheckCheck size={14} />
                <span>Mark Read</span>
              </button>
            )}

            <button
              className="btn-close-notif"
              onClick={() => setNotificationPanelOpen(false)}
              title="Close notifications"
            >
              <X size={17} />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="notification-filter-bar">
          <button
            className={`notif-filter-chip ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All ({notifications.length})
          </button>
          <button
            className={`notif-filter-chip ${activeFilter === 'unread' ? 'active' : ''}`}
            onClick={() => setActiveFilter('unread')}
          >
            Unread ({unreadNotificationsCount})
          </button>
          <button
            className={`notif-filter-chip ${activeFilter === 'my_role' ? 'active' : ''}`}
            onClick={() => setActiveFilter('my_role')}
          >
            My Role ({activeRole.charAt(0).toUpperCase() + activeRole.slice(1)})
          </button>
          <button
            className={`notif-filter-chip ${activeFilter === 'prescription' ? 'active' : ''}`}
            onClick={() => setActiveFilter('prescription')}
          >
            Rx Review
          </button>
          <button
            className={`notif-filter-chip ${activeFilter === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveFilter('orders')}
          >
            Orders
          </button>
          <button
            className={`notif-filter-chip ${activeFilter === 'delivery' ? 'active' : ''}`}
            onClick={() => setActiveFilter('delivery')}
          >
            Delivery
          </button>
        </div>

        {/* Notifications Scroll List */}
        <div className="notification-items-scroll">
          {filteredNotifications.length === 0 ? (
            <div className="notification-empty-state">
              <div className="empty-state-icon">
                <Inbox size={36} />
              </div>
              <div className="empty-state-title">No notifications here</div>
              <div className="empty-state-text">
                {activeFilter === 'unread'
                  ? 'All caught up! No unread notifications at the moment.'
                  : 'You have no notifications in this category.'}
              </div>
            </div>
          ) : (
            filteredNotifications.map((notif) => {
              const badge = getTypeBadge(notif.type);
              return (
                <div
                  key={notif.id}
                  className={`notification-item-card ${notif.read ? 'read' : 'unread'}`}
                  onClick={() => handleNotificationClick(notif)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleNotificationClick(notif);
                    }
                  }}
                >
                  <div className="notif-card-icon-container">
                    {getTypeIcon(notif.type)}
                    {!notif.read && <span className="unread-dot" />}
                  </div>

                  <div className="notif-card-content">
                    <div className="notif-card-top">
                      <span
                        className="notif-type-tag"
                        style={{
                          background: badge.bg,
                          color: badge.text,
                          border: `1px solid ${badge.border}`
                        }}
                      >
                        {badge.label}
                      </span>
                      <span className="notif-time-text">
                        <Clock size={11} /> {notif.time}
                      </span>
                    </div>

                    <div className="notif-card-title">{notif.title}</div>
                    <div className="notif-card-message">{notif.message}</div>

                    <div className="notif-card-footer">
                      {notif.actionRole && (
                        <span className="notif-action-hint">
                          Click to open {notif.actionRole} desk <ArrowRight size={12} />
                        </span>
                      )}
                      <button
                        className="notif-btn-delete"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notif.id);
                        }}
                        title="Delete this notification"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Quick Simulation Bar (For evaluation & testing live events) */}
        <div className="notification-simulation-footer">
          <div className="simulation-footer-label">
            <Sparkles size={13} style={{ color: 'var(--color-primary-600)' }} />
            <span>Simulate Live Event:</span>
          </div>
          <div className="simulation-buttons-row">
            <button
              className="btn-sim-trigger"
              onClick={() => simulateNotification('prescription')}
              title="Simulate new prescription upload for pharmacist"
            >
              + Rx Upload
            </button>
            <button
              className="btn-sim-trigger"
              onClick={() => simulateNotification('order')}
              title="Simulate out-for-delivery status update"
            >
              + Order Ping
            </button>
            <button
              className="btn-sim-trigger"
              onClick={() => simulateNotification('rider')}
              title="Simulate dispatch notification for rider"
            >
              + Rider Task
            </button>
            <button
              className="btn-sim-trigger"
              onClick={() => simulateNotification('inventory')}
              title="Simulate low stock alert"
            >
              + Low Stock
            </button>
          </div>

          {notifications.length > 0 && (
            <button
              className="btn-clear-all-notifs"
              onClick={clearAllNotifications}
              title="Clear all notification history"
            >
              Clear All
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
