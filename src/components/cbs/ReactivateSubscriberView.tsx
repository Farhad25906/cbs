import { useState } from 'react';
import { useToastStore } from '@/store/useToastStore';

export default function ReactivateSubscriberView() {
  const { addToast } = useToastStore();
  const [activeTab, setActiveTab] = useState<'customer' | 'account' | 'subscriber' | 'billing' | 'customerOrder' | 'contactLog' | 'reactivate'>('reactivate');

  const handleNext = () => {
    addToast('Reactivate Subscriber request submitted for Service No 1511510579', 'success');
  };

  return (
    <div className="flex-1 flex flex-col p-4 bg-white overflow-y-auto space-y-4 text-xs font-sans">
      {/* Top Tabs Bar (Image 5) */}
      <div className="bg-[#d9e2ec] border-b border-[#a9bbcf] px-2 pt-1.5 flex items-center gap-1 overflow-x-auto select-none">
        {[
          { id: 'customer', label: 'Customer' },
          { id: 'account', label: 'Account' },
          { id: 'subscriber', label: 'Subscriber' },
          { id: 'billing', label: 'Billing' },
          { id: 'customerOrder', label: 'Customer Order' },
          { id: 'contactLog', label: 'Contact Log' },
          { id: 'reactivate', label: 'Reactivate Subscriber' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-t border-t border-x cursor-pointer whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-white text-blue-900 font-bold border-[#a9bbcf] border-b-white shadow-2xs'
                : 'bg-[#e3ecf5] text-gray-700 hover:bg-white border-transparent'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      {activeTab === 'reactivate' ? (
        <div className="border border-[#b0c4de] rounded-sm bg-white shadow-2xs overflow-hidden">
          {/* Section Header */}
          <div className="bg-[#e4ebf5] px-4 py-1.5 border-b border-[#a9bbcf] font-bold text-blue-900 flex items-center gap-1">
            <span className="text-red-600">◀</span> Subscriber Basic Info
          </div>

          {/* Subscriber Info Grid (Exact layout from Image 5) */}
          <div className="p-4">
            <div className="grid grid-cols-3 gap-x-6 gap-y-3 text-xs">
              {/* Row 1 */}
              <div className="flex items-center gap-2">
                <label className="w-28 text-right text-gray-600 font-semibold whitespace-nowrap">Service No.</label>
                <span className="font-mono text-gray-900 font-bold">1511510579</span>
              </div>
              <div className="flex items-center gap-2">
                <label className="w-28 text-right text-gray-600 font-semibold whitespace-nowrap">Service No. Type</label>
                <span className="text-gray-800">Mobile</span>
              </div>
              <div className="flex items-center gap-2">
                <label className="w-28 text-right text-gray-600 font-semibold whitespace-nowrap">SIM Card No.</label>
                <span className="font-mono text-gray-800">89880040816058669359</span>
              </div>

              {/* Row 2 */}
              <div className="flex items-center gap-2">
                <label className="w-28 text-right text-gray-600 font-semibold whitespace-nowrap">Payment Flag</label>
                <span className="text-gray-800">Prepaid</span>
              </div>
              <div className="flex items-center gap-2">
                <label className="w-28 text-right text-gray-600 font-semibold whitespace-nowrap">Primary Offering</label>
                <span className="text-gray-800">Youth 3G</span>
              </div>
              <div></div>
            </div>
          </div>

          {/* Next Button */}
          <div className="px-4 pb-4">
            <button
              onClick={handleNext}
              className="bg-[#337ab7] text-white px-8 py-1.5 rounded font-semibold hover:bg-[#286090] cursor-pointer border border-[#2e6da4] shadow-xs"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="border border-[#b0c4de] rounded-sm bg-white shadow-2xs p-6 text-center text-gray-500">
          <strong className="text-gray-700">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</strong> tab content loaded.
        </div>
      )}
    </div>
  );
}
