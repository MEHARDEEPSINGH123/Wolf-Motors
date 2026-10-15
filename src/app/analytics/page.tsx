'use client';

import React, { useState, useMemo } from 'react';
import { WorkspaceHeader } from '@/components/navigation/WorkspaceHeader';
import { useWolfData } from '@/context/WolfDataContext';
import { formatSGD, formatNumber, formatDate } from '@/data/dataset';
import {
  TrendingUp,
  BarChart3,
  DollarSign,
  Activity,
  Users,
  Eye,
  Car,
  ShieldAlert,
} from 'lucide-react';

export default function AnalyticsDashboardPage() {
  const { dailyMetrics } = useWolfData();

  // Date range filter: '7d' | '14d' | '30d'
  const [dateRange, setDateRange] = useState<'7d' | '14d' | '30d'>('30d');

  // Filtered metrics based on selected date range
  const filteredMetrics = useMemo(() => {
    if (dateRange === '7d') return dailyMetrics.slice(-7);
    if (dateRange === '14d') return dailyMetrics.slice(-14);
    return dailyMetrics; // all 30 days
  }, [dailyMetrics, dateRange]);

  // Derived calculations from the dataset
  const totalRevenue = useMemo(() => {
    return filteredMetrics.reduce((sum, m) => sum + m.revenue_sgd, 0);
  }, [filteredMetrics]);

  const totalBookings = useMemo(() => {
    return filteredMetrics.reduce((sum, m) => sum + m.bookings, 0);
  }, [filteredMetrics]);

  const totalSessions = useMemo(() => {
    return filteredMetrics.reduce((sum, m) => sum + m.website_sessions, 0);
  }, [filteredMetrics]);

  const totalLeads = useMemo(() => {
    return filteredMetrics.reduce((sum, m) => sum + m.lead_count, 0);
  }, [filteredMetrics]);

  const avgFleetUtilization = useMemo(() => {
    const sum = filteredMetrics.reduce((acc, m) => acc + m.fleet_utilization_pct, 0);
    return Math.round(sum / Math.max(1, filteredMetrics.length));
  }, [filteredMetrics]);

  const avgBookingValue = useMemo(() => {
    const sum = filteredMetrics.reduce((acc, m) => acc + m.average_booking_value_sgd, 0);
    return Math.round(sum / Math.max(1, filteredMetrics.length));
  }, [filteredMetrics]);

  const avgConversionRate = useMemo(() => {
    const sum = filteredMetrics.reduce((acc, m) => acc + m.conversion_rate_pct, 0);
    return (sum / Math.max(1, filteredMetrics.length)).toFixed(2);
  }, [filteredMetrics]);

  const currentActiveRentals = useMemo(() => {
    return filteredMetrics[filteredMetrics.length - 1]?.active_rentals || 0;
  }, [filteredMetrics]);

  // Max revenue for SVG bar scaling
  const maxDailyRevenue = useMemo(() => {
    return Math.max(...filteredMetrics.map((m) => m.revenue_sgd), 1);
  }, [filteredMetrics]);

  // Interactive tooltip state for charts
  const [hoveredMetric, setHoveredMetric] = useState<(typeof dailyMetrics)[0] | null>(null);

  return (
    <div className="bg-white min-h-screen flex flex-col text-gray-900 selection:bg-forest selection:text-white">
      <WorkspaceHeader
        title="Business Intelligence Analytics"
        subtitle="Dynamic performance metrics computed directly from 30 daily mobility records."
        actionButton={
          <div className="flex items-center gap-2 bg-gray-100 p-1 border border-gray-300">
            <span className="text-[10px] font-mono uppercase text-gray-600 pl-2 font-bold">Range:</span>
            {(['7d', '14d', '30d'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-3 py-1 text-xs font-mono font-bold uppercase transition-colors rounded-none ${
                  dateRange === range
                    ? 'bg-forest text-white shadow-forest-glow'
                    : 'text-gray-700 hover:text-black'
                }`}
              >
                {range === '7d' ? 'Last 7 Days' : range === '14d' ? 'Last 14 Days' : 'Full 30 Days'}
              </button>
            ))}
          </div>
        }
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        {/* Dataset Transparency Alert */}
        <div className="p-4 bg-emerald-50/60 border border-emerald-200 flex items-center justify-between text-xs font-mono text-gray-700 rounded-none">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-4 h-4 text-forest shrink-0" />
            <span>
              All charts and summary cards below are mathematically calculated from the supplied{' '}
              <strong className="text-gray-950 font-bold">daily_analytics_metrics</strong> JSON dataset.
            </span>
          </div>
          <span className="text-gray-500 hidden md:inline">
            Locale: en-SG • Currency: SGD
          </span>
        </div>

        {/* 8 Primary Calculated KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 bg-white border border-gray-200 hover:border-gray-900 transition-colors shadow-sm rounded-none">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Gross Revenue</span>
              <DollarSign className="w-4 h-4 text-forest" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-gray-950 mt-2 font-mono">
              {formatSGD(totalRevenue)}
            </div>
            <div className="text-[11px] text-forest mt-1 flex items-center gap-1 font-mono font-bold">
              <TrendingUp className="w-3 h-3" />
              <span>{filteredMetrics.length} reporting days</span>
            </div>
          </div>

          <div className="p-5 bg-white border border-gray-200 hover:border-gray-900 transition-colors shadow-sm rounded-none">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Total Bookings</span>
              <Activity className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-gray-950 mt-2 font-mono">
              {totalBookings}
            </div>
            <div className="text-[11px] text-gray-500 mt-1 font-mono">
              Avg {(totalBookings / filteredMetrics.length).toFixed(1)} bookings / day
            </div>
          </div>

          <div className="p-5 bg-white border border-gray-200 hover:border-gray-900 transition-colors shadow-sm rounded-none">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Fleet Utilization</span>
              <Car className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-600 mt-2 font-mono">
              {avgFleetUtilization}%
            </div>
            <div className="text-[11px] text-gray-500 mt-1 font-mono">
              Across 24 Singapore vehicles
            </div>
          </div>

          <div className="p-5 bg-white border border-gray-200 hover:border-gray-900 transition-colors shadow-sm rounded-none">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Active Rentals</span>
              <Activity className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 mt-2 font-mono">
              {currentActiveRentals}
            </div>
            <div className="text-[11px] text-gray-500 mt-1 font-mono">
              Currently deployed on road
            </div>
          </div>

          <div className="p-5 bg-white border border-gray-200 hover:border-gray-900 transition-colors shadow-sm rounded-none">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Avg Booking Value</span>
              <DollarSign className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-gray-950 mt-2 font-mono">
              {formatSGD(avgBookingValue)}
            </div>
            <div className="text-[11px] text-gray-500 mt-1 font-mono">
              Net rental + luxury add-ons
            </div>
          </div>

          <div className="p-5 bg-white border border-gray-200 hover:border-gray-900 transition-colors shadow-sm rounded-none">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Website Sessions</span>
              <Eye className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-gray-950 mt-2 font-mono">
              {formatNumber(totalSessions)}
            </div>
            <div className="text-[11px] text-gray-500 mt-1 font-mono">
              High-intent organic & search
            </div>
          </div>

          <div className="p-5 bg-white border border-gray-200 hover:border-gray-900 transition-colors shadow-sm rounded-none">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Conversion Rate</span>
              <TrendingUp className="w-4 h-4 text-forest" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-forest mt-2 font-mono">
              {avgConversionRate}%
            </div>
            <div className="text-[11px] text-gray-500 mt-1 font-mono">
              Session to reservation intent
            </div>
          </div>

          <div className="p-5 bg-white border border-gray-200 hover:border-gray-900 transition-colors shadow-sm rounded-none">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Total Lead Volume</span>
              <Users className="w-4 h-4 text-pink-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-gray-950 mt-2 font-mono">
              {totalLeads}
            </div>
            <div className="text-[11px] text-gray-500 mt-1 font-mono">
              Generated via campaigns
            </div>
          </div>
        </div>

        {/* CHART 1: REVENUE TREND BY DAY */}
        <div className="bg-white border border-gray-200 p-6 shadow-ferrari-card space-y-4 rounded-none">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 pb-4">
            <div>
              <h3 className="text-base font-bold uppercase tracking-wider text-gray-950 font-sans flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-forest" />
                <span>Daily Gross Revenue Trend (SGD)</span>
              </h3>
              <p className="text-xs text-gray-500">
                Hover over bars to inspect daily revenue, active fleet rentals, and bookings.
              </p>
            </div>

            {hoveredMetric && (
              <div className="text-right text-xs font-mono bg-gray-50 px-3 py-1.5 border border-gray-200">
                <span className="text-gray-500">{hoveredMetric.date}:</span>{' '}
                <strong className="text-forest">{formatSGD(hoveredMetric.revenue_sgd)}</strong> •{' '}
                <span className="text-gray-900">{hoveredMetric.bookings} bookings</span>
              </div>
            )}
          </div>

          {/* SVG Bar Chart with Lighter Green */}
          <div className="h-64 w-full pt-4">
            <div className="h-full flex items-end gap-1.5 sm:gap-2">
              {filteredMetrics.map((metric) => {
                const heightPct = Math.max(8, Math.round((metric.revenue_sgd / maxDailyRevenue) * 100));
                const isHovered = hoveredMetric?.date === metric.date;

                return (
                  <div
                    key={metric.date}
                    onMouseEnter={() => setHoveredMetric(metric)}
                    onMouseLeave={() => setHoveredMetric(null)}
                    className="flex-1 h-full flex flex-col justify-end items-center group cursor-pointer relative"
                  >
                    {isHovered && (
                      <div className="absolute -top-12 z-20 bg-gray-900 text-white px-2.5 py-1 text-[10px] font-mono shadow-md whitespace-nowrap pointer-events-none">
                        <div>{formatDate(metric.date)}</div>
                        <div className="text-emerald-400 font-bold">{formatSGD(metric.revenue_sgd)}</div>
                      </div>
                    )}

                    <div
                      style={{ height: `${heightPct}%` }}
                      className={`w-full rounded-none transition-all duration-200 ${
                        isHovered
                          ? 'bg-forest-light shadow-forest-glow'
                          : 'bg-forest hover:bg-forest-light'
                      }`}
                    />

                    <span className="text-[8px] sm:text-[9px] font-mono text-gray-500 mt-1 truncate w-full text-center">
                      {metric.date.split('-').slice(1).join('/')}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CHARTS ROW 2: FLEET UTILIZATION & CONVERSION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 p-6 shadow-ferrari-card space-y-4 rounded-none">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-950 font-sans">
                  Fleet Utilization Distribution (%)
                </h4>
                <p className="text-xs text-gray-500">Target threshold: 70% optimal allocation</p>
              </div>
              <span className="text-xs font-mono font-bold text-amber-600">
                Avg: {avgFleetUtilization}%
              </span>
            </div>

            <div className="h-52 flex items-end gap-1.5 pt-4">
              {filteredMetrics.map((metric) => {
                const isOptimal = metric.fleet_utilization_pct >= 70;
                return (
                  <div key={metric.date} className="flex-1 h-full flex flex-col justify-end items-center group">
                    <div
                      style={{ height: `${metric.fleet_utilization_pct}%` }}
                      title={`${metric.date}: ${metric.fleet_utilization_pct}%`}
                      className={`w-full rounded-none transition-all ${
                        isOptimal
                          ? 'bg-amber-500 hover:bg-amber-600'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                    <span className="text-[8px] font-mono text-gray-500 mt-1">
                      {metric.fleet_utilization_pct}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-6 shadow-ferrari-card space-y-4 rounded-none">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-950 font-sans">
                  Conversion Rate (%) Over Selected Days
                </h4>
                <p className="text-xs text-gray-500">Correlation with luxury campaign flights</p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-600">
                Avg: {avgConversionRate}%
              </span>
            </div>

            <div className="h-52 flex items-end gap-1.5 pt-4">
              {filteredMetrics.map((metric) => {
                const heightPct = Math.min(100, Math.round((metric.conversion_rate_pct / 5) * 100));
                return (
                  <div key={metric.date} className="flex-1 h-full flex flex-col justify-end items-center group">
                    <div
                      style={{ height: `${heightPct}%` }}
                      title={`${metric.date}: ${metric.conversion_rate_pct}% (${metric.website_sessions} sessions)`}
                      className="w-full rounded-none bg-blue-600 hover:bg-blue-700 transition-all"
                    />
                    <span className="text-[8px] font-mono text-blue-700 mt-1">
                      {metric.conversion_rate_pct}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* AUDITABLE METRIC TABLE */}
        <div className="bg-white border border-gray-200 overflow-hidden rounded-none shadow-sm">
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-950 font-sans">
              Auditable Daily Metric Rows ({filteredMetrics.length} of {dailyMetrics.length} total)
            </h4>
            <span className="text-xs font-mono text-forest font-bold">
              Dataset Version 1.0.0
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 uppercase bg-gray-50">
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Revenue (SGD)</th>
                  <th className="py-3 px-4">Bookings</th>
                  <th className="py-3 px-4">Active Rentals</th>
                  <th className="py-3 px-4">Fleet Util.</th>
                  <th className="py-3 px-4">Web Sessions</th>
                  <th className="py-3 px-4">Conv. Rate</th>
                  <th className="py-3 px-4">Avg Booking SGD</th>
                  <th className="py-3 px-4">Leads</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredMetrics.map((row) => (
                  <tr key={row.date} className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-bold text-gray-950">{row.date}</td>
                    <td className="py-3 px-4 font-bold text-forest">
                      {formatSGD(row.revenue_sgd)}
                    </td>
                    <td className="py-3 px-4 text-gray-700">{row.bookings}</td>
                    <td className="py-3 px-4 text-gray-700">{row.active_rentals}</td>
                    <td className="py-3 px-4 text-amber-600 font-bold">
                      {row.fleet_utilization_pct}%
                    </td>
                    <td className="py-3 px-4 text-gray-700">{row.website_sessions}</td>
                    <td className="py-3 px-4 text-blue-600 font-bold">{row.conversion_rate_pct}%</td>
                    <td className="py-3 px-4 text-gray-700">{formatSGD(row.average_booking_value_sgd)}</td>
                    <td className="py-3 px-4 text-purple-600 font-bold">{row.lead_count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
