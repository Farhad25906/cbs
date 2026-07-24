import React, { useState } from 'react';
import { Search, Plus, Trash2, Download, Upload, RefreshCw } from 'lucide-react';
import { useToastStore } from '@/store/useToastStore';

export default function CashRechargeView() {
  const { addToast } = useToastStore();
  const [rewardName, setRewardName] = useState('');

  return (
    <div className="flex flex-col h-full bg-[#f3f4f6] text-gray-800 text-xs font-sans p-4 space-y-4">
      <div className="bg-[#e4ebf5] border border-[#a9bbcf] px-4 py-2 text-xs font-bold text-blue-900 rounded-sm">
        Cash Recharge / Reward Settings List Management
      </div>

      {/* Filter Box */}
      <div className="border border-[#b0c4de] rounded-sm bg-[#f9fafb] p-3 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="font-semibold text-gray-600">Reward Name:</label>
          <input 
            type="text" 
            value={rewardName}
            onChange={(e) => setRewardName(e.target.value)}
            placeholder="e.g. Default / Bonus" 
            className="border px-2 py-1 bg-white rounded text-xs w-64 outline-none focus:border-blue-500" 
          />
        </div>
        <button 
          onClick={() => addToast('Reward search executed', 'info')}
          className="bg-[#337ab7] text-white px-4 py-1 rounded font-semibold hover:bg-[#286090]"
        >
          Search
        </button>
        <button 
          onClick={() => setRewardName('')}
          className="bg-gray-200 text-gray-700 px-4 py-1 rounded hover:bg-gray-300"
        >
          Reset
        </button>
      </div>

      {/* Main Table */}
      <div className="border border-[#b0c4de] rounded-sm bg-white overflow-hidden shadow-xs flex-1 flex flex-col">
        <div className="bg-[#f0f4f8] px-4 py-2 border-b border-[#b0c4de] flex items-center justify-between">
          <div className="font-bold text-blue-900">Records</div>
          <div className="flex items-center gap-1.5 text-xs">
            <button className="bg-gray-100 border px-2 py-0.5 rounded flex items-center gap-1"><Plus className="w-3 h-3 text-green-600" /> Create</button>
            <button className="bg-gray-100 border px-2 py-0.5 rounded flex items-center gap-1"><Trash2 className="w-3 h-3 text-red-600" /> Delete</button>
            <button className="bg-gray-100 border px-2 py-0.5 rounded flex items-center gap-1"><Download className="w-3 h-3 text-blue-600" /> Export All</button>
            <button className="bg-gray-100 border px-2 py-0.5 rounded flex items-center gap-1"><Upload className="w-3 h-3 text-amber-600" /> Import</button>
            <button className="bg-gray-100 border px-2 py-0.5 rounded flex items-center gap-1"><RefreshCw className="w-3 h-3 text-purple-600" /> Synchronize</button>
          </div>
        </div>

        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#e4ebf5] border-b border-[#a9bbcf] text-blue-950 font-bold">
              <th className="p-2 border-r border-[#a9bbcf] w-8 text-center"><input type="checkbox" /></th>
              <th className="p-2 border-r border-[#a9bbcf]">Reward Name</th>
              <th className="p-2 border-r border-[#a9bbcf]">Primary Offering</th>
              <th className="p-2 border-r border-[#a9bbcf]">Trade Type</th>
              <th className="p-2 border-r border-[#a9bbcf]">Reward Validity (days)</th>
              <th className="p-2 border-r border-[#a9bbcf]">Effective Time</th>
              <th className="p-2 border-r border-[#a9bbcf]">Expiration Time</th>
              <th className="p-2 border-r border-[#a9bbcf]">Reward settings</th>
              <th className="p-2 text-center">Operation</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200 hover:bg-blue-50">
              <td className="p-2 border-r border-gray-200 text-center"><input type="checkbox" /></td>
              <td className="p-2 border-r border-gray-200 font-bold text-blue-900">Default</td>
              <td className="p-2 border-r border-gray-200 font-mono">410009|Corporate Sec Prepaid 3G</td>
              <td className="p-2 border-r border-gray-200">Not limited</td>
              <td className="p-2 border-r border-gray-200 font-mono">0</td>
              <td className="p-2 border-r border-gray-200 font-mono text-[11px]">2016-08-04 16:51:01</td>
              <td className="p-2 border-r border-gray-200 font-mono text-[11px]">2037-01-01 05:59:59</td>
              <td className="p-2 border-r border-gray-200 text-blue-700 underline font-semibold">🔗 Link</td>
              <td className="p-2 text-center">
                <button className="bg-blue-600 text-white px-2 py-0.5 rounded text-[10px]">Edit</button>
              </td>
            </tr>
            <tr className="border-b border-gray-200 hover:bg-blue-50">
              <td className="p-2 border-r border-gray-200 text-center"><input type="checkbox" /></td>
              <td className="p-2 border-r border-gray-200 font-bold text-blue-900">Default</td>
              <td className="p-2 border-r border-gray-200 font-mono">-1|ALL</td>
              <td className="p-2 border-r border-gray-200">Not limited</td>
              <td className="p-2 border-r border-gray-200 font-mono">0</td>
              <td className="p-2 border-r border-gray-200 font-mono text-[11px]">2026-05-25 00:00:00</td>
              <td className="p-2 border-r border-gray-200 font-mono text-[11px]">2026-05-31 23:59:00</td>
              <td className="p-2 border-r border-gray-200 text-blue-700 underline font-semibold">🔗 Link</td>
              <td className="p-2 text-center">
                <button className="bg-blue-600 text-white px-2 py-0.5 rounded text-[10px]">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Lower Table */}
        <div className="border-t border-[#b0c4de] mt-4">
          <div className="bg-[#f0f4f8] px-4 py-1.5 border-b border-[#b0c4de] font-bold text-gray-800">
            Reward Offer Settings
          </div>
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#e4ebf5] border-b border-[#a9bbcf] text-blue-950 font-bold">
                <th className="p-2 border-r border-[#a9bbcf]">Reward Offer Settings</th>
                <th className="p-2 border-r border-[#a9bbcf]">Validity Unit Type</th>
                <th className="p-2 border-r border-[#a9bbcf]">Validity Length</th>
                <th className="p-2">Operation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border-r border-gray-200 font-mono text-blue-800 font-bold">477062|Eid_Special_Offer</td>
                <td className="p-2 border-r border-gray-200">Hour</td>
                <td className="p-2 border-r border-gray-200 font-mono font-bold">168</td>
                <td className="p-2 text-blue-700 hover:underline cursor-pointer">Configure</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
