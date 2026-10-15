'use client';

import React, { useState, useMemo } from 'react';
import { WorkspaceHeader } from '@/components/navigation/WorkspaceHeader';
import { useWolfData } from '@/context/WolfDataContext';
import { LeadStage, CrmLead } from '@/types/dataset';
import { formatSGD } from '@/data/dataset';
import {
  Users,
  Kanban,
  Target,
  Search,
  Plus,
  Layers,
  X,
} from 'lucide-react';

export default function CrmWorkspacePage() {
  const {
    leads,
    customers,
    campaigns,
    staff,
    categories,
    updateLeadStage,
    updateLeadAction,
    addLead,
  } = useWolfData();

  // Tab: Pipeline (Kanban), List View, Customers, Campaigns
  const [activeTab, setActiveTab] = useState<'pipeline' | 'list' | 'customers' | 'campaigns'>('pipeline');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStageFilter, setSelectedStageFilter] = useState<string>('all');
  const [selectedSourceFilter, setSelectedSourceFilter] = useState<string>('all');

  // Selected lead for detail modal
  const [selectedLead, setSelectedLead] = useState<CrmLead | null>(null);
  const [newActionInput, setNewActionInput] = useState('');

  // Add Lead Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadEmail, setNewLeadEmail] = useState('');
  const [newLeadSource, setNewLeadSource] = useState('Organic Search');
  const [newLeadCategory, setNewLeadCategory] = useState<any>('supercar');
  const [newLeadBudget, setNewLeadBudget] = useState(3500);
  const [newLeadOwner, setNewLeadOwner] = useState('STF-002');
  const [newLeadAction, setNewLeadAction] = useState('Coordinate vehicle test viewing at Marina Bay Hub');

  const STAGES: LeadStage[] = [
    'New',
    'Contacted',
    'Qualified',
    'Viewing',
    'Proposal Sent',
    'Won',
  ];

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      const matchesSearch =
        l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStage = selectedStageFilter === 'all' || l.stage === selectedStageFilter;
      const matchesSource = selectedSourceFilter === 'all' || l.source === selectedSourceFilter;
      return matchesSearch && matchesStage && matchesSource;
    });
  }, [leads, searchQuery, selectedStageFilter, selectedSourceFilter]);

  // Unique sources
  const leadSources = useMemo(() => {
    return Array.from(new Set(leads.map((l) => l.source)));
  }, [leads]);

  // Pipeline metrics
  const totalPipelineValue = useMemo(() => {
    return leads.reduce((sum, l) => sum + (l.estimated_budget_sgd || 0), 0);
  }, [leads]);

  const wonLeadsCount = leads.filter((l) => l.stage === 'Won').length;
  const wonRate = Math.round((wonLeadsCount / Math.max(1, leads.length)) * 100);

  const handleSaveAction = (leadId: string) => {
    if (!newActionInput.trim()) return;
    updateLeadAction(leadId, newActionInput.trim());
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead({ ...selectedLead, next_action: newActionInput.trim() });
    }
    setNewActionInput('');
  };

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName.trim() || !newLeadEmail.trim()) return;

    addLead({
      customer_id: 'CUS-0001',
      name: newLeadName,
      email: newLeadEmail,
      source: newLeadSource,
      interest_category: newLeadCategory,
      estimated_budget_sgd: Number(newLeadBudget),
      stage: 'New',
      owner_staff_id: newLeadOwner,
      next_action: newLeadAction,
    });

    setIsAddModalOpen(false);
    setNewLeadName('');
    setNewLeadEmail('');
  };

  return (
    <div className="bg-white min-h-screen flex flex-col text-gray-900 selection:bg-forest selection:text-white">
      {/* Workspace Header */}
      <WorkspaceHeader
        title="CRM & Client Pipeline"
        subtitle="Manage lead qualification stages, customer segment intelligence, and campaign attribution."
        actionButton={
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-2.5 rounded-none bg-forest hover:bg-forest-dark text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-forest-glow transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Lead</span>
          </button>
        }
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 bg-white border border-gray-200 shadow-sm rounded-none">
            <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500 block">
              Active Pipeline Leads
            </span>
            <div className="text-3xl font-black text-gray-950 mt-1 font-mono">
              {leads.length}
            </div>
            <span className="text-[11px] text-forest font-semibold">
              {leads.filter((l) => l.stage === 'New').length} awaiting first contact
            </span>
          </div>

          <div className="p-5 bg-white border border-gray-200 shadow-sm rounded-none">
            <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500 block">
              Estimated Pipeline Value
            </span>
            <div className="text-3xl font-black text-emerald-600 mt-1 font-mono">
              {formatSGD(totalPipelineValue)}
            </div>
            <span className="text-[11px] text-gray-500">Estimated rental bookings</span>
          </div>

          <div className="p-5 bg-white border border-gray-200 shadow-sm rounded-none">
            <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500 block">
              Conversion Win Rate
            </span>
            <div className="text-3xl font-black text-blue-600 mt-1 font-mono">
              {wonRate}%
            </div>
            <span className="text-[11px] text-gray-500">{wonLeadsCount} closed won</span>
          </div>

          <div className="p-5 bg-white border border-gray-200 shadow-sm rounded-none">
            <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500 block">
              Registered Client Profiles
            </span>
            <div className="text-3xl font-black text-gray-950 mt-1 font-mono">
              {customers.length}
            </div>
            <span className="text-[11px] text-purple-600 font-semibold">
              {customers.filter((c) => c.segment === 'VIP').length} VIP patrons
            </span>
          </div>
        </div>

        {/* View Switcher Tabs & Filters Bar */}
        <div className="bg-gray-50 border border-gray-200 p-4 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between rounded-none">
          <div className="flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('pipeline')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 rounded-none ${
                activeTab === 'pipeline'
                  ? 'bg-forest text-white shadow-forest-glow'
                  : 'bg-white text-gray-700 hover:text-black border border-gray-300'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Pipeline Stage Board</span>
            </button>
            <button
              onClick={() => setActiveTab('list')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 rounded-none ${
                activeTab === 'list'
                  ? 'bg-forest text-white shadow-forest-glow'
                  : 'bg-white text-gray-700 hover:text-black border border-gray-300'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Lead Table</span>
            </button>
            <button
              onClick={() => setActiveTab('customers')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 rounded-none ${
                activeTab === 'customers'
                  ? 'bg-forest text-white shadow-forest-glow'
                  : 'bg-white text-gray-700 hover:text-black border border-gray-300'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Customer Segmentation ({customers.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('campaigns')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 rounded-none ${
                activeTab === 'campaigns'
                  ? 'bg-forest text-white shadow-forest-glow'
                  : 'bg-white text-gray-700 hover:text-black border border-gray-300'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>Campaigns ({campaigns.length})</span>
            </button>
          </div>

          {/* Search & Stage Filters */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-60">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search leads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-300 pl-9 pr-3 py-1.5 text-xs text-gray-900 focus:outline-none focus:border-forest rounded-none"
              />
            </div>

            <select
              value={selectedSourceFilter}
              onChange={(e) => setSelectedSourceFilter(e.target.value)}
              className="bg-white border border-gray-300 px-2.5 py-1.5 text-xs text-gray-800 focus:outline-none focus:border-forest font-mono rounded-none"
            >
              <option value="all">All Sources</option>
              {leadSources.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* TAB 1: PIPELINE STAGE BOARD (KANBAN) */}
        {activeTab === 'pipeline' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5 overflow-x-auto pb-4">
            {STAGES.map((stage) => {
              const stageLeads = filteredLeads.filter((l) => l.stage === stage);
              const stageValue = stageLeads.reduce((sum, l) => sum + (l.estimated_budget_sgd || 0), 0);

              const stageColors: Record<LeadStage, string> = {
                New: 'border-blue-300 text-blue-700 bg-blue-50',
                Contacted: 'border-cyan-300 text-cyan-700 bg-cyan-50',
                Qualified: 'border-amber-300 text-amber-700 bg-amber-50',
                Viewing: 'border-purple-300 text-purple-700 bg-purple-50',
                'Proposal Sent': 'border-indigo-300 text-indigo-700 bg-indigo-50',
                Won: 'border-emerald-300 text-emerald-700 bg-emerald-50',
              };

              return (
                <div
                  key={stage}
                  className="bg-gray-50 border border-gray-200 flex flex-col min-w-[210px] min-h-[480px] rounded-none shadow-sm"
                >
                  {/* Stage Column Header */}
                  <div className="p-3 bg-white border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 border ${stageColors[stage]}`}>
                        {stage}
                      </span>
                      <span className="text-xs font-mono font-bold text-gray-600">
                        {stageLeads.length}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-gray-600 mt-1 font-bold">
                      {formatSGD(stageValue)}
                    </div>
                  </div>

                  {/* Stage Leads Cards */}
                  <div className="p-2 space-y-2.5 flex-1 overflow-y-auto max-h-[600px]">
                    {stageLeads.map((lead) => {
                      const owner = staff.find((s) => s.id === lead.owner_staff_id);
                      return (
                        <div
                          key={lead.id}
                          onClick={() => setSelectedLead(lead)}
                          className="p-3.5 bg-white border border-gray-200 hover:border-gray-900 transition-all cursor-pointer shadow-sm group rounded-none"
                        >
                          <div className="flex items-center justify-between text-[10px] font-mono text-gray-500">
                            <span>{lead.id}</span>
                            <span className="text-forest font-bold">
                              {formatSGD(lead.estimated_budget_sgd)}
                            </span>
                          </div>

                          <h4 className="text-xs font-bold text-gray-950 group-hover:text-forest transition-colors mt-1">
                            {lead.name}
                          </h4>

                          <div className="text-[10px] text-gray-600 font-mono mt-0.5">
                            Interest: <span className="uppercase text-gray-900 font-semibold">{lead.interest_category}</span>
                          </div>

                          <div className="mt-2 text-[10px] text-gray-500 line-clamp-1 italic">
                            "{lead.next_action}"
                          </div>

                          {/* Quick Stage Mover */}
                          <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between">
                            <span className="text-[9px] text-gray-500 truncate max-w-[80px]">
                              {owner?.name.split(' ')[0] || lead.owner_staff_id}
                            </span>
                            <select
                              value={lead.stage}
                              onClick={(e) => e.stopPropagation()}
                              onChange={(e) => updateLeadStage(lead.id, e.target.value as LeadStage)}
                              className="bg-gray-50 border border-gray-300 text-[10px] text-gray-800 px-1 py-0.5 rounded-none"
                            >
                              {STAGES.map((s) => (
                                <option key={s} value={s}>
                                  → {s}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      );
                    })}

                    {stageLeads.length === 0 && (
                      <div className="py-8 text-center text-xs text-gray-400 font-mono">
                        No leads in {stage}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: LEAD TABLE LIST */}
        {activeTab === 'list' && (
          <div className="bg-white border border-gray-200 overflow-hidden rounded-none shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 uppercase bg-gray-50">
                    <th className="py-3 px-4">Lead ID</th>
                    <th className="py-3 px-4">Client Name</th>
                    <th className="py-3 px-4">Interest</th>
                    <th className="py-3 px-4">Source</th>
                    <th className="py-3 px-4">Est. Budget</th>
                    <th className="py-3 px-4">Stage</th>
                    <th className="py-3 px-4">Lead Owner</th>
                    <th className="py-3 px-4">Next Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredLeads.map((lead) => {
                    const owner = staff.find((s) => s.id === lead.owner_staff_id);
                    return (
                      <tr
                        key={lead.id}
                        onClick={() => setSelectedLead(lead)}
                        className="hover:bg-gray-50 cursor-pointer"
                      >
                        <td className="py-3 px-4 font-bold text-forest">{lead.id}</td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-gray-950">{lead.name}</div>
                          <div className="text-[10px] text-gray-500">{lead.email}</div>
                        </td>
                        <td className="py-3 px-4 uppercase text-gray-700 font-semibold">{lead.interest_category}</td>
                        <td className="py-3 px-4 text-gray-600">{lead.source}</td>
                        <td className="py-3 px-4 font-bold text-gray-950">
                          {formatSGD(lead.estimated_budget_sgd)}
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={lead.stage}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => updateLeadStage(lead.id, e.target.value as LeadStage)}
                            className="bg-gray-50 border border-gray-300 px-2 py-1 text-xs text-gray-800 rounded-none"
                          >
                            {STAGES.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="py-3 px-4 text-gray-700">
                          {owner?.name || lead.owner_staff_id}
                        </td>
                        <td className="py-3 px-4 text-gray-600 max-w-xs truncate">
                          {lead.next_action}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: CUSTOMER SEGMENTATION INTELLIGENCE */}
        {activeTab === 'customers' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {['VIP', 'Corporate', 'Returning', 'New'].map((segment) => {
                const segCusts = customers.filter((c) => c.segment === segment);
                const totalLTV = segCusts.reduce((sum, c) => sum + (c.lifetime_value_sgd || 0), 0);
                return (
                  <div key={segment} className="p-5 bg-white border border-gray-200 rounded-none shadow-sm">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500 block">
                      Segment: {segment}
                    </span>
                    <div className="text-3xl font-black text-gray-950 mt-1 font-mono">
                      {segCusts.length} Clients
                    </div>
                    <span className="text-xs font-mono text-forest font-bold">
                      LTV: {formatSGD(totalLTV)}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="bg-white border border-gray-200 overflow-hidden rounded-none shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-950 font-sans">
                  Client Registry (30 Curated Singapore Profiles)
                </h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-500 uppercase bg-gray-50">
                      <th className="py-3 px-4">Customer ID</th>
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Contact</th>
                      <th className="py-3 px-4">Segment</th>
                      <th className="py-3 px-4">Lifetime Value</th>
                      <th className="py-3 px-4">Marketing Consent</th>
                      <th className="py-3 px-4">Joined Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {customers.map((cust) => (
                      <tr key={cust.id} className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-bold text-gray-600">{cust.id}</td>
                        <td className="py-3 px-4 font-bold text-gray-950">
                          {cust.first_name} {cust.last_name}
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          <div>{cust.email}</div>
                          <div className="text-[10px] text-gray-400">{cust.phone}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 text-[10px] uppercase font-bold border rounded-none ${
                              cust.segment === 'VIP'
                                ? 'bg-amber-50 text-amber-700 border-amber-300'
                                : cust.segment === 'Corporate'
                                ? 'bg-blue-50 text-blue-700 border-blue-300'
                                : cust.segment === 'Returning'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                : 'bg-gray-50 text-gray-700 border-gray-200'
                            }`}
                          >
                            {cust.segment}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-bold text-gray-950">
                          {formatSGD(cust.lifetime_value_sgd)}
                        </td>
                        <td className="py-3 px-4">
                          {cust.consent_marketing ? (
                            <span className="text-emerald-700 font-bold">Opted In</span>
                          ) : (
                            <span className="text-gray-400">Withheld</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-gray-500">{cust.created_at}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: MARKETING CAMPAIGNS PERFORMANCE */}
        {activeTab === 'campaigns' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {campaigns.map((camp) => (
                <div key={camp.id} className="p-6 bg-white border border-gray-200 space-y-3 rounded-none shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-forest font-bold">
                      {camp.channel}
                    </span>
                    <span
                      className={`px-2 py-0.5 text-[10px] uppercase font-mono font-bold border rounded-none ${
                        camp.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                          : camp.status === 'Completed'
                          ? 'bg-blue-50 text-blue-700 border-blue-300'
                          : camp.status === 'Paused'
                          ? 'bg-amber-50 text-amber-700 border-amber-300'
                          : 'bg-gray-50 text-gray-600 border-gray-200'
                      }`}
                    >
                      {camp.status}
                    </span>
                  </div>

                  <h4 className="text-base font-bold uppercase text-gray-950 font-sans">
                    {camp.name}
                  </h4>
                  <p className="text-xs text-gray-600">{camp.goal}</p>

                  <div className="pt-2 border-t border-gray-100 grid grid-cols-2 gap-2 text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-gray-500 block">Budget / Spend</span>
                      <span className="text-gray-950 font-bold">
                        {formatSGD(camp.spend_sgd)} / {formatSGD(camp.budget_sgd)}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 block">Attributed Bookings</span>
                      <span className="text-forest font-bold">
                        {camp.bookings_attributed} ({camp.leads} Leads)
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* LEAD DETAIL MODAL */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-white border border-gray-300 rounded-none max-w-lg w-full p-6 text-gray-950 shadow-ferrari-elevated relative">
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="text-forest font-bold text-sm">{selectedLead.id}</span>
                <span className="text-gray-300">•</span>
                <span className="uppercase text-gray-500">{selectedLead.source}</span>
              </div>

              <h3 className="text-xl font-bold uppercase text-gray-950 font-sans">
                {selectedLead.name}
              </h3>
              <p className="text-gray-600">{selectedLead.email}</p>

              <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 border border-gray-200">
                <div>
                  <span className="text-[10px] uppercase text-gray-500 block">Interest Class</span>
                  <span className="text-gray-950 font-bold uppercase">{selectedLead.interest_category}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-gray-500 block">Estimated Budget</span>
                  <span className="text-emerald-700 font-bold">{formatSGD(selectedLead.estimated_budget_sgd)}</span>
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase text-gray-700 block mb-1 font-bold">
                  Lead Qualification Stage
                </label>
                <select
                  value={selectedLead.stage}
                  onChange={(e) => {
                    updateLeadStage(selectedLead.id, e.target.value as LeadStage);
                    setSelectedLead({ ...selectedLead, stage: e.target.value as LeadStage });
                  }}
                  className="w-full bg-gray-50 border border-gray-300 p-2 text-gray-900 rounded-none"
                >
                  {STAGES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase text-gray-700 block mb-1 font-bold">
                  Active Follow-up Plan
                </label>
                <div className="p-3 bg-gray-50 border border-gray-200 text-gray-700">
                  "{selectedLead.next_action}"
                </div>
              </div>

              {/* Action Update Field */}
              <div className="pt-2">
                <label className="text-[10px] uppercase text-gray-700 block mb-1 font-bold">
                  Record New Concierge Follow-up Action
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newActionInput}
                    onChange={(e) => setNewActionInput(e.target.value)}
                    placeholder="e.g. Dispatched quote breakdown via WhatsApp..."
                    className="flex-1 bg-white border border-gray-300 p-2 text-gray-900 text-xs rounded-none"
                  />
                  <button
                    onClick={() => handleSaveAction(selectedLead.id)}
                    className="px-5 py-2 bg-forest hover:bg-forest-dark text-white font-bold uppercase text-[10px] rounded-none"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CREATE NEW LEAD MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-white border border-gray-300 rounded-none max-w-lg w-full p-6 text-gray-950 shadow-ferrari-elevated relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold uppercase text-gray-950 mb-4 font-sans">
              Register New Inbound Lead
            </h3>

            <form onSubmit={handleCreateLead} className="space-y-4 text-xs font-mono">
              <div>
                <label className="text-[10px] uppercase text-gray-700 block mb-1 font-bold">Client Name *</label>
                <input
                  type="text"
                  required
                  value={newLeadName}
                  onChange={(e) => setNewLeadName(e.target.value)}
                  placeholder="e.g. Lady Clara Teo"
                  className="w-full bg-gray-50 border border-gray-300 p-2.5 text-gray-900 rounded-none"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase text-gray-700 block mb-1 font-bold">Email Address *</label>
                <input
                  type="email"
                  required
                  value={newLeadEmail}
                  onChange={(e) => setNewLeadEmail(e.target.value)}
                  placeholder="e.g. clara@domain.sg"
                  className="w-full bg-gray-50 border border-gray-300 p-2.5 text-gray-900 rounded-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase text-gray-700 block mb-1 font-bold">Lead Source</label>
                  <select
                    value={newLeadSource}
                    onChange={(e) => setNewLeadSource(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 p-2 text-gray-900 rounded-none"
                  >
                    {leadSources.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase text-gray-700 block mb-1 font-bold">Interest Category</label>
                  <select
                    value={newLeadCategory}
                    onChange={(e) => setNewLeadCategory(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 p-2 text-gray-900 rounded-none"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase text-gray-700 block mb-1 font-bold">Est. Budget (SGD)</label>
                  <input
                    type="number"
                    value={newLeadBudget}
                    onChange={(e) => setNewLeadBudget(Number(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-300 p-2 text-gray-900 rounded-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase text-gray-700 block mb-1 font-bold">Owner Assignment</label>
                  <select
                    value={newLeadOwner}
                    onChange={(e) => setNewLeadOwner(e.target.value)}
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
                <label className="text-[10px] uppercase text-gray-700 block mb-1 font-bold">Next Action</label>
                <input
                  type="text"
                  value={newLeadAction}
                  onChange={(e) => setNewLeadAction(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 p-2 text-gray-900 rounded-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 hover:text-black rounded-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-forest hover:bg-forest-dark text-white font-bold uppercase rounded-none"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
