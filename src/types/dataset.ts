export interface BrandPalette {
  forest_green: string;
  obsidian_black: string;
  graphite: string;
  wolf_white: string;
  metallic_silver: string;
  crimson_red: string;
  muted_border: string;
}

export interface BrandMetadata {
  name: string;
  tagline: string;
  descriptor: string;
  market: string;
  palette: BrandPalette;
  logo_direction: string;
  demo_disclosure: string;
}

export interface DatasetMetadata {
  dataset_name: string;
  version: string;
  generated_date: string;
  locale: string;
  currency: string;
  timezone: string;
  market: string;
  purpose: string;
  disclaimer: string;
}

export type VehicleCategoryId =
  | 'sedan'
  | 'suv'
  | 'hatchback'
  | 'coupe'
  | 'convertible'
  | 'supercar'
  | 'electric'
  | 'luxury_mpv';

export interface VehicleCategory {
  id: VehicleCategoryId;
  name: string;
  slug: string;
}

export type VehicleStatus = 'Available' | 'Booked' | 'Maintenance';

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  display_name: string;
  category_id: VehicleCategoryId;
  year: number;
  daily_rate_sgd: number;
  deposit_sgd: number;
  seats: number;
  transmission: string;
  fuel_type: string;
  hub_id: string;
  status: VehicleStatus;
  registration: string;
  odometer_km: number;
  features: string[];
  image_prompt: string;
  availability_note: string;
}

export interface Hub {
  id: string;
  name: string;
  area: string;
  region: string;
  status: string;
}

export interface RentalAddOn {
  id: string;
  name: string;
  price_sgd: number;
  billing: 'per booking' | 'per day' | 'per hour';
  description: string;
}

export interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  segment: 'New' | 'Returning' | 'VIP' | 'Corporate';
  lifetime_value_sgd: number;
  consent_marketing: boolean;
  created_at: string;
}

export type BookingStatus =
  | 'Completed'
  | 'Confirmed'
  | 'Pending Payment'
  | 'Cancelled'
  | 'In Progress';

export interface Booking {
  id: string;
  customer_id: string;
  vehicle_id: string;
  pickup_hub_id: string;
  return_hub_id: string;
  pickup_date: string;
  return_date: string;
  rental_days: number;
  daily_rate_sgd: number;
  add_on_ids: string[];
  subtotal_sgd: number;
  deposit_sgd: number;
  status: BookingStatus;
  payment_status: 'Paid' | 'Unpaid' | 'Refunded';
  source: string;
  created_at: string;
  demo_record: boolean;
}

export type LeadStage =
  | 'New'
  | 'Contacted'
  | 'Qualified'
  | 'Viewing'
  | 'Proposal Sent'
  | 'Won';

export interface CrmLead {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  source: string;
  interest_category: VehicleCategoryId;
  estimated_budget_sgd: number;
  stage: LeadStage;
  owner_staff_id: string;
  next_action: string;
  created_at: string;
  demo_record: boolean;
}

export interface MarketingCampaign {
  id: string;
  name: string;
  channel: string;
  status: 'Active' | 'Draft' | 'Paused' | 'Completed';
  budget_sgd: number;
  spend_sgd: number;
  leads: number;
  bookings_attributed: number;
  goal: string;
}

export interface InventoryPart {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity_on_hand: number;
  reorder_level: number;
  unit_cost_sgd: number;
  supplier_id: string;
  location: string;
  stock_status: 'In Stock' | 'Reorder';
}

export interface Supplier {
  id: string;
  name: string;
  contact_email: string;
  category: string;
  lead_time_days: number;
  status: 'Active' | 'Review';
}

export type WorkOrderPriority = 'Low' | 'Normal' | 'High';
export type WorkOrderStatus = 'Open' | 'In Progress' | 'Scheduled' | 'Completed';

export interface MaintenanceWorkOrder {
  id: string;
  vehicle_id: string;
  type: string;
  priority: WorkOrderPriority;
  status: WorkOrderStatus;
  scheduled_date: string;
  assigned_staff_id: string;
  estimated_cost_sgd: number;
  notes: string;
}

export interface EcommerceProduct {
  id: string;
  name: string;
  category: string;
  price_sgd: number;
  stock: number;
  status: 'Published' | 'Draft';
  description: string;
  image_prompt: string;
}

export type OrderStatus =
  | 'Pending'
  | 'Processing'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled';

export interface EcommerceOrder {
  id: string;
  customer_id: string;
  product_ids: string[];
  status: OrderStatus;
  subtotal_sgd: number;
  shipping_sgd: number;
  created_at: string;
  demo_record: boolean;
}

export interface StaffRole {
  id: string;
  name: string;
  role: string;
  permissions: string[];
}

export interface Transaction {
  id: string;
  booking_id: string;
  type: string;
  amount_sgd: number;
  status: 'Paid' | 'Unpaid' | 'Refunded';
  date: string;
  provider: string;
  demo_record: boolean;
}

export interface DailyAnalyticsMetric {
  date: string;
  revenue_sgd: number;
  bookings: number;
  active_rentals: number;
  fleet_utilization_pct: number;
  website_sessions: number;
  conversion_rate_pct: number;
  average_booking_value_sgd: number;
  lead_count: number;
}

export interface Policy {
  id: string;
  title: string;
  summary: string;
  status: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface LuxuryMobilityDataset {
  metadata: DatasetMetadata;
  brand: BrandMetadata;
  vehicle_categories: VehicleCategory[];
  vehicles: Vehicle[];
  hubs: Hub[];
  rental_add_ons: RentalAddOn[];
  customers: Customer[];
  bookings: Booking[];
  crm_leads: CrmLead[];
  marketing_campaigns: MarketingCampaign[];
  inventory_parts: InventoryPart[];
  suppliers: Supplier[];
  maintenance_work_orders: MaintenanceWorkOrder[];
  ecommerce_products: EcommerceProduct[];
  ecommerce_orders: EcommerceOrder[];
  staff_roles: StaffRole[];
  transactions: Transaction[];
  daily_analytics_metrics: DailyAnalyticsMetric[];
  policies: Policy[];
  faqs: FAQ[];
}
