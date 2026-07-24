import React, { useState } from 'react';
import { Search, Trash2, Star, Filter, Edit3, Eye, ChevronRight } from 'lucide-react';
import { useTabStore } from '@/store/useTabStore';
import { useToastStore } from '@/store/useToastStore';

export default function OfferingB2CView() {
  const openTab = useTabStore((state) => state.addTab);
  const { addToast } = useToastStore();

  const [offeringId, setOfferingId] = useState('');
  const [offeringName, setOfferingName] = useState('');
  const [offeringShortName, setOfferingShortName] = useState('');
  const [offeringCode, setOfferingCode] = useState('');
  const [isFuzzy, setIsFuzzy] = useState(false);

  const mockOfferings = [
    {
      id: '47062',
      name: 'Eid_Special_Offer',
      paymentMode: 'All',
      type: 'Supplementary',
      shortName: 'Eid_Special_Offer',
      code: 'S49023',
      status: 'Release',
      validFrom: '2026-03-18 00:00:00',
      expiresAt: '2030-05-31 23:59:59',
      catalog: 'Catalogs'
    },
    {
      id: '47063',
      name: 'Youth_3G_Special_Pack',
      paymentMode: 'Prepaid',
      type: 'Primary Offering',
      shortName: 'Youth_3G',
      code: 'S49024',
      status: 'Release',
      validFrom: '2026-01-01 00:00:00',
      expiresAt: '2029-12-31 23:59:59',
      catalog: 'Catalogs'
    },
    {
      id: '47064',
      name: 'Corporate_Sec_Prepaid',
      paymentMode: 'Postpaid',
      type: 'Supplementary',
      shortName: 'Corp_Sec',
      code: 'S49025',
      status: 'Release',
      validFrom: '2026-02-15 00:00:00',
      expiresAt: '2032-12-31 23:59:59',
      catalog: 'Catalogs'
    }
  ];

  const handleRowClick = (offering: typeof mockOfferings[0]) => {
    openTab({
      id: 'eid-special-offer',
      name: offering.name,
      path: '/cbs/offering-details',
      isClosable: true,
      icon: '🏷️'
    });
    addToast(`Opened offering details for ${offering.name}`, 'info');
  };

  return (
    <div className="flex flex-col h-full bg-[#f3f4f6] text-gray-800 text-xs font-sans p-4 space-y-4">
      {/* Header Path */}
      <div className="bg-[#e4ebf5] border border-[#a9bbcf] px-4 py-2 text-xs font-bold text-blue-900 rounded-sm flex items-center justify-between">
        <span>Unified Product Catalog &gt; Catalogs &gt; <strong className="text-blue-950">Offering(B2C)</strong></span>
        <span className="text-[11px] font-normal text-gray-500">CBS Catalog Management</span>
      </div>

      {/* Search Criteria Box (Pic 3) */}
      <div className="border border-[#b0c4de] rounded-sm bg-gradient-to-b from-[#f9fafb] to-white shadow-xs">
        <div className="bg-gradient-to-r from-[#e4ebf5] to-[#f0f4f8] px-4 py-1.5 border-b border-[#b0c4de] font-bold text-blue-900 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-blue-700" />
            <span>Search Criteria</span>
          </span>
          <label className="flex items-center gap-1 text-[11px] text-gray-600 font-normal cursor-pointer select-none">
            <input 
              type="checkbox" 
              checked={isFuzzy}
              onChange={(e) => setIsFuzzy(e.target.checked)}
              className="rounded text-blue-600" 
            />
            <span>Fuzzy Search</span>
          </label>
        </div>

        <div className="p-3 grid grid-cols-2 gap-x-8 gap-y-3">
          <div className="flex items-center gap-2">
            <label className="w-32 text-right text-gray-600 font-semibold">Offering ID:</label>
            <input 
              type="text" 
              value={offeringId}
              onChange={(e) => setOfferingId(e.target.value)}
              placeholder="e.g. 47062" 
              className="flex-1 border border-gray-300 px-2 py-1 bg-white rounded-sm outline-none focus:border-blue-500" 
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-32 text-right text-gray-600 font-semibold">Offering Name:</label>
            <input 
              type="text" 
              value={offeringName}
              onChange={(e) => setOfferingName(e.target.value)}
              placeholder="e.g. Eid_Special_Offer" 
              className="flex-1 border border-gray-300 px-2 py-1 bg-white rounded-sm outline-none focus:border-blue-500" 
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-32 text-right text-gray-600 font-semibold">Offering Short Name:</label>
            <input 
              type="text" 
              value={offeringShortName}
              onChange={(e) => setOfferingShortName(e.target.value)}
              placeholder="Short Name" 
              className="flex-1 border border-gray-300 px-2 py-1 bg-white rounded-sm outline-none focus:border-blue-500" 
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-32 text-right text-gray-600 font-semibold">Offering Code:</label>
            <input 
              type="text" 
              value={offeringCode}
              onChange={(e) => setOfferingCode(e.target.value)}
              placeholder="Code e.g. S49023" 
              className="flex-1 border border-gray-300 px-2 py-1 bg-white rounded-sm outline-none focus:border-blue-500" 
            />
          </div>

          <div className="col-span-2 flex items-center justify-end gap-2 pt-1 border-t border-gray-200">
            <button 
              onClick={() => addToast('Search executed', 'info')}
              className="bg-[#337ab7] hover:bg-[#286090] text-white px-4 py-1 rounded-sm font-semibold border border-[#2e6da4] flex items-center gap-1 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search</span>
            </button>
            <button 
              onClick={() => {
                setOfferingId('');
                setOfferingName('');
                setOfferingShortName('');
                setOfferingCode('');
                addToast('Reset search parameters', 'info');
              }}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-1 rounded-sm font-semibold border border-gray-300 cursor-pointer"
            >
              Reset
            </button>
            <button className="text-blue-700 hover:underline ml-2 text-[11px]">Advanced &gt;&gt;</button>
          </div>
        </div>
      </div>

      {/* Result List Table (Pic 3) */}
      <div className="border border-[#b0c4de] rounded-sm bg-white shadow-xs overflow-hidden flex flex-col flex-1">
        <div className="bg-[#f0f4f8] px-4 py-2 border-b border-[#b0c4de] flex items-center justify-between">
          <div className="font-bold text-blue-900">Result List</div>
          <div className="flex items-center gap-2">
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-0.5 rounded-sm border border-gray-300 text-[11px] font-medium flex items-center gap-1">
              <Trash2 className="w-3 h-3 text-red-600" />
              <span>Delete</span>
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-0.5 rounded-sm border border-gray-300 text-[11px] font-medium flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-500" />
              <span>Add to Favorite</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-[#e4ebf5] border-b border-[#a9bbcf] text-blue-950 font-bold text-[11px]">
                <th className="p-2 border-r border-[#a9bbcf] w-8 text-center"><input type="checkbox" /></th>
                <th className="p-2 border-r border-[#a9bbcf]">Offering ID</th>
                <th className="p-2 border-r border-[#a9bbcf]">Offering Name</th>
                <th className="p-2 border-r border-[#a9bbcf]">Payment Mode</th>
                <th className="p-2 border-r border-[#a9bbcf]">Subscription Offering Type</th>
                <th className="p-2 border-r border-[#a9bbcf]">Offering Short Name</th>
                <th className="p-2 border-r border-[#a9bbcf]">Offering Code</th>
                <th className="p-2 border-r border-[#a9bbcf]">Offering Status</th>
                <th className="p-2 border-r border-[#a9bbcf]">Subscription Valid From</th>
                <th className="p-2 border-r border-[#a9bbcf]">Subscription Expires At</th>
                <th className="p-2 border-r border-[#a9bbcf]">Catalog</th>
                <th className="p-2 text-center">Status Change</th>
              </tr>
            </thead>
            <tbody>
              {mockOfferings.map((item, index) => (
                <tr 
                  key={item.id} 
                  className={`border-b border-gray-200 text-xs hover:bg-blue-50/70 transition-colors cursor-pointer ${
                    index % 2 === 0 ? 'bg-white' : 'bg-[#f9fafb]'
                  }`}
                  onClick={() => handleRowClick(item)}
                >
                  <td className="p-2 border-r border-gray-200 text-center" onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" />
                  </td>
                  <td className="p-2 border-r border-gray-200 font-mono text-blue-800 font-semibold">{item.id}</td>
                  <td className="p-2 border-r border-gray-200 font-bold text-blue-900 hover:underline">{item.name}</td>
                  <td className="p-2 border-r border-gray-200">{item.paymentMode}</td>
                  <td className="p-2 border-r border-gray-200">{item.type}</td>
                  <td className="p-2 border-r border-gray-200">{item.shortName}</td>
                  <td className="p-2 border-r border-gray-200 font-mono">{item.code}</td>
                  <td className="p-2 border-r border-gray-200">
                    <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-sm border border-green-300 font-bold text-[10px]">
                      {item.status}
                    </span>
                  </td>
                  <td className="p-2 border-r border-gray-200 font-mono text-[11px] text-gray-600">{item.validFrom}</td>
                  <td className="p-2 border-r border-gray-200 font-mono text-[11px] text-gray-600">{item.expiresAt}</td>
                  <td className="p-2 border-r border-gray-200">{item.catalog}</td>
                  <td className="p-2 text-center" onClick={(e) => e.stopPropagation()}>
                    <button 
                      onClick={() => addToast(`Status change requested for ${item.name}`, 'info')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer"
                    >
                      Change
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="bg-[#f0f4f8] px-4 py-2 border-t border-[#b0c4de] flex items-center justify-between text-xs text-gray-600">
          <div>Total records: <strong>{mockOfferings.length}</strong></div>
          <div className="flex items-center gap-1">
            <button className="px-2 py-0.5 border border-gray-300 bg-white rounded" disabled>|&lt;</button>
            <button className="px-2 py-0.5 border border-gray-300 bg-white rounded" disabled>&lt;</button>
            <span className="px-2 font-bold text-blue-900">Page 1 of 1</span>
            <button className="px-2 py-0.5 border border-gray-300 bg-white rounded" disabled>&gt;</button>
            <button className="px-2 py-0.5 border border-gray-300 bg-white rounded" disabled>&gt;|</button>
          </div>
        </div>
      </div>
    </div>
  );
}
