'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Vehicle,
  VehicleCategory,
  Hub,
  RentalAddOn,
  Customer,
  Booking,
  CrmLead,
  MarketingCampaign,
  InventoryPart,
  Supplier,
  MaintenanceWorkOrder,
  EcommerceProduct,
  EcommerceOrder,
  StaffRole,
  Transaction,
  DailyAnalyticsMetric,
  Policy,
  FAQ,
  LeadStage,
  VehicleStatus,
  WorkOrderStatus,
  OrderStatus,
} from '@/types/dataset';
import {
  defaultCategories,
  defaultVehicles,
  defaultHubs,
  defaultAddOns,
  defaultCustomers,
  defaultBookings,
  defaultLeads,
  defaultCampaigns,
  defaultInventory,
  defaultSuppliers,
  defaultWorkOrders,
  defaultProducts,
  defaultOrders,
  defaultStaff,
  defaultTransactions,
  defaultDailyMetrics,
  defaultPolicies,
  defaultFaqs,
} from '@/data/dataset';

export interface CartItem {
  product: EcommerceProduct;
  quantity: number;
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'crimson';
}

interface WolfDataContextType {
  vehicles: Vehicle[];
  categories: VehicleCategory[];
  hubs: Hub[];
  addOns: RentalAddOn[];
  customers: Customer[];
  bookings: Booking[];
  leads: CrmLead[];
  campaigns: MarketingCampaign[];
  inventory: InventoryPart[];
  suppliers: Supplier[];
  workOrders: MaintenanceWorkOrder[];
  products: EcommerceProduct[];
  orders: EcommerceOrder[];
  staff: StaffRole[];
  transactions: Transaction[];
  dailyMetrics: DailyAnalyticsMetric[];
  policies: Policy[];
  faqs: FAQ[];

  // Mutators for interactive demo
  updateVehicleStatus: (id: string, status: VehicleStatus) => void;
  addBooking: (booking: Omit<Booking, 'id' | 'created_at' | 'demo_record'>) => Booking;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  updateLeadStage: (id: string, stage: LeadStage) => void;
  updateLeadAction: (id: string, action: string) => void;
  addLead: (lead: Omit<CrmLead, 'id' | 'created_at' | 'demo_record'>) => CrmLead;
  adjustInventoryStock: (partId: string, delta: number) => void;
  updateWorkOrderStatus: (id: string, status: WorkOrderStatus) => void;
  addWorkOrder: (order: Omit<MaintenanceWorkOrder, 'id'>) => MaintenanceWorkOrder;

