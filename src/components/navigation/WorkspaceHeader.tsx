'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WolfLogo } from '@/components/brand/WolfLogo';
import {
  Users,
  BarChart3,
  Car,
  Package,
  ShoppingBag,
  ArrowUpRight,
  Shield,
} from 'lucide-react';
import { useWolfData } from '@/context/WolfDataContext';

interface WorkspaceHeaderProps {
  title: string;
  subtitle?: string;
  actionButton?: React.ReactNode;
}

export function WorkspaceHeader({ title, subtitle, actionButton }: WorkspaceHeaderProps) {
  const pathname = usePathname();
  const { leads, workOrders, inventory } = useWolfData();

  const openWorkOrders = workOrders.filter((w) => w.status !== 'Completed').length;
  const lowStockParts = inventory.filter((i) => i.stock_status === 'Reorder').length;
  const newLeads = leads.filter((l) => l.stage === 'New').length;

  const navItems = [
    {
      label: 'CRM & Pipeline',
      href: '/crm',
      icon: Users,
      badge: newLeads > 0 ? `${newLeads} new` : undefined,
      color: 'text-blue-600',
    },
    {
      label: 'Analytics',
      href: '/analytics',
      icon: BarChart3,
      badge: '30D Metrics',
      color: 'text-emerald-600',
    },
    {
      label: 'Fleet & Ops',
      href: '/operations',
      icon: Car,
      badge: openWorkOrders > 0 ? `${openWorkOrders} tasks` : undefined,
      color: 'text-amber-600',
    },
    {
      label: 'Inventory',
      href: '/inventory',
      icon: Package,
      badge: lowStockParts > 0 ? `${lowStockParts} reorder` : undefined,
      color: 'text-purple-600',
    },
    {
      label: 'Store & Orders',
      href: '/store/orders',
      icon: ShoppingBag,
      color: 'text-pink-600',
    },
  ];

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
      {/* Top utility row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-gray-100 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <WolfLogo size="sm" showTagline={false} />
          <div className="h-4 w-px bg-gray-200 hidden sm:block"></div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-gray-500">
            <span className="w-2 h-2 rounded-full bg-forest"></span>
            <span className="uppercase tracking-wider text-gray-900 font-bold">
              Enterprise Workspace
            </span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-600">{title}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Active staff persona pill */}
          <div className="hidden md:flex items-center gap-2 text-xs bg-gray-50 px-3 py-1 border border-gray-200">
            <Shield className="w-3.5 h-3.5 text-forest" />
            <span className="text-gray-500">Session:</span>
            <span className="font-bold text-gray-900">STF-006 (Administrator)</span>
          </div>

          <Link
            href="/"
            className="text-xs uppercase tracking-widest font-bold text-gray-600 hover:text-black flex items-center gap-1.5 transition-colors border-l border-gray-200 pl-4"
          >
            <span>Public Website</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-forest" />
          </Link>
        </div>
      </div>

      {/* Workspace Switcher Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between overflow-x-auto py-1 scrollbar-none">
          <nav className="flex space-x-1 sm:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border-b-2 rounded-none ${
                    isActive
                      ? 'border-forest bg-gray-50 text-gray-950 font-black'
                      : 'border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? item.color : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 font-mono font-normal ${
                        isActive
                          ? 'bg-forest/15 text-forest border border-forest/30'
                          : 'bg-gray-100 text-gray-500 border border-gray-200'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Optional contextual title bar with action button */}
      {(subtitle || actionButton) && (
        <div className="bg-gray-50 border-t border-gray-200 py-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-extrabold uppercase tracking-wider text-gray-950 font-sans flex items-center gap-2">
                <span>{title}</span>
              </h1>
              {subtitle && <p className="text-xs text-gray-600 mt-0.5">{subtitle}</p>}
            </div>
            {actionButton && <div>{actionButton}</div>}
          </div>
        </div>
      )}
    </div>
  );
}
