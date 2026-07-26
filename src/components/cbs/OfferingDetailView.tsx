import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Edit3, Search, CheckCircle, Layers, ShieldCheck, HelpCircle, Calendar, Send, Copy, AlertTriangle } from 'lucide-react';
import { useTabStore } from '@/store/useTabStore';
import { useToastStore } from '@/store/useToastStore';

export default function OfferingDetailView() {
  const navigate = useNavigate();
  const location = useLocation();
  const addTab = useTabStore((state) => state.addTab);
  const { addToast } = useToastStore();
  const [activeSubTab, setActiveSubTab] = useState<string>('Basic Setting');

  // Extract dynamic offer name
  const queryParams = new URLSearchParams(location.search);
  const offeringName = queryParams.get('name') || 'Eid_Special_Offer';

  // Dynamic state for Properties
  const [subscriptionMode, setSubscriptionMode] = useState<'single' | 'multi' | 'unlimited'>('single');

  // Dynamic state for Publish / Validity
  const [validityDays, setValidityDays] = useState<number>(30);
  const [validityMode, setValidityMode] = useState<'days' | 'date' | 'permanent'>('days');
  const [effectiveDate, setEffectiveDate] = useState('2026-07-27');
  const [expirationDate, setExpirationDate] = useState('2026-08-26');

  // Sub-tabs matching Image 1
  const subTabs = [
    'Overview',
    'Basic Setting',
    'Element',
    'Property',
    'Plan',
    'Relationship',
    'Priority',
    'Consumption Limit',
    'Allowed/Disallowed',
    'Subscription Quantity',
    'Eligibility',
    'Publish',
    'Contract Term',
    'Reference Offering',
    'Subscription'
  ];

  const handleSubTabClick = (tab: string) => {
    setActiveSubTab(tab);
    addToast(`Switched sub-tab to ${tab}`, 'info');
  };

  const handleCreateVersion = () => {
    addTab({
      id: 'bdc-rent-oneoff',
      name: 'BDC_Rent_oneoff',
      path: '/cbs/bdc-rent-oneoff',
      isClosable: true
    });
    addToast('Opening BDC_Rent_oneoff Plan view... Click "Create Version" on BDC_Rent_oneoff to continue.', 'success');
    navigate('/cbs/bdc-rent-oneoff');
  };

  const saveProperties = () => {
    const modes: Record<string, string> = {
      single: 'Single Subscription (একক সাবস্ক্রিপশন)',
      multi: 'Multi Subscription (বহু সাবস্ক্রিপশন)',
      unlimited: 'Unlimited Subscription (যত খুশি তত)'
    };
    addToast(`Properties updated: Subscription set to ${modes[subscriptionMode]}`, 'success');
  };

  const savePublishSettings = () => {
    if (validityMode === 'days') {
      addToast(`Publish configuration saved! Offer Validity: ${validityDays} Days (অফারটি ${validityDays} দিন থাকবে)`, 'success');
    } else if (validityMode === 'permanent') {
      addToast('Publish configuration saved! Offer validity: Permanent', 'success');
    } else {
      addToast(`Publish configuration saved! Offer validity from ${effectiveDate} to ${expirationDate}`, 'success');
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f3f4f6] text-gray-800 text-xs font-sans p-4 space-y-4 overflow-y-auto">
      {/* Breadcrumb Header */}
      <div className="bg-[#e4ebf5] border border-[#a9bbcf] px-4 py-2 text-xs font-bold text-blue-900 rounded-sm flex items-center justify-between shadow-2xs">
        <span>Unified Product Catalog &gt; Catalogs &gt; Offering(B2C) &gt; <strong className="text-blue-950 font-extrabold">{offeringName} 🍃</strong></span>
        <span className="bg-green-100 text-green-800 border border-green-300 px-2 py-0.5 rounded text-[10px] font-bold">STATUS: RELEASE</span>
      </div>

      {/* Sub-Navigation Tabs Row */}
      <div className="bg-[#d9e2ec] border-b border-[#a9bbcf] px-2 pt-1.5 flex items-center gap-1 overflow-x-auto select-none">
        {subTabs.map((tab) => {
          const isActive = activeSubTab === tab;
          return (
            <button
              key={tab}
              onClick={() => handleSubTabClick(tab)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-t border-t border-x transition-all duration-150 whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-white text-blue-950 font-bold border-[#a9bbcf] border-b-white shadow-2xs'
                  : 'bg-[#e3ecf5] text-gray-700 hover:bg-white border-transparent'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Main Tab Render Container */}
      <div className="bg-white border border-[#b0c4de] rounded-sm shadow-2xs overflow-hidden flex-1 flex flex-col">
        
        {/* TAB 1: BASIC SETTING / OVERVIEW */}
        {(activeSubTab === 'Basic Setting' || activeSubTab === 'Overview') && (
          <div className="flex-1 flex flex-col">
            {/* Basic Information Block */}
            <div className="border-b border-[#b0c4de]">
              <div className="bg-gradient-to-r from-[#e4ebf5] to-white px-4 py-2 text-xs font-bold text-gray-800 border-b border-[#b0c4de] flex items-center justify-between">
                <span>▼ Basic Information</span>
                <button 
                  onClick={() => addToast('Editing Basic Information enabled', 'info')}
                  className="text-xs text-blue-700 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-3 p-4 text-xs">
                <div className="flex items-center gap-2">
                  <label className="w-36 text-right text-gray-600 font-semibold">Offering ID</label>
                  <div className="flex items-center gap-2 flex-1">
                    <input type="text" value="477062" className="border border-gray-300 px-2.5 py-1 bg-gray-50 text-xs w-52 rounded-sm font-mono outline-none" readOnly />
                    <button className="text-gray-500 hover:text-blue-700"><Search className="w-3.5 h-3.5" /></button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <label className="w-36 text-right text-gray-600 font-semibold">Offering Name *</label>
                  <div className="flex items-center gap-2 flex-1">
                    <input type="text" value={offeringName} className="border border-gray-300 px-2.5 py-1 bg-gray-50 text-xs w-52 rounded-sm font-bold text-gray-900 outline-none" readOnly />
                    <button className="text-gray-500 hover:text-blue-700"><Edit3 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <label className="w-36 text-right text-gray-600 font-semibold">Notification Name *</label>
                  <div className="flex items-center gap-2 flex-1">
                    <div className="border border-gray-300 px-2.5 py-1 bg-gray-50 text-xs w-52 rounded-sm font-bold text-green-700 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                        <span>{offeringName}</span>
                      </span>
                      <Edit3 className="w-3.5 h-3.5 text-gray-500 hover:text-blue-700 cursor-pointer" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <label className="w-36 text-right text-gray-600 font-semibold">Offering Short Name *</label>
                  <div className="flex items-center gap-2 flex-1">
                    <input type="text" value={offeringName} className="border border-gray-300 px-2.5 py-1 bg-gray-50 text-xs w-52 rounded-sm font-medium outline-none" readOnly />
                    <button className="text-gray-500 hover:text-blue-700"><Edit3 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <label className="w-36 text-right text-gray-600 font-semibold">Offering Code *</label>
                  <div className="flex items-center gap-2 flex-1">
                    <input type="text" value="S49023" className="border border-gray-300 px-2.5 py-1 bg-gray-50 text-xs w-52 rounded-sm font-mono outline-none" readOnly />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <label className="w-36 text-right text-gray-600 font-semibold">Subscription Offering Type</label>
                  <div className="flex items-center gap-2 flex-1">
                    <input type="text" value="Supplementary" className="border border-gray-300 px-2.5 py-1 bg-gray-50 text-xs w-52 rounded-sm font-medium outline-none" readOnly />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <label className="w-36 text-right text-gray-600 font-semibold">Offering Status</label>
                  <div className="flex items-center gap-2 flex-1">
                    <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-sm border border-green-300 font-bold">Release</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <label className="w-36 text-right text-gray-600 font-semibold mt-1">Description</label>
                  <div className="flex-1 relative">
                    <textarea 
                      className="border border-gray-300 p-2 bg-gray-50 text-xs w-full h-16 rounded-sm outline-none resize-none" 
                      readOnly 
                      defaultValue={`Special Teletalk package offer for ${offeringName.replace(/_/g, ' ')}. Includes data volume, voice/SMS benefits.`}
                    />
                    <button className="absolute top-2 right-2 text-gray-500 hover:text-blue-700"><Edit3 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </div>
            </div>

            {/* Offering Value Section */}
            <div className="border-b border-[#b0c4de]">
              <div className="bg-gradient-to-r from-[#e4ebf5] to-white px-4 py-2 text-xs font-bold text-gray-800 border-b border-[#b0c4de]">
                ▼ Offering Value
              </div>
              <div className="p-4 flex items-center gap-2">
                <label className="w-36 text-right text-gray-600 font-semibold">Value</label>
                <div className="flex items-center gap-2">
                  <input type="text" placeholder="Value Amount" className="border border-gray-300 px-2.5 py-1 bg-gray-50 text-xs w-64 rounded-sm outline-none" readOnly />
                  <Search className="w-3.5 h-3.5 text-gray-500 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PROPERTY */}
        {activeSubTab === 'Property' && (
          <div className="p-6 space-y-6 flex-1 flex flex-col bg-[#fafbfc]">
            <div className="border border-[#b0c4de] rounded-sm bg-white p-4 shadow-sm">
              <h3 className="text-sm font-bold text-blue-900 mb-2 flex items-center gap-1.5 border-b pb-2">
                <Layers className="w-4 h-4 text-blue-700" />
                <span>Subscription Properties Configuration</span>
              </h3>
              <p className="text-gray-500 mb-4 text-[11px]">
                Define how subscribers can interact with this offering. Choose whether the subscriber is limited to single active sub, multiple, or unlimited purchases.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {/* Option 1: Single Subscription */}
                <div 
                  onClick={() => setSubscriptionMode('single')}
                  className={`border rounded p-4 cursor-pointer transition-all ${
                    subscriptionMode === 'single'
                      ? 'border-blue-600 bg-blue-50/50 shadow-sm'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-800 text-xs">Single Subscription</span>
                    <input 
                      type="radio" 
                      checked={subscriptionMode === 'single'} 
                      onChange={() => setSubscriptionMode('single')}
                      className="cursor-pointer accent-blue-600" 
                    />
                  </div>
                  <p className="text-gray-500 text-[10px] leading-relaxed">
                    গ্রাহক এই অফারটি সর্বোচ্চ একবার সক্রিয় করতে পারবেন। পুনরায় কেনার পূর্বে মেয়াদ শেষ হতে হবে।
                  </p>
                </div>

                {/* Option 2: Multi Subscription */}
                <div 
                  onClick={() => setSubscriptionMode('multi')}
                  className={`border rounded p-4 cursor-pointer transition-all ${
                    subscriptionMode === 'multi'
                      ? 'border-blue-600 bg-blue-50/50 shadow-sm'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-800 text-xs">Multi Subscription</span>
                    <input 
                      type="radio" 
                      checked={subscriptionMode === 'multi'} 
                      onChange={() => setSubscriptionMode('multi')}
                      className="cursor-pointer accent-blue-600"
                    />
                  </div>
                  <p className="text-gray-500 text-[10px] leading-relaxed">
                    গ্রাহক একসাথে একাধিক বার এই অফারটি সাবস্ক্রাইব করতে পারবেন এবং প্রতিটির মেয়াদ আলাদা হিসাব হবে।
                  </p>
                </div>

                {/* Option 3: Unlimited Subscription */}
                <div 
                  onClick={() => setSubscriptionMode('unlimited')}
                  className={`border rounded p-4 cursor-pointer transition-all ${
                    subscriptionMode === 'unlimited'
                      ? 'border-blue-600 bg-blue-50/50 shadow-sm'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-800 text-xs flex items-center gap-1">
                      <span>যত খুশি তত (Unlimited)</span>
                      <span className="text-[9px] bg-blue-100 text-blue-800 px-1 py-0.2 rounded font-normal font-mono">Unlimited</span>
                    </span>
                    <input 
                      type="radio" 
                      checked={subscriptionMode === 'unlimited'} 
                      onChange={() => setSubscriptionMode('unlimited')}
                      className="cursor-pointer accent-blue-600"
                    />
                  </div>
                  <p className="text-gray-500 text-[10px] leading-relaxed">
                    গ্রাহক যত খুশি তত বার এই অফার সাবস্ক্রাইব করতে পারবেন। ক্রয়ের কোনো সীমাবদ্ধতা নেই।
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between bg-gray-50 p-3 border border-dashed rounded text-[11px] text-gray-600 mb-4">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  <span>
                    Selected Setting: <strong>{
                      subscriptionMode === 'single' ? 'Single Subscription' : 
                      subscriptionMode === 'multi' ? 'Multi Subscription' : 'Unlimited (যত খুশি তত)'
                    }</strong>
                  </span>
                </div>
                <span className="text-gray-400 font-mono text-[10px]">Param ID: SUB_POLICY_QTY</span>
              </div>

              <button 
                onClick={saveProperties}
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-4 py-2 rounded-sm cursor-pointer shadow-xs transition-colors"
              >
                Save Subscription Properties
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: PLAN */}
        {activeSubTab === 'Plan' && (
          <div className="p-6 space-y-4 flex-1 flex flex-col bg-[#fafbfc]">
            <div className="border border-[#b0c4de] rounded-sm bg-white overflow-hidden shadow-2xs">
              <div className="bg-[#f0f4f8] px-4 py-2.5 border-b border-[#b0c4de] font-bold text-blue-900 flex items-center justify-between">
                <span className="text-xs font-bold">Configured Rent Plans / BDC Rent One</span>
                <span className="text-[11px] font-normal text-gray-500">Related Catalog Pricing rules</span>
              </div>

              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#e4ebf5] border-b border-[#a9bbcf] text-blue-950 font-bold">
                    <th className="p-2 border-r border-[#a9bbcf] w-12 text-center">#</th>
                    <th className="p-2 border-r border-[#a9bbcf]">Plan Name</th>
                    <th className="p-2 border-r border-[#a9bbcf]">Plan Code</th>
                    <th className="p-2 border-r border-[#a9bbcf]">Type</th>
                    <th className="p-2 border-r border-[#a9bbcf]">Version</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 hover:bg-blue-50/50">
                    <td className="p-2 border-r border-gray-200 text-center font-bold text-gray-500">1</td>
                    <td className="p-2 border-r border-gray-200 font-bold text-blue-900">BDC Rent One (BDC_Rent_oneoff)</td>
                    <td className="p-2 border-r border-gray-200 font-mono text-[11px]">PLAN-BDC-RENT-01</td>
                    <td className="p-2 border-r border-gray-200 text-gray-600 font-medium">Recurring Rent / Oneoff</td>
                    <td className="p-2 border-r border-gray-200 font-mono text-[11px]">v1.0.3 (Locked)</td>
                    <td className="p-2 flex items-center gap-2">
                      <button 
                        onClick={handleCreateVersion}
                        className="bg-[#1d5b96] hover:bg-[#154370] text-white font-bold px-2.5 py-1 rounded text-[10px] cursor-pointer transition-colors"
                      >
                        Create Version
                      </button>
                      <button 
                        onClick={() => addToast('Plan configurations unlocked', 'info')}
                        className="border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold px-2 py-1 rounded text-[10px] cursor-pointer"
                      >
                        Unlock
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-[11px] text-yellow-800 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
              <div>
                <strong>Notice:</strong> To edit or duplicate the billing structure for BDC Rent One, click <strong>Create Version</strong>. This will open the detailed Plan version matrix where you can configure specific free units or recurring fee coefficients.
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PUBLISH */}
        {activeSubTab === 'Publish' && (
          <div className="p-6 space-y-6 flex-1 flex flex-col bg-[#fafbfc]">
            <div className="border border-[#b0c4de] rounded-sm bg-white p-5 shadow-sm">
              <h3 className="text-sm font-bold text-blue-900 mb-3 flex items-center gap-1.5 border-b pb-2">
                <Calendar className="w-4 h-4 text-blue-700" />
                <span>Validity &amp; Publication Settings</span>
              </h3>
              <p className="text-gray-500 mb-5 text-[11px]">
                Configure how long this offer stays active and accessible in the system.
              </p>

              <div className="space-y-4 max-w-xl">
                {/* Validity Mode Selection */}
                <div className="flex items-center gap-4">
                  <label className="w-44 text-right font-semibold text-gray-700">Validity Mode</label>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input 
                        type="radio" 
                        name="valMode" 
                        checked={validityMode === 'days'} 
                        onChange={() => setValidityMode('days')} 
                        className="accent-blue-600"
                      />
                      <span>Days Limit (নির্ধারিত দিন)</span>
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input 
                        type="radio" 
                        name="valMode" 
                        checked={validityMode === 'date'} 
                        onChange={() => setValidityMode('date')} 
                        className="accent-blue-600"
                      />
                      <span>Date Range</span>
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input 
                        type="radio" 
                        name="valMode" 
                        checked={validityMode === 'permanent'} 
                        onChange={() => setValidityMode('permanent')} 
                        className="accent-blue-600"
                      />
                      <span>Permanent (স্থায়ী)</span>
                    </label>
                  </div>
                </div>

                {/* Offer Validity Duration (কত দিন অফার টা থাকবে) */}
                {validityMode === 'days' && (
                  <div className="flex items-center gap-4 transition-all">
                    <label className="w-44 text-right font-bold text-blue-900">
                      Validity (কত দিন অফার টা থাকবে) *
                    </label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="number" 
                        min={1}
                        max={365}
                        value={validityDays}
                        onChange={(e) => setValidityDays(Number(e.target.value))}
                        className="border border-gray-300 rounded px-2.5 py-1 w-24 text-xs font-bold text-blue-950 focus:border-blue-600 outline-none"
                      />
                      <span className="text-gray-600 font-semibold">Days</span>
                    </div>
                  </div>
                )}

                {/* Date range fields */}
                {validityMode === 'date' && (
                  <div className="space-y-3 transition-all">
                    <div className="flex items-center gap-4">
                      <label className="w-44 text-right font-semibold text-gray-700">Effective Date</label>
                      <input 
                        type="date"
                        value={effectiveDate}
                        onChange={(e) => setEffectiveDate(e.target.value)}
                        className="border border-gray-300 rounded px-2.5 py-1 text-xs outline-none"
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="w-44 text-right font-semibold text-gray-700">Expiration Date</label>
                      <input 
                        type="date"
                        value={expirationDate}
                        onChange={(e) => setExpirationDate(e.target.value)}
                        className="border border-gray-300 rounded px-2.5 py-1 text-xs outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* Action Row */}
                <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                  <div className="w-44"></div>
                  <button 
                    onClick={savePublishSettings}
                    className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-4 py-2 rounded-sm cursor-pointer shadow-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Save &amp; Publish Offer</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FALLBACK PLACEHOLDER FOR OTHER SUBTABS */}
        {activeSubTab !== 'Basic Setting' && activeSubTab !== 'Overview' && activeSubTab !== 'Property' && activeSubTab !== 'Plan' && activeSubTab !== 'Publish' && (
          <div className="p-8 text-center flex-1 flex flex-col items-center justify-center bg-[#fafbfc]">
            <HelpCircle className="w-8 h-8 text-gray-400 mb-2" />
            <h4 className="font-bold text-gray-700 mb-1">{activeSubTab} Sub-tab Details</h4>
            <p className="text-gray-500 text-[11px] max-w-md">
              Configuration interface for <strong>{activeSubTab}</strong> is currently using default catalog inheritance rules for <strong>{offeringName}</strong>.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