  // Cart operations
  cart: CartItem[];
  addToCart: (productId: string, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  checkoutCart: (customerInfo: { name: string; email: string; phone: string; address: string }) => EcommerceOrder | null;

  // Toasts
  toasts: ToastMessage[];
  addToast: (title: string, message: string, type?: ToastMessage['type']) => void;
  dismissToast: (id: string) => void;

  // Reset
  resetAllData: () => void;
}

const WolfDataContext = createContext<WolfDataContextType | undefined>(undefined);

const STORAGE_KEY = 'wolf_motors_v1_store';

export function WolfDataProvider({ children }: { children: React.ReactNode }) {
  const [vehicles, setVehicles] = useState<Vehicle[]>(defaultVehicles);
  const [categories] = useState<VehicleCategory[]>(defaultCategories);
  const [hubs] = useState<Hub[]>(defaultHubs);
  const [addOns] = useState<RentalAddOn[]>(defaultAddOns);
  const [customers, setCustomers] = useState<Customer[]>(defaultCustomers);
  const [bookings, setBookings] = useState<Booking[]>(defaultBookings);
  const [leads, setLeads] = useState<CrmLead[]>(defaultLeads);
  const [campaigns] = useState<MarketingCampaign[]>(defaultCampaigns);
  const [inventory, setInventory] = useState<InventoryPart[]>(defaultInventory);
  const [suppliers] = useState<Supplier[]>(defaultSuppliers);
  const [workOrders, setWorkOrders] = useState<MaintenanceWorkOrder[]>(defaultWorkOrders);
  const [products] = useState<EcommerceProduct[]>(defaultProducts);
  const [orders, setOrders] = useState<EcommerceOrder[]>(defaultOrders);
  const [staff] = useState<StaffRole[]>(defaultStaff);
  const [transactions] = useState<Transaction[]>(defaultTransactions);
  const [dailyMetrics] = useState<DailyAnalyticsMetric[]>(defaultDailyMetrics);
  const [policies] = useState<Policy[]>(defaultPolicies);
  const [faqs] = useState<FAQ[]>(defaultFaqs);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.vehicles) setVehicles(parsed.vehicles);
        if (parsed.bookings) setBookings(parsed.bookings);
        if (parsed.leads) setLeads(parsed.leads);
        if (parsed.inventory) setInventory(parsed.inventory);
        if (parsed.workOrders) setWorkOrders(parsed.workOrders);
        if (parsed.orders) setOrders(parsed.orders);
        if (parsed.customers) setCustomers(parsed.customers);
        if (parsed.cart) setCart(parsed.cart);
      }
    } catch {
      // safe fallback
    }
  }, []);

  // Save to localStorage when dynamic state changes
  useEffect(() => {
    try {
      const stateToPersist = {
        vehicles,
        bookings,
        leads,
        inventory,
        workOrders,
        orders,
        customers,
        cart,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToPersist));
    } catch {
      // storage unavailable / quota
    }
  }, [vehicles, bookings, leads, inventory, workOrders, orders, customers, cart]);

  const addToast = (title: string, message: string, type: ToastMessage['type'] = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const updateVehicleStatus = (id: string, status: VehicleStatus) => {
    setVehicles((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status } : v))
    );
    addToast('Fleet Status Updated', `Vehicle ${id} is now ${status}.`, 'info');
  };

  const addBooking = (bookingData: Omit<Booking, 'id' | 'created_at' | 'demo_record'>): Booking => {
    const newId = `BK-2026${String(bookings.length + 1).padStart(3, '0')}`;
    const newBooking: Booking = {
      ...bookingData,
      id: newId,
      created_at: new Date().toISOString().split('T')[0],
      demo_record: true,
    };
    setBookings((prev) => [newBooking, ...prev]);

    // Update vehicle status to booked if confirmed/in progress
    if (newBooking.status === 'Confirmed' || newBooking.status === 'In Progress') {
      setVehicles((prev) =>
        prev.map((v) => (v.id === newBooking.vehicle_id ? { ...v, status: 'Booked' } : v))
      );
    }

    addToast(
      'Demo Reservation Logged',
      `Booking request #${newId} recorded. Note: Demo mode only; no real payment processed.`,
      'success'
    );
    return newBooking;
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
    addToast('Booking Status Changed', `Booking ${id} updated to ${status}.`, 'info');
  };

  const updateLeadStage = (id: string, stage: LeadStage) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, stage } : l))
    );
    addToast('Lead Pipeline Advanced', `Lead ${id} advanced to "${stage}".`, 'success');
  };

  const updateLeadAction = (id: string, next_action: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, next_action } : l))
    );
    addToast('Action Recorded', `Updated follow-up plan for lead ${id}.`, 'info');
  };

  const addLead = (leadData: Omit<CrmLead, 'id' | 'created_at' | 'demo_record'>): CrmLead => {
    const newId = `LEAD-00${String(leads.length + 1).padStart(2, '0')}`;
    const newLead: CrmLead = {
      ...leadData,
      id: newId,
      created_at: new Date().toISOString().split('T')[0],
      demo_record: true,
    };
    setLeads((prev) => [newLead, ...prev]);
    addToast('New Lead Registered', `${newLead.name} added to pipeline (${newLead.stage}).`, 'success');
    return newLead;
  };

  const adjustInventoryStock = (partId: string, delta: number) => {
    setInventory((prev) =>
      prev.map((part) => {
        if (part.id === partId) {
          const newQty = Math.max(0, part.quantity_on_hand + delta);
          const newStatus = newQty <= part.reorder_level ? 'Reorder' : 'In Stock';
          return {
            ...part,
            quantity_on_hand: newQty,
            stock_status: newStatus,
          };
        }
        return part;
      })
    );
    addToast('Inventory Stock Adjusted', `Stock level updated for part ${partId}.`, 'info');
  };

  const updateWorkOrderStatus = (id: string, status: WorkOrderStatus) => {
    setWorkOrders((prev) =>
      prev.map((wo) => (wo.id === id ? { ...wo, status } : wo))
    );
    addToast('Work Order Updated', `Work order ${id} marked as ${status}.`, 'info');
  };

  const addWorkOrder = (orderData: Omit<MaintenanceWorkOrder, 'id'>): MaintenanceWorkOrder => {
    const newId = `WO-2026${String(workOrders.length + 1).padStart(2, '0')}`;
    const newOrder: MaintenanceWorkOrder = {
      ...orderData,
      id: newId,
    };
    setWorkOrders((prev) => [newOrder, ...prev]);

    // set vehicle to Maintenance
    setVehicles((prev) =>
      prev.map((v) => (v.id === orderData.vehicle_id ? { ...v, status: 'Maintenance' } : v))
    );

    addToast('Maintenance Work Order Created', `Work order ${newId} logged for vehicle ${orderData.vehicle_id}.`, 'warning');
    return newOrder;
  };

  // Cart methods
  const addToCart = (productId: string, quantity = 1) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === productId);
      if (existing) {
        return prev.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    addToast('Added to Cart', `${product.name} (${quantity}) added to luxury cart.`, 'success');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    addToast('Removed from Cart', 'Item removed from your cart.', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const checkoutCart = (customerInfo: { name: string; email: string; phone: string; address: string }): EcommerceOrder | null => {
    if (cart.length === 0) return null;

    const subtotal = cart.reduce((sum, item) => sum + item.product.price_sgd * item.quantity, 0);
    const shipping = subtotal > 150 ? 0 : 8;
    const orderId = `EC-2026${String(orders.length + 1).padStart(3, '0')}`;

    // Create or find customer
    const newCustomerId = `CUS-DEMO-${Date.now().toString().slice(-4)}`;
    const newCust: Customer = {
      id: newCustomerId,
      first_name: customerInfo.name.split(' ')[0] || 'Demo',
      last_name: customerInfo.name.split(' ').slice(1).join(' ') || 'Customer',
      email: customerInfo.email,
      phone: customerInfo.phone,
      segment: 'New',
      lifetime_value_sgd: subtotal + shipping,
      consent_marketing: true,
      created_at: new Date().toISOString().split('T')[0],
    };
    setCustomers((prev) => [newCust, ...prev]);

    const newOrder: EcommerceOrder = {
      id: orderId,
      customer_id: newCustomerId,
      product_ids: cart.flatMap((c) => Array(c.quantity).fill(c.product.id)),
      status: 'Processing',
      subtotal_sgd: subtotal,
      shipping_sgd: shipping,
      created_at: new Date().toISOString().split('T')[0],
      demo_record: true,
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();

    addToast(
      'Demo Order Placed',
      `Order #${orderId} generated successfully. Demo simulation: no charge occurred.`,
      'success'
    );
    return newOrder;
  };

  const resetAllData = () => {
    setVehicles(defaultVehicles);
    setBookings(defaultBookings);
    setLeads(defaultLeads);
    setInventory(defaultInventory);
    setWorkOrders(defaultWorkOrders);
    setOrders(defaultOrders);
    setCustomers(defaultCustomers);
    setCart([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    addToast('Dataset Restored', 'All demo data has been reset to canonical dataset values.', 'info');
  };

  return (
    <WolfDataContext.Provider
      value={{
        vehicles,
        categories,
        hubs,
        addOns,
        customers,
        bookings,
        leads,
        campaigns,
        inventory,
        suppliers,
        workOrders,
        products,
        orders,
        staff,
        transactions,
        dailyMetrics,
        policies,
        faqs,
        updateVehicleStatus,
        addBooking,
        updateBookingStatus,
        updateLeadStage,
        updateLeadAction,
        addLead,
        adjustInventoryStock,
        updateWorkOrderStatus,
        addWorkOrder,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        checkoutCart,
        toasts,
        addToast,
        dismissToast,
        resetAllData,
      }}
    >
      {children}
    </WolfDataContext.Provider>
  );
}

export function useWolfData() {
  const context = useContext(WolfDataContext);
  if (!context) {
    throw new Error('useWolfData must be used within a WolfDataProvider');
  }
  return context;
}
