import { useState } from 'react';
import { useToastStore } from '@/store/useToastStore';

export default function SubscriberInfoView() {
  const { addToast } = useToastStore();
  const [siActiveSubTab, setSiActiveSubTab] = useState<'info' | 'offering' | 'group' | 'history' | 'payment' | 'status' | 'contract' | 'sim' | 'business'>('sim');

  return (
    <div className="flex-1 flex flex-col p-4 bg-white overflow-y-auto space-y-4 text-xs font-sans">
      {/* Path Header */}
      <div className="text-xs text-gray-500 font-semibold">
        Customer Care &gt; Point of Sale &gt; <strong className="text-blue-900">Subscriber Info &amp; SIM Profile</strong>
      </div>

      {/* Search Criteria Bar (Image 4) */}
      <div className="border border-[#b0c4de] rounded-sm bg-[#f9fafb] p-3 shadow-2xs">
        <div className="grid grid-cols-4 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <label className="w-24 text-right font-semibold">Service No.:</label>
            <input type="text" defaultValue="1511510579" className="border px-2 py-1 bg-white rounded flex-1 outline-none focus:border-blue-500" />
          </div>
          <div className="flex items-center gap-2">
            <label className="w-24 text-right font-semibold">Group Name:</label>
            <input type="text" placeholder="All Groups" className="border px-2 py-1 bg-white rounded flex-1 outline-none focus:border-blue-500" />
          </div>
          <div className="flex items-center justify-end gap-2 col-span-2">
            <button 
              onClick={() => addToast('Search executed for Subscriber 1511510579', 'info')}
              className="bg-[#337ab7] text-white px-4 py-1 rounded font-semibold hover:bg-[#286090] cursor-pointer"
            >
              Search
            </button>
            <button className="bg-gray-200 px-4 py-1 rounded hover:bg-gray-300 cursor-pointer">Reset</button>
          </div>
        </div>
      </div>

      {/* Upper Subscriber Info Table (Image 4) */}
      <div className="border border-[#b0c4de] rounded-sm bg-white overflow-hidden shadow-2xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#e4ebf5] border-b border-[#a9bbcf] text-blue-950 font-bold">
              <th className="p-2 border-r border-[#a9bbcf] w-8 text-center"></th>
              <th className="p-2 border-r border-[#a9bbcf]">Service No.</th>
              <th className="p-2 border-r border-[#a9bbcf]">Group Name</th>
              <th className="p-2 border-r border-[#a9bbcf]">Payment Flag</th>
              <th className="p-2 border-r border-[#a9bbcf]">Status</th>
              <th className="p-2 border-r border-[#a9bbcf]">Primary Offer</th>
              <th className="p-2 border-r border-[#a9bbcf]">Tele Type</th>
              <th className="p-2 border-r border-[#a9bbcf]">Churn Alert</th>
              <th className="p-2">Default Account</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200 bg-blue-50/70 font-medium">
              <td className="p-2 text-center"><input type="radio" name="siRadio" defaultChecked /></td>
              <td className="p-2 font-mono text-blue-800 font-bold">1511510579</td>
              <td className="p-2">Individual</td>
              <td className="p-2">Prepaid</td>
              <td className="p-2 font-bold text-amber-700">Predeactivated</td>
              <td className="p-2">Youth 3G</td>
              <td className="p-2">4G</td>
              <td className="p-2">NA</td>
              <td className="p-2 font-mono">4000034085429</td>
            </tr>
            <tr className="border-b border-gray-200 hover:bg-blue-50">
              <td className="p-2 text-center"><input type="radio" name="siRadio" /></td>
              <td className="p-2 font-mono text-blue-800">1922991720</td>
              <td className="p-2">Individual</td>
              <td className="p-2">Prepaid</td>
              <td className="p-2 font-bold text-green-700">Active</td>
              <td className="p-2">Sagotom</td>
              <td className="p-2">4G</td>
              <td className="p-2">NA</td>
              <td className="p-2 font-mono">3.60211005</td>
            </tr>
            <tr className="border-b border-gray-200 hover:bg-blue-50">
              <td className="p-2 text-center"><input type="radio" name="siRadio" /></td>
              <td className="p-2 font-mono text-blue-800">1511121617</td>
              <td className="p-2">Individual</td>
              <td className="p-2">Prepaid</td>
              <td className="p-2 font-bold text-red-700">B1W</td>
              <td className="p-2">Sagotom</td>
              <td className="p-2">4G</td>
              <td className="p-2">NA</td>
              <td className="p-2 font-mono">4000036453157</td>
            </tr>
          </tbody>
        </table>

        <div className="bg-[#f0f4f8] px-4 py-1.5 border-t border-[#b0c4de] flex items-center justify-between text-[11px] text-gray-600">
          <div>Total records: <strong>3</strong></div>
          <div className="flex items-center gap-1">
            <span>10 records/page</span>
            <button className="px-1.5 py-0.5 border border-gray-300 bg-white rounded" disabled>|&lt;</button>
            <button className="px-1.5 py-0.5 border border-gray-300 bg-white rounded" disabled>&lt;</button>
            <span className="px-1 font-bold text-blue-900">1 / 1 Go</span>
            <button className="px-1.5 py-0.5 border border-gray-300 bg-white rounded" disabled>&gt;</button>
            <button className="px-1.5 py-0.5 border border-gray-300 bg-white rounded" disabled>&gt;|</button>
          </div>
        </div>
      </div>

      {/* Lower Sub-tabs Panel for Subscriber Info & SIM Management (Image 4) */}
      <div className="border border-[#b0c4de] rounded-sm bg-white flex flex-col flex-1 shadow-2xs overflow-hidden">
        <div className="bg-[#d9e2ec] border-b border-[#a9bbcf] px-3 pt-1.5 flex items-center gap-1 overflow-x-auto select-none">
          {[
            { id: 'info', label: 'Subscriber Info' },
            { id: 'offering', label: 'Offering' },
            { id: 'group', label: 'Group' },
            { id: 'history', label: 'Service No. History' },
            { id: 'payment', label: 'Payment Relation' },
            { id: 'status', label: 'Status History' },
            { id: 'contract', label: 'Contract' },
            { id: 'sim', label: 'SIM Management' },
            { id: 'business', label: 'Business Information' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSiActiveSubTab(tab.id as any)}
              className={`px-3 py-1 text-xs font-semibold rounded-t border-t border-x cursor-pointer whitespace-nowrap ${
                siActiveSubTab === tab.id ? 'bg-white text-blue-900 font-bold border-[#a9bbcf] border-b-white' : 'bg-[#e3ecf5] text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Detailed Information Grid (Exact layout from Image 4) */}
        <div className="p-4 bg-[#f0f4f8] flex-1 overflow-y-auto">
          <div className="bg-white border border-[#b0c4de] rounded-sm p-4">
            <div className="font-bold text-blue-900 border-b border-gray-200 pb-2 mb-3">
              Subscriber Basic Info &amp; SIM Profile
            </div>

            <div className="grid grid-cols-3 gap-y-3 gap-x-6 text-xs">
              <div>
                <span className="text-gray-500 block">Service No.</span>
                <strong className="font-mono text-blue-900 text-sm">1511510579</strong>
              </div>

              <div>
                <span className="text-gray-500 block">SIM Card No.</span>
                <strong className="font-mono text-gray-800">89880040816058669359</strong>
              </div>

              <div>
                <span className="text-gray-500 block">Status</span>
                <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">Predeactivated</span>
              </div>

              <div>
                <span className="text-gray-500 block">Tele Type</span>
                <span className="font-semibold text-gray-800">4G</span>
              </div>

              <div>
                <span className="text-gray-500 block">Payment Flag</span>
                <span className="font-semibold text-gray-800">Prepaid</span>
              </div>

              <div>
                <span className="text-gray-500 block">Subscriber Type</span>
                <span className="font-semibold text-gray-800">Individual</span>
              </div>

              <div>
                <span className="text-gray-500 block">Password</span>
                <span className="font-mono text-gray-600">********</span>
              </div>

              <div>
                <span className="text-gray-500 block">MNP Status</span>
                <span className="font-semibold text-gray-800">No</span>
              </div>

              <div>
                <span className="text-gray-500 block">Contract Number</span>
                <span className="text-gray-500">--</span>
              </div>

              <div>
                <span className="text-gray-500 block">SIM Item Code</span>
                <span className="font-mono text-gray-800">Sim card 64k</span>
              </div>

              <div>
                <span className="text-gray-500 block">SIM Card's PUK1</span>
                <span className="font-mono text-gray-600">********</span>
              </div>

              <div>
                <span className="text-gray-500 block">SIM Card's PUK2</span>
                <span className="font-mono text-gray-600">********</span>
              </div>

              <div>
                <span className="text-gray-500 block">Brand</span>
                <span className="font-semibold text-gray-800">Teletalk</span>
              </div>

              <div>
                <span className="text-gray-500 block">Activation Time</span>
                <span className="font-mono text-gray-800">2019-04-08 17:29:46</span>
              </div>

              <div>
                <span className="text-gray-500 block">Latest Activation Time</span>
                <span className="font-mono text-gray-800">2049-09-09 00:00:00</span>
              </div>

              <div>
                <span className="text-gray-500 block">Expiry Date</span>
                <span className="font-mono text-gray-800">2024-08-13 22:59:59</span>
              </div>

              <div>
                <span className="text-gray-500 block">Effective Time</span>
                <span className="font-mono text-gray-800">2019-04-08 12:26:11</span>
              </div>

              <div>
                <span className="text-gray-500 block">Suspension Date</span>
                <span className="text-gray-500">--</span>
              </div>

              <div>
                <span className="text-gray-500 block">Sub Language</span>
                <span className="font-semibold text-gray-800">English</span>
              </div>

              <div>
                <span className="text-gray-500 block">IVR Language</span>
                <span className="font-semibold text-gray-800">Bengali</span>
              </div>

              <div>
                <span className="text-gray-500 block">SIM Card Type</span>
                <span className="font-mono text-gray-800">Sim card 64K</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
