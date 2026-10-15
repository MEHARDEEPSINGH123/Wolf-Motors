'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { WorkspaceHeader } from '@/components/navigation/WorkspaceHeader';
import { StorefrontFooter } from '@/components/navigation/StorefrontFooter';
import { useWolfData } from '@/context/WolfDataContext';
import { formatSGD } from '@/data/dataset';
import {
  CheckCircle2,
  Search,
} from 'lucide-react';

function OrdersPageContent() {
  const searchParams = useSearchParams();
  const highlightedOrderId = searchParams.get('newOrderId');

  const { orders, customers, products } = useWolfData();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    const matchesSearch =
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer_id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalSales = orders.reduce((sum, o) => sum + o.subtotal_sgd, 0);

  return (
    <div className="bg-white min-h-screen flex flex-col text-gray-950 selection:bg-forest selection:text-white">
      <WorkspaceHeader
        title="Merchandise Order Registry"
        subtitle="Manage client product deliveries, dispatch tracking, and fulfillment statuses."
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6">
        {highlightedOrderId && (
          <div className="p-4 bg-forest/10 border border-forest/30 rounded-none text-xs font-mono text-forest flex items-center justify-between animate-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-forest" />
              <span>
                New Order <strong>#{highlightedOrderId}</strong> successfully generated and queued in dispatch system!
              </span>
            </div>
            <Link href="/store" className="underline hover:text-forest-dark uppercase font-bold">
              Return to Store →
            </Link>
          </div>
        )}

        {/* Overview Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 bg-white rounded-none border border-gray-200 shadow-ferrari-card">
            <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500 block">
              Total Recorded Orders
            </span>
            <div className="text-2xl font-black text-gray-950 mt-1 font-mono">
              {orders.length}
            </div>
            <span className="text-[10px] text-gray-500">Demo transaction logs</span>
          </div>

          <div className="p-4 bg-white rounded-none border border-gray-200 shadow-ferrari-card">
            <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500 block">
              Total Merchandise Revenue
            </span>
            <div className="text-2xl font-black text-forest mt-1 font-mono">
              {formatSGD(totalSales)}
            </div>
            <span className="text-[10px] text-gray-500">Subtotals aggregated</span>
          </div>

          <div className="p-4 bg-white rounded-none border border-gray-200 shadow-ferrari-card">
            <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500 block">
              Processing / In Dispatch
            </span>
            <div className="text-2xl font-black text-amber-600 mt-1 font-mono">
              {orders.filter((o) => o.status === 'Processing' || o.status === 'Shipped').length}
            </div>
            <span className="text-[10px] text-gray-500">Awaiting courier delivery</span>
          </div>

          <div className="p-4 bg-white rounded-none border border-gray-200 shadow-ferrari-card">
            <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500 block">
              Completed Deliveries
            </span>
            <div className="text-2xl font-black text-blue-600 mt-1 font-mono">
              {orders.filter((o) => o.status === 'Delivered').length}
            </div>
            <span className="text-[10px] text-gray-500">Delivered successfully</span>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="bg-white p-4 rounded-none border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search order ID or customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-none pl-9 pr-3 py-1.5 text-xs text-gray-950 focus:outline-none focus:border-forest"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-gray-500">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-none px-3 py-1.5 text-xs text-gray-950 focus:outline-none focus:border-forest font-mono"
            >
              <option value="all">All Statuses ({orders.length})</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-none border border-gray-200 shadow-ferrari-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 uppercase bg-gray-50">
                  <th className="py-3 px-4 font-bold">Order ID</th>
                  <th className="py-3 px-4 font-bold">Customer</th>
                  <th className="py-3 px-4 font-bold">Items / SKUs</th>
                  <th className="py-3 px-4 font-bold">Subtotal</th>
                  <th className="py-3 px-4 font-bold">Courier</th>
                  <th className="py-3 px-4 font-bold">Total (SGD)</th>
                  <th className="py-3 px-4 font-bold">Order Status</th>
                  <th className="py-3 px-4 font-bold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.map((ord) => {
                  const cust = customers.find((c) => c.id === ord.customer_id);
                  const isNew = ord.id === highlightedOrderId;

                  return (
                    <tr
                      key={ord.id}
                      className={`hover:bg-gray-50 transition-colors ${
                        isNew ? 'bg-forest/5 border-l-2 border-forest' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4 font-bold text-forest">
                        {ord.id}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-gray-950">
                          {cust ? `${cust.first_name} ${cust.last_name}` : ord.customer_id}
                        </div>
                        <div className="text-[10px] text-gray-500">{cust?.email}</div>
                      </td>
                      <td className="py-3.5 px-4 text-gray-600">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {ord.product_ids.map((pid, idx) => {
                            const prod = products.find((p) => p.id === pid);
                            return (
                              <span
                                key={idx}
                                className="px-1.5 py-0.5 rounded-none bg-gray-100 text-[10px] text-gray-800 border border-gray-200 truncate max-w-[140px]"
                              >
                                {prod?.name || pid}
                              </span>
                            );
                          })}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-gray-700 font-bold">{formatSGD(ord.subtotal_sgd)}</td>
                      <td className="py-3.5 px-4 text-gray-500">{formatSGD(ord.shipping_sgd)}</td>
                      <td className="py-3.5 px-4 font-bold text-gray-950">
                        {formatSGD(ord.subtotal_sgd + ord.shipping_sgd)}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-none text-[10px] uppercase font-bold ${
                            ord.status === 'Delivered'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : ord.status === 'Shipped'
                              ? 'bg-purple-50 text-purple-700 border border-purple-200'
                              : ord.status === 'Processing'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : ord.status === 'Cancelled'
                              ? 'bg-red-50 text-crimson border border-red-200'
                              : 'bg-gray-100 text-gray-700 border border-gray-200'
                          }`}
                        >
                          {ord.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-gray-500">{ord.created_at}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <StorefrontFooter />
    </div>
  );
}

export default function OrdersPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white text-gray-950 p-20 text-center font-mono text-sm">Loading Order History...</div>}>
      <OrdersPageContent />
    </Suspense>
  );
}
