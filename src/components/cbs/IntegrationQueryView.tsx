import React, { useState } from 'react';
import { useToastStore } from '@/store/useToastStore';

export default function IntegrationQueryView() {
  const { addToast } = useToastStore();
  const [iqActiveTopTab, setIqActiveTopTab] = useState<'customer' | 'account' | 'subscriber' | 'order' | 'log'>('subscriber');
  const [iqActiveSubTab, setIqActiveSubTab] = useState<'info' | 'offering' | 'accumulator' | 'payment' | 'consumption' | 'freeunit' | 'status' | 'cdr'>('status');

  return (
    <div className="flex-1 flex flex-col p-4 bg-white overflow-y-auto space-y-4 text-xs font-sans">
      <div className="text-xs text-gray-500 font-semibold">
        Customer Care &gt; Point of Sale &gt; <strong className="text-blue-900">Integration Query</strong>
      </div>

      {/* Search criteria box */}
      <div className="border border-[#b0c4de] rounded-sm bg-[#f9fafb]">
        <div className="bg-[#e4ebf5] px-3 py-1 font-bold text-blue-900 border-b border-[#b0c4de]">
          ▶ Search Criteria
        </div>
        <div className="p-3 grid grid-cols-4 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <label className="w-24 text-right font-semibold">Service No:</label>
            <input type="text" defaultValue="1511510579" className="border px-2 py-1 bg-white rounded flex-1 outline-none" />
          </div>
          <div className="flex items-center gap-2">
            <label className="w-24 text-right font-semibold">Subscriber ID:</label>
            <input type="text" placeholder="Optional" className="border px-2 py-1 bg-white rounded flex-1 outline-none" />
          </div>
          <div className="flex items-center justify-end gap-2 col-span-2">
            <button 
              onClick={() => addToast('Search executed for Service No 1511510579', 'info')}
              className="bg-[#337ab7] text-white px-4 py-1 rounded font-semibold hover:bg-[#286090]"
            >
              Search
            </button>
            <button className="bg-gray-200 px-4 py-1 rounded hover:bg-gray-300">Reset</button>
          </div>
        </div>
      </div>

      {/* Top Result Table with Customer / Subscriber / Account Tabs (Matching Pic 6) */}
      <div className="border border-[#b0c4de] rounded-sm bg-white overflow-hidden flex flex-col">
        <div className="bg-[#d9e2ec] border-b border-[#a9bbcf] px-3 pt-1.5 flex items-center gap-1">
          {['customer', 'account', 'subscriber', 'order', 'log'].map(tab => (
            <button
              key={tab}
              onClick={() => setIqActiveTopTab(tab as any)}
              className={`px-3 py-1 text-xs font-semibold rounded-t border-t border-x capitalize cursor-pointer ${
                iqActiveTopTab === tab ? 'bg-white text-blue-900 font-bold border-[#a9bbcf] border-b-white' : 'bg-[#e3ecf5] text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#e4ebf5] border-b border-[#a9bbcf] text-blue-950 font-bold">
              <th className="p-2 border-r border-[#a9bbcf] w-8"></th>
              <th className="p-2 border-r border-[#a9bbcf]">Subscriber ID / No</th>
              <th className="p-2 border-r border-[#a9bbcf]">Offering Name</th>
              <th className="p-2 border-r border-[#a9bbcf]">Brand</th>
              <th className="p-2 border-r border-[#a9bbcf]">Payment Mode</th>
              <th className="p-2 border-r border-[#a9bbcf]">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200 hover:bg-blue-50">
              <td className="p-2 text-center"><input type="radio" name="iqSelect" /></td>
              <td className="p-2 font-mono text-blue-800 font-medium">1511121617</td>
              <td className="p-2">Teletalk_Prepaid</td>
              <td className="p-2">Sagotom</td>
              <td className="p-2">Prepaid</td>
              <td className="p-2 font-bold text-red-700">Call Barring</td>
            </tr>
            <tr className="border-b border-gray-200 hover:bg-blue-50">
              <td className="p-2 text-center"><input type="radio" name="iqSelect" defaultChecked /></td>
              <td className="p-2 font-mono text-blue-800 font-medium">1922991720</td>
              <td className="p-2">Teletalk_Prepaid</td>
              <td className="p-2">Youth 3G</td>
              <td className="p-2">Prepaid</td>
              <td className="p-2 font-bold text-amber-700">Suspend</td>
            </tr>
            <tr className="border-b border-gray-200 hover:bg-blue-50">
              <td className="p-2 text-center"><input type="radio" name="iqSelect" /></td>
              <td className="p-2 font-mono text-blue-800 font-medium">1511510579</td>
              <td className="p-2">Teletalk_Prepaid</td>
              <td className="p-2">Pool</td>
              <td className="p-2">Prepaid</td>
              <td className="p-2 font-bold text-green-700">Active</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Lower Sub-tabs Panel (Exact layout from Pic 6) */}
      <div className="border border-[#b0c4de] rounded-sm bg-white flex flex-col flex-1">
        <div className="bg-[#d9e2ec] border-b border-[#a9bbcf] px-3 pt-1.5 flex items-center gap-1 overflow-x-auto">
          {[
            { id: 'info', label: 'Subscriber Information' },
            { id: 'offering', label: 'Offering' },
            { id: 'accumulator', label: 'Accumulator' },
            { id: 'payment', label: 'Payment Relationship' },
            { id: 'consumption', label: 'Consumption Limit' },
            { id: 'freeunit', label: 'Free Unit' },
            { id: 'status', label: 'Status' },
            { id: 'cdr', label: 'CDR' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setIqActiveSubTab(tab.id as any)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-t border-t border-x cursor-pointer whitespace-nowrap ${
                iqActiveSubTab === tab.id ? 'bg-white text-blue-900 font-bold border-[#a9bbcf] border-b-white' : 'bg-[#e3ecf5] text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {iqActiveSubTab === 'status' ? (
          <div className="p-4 bg-[#f0f4f8]">
            <div className="bg-white border border-[#b0c4de] rounded-sm p-4">
              <div className="font-bold text-blue-950 border-b border-gray-200 pb-2 mb-3">
                Subscriber Status &amp; Lifecycle Controls
              </div>

              <div className="grid grid-cols-3 gap-y-4 gap-x-6 text-xs">
                <div className="flex items-center justify-between border-b pb-1">
                  <span className="text-gray-600 font-semibold">Life Cycle Status</span>
                  <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded font-bold">Call Barring</span>
                </div>

                <div className="flex items-center justify-between border-b pb-1">
                  <span className="text-gray-600 font-semibold">Activation Time</span>
                  <span className="font-mono">2020-11-02 12:45:47</span>
                </div>

                <div className="flex items-center justify-between border-b pb-1">
                  <span className="text-gray-600 font-semibold">Active Stop</span>
                  <span className="font-mono text-green-700 font-medium">2026-07-24 23:59:59</span>
                </div>

                <div className="flex items-center justify-between border-b pb-1">
                  <span className="text-gray-600 font-semibold">Call Barring Stop</span>
                  <span className="font-mono text-red-700 font-medium">2026-08-23 23:59:59</span>
                </div>

                <div className="flex items-center justify-between border-b pb-1">
                  <span className="text-gray-600 font-semibold">Suspend Stop</span>
                  <span className="font-mono text-amber-700">2026-09-22 23:59:59</span>
                </div>

                <div className="flex items-center justify-between border-b pb-1">
                  <span className="text-gray-600 font-semibold">Test Stop</span>
                  <span className="text-gray-500">Unspecified</span>
                </div>

                <div className="flex items-center justify-between border-b pb-1">
                  <span className="text-gray-600 font-semibold">Inventory Stop</span>
                  <span className="text-gray-700 font-medium">Normal</span>
                </div>

                <div className="flex items-center justify-between border-b pb-1">
                  <span className="text-gray-600 font-semibold">Pool Stop</span>
                  <span className="text-gray-500">None</span>
                </div>

                <div className="flex items-center justify-between border-b pb-1">
                  <span className="text-gray-600 font-semibold">Deactivation Stop</span>
                  <span className="text-gray-500">Unspecified</span>
                </div>

                <div className="flex items-center justify-between border-b pb-1">
                  <span className="text-gray-600 font-semibold">Customer Suspension</span>
                  <span className="text-gray-800">Barring</span>
                </div>

                <div className="flex items-center justify-between border-b pb-1">
                  <span className="text-gray-600 font-semibold">Customer Suspension End Date</span>
                  <span className="text-gray-500">--</span>
                </div>

                <div className="flex items-center justify-between border-b pb-1">
                  <span className="text-gray-600 font-semibold">Missing Claim</span>
                  <span className="text-gray-800 font-medium">Normal</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">
            Subscriber <strong className="text-gray-700">{iqActiveSubTab.toUpperCase()}</strong> information panel loaded.
          </div>
        )}
      </div>
    </div>
  );
}
