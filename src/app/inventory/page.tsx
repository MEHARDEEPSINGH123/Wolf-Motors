'use client';

import React, { useState, useMemo } from 'react';
import { WorkspaceHeader } from '@/components/navigation/WorkspaceHeader';
import { useWolfData } from '@/context/WolfDataContext';
import { InventoryPart, Supplier } from '@/types/dataset';
import { formatSGD, formatNumber } from '@/data/dataset';
import {
  Package,
  AlertTriangle,
  Search,
  Plus,
  Minus,
  Truck,
  Building2,
  X,
} from 'lucide-react';

export default function InventoryWorkspacePage() {
  const { inventory, suppliers, adjustInventoryStock } = useWolfData();

  const [activeTab, setActiveTab] = useState<'parts' | 'suppliers'>('parts');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);

  // Stock Adjustment Drawer / Modal State
  const [selectedPartForAdjustment, setSelectedPartForAdjustment] = useState<InventoryPart | null>(null);
  const [adjustmentDelta, setAdjustmentDelta] = useState<number>(5);

  // Selected Supplier Modal
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  // Categories in Inventory
  const categories = useMemo(() => {
    return Array.from(new Set(inventory.map((p) => p.category)));
  }, [inventory]);

  // Filtered Parts
  const filteredParts = useMemo(() => {
    return inventory.filter((part) => {
      const matchesSearch =
        part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        part.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        part.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategoryFilter === 'all' || part.category === selectedCategoryFilter;
      const matchesLowStock = !showLowStockOnly || part.stock_status === 'Reorder';
      return matchesSearch && matchesCategory && matchesLowStock;
    });
  }, [inventory, searchQuery, selectedCategoryFilter, showLowStockOnly]);

  // Computed Inventory Valuation
  const totalValuation = useMemo(() => {
    return inventory.reduce((sum, p) => sum + p.quantity_on_hand * p.unit_cost_sgd, 0);
  }, [inventory]);

  const totalQuantityOnHand = useMemo(() => {
    return inventory.reduce((sum, p) => sum + p.quantity_on_hand, 0);
  }, [inventory]);

  const reorderAlertCount = useMemo(() => {
    return inventory.filter((p) => p.stock_status === 'Reorder').length;
  }, [inventory]);

  const handleApplyAdjustment = (delta: number) => {
    if (!selectedPartForAdjustment) return;
    adjustInventoryStock(selectedPartForAdjustment.id, delta);
    setSelectedPartForAdjustment(null);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col text-gray-900 selection:bg-forest selection:text-white">
      <WorkspaceHeader
        title="Parts & Inventory Warehouse"
        subtitle="Manage components, SKUs, reorder thresholds, and Singapore supplier procurement."
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 bg-white border border-gray-200 shadow-sm rounded-none">
            <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500 block font-bold">
              Total Inventory Valuation
            </span>
            <div className="text-3xl font-black text-emerald-600 mt-1 font-mono">
              {formatSGD(totalValuation)}
            </div>
            <span className="text-[10px] text-gray-500">Asset value at unit cost</span>
          </div>

          <div className="p-5 bg-white border border-gray-200 shadow-sm rounded-none">
            <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500 block font-bold">
              Total Stock Units On Hand
            </span>
            <div className="text-3xl font-black text-gray-950 mt-1 font-mono">
              {formatNumber(totalQuantityOnHand)}
            </div>
            <span className="text-[10px] text-gray-500">Across {inventory.length} SKUs</span>
          </div>

          <div className="p-5 bg-white border border-gray-200 shadow-sm rounded-none">
            <span className="text-[10px] uppercase font-mono tracking-widest text-red-700 block font-bold">
              Low Stock Reorder Alerts
            </span>
            <div className="text-3xl font-black text-red-600 mt-1 font-mono">
              {reorderAlertCount}
            </div>
            <span className="text-[10px] text-gray-500">Threshold breached</span>
          </div>

          <div className="p-5 bg-white border border-gray-200 shadow-sm rounded-none">
            <span className="text-[10px] uppercase font-mono tracking-widest text-purple-700 block font-bold">
              Active Suppliers
            </span>
            <div className="text-3xl font-black text-purple-600 mt-1 font-mono">
              {suppliers.length}
            </div>
            <span className="text-[10px] text-gray-500">Singapore logistics network</span>
          </div>
        </div>

        {/* View Switcher & Filter Toolbar */}
        <div className="bg-gray-50 border border-gray-200 p-4 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between rounded-none">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('parts')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 rounded-none ${
                activeTab === 'parts'
                  ? 'bg-forest text-white shadow-forest-glow'
                  : 'bg-white text-gray-700 hover:text-black border border-gray-300'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>Parts & SKUs ({inventory.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('suppliers')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 rounded-none ${
                activeTab === 'suppliers'
                  ? 'bg-forest text-white shadow-forest-glow'
                  : 'bg-white text-gray-700 hover:text-black border border-gray-300'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Suppliers Network ({suppliers.length})</span>
            </button>
          </div>

          {activeTab === 'parts' && (
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative flex-1 sm:w-56">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search SKU or part name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-gray-300 pl-9 pr-3 py-1.5 text-xs text-gray-900 focus:outline-none focus:border-forest rounded-none"
                />
              </div>

              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="bg-white border border-gray-300 px-2.5 py-1.5 text-xs text-gray-800 focus:outline-none focus:border-forest font-mono rounded-none"
              >
                <option value="all">All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setShowLowStockOnly(!showLowStockOnly)}
                className={`px-3 py-1.5 text-xs font-mono font-bold uppercase transition-colors flex items-center gap-1.5 rounded-none ${
                  showLowStockOnly
                    ? 'bg-red-600 text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:text-black'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Reorder Alerts Only ({reorderAlertCount})</span>
              </button>
            </div>
          )}
        </div>

        {/* TAB 1: PARTS TABLE */}
        {activeTab === 'parts' && (
          <div className="bg-white border border-gray-200 overflow-hidden rounded-none shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 uppercase bg-gray-50">
                    <th className="py-3 px-4">SKU / ID</th>
                    <th className="py-3 px-4">Component Name</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Qty On Hand</th>
                    <th className="py-3 px-4">Reorder Level</th>
                    <th className="py-3 px-4">Unit Cost (SGD)</th>
                    <th className="py-3 px-4">Supplier</th>
                    <th className="py-3 px-4">Stock Status</th>
                    <th className="py-3 px-4">Stock Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredParts.map((part) => {
                    const supplier = suppliers.find((s) => s.id === part.supplier_id);
                    const isLow = part.stock_status === 'Reorder';
                    return (
                      <tr key={part.id} className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-bold text-gray-600">
                          <div>{part.sku}</div>
                          <div className="text-[10px] text-gray-400">{part.id}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-gray-950">{part.name}</span>
                          <span className="text-[10px] text-gray-500 block">{part.location}</span>
                        </td>
                        <td className="py-3 px-4 uppercase text-gray-700 font-semibold">{part.category}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`font-black text-sm ${
                              isLow ? 'text-red-600' : 'text-gray-950'
                            }`}
                          >
                            {part.quantity_on_hand}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-700">{part.reorder_level}</td>
                        <td className="py-3 px-4 font-bold text-gray-950">{formatSGD(part.unit_cost_sgd)}</td>
                        <td className="py-3 px-4 text-gray-700">
                          <button
                            onClick={() => setSelectedSupplier(supplier || null)}
                            className="text-forest hover:underline font-bold"
                          >
                            {supplier?.name || part.supplier_id}
                          </button>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 text-[10px] uppercase font-bold border rounded-none ${
                              isLow
                                ? 'bg-red-50 text-red-700 border-red-300'
                                : 'bg-emerald-50 text-emerald-700 border-emerald-300'
                            }`}
                          >
                            {part.stock_status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => adjustInventoryStock(part.id, 1)}
                              title="Add 1 Unit"
                              className="w-6 h-6 bg-gray-100 hover:bg-forest hover:text-white border border-gray-300 flex items-center justify-center text-gray-700 transition-colors rounded-none"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => adjustInventoryStock(part.id, -1)}
                              title="Deduct 1 Unit"
                              className="w-6 h-6 bg-gray-100 hover:bg-red-600 hover:text-white border border-gray-300 flex items-center justify-center text-gray-700 transition-colors rounded-none"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => setSelectedPartForAdjustment(part)}
                              className="px-2 py-1 bg-white border border-gray-300 text-[10px] text-gray-700 hover:text-black rounded-none"
                            >
                              Custom
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: SUPPLIERS NETWORK */}
        {activeTab === 'suppliers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suppliers.map((sup) => {
              const suppliedParts = inventory.filter((p) => p.supplier_id === sup.id);
              return (
                <div key={sup.id} className="p-6 bg-white border border-gray-200 space-y-4 rounded-none shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-forest font-bold">
                      {sup.id}
                    </span>
                    <span
                      className={`px-2 py-0.5 text-[10px] uppercase font-mono font-bold border rounded-none ${
                        sup.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                          : 'bg-amber-50 text-amber-700 border-amber-300'
                      }`}
                    >
                      {sup.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-bold uppercase text-gray-950 font-sans">
                      {sup.name}
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">{sup.category}</p>
                  </div>

                  <div className="space-y-1.5 text-xs font-mono text-gray-600 pt-2 border-t border-gray-100">
                    <div>Contact: {sup.contact_email}</div>
                    <div>Lead Time: {sup.lead_time_days} Business Days</div>
                    <div>Components Supplied: {suppliedParts.length} SKUs</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* STOCK ADJUSTMENT MODAL */}
      {selectedPartForAdjustment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-white border border-gray-300 rounded-none max-w-sm w-full p-6 text-gray-950 shadow-ferrari-elevated relative font-mono text-xs">
            <button
              onClick={() => setSelectedPartForAdjustment(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold uppercase text-gray-950 font-sans mb-1">
              Adjust Component Stock
            </h3>
            <p className="text-gray-500 mb-4">{selectedPartForAdjustment.name} ({selectedPartForAdjustment.sku})</p>

            <div className="p-3 bg-gray-50 border border-gray-200 mb-4">
              <div className="flex justify-between text-gray-700">
                <span>Current Stock:</span>
                <span className="font-bold text-gray-950">{selectedPartForAdjustment.quantity_on_hand} units</span>
              </div>
              <div className="flex justify-between text-gray-700 mt-1">
                <span>Reorder Threshold:</span>
                <span className="text-gray-500">{selectedPartForAdjustment.reorder_level} units</span>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <label className="text-[10px] uppercase text-gray-700 block font-bold">
                Adjustment Quantity (+ to replenish, - to dispatch):
              </label>
              <input
                type="number"
                value={adjustmentDelta}
                onChange={(e) => setAdjustmentDelta(Number(e.target.value))}
                className="w-full bg-white border border-gray-300 p-2 text-gray-950 font-bold text-sm rounded-none"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedPartForAdjustment(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 hover:text-black rounded-none"
              >
                Cancel
              </button>
              <button
                onClick={() => handleApplyAdjustment(adjustmentDelta)}
                className="px-5 py-2 bg-forest hover:bg-forest-dark text-white font-bold uppercase rounded-none"
              >
                Apply Adjustment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUPPLIER DETAILS MODAL */}
      {selectedSupplier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-white border border-gray-300 rounded-none max-w-md w-full p-6 text-gray-950 shadow-ferrari-elevated relative font-mono text-xs">
            <button
              onClick={() => setSelectedSupplier(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-forest mb-1">
              <Building2 className="w-4 h-4" />
              <span className="font-bold uppercase tracking-widest">{selectedSupplier.id}</span>
            </div>

            <h3 className="text-xl font-bold uppercase text-gray-950 font-sans">
              {selectedSupplier.name}
            </h3>
            <p className="text-gray-500 mb-4">{selectedSupplier.category} Procurement</p>

            <div className="space-y-2 p-4 bg-gray-50 border border-gray-200 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="text-gray-950 font-bold">{selectedSupplier.contact_email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Standard Lead Time:</span>
                <span className="text-gray-950">{selectedSupplier.lead_time_days} Days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Agreement Status:</span>
                <span className="text-emerald-700 font-bold">{selectedSupplier.status}</span>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedSupplier(null)}
                className="px-4 py-2 bg-forest text-white font-bold uppercase rounded-none"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
