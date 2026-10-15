'use client';

import React, { useState, useMemo } from 'react';
import { WorkspaceHeader } from '@/components/navigation/WorkspaceHeader';
import { useWolfData } from '@/context/WolfDataContext';
import { VehicleStatus, WorkOrderStatus, WorkOrderPriority } from '@/types/dataset';
import { formatSGD } from '@/data/dataset';
import {
  Car,
  Wrench,
  Calendar,
  Plus,
  Search,
  X,
} from 'lucide-react';

export default function FleetOperationsPage() {
  const {
    vehicles,
    hubs,
    categories,
    staff,
    workOrders,
    bookings,
    updateVehicleStatus,
    updateWorkOrderStatus,
    addWorkOrder,
  } = useWolfData();

  const [activeTab, setActiveTab] = useState<'fleet' | 'maintenance' | 'bookings'>('fleet');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHubFilter, setSelectedHubFilter] = useState('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');
  const [selectedPriorityFilter, setSelectedPriorityFilter] = useState('all');

  // New Work Order Modal State
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
  const [orderVehicleId, setOrderVehicleId] = useState(vehicles[0]?.id || 'WOLF-001');
  const [orderType, setOrderType] = useState('Scheduled Service');
  const [orderPriority, setOrderPriority] = useState<WorkOrderPriority>('Normal');
  const [orderDate, setOrderDate] = useState('2026-10-25');
  const [orderStaffId, setOrderStaffId] = useState('STF-001');
  const [orderCost, setOrderCost] = useState(650);
  const [orderNotes, setOrderNotes] = useState('Comprehensive multi-point Singapore inspection.');

  // Filtered vehicles
  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      const matchesSearch =
        v.display_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.registration.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesHub = selectedHubFilter === 'all' || v.hub_id === selectedHubFilter;
      const matchesStatus = selectedStatusFilter === 'all' || v.status === selectedStatusFilter;
      return matchesSearch && matchesHub && matchesStatus;
    });
  }, [vehicles, searchQuery, selectedHubFilter, selectedStatusFilter]);

  // Filtered work orders
  const filteredOrders = useMemo(() => {
    return workOrders.filter((wo) => {
      const matchesSearch =
        wo.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        wo.vehicle_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        wo.type.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPriority =
        selectedPriorityFilter === 'all' || wo.priority === selectedPriorityFilter;
      return matchesSearch && matchesPriority;
    });
  }, [workOrders, searchQuery, selectedPriorityFilter]);

  // Summary counters
  const totalFleet = vehicles.length;
  const availableCount = vehicles.filter((v) => v.status === 'Available').length;
  const bookedCount = vehicles.filter((v) => v.status === 'Booked').length;
  const maintenanceCount = vehicles.filter((v) => v.status === 'Maintenance').length;
  const openOrdersCount = workOrders.filter((w) => w.status !== 'Completed').length;

  const handleCreateWorkOrder = (e: React.FormEvent) => {
    e.preventDefault();
    addWorkOrder({
      vehicle_id: orderVehicleId,
      type: orderType,
      priority: orderPriority,
      status: 'Open',
      scheduled_date: orderDate,
      assigned_staff_id: orderStaffId,
      estimated_cost_sgd: Number(orderCost),
      notes: orderNotes,
    });
    setIsNewOrderModalOpen(false);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col text-gray-900 selection:bg-forest selection:text-white">
      <WorkspaceHeader
        title="Fleet & Operations Management"
        subtitle="Live fleet readiness, hub distribution across 12 Singapore locations, and maintenance work orders."
        actionButton={
          <button
            onClick={() => setIsNewOrderModalOpen(true)}
            className="px-5 py-2.5 rounded-none bg-forest hover:bg-forest-dark text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-forest-glow transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Work Order</span>
          </button>
        }
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6">
        {/* Metric Overview Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
          <div className="p-5 bg-white border border-gray-200 shadow-sm rounded-none">
            <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500 block font-bold">
              Total Fleet Roster
            </span>
            <div className="text-3xl font-black text-gray-950 mt-1 font-mono">{totalFleet}</div>
            <span className="text-[10px] text-gray-500">Registered vehicles</span>
          </div>

          <div className="p-5 bg-white border border-gray-200 shadow-sm rounded-none">
            <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-700 block font-bold">
              Available & Ready
            </span>
            <div className="text-3xl font-black text-emerald-600 mt-1 font-mono">{availableCount}</div>
            <span className="text-[10px] text-gray-500">Ready for dispatch</span>
          </div>

          <div className="p-5 bg-white border border-gray-200 shadow-sm rounded-none">
            <span className="text-[10px] uppercase font-mono tracking-widest text-amber-700 block font-bold">
              Active In Rental
            </span>
            <div className="text-3xl font-black text-amber-600 mt-1 font-mono">{bookedCount}</div>
            <span className="text-[10px] text-gray-500">Deployed with clients</span>
          </div>

          <div className="p-5 bg-white border border-gray-200 shadow-sm rounded-none">
            <span className="text-[10px] uppercase font-mono tracking-widest text-red-700 block font-bold">
              Maintenance Bay
            </span>
            <div className="text-3xl font-black text-red-600 mt-1 font-mono">{maintenanceCount}</div>
            <span className="text-[10px] text-gray-500">Inspections & repairs</span>
          </div>

          <div className="p-5 bg-white border border-gray-200 shadow-sm rounded-none col-span-2 sm:col-span-1">
            <span className="text-[10px] uppercase font-mono tracking-widest text-purple-700 block font-bold">
              Open Work Orders
            </span>
            <div className="text-3xl font-black text-purple-600 mt-1 font-mono">{openOrdersCount}</div>
            <span className="text-[10px] text-gray-500">Queued service tasks</span>
          </div>
        </div>

        {/* View Switcher Tabs & Filter Toolbar */}
        <div className="bg-gray-50 border border-gray-200 p-4 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between rounded-none">
          <div className="flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('fleet')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 rounded-none ${
                activeTab === 'fleet'
                  ? 'bg-forest text-white shadow-forest-glow'
                  : 'bg-white text-gray-700 hover:text-black border border-gray-300'
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              <span>Fleet Roster & Status ({vehicles.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('maintenance')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 rounded-none ${
                activeTab === 'maintenance'
                  ? 'bg-forest text-white shadow-forest-glow'
                  : 'bg-white text-gray-700 hover:text-black border border-gray-300'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Maintenance Work Orders ({workOrders.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 rounded-none ${
                activeTab === 'bookings'
                  ? 'bg-forest text-white shadow-forest-glow'
                  : 'bg-white text-gray-700 hover:text-black border border-gray-300'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Rental Allocations ({bookings.length})</span>
            </button>
          </div>

          {/* Search & Hub Filter */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-60">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search registration, ID, model..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-300 pl-9 pr-3 py-1.5 text-xs text-gray-900 focus:outline-none focus:border-forest rounded-none"
              />
            </div>

            {activeTab === 'fleet' ? (
              <select
                value={selectedHubFilter}
                onChange={(e) => setSelectedHubFilter(e.target.value)}
                className="bg-white border border-gray-300 px-2.5 py-1.5 text-xs text-gray-800 focus:outline-none focus:border-forest font-mono rounded-none"
              >
                <option value="all">All 12 Hubs</option>
                {hubs.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.name}
                  </option>
                ))}
              </select>
            ) : (
              <select
                value={selectedPriorityFilter}
                onChange={(e) => setSelectedPriorityFilter(e.target.value)}
                className="bg-white border border-gray-300 px-2.5 py-1.5 text-xs text-gray-800 focus:outline-none focus:border-forest font-mono rounded-none"
              >
                <option value="all">All Priorities</option>
                <option value="High">High Priority</option>
                <option value="Normal">Normal</option>
                <option value="Low">Low</option>
              </select>
            )}
          </div>
        </div>

        {/* TAB 1: FLEET ROSTER & STATUS MANAGEMENT */}
        {activeTab === 'fleet' && (
          <div className="bg-white border border-gray-200 overflow-hidden rounded-none shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 uppercase bg-gray-50">
                    <th className="py-3 px-4">Chassis ID</th>
                    <th className="py-3 px-4">Vehicle Model</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Assigned Hub</th>
                    <th className="py-3 px-4">Registration</th>
                    <th className="py-3 px-4">Odometer</th>
                    <th className="py-3 px-4">Daily Rate</th>
                    <th className="py-3 px-4">Live Status (Interact)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredVehicles.map((v) => {
                    const hub = hubs.find((h) => h.id === v.hub_id);
                    const category = categories.find((c) => c.id === v.category_id);
                    return (
                      <tr key={v.id} className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-bold text-forest">{v.id}</td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-gray-950">{v.display_name}</div>
                          <div className="text-[10px] text-gray-500">
                            {v.seats} Seats • {v.transmission} • {v.fuel_type}
                          </div>
                        </td>
                        <td className="py-3 px-4 uppercase text-gray-700 font-semibold">{category?.name || v.category_id}</td>
                        <td className="py-3 px-4 text-gray-600">
                          {hub?.name || v.hub_id} ({hub?.region})
                        </td>
                        <td className="py-3 px-4 text-gray-800">{v.registration}</td>
                        <td className="py-3 px-4 text-gray-600">{v.odometer_km.toLocaleString()} km</td>
                        <td className="py-3 px-4 font-bold text-gray-950">{formatSGD(v.daily_rate_sgd)}</td>
                        <td className="py-3 px-4">
                          <select
                            value={v.status}
                            onChange={(e) => updateVehicleStatus(v.id, e.target.value as VehicleStatus)}
                            className={`px-2.5 py-1 text-xs font-bold uppercase border cursor-pointer rounded-none ${
                              v.status === 'Available'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                : v.status === 'Booked'
                                ? 'bg-amber-50 text-amber-700 border-amber-300'
                                : 'bg-red-50 text-red-700 border-red-300'
                            }`}
                          >
                            <option value="Available">Available</option>
                            <option value="Booked">Booked</option>
                            <option value="Maintenance">Maintenance</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: MAINTENANCE WORK ORDERS */}
        {activeTab === 'maintenance' && (
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 overflow-hidden rounded-none shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-500 uppercase bg-gray-50">
                      <th className="py-3 px-4">Order ID</th>
                      <th className="py-3 px-4">Vehicle</th>
                      <th className="py-3 px-4">Service Type</th>
                      <th className="py-3 px-4">Priority</th>
                      <th className="py-3 px-4">Scheduled Date</th>
                      <th className="py-3 px-4">Assigned Staff</th>
                      <th className="py-3 px-4">Est. Cost (SGD)</th>
                      <th className="py-3 px-4">Work Order Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredOrders.map((wo) => {
                      const veh = vehicles.find((v) => v.id === wo.vehicle_id);
                      const staffMember = staff.find((s) => s.id === wo.assigned_staff_id);
                      return (
                        <tr key={wo.id} className="hover:bg-gray-50">
                          <td className="py-3 px-4 font-bold text-amber-600">{wo.id}</td>
                          <td className="py-3 px-4">
                            <div className="font-bold text-gray-950">{veh?.display_name || wo.vehicle_id}</div>
                            <div className="text-[10px] text-gray-500">{wo.notes}</div>
                          </td>
                          <td className="py-3 px-4 text-gray-700">{wo.type}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-0.5 text-[10px] uppercase font-bold border rounded-none ${
                                wo.priority === 'High'
                                  ? 'bg-red-50 text-red-700 border-red-300'
                                  : wo.priority === 'Normal'
                                  ? 'bg-amber-50 text-amber-700 border-amber-300'
                                  : 'bg-gray-100 text-gray-600 border-gray-200'
                              }`}
                            >
                              {wo.priority}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{wo.scheduled_date}</td>
                          <td className="py-3 px-4 text-gray-700">
                            {staffMember?.name || wo.assigned_staff_id}
                          </td>
                          <td className="py-3 px-4 font-bold text-gray-950">
                            {formatSGD(wo.estimated_cost_sgd)}
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={wo.status}
                              onChange={(e) => updateWorkOrderStatus(wo.id, e.target.value as WorkOrderStatus)}
                              className={`px-2.5 py-1 text-xs font-bold uppercase border cursor-pointer rounded-none ${
                                wo.status === 'Completed'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                  : wo.status === 'In Progress'
                                  ? 'bg-blue-50 text-blue-700 border-blue-300'
                                  : wo.status === 'Scheduled'
                                  ? 'bg-purple-50 text-purple-700 border-purple-300'
                                  : 'bg-amber-50 text-amber-700 border-amber-300'
                              }`}
                            >
                              <option value="Open">Open</option>
                              <option value="Scheduled">Scheduled</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BOOKING ALLOCATIONS */}
        {activeTab === 'bookings' && (
          <div className="bg-white border border-gray-200 overflow-hidden rounded-none shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 uppercase bg-gray-50">
                    <th className="py-3 px-4">Booking Ref</th>
                    <th className="py-3 px-4">Vehicle</th>
                    <th className="py-3 px-4">Handover Pickup</th>
                    <th className="py-3 px-4">Handover Return</th>
                    <th className="py-3 px-4">Duration</th>
                    <th className="py-3 px-4">Rental Subtotal</th>
                    <th className="py-3 px-4">Deposit</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {bookings.map((b) => {
                    const veh = vehicles.find((v) => v.id === b.vehicle_id);
                    const pick = hubs.find((h) => h.id === b.pickup_hub_id);
                    const ret = hubs.find((h) => h.id === b.return_hub_id);
                    return (
                      <tr key={b.id} className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-bold text-forest">{b.id}</td>
                        <td className="py-3 px-4 font-bold text-gray-950">
                          {veh?.display_name || b.vehicle_id}
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {b.pickup_date} ({pick?.name || b.pickup_hub_id})
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {b.return_date} ({ret?.name || b.return_hub_id})
                        </td>
                        <td className="py-3 px-4 text-gray-600">{b.rental_days} Days</td>
                        <td className="py-3 px-4 font-bold text-gray-950">{formatSGD(b.subtotal_sgd)}</td>
                        <td className="py-3 px-4 text-gray-600">{formatSGD(b.deposit_sgd)}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 text-[10px] uppercase font-bold border rounded-none ${
                              b.status === 'Confirmed' || b.status === 'Completed'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                : b.status === 'In Progress'
                                ? 'bg-blue-50 text-blue-700 border-blue-300'
                                : b.status === 'Cancelled'
                                ? 'bg-red-50 text-red-700 border-red-300'
                                : 'bg-amber-50 text-amber-700 border-amber-300'
                            }`}
                          >
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* CREATE WORK ORDER MODAL */}
      {isNewOrderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-white border border-gray-300 rounded-none max-w-lg w-full p-6 text-gray-950 shadow-ferrari-elevated relative">
            <button
              onClick={() => setIsNewOrderModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold uppercase text-gray-950 mb-4 font-sans">
              Schedule Fleet Maintenance Work Order
            </h3>

            <form onSubmit={handleCreateWorkOrder} className="space-y-4 text-xs font-mono">
              <div>
                <label className="text-[10px] uppercase text-gray-700 block mb-1 font-bold">Target Vehicle *</label>
                <select
                  value={orderVehicleId}
                  onChange={(e) => setOrderVehicleId(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 p-2.5 text-gray-900 rounded-none"
                >
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.id} — {v.display_name} ({v.registration})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase text-gray-700 block mb-1 font-bold">Work Type</label>
                  <select
                    value={orderType}
                    onChange={(e) => setOrderType(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 p-2 text-gray-900 rounded-none"
                  >
                    <option>Scheduled Service</option>
                    <option>Inspection</option>
                    <option>Tyre Replacement</option>
                    <option>Cleaning & Detail</option>
                    <option>EV System Check</option>
                    <option>Repair</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase text-gray-700 block mb-1 font-bold">Priority</label>
                  <select
                    value={orderPriority}
                    onChange={(e) => setOrderPriority(e.target.value as WorkOrderPriority)}
                    className="w-full bg-gray-50 border border-gray-300 p-2 text-gray-900 rounded-none"
                  >
                    <option value="Low">Low</option>
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase text-gray-700 block mb-1 font-bold">Scheduled Date</label>
                  <input
                    type="date"
                    value={orderDate}
                    onChange={(e) => setOrderDate(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 p-2 text-gray-900 rounded-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase text-gray-700 block mb-1 font-bold">Assigned Staff</label>
                  <select
                    value={orderStaffId}
                    onChange={(e) => setOrderStaffId(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 p-2 text-gray-900 rounded-none"
                  >
                    {staff.map((st) => (
                      <option key={st.id} value={st.id}>
                        {st.name} ({st.role.split(' ')[0]})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase text-gray-700 block mb-1 font-bold">Est. Cost (SGD)</label>
                <input
                  type="number"
                  value={orderCost}
                  onChange={(e) => setOrderCost(Number(e.target.value))}
                  className="w-full bg-gray-50 border border-gray-300 p-2 text-gray-900 rounded-none"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase text-gray-700 block mb-1 font-bold">Work Order Notes</label>
                <textarea
                  rows={2}
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 p-2 text-gray-900 rounded-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsNewOrderModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 hover:text-black rounded-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-forest hover:bg-forest-dark text-white font-bold uppercase rounded-none"
                >
                  Confirm Work Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
