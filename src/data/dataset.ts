import rawDatasetJson from './dataset.json';
import {
  LuxuryMobilityDataset,
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
} from '@/types/dataset';

export const rawDataset: LuxuryMobilityDataset = rawDatasetJson as unknown as LuxuryMobilityDataset;

export const brandInfo = rawDataset.brand;
export const datasetMetadata = rawDataset.metadata;
export const defaultCategories = rawDataset.vehicle_categories;
export const defaultVehicles = rawDataset.vehicles;
export const defaultHubs = rawDataset.hubs;
export const defaultAddOns = rawDataset.rental_add_ons;
export const defaultCustomers = rawDataset.customers;
export const defaultBookings = rawDataset.bookings;
export const defaultLeads = rawDataset.crm_leads;
export const defaultCampaigns = rawDataset.marketing_campaigns;
export const defaultInventory = rawDataset.inventory_parts;
export const defaultSuppliers = rawDataset.suppliers;
export const defaultWorkOrders = rawDataset.maintenance_work_orders;
export const defaultProducts = rawDataset.ecommerce_products;
export const defaultOrders = rawDataset.ecommerce_orders;
export const defaultStaff = rawDataset.staff_roles;
export const defaultTransactions = rawDataset.transactions;
export const defaultDailyMetrics = rawDataset.daily_analytics_metrics;
export const defaultPolicies = rawDataset.policies;
export const defaultFaqs = rawDataset.faqs;

// Currency & number formatting
export function formatSGD(amount: number): string {
  return new Intl.NumberFormat('en-SG', {
    style: 'currency',
    currency: 'SGD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(val: number): string {
  return new Intl.NumberFormat('en-SG').format(val);
}

export function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-SG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

// Relationship resolvers
export function getCategoryById(categories: VehicleCategory[], id: string): VehicleCategory | undefined {
  return categories.find((c) => c.id === id);
}

export function getHubById(hubs: Hub[], id: string): Hub | undefined {
  return hubs.find((h) => h.id === id);
}

export function getVehicleById(vehicles: Vehicle[], id: string): Vehicle | undefined {
  return vehicles.find((v) => v.id === id);
}

export function getCustomerById(customers: Customer[], id: string): Customer | undefined {
  return customers.find((c) => c.id === id);
}

export function getStaffById(staff: StaffRole[], id: string): StaffRole | undefined {
  return staff.find((s) => s.id === id);
}

export function getSupplierById(suppliers: Supplier[], id: string): Supplier | undefined {
  return suppliers.find((s) => s.id === id);
}

export function getProductById(products: EcommerceProduct[], id: string): EcommerceProduct | undefined {
  return products.find((p) => p.id === id);
}

export function getAddOnById(addOns: RentalAddOn[], id: string): RentalAddOn | undefined {
  return addOns.find((a) => a.id === id);
}

// Consistent quote calculation helper
export interface QuoteCalculationResult {
  days: number;
  dailyRate: number;
  rentalSubtotal: number;
  addOnDetails: {
    id: string;
    name: string;
    price: number;
    billing: string;
    calculatedCost: number;
  }[];
  addOnsTotal: number;
  subtotal: number;
  deposit: number;
  totalPayableNow: number;
}

export function calculateQuote(
  vehicle: Vehicle,
  days: number,
  selectedAddOnIds: string[],
  availableAddOns: RentalAddOn[]
): QuoteCalculationResult {
  const safeDays = Math.max(1, days || 1);
  const rentalSubtotal = vehicle.daily_rate_sgd * safeDays;

  const addOnDetails = selectedAddOnIds
    .map((id) => {
      const addOn = availableAddOns.find((a) => a.id === id);
      if (!addOn) return null;
      let calculatedCost = addOn.price_sgd;
      if (addOn.billing === 'per day') {
        calculatedCost = addOn.price_sgd * safeDays;
      } else if (addOn.billing === 'per hour') {
        calculatedCost = addOn.price_sgd * 4; // demo assumed 4 hours baseline for chauffeur
      }
      return {
        id: addOn.id,
        name: addOn.name,
        price: addOn.price_sgd,
        billing: addOn.billing,
        calculatedCost,
      };
    })
    .filter(Boolean) as QuoteCalculationResult['addOnDetails'];

  const addOnsTotal = addOnDetails.reduce((sum, item) => sum + item.calculatedCost, 0);
  const subtotal = rentalSubtotal + addOnsTotal;
  const deposit = vehicle.deposit_sgd;
  const totalPayableNow = subtotal; // deposit is authorized at handover

  return {
    days: safeDays,
    dailyRate: vehicle.daily_rate_sgd,
    rentalSubtotal,
    addOnDetails,
    addOnsTotal,
    subtotal,
    deposit,
    totalPayableNow,
  };
}
