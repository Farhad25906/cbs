import { useState } from 'react';
import { useToastStore } from '@/store/useToastStore';

export default function RealBillingView() {
  const { addToast } = useToastStore();
  const [billCycleType, setBillCycleType] = useState('21');
  const [billCycleId, setBillCycleId] = useState('20260621');
  const [hasSearched, setHasSearched] = useState(true);

  const handleSearch = () => {
    setHasSearched(true);
    addToast(`Searching Bill Cycle Type: ${billCycleType}, ID: ${billCycleId}`, 'info');
  };

  return (
    <div className="flex-1 flex flex-col p-4 bg-white overflow-y-auto space-y-4 text-xs font-sans">
      {/* Breadcrumb */}
      <div className="text-xs text-gray-500 font-semibold">
        Invoicing &gt; Bill Run Management &gt; <strong className="text-blue-900">Real Billing</strong>
      </div>

      {/* Search Criteria */}
      <div className="border border-[#b0c4de] rounded-sm bg-[#f9fafb] shadow-2xs">
        <div className="bg-[#e4ebf5] px-3 py-1 font-bold text-blue-900 border-b border-[#b0c4de] flex items-center gap-1">
          <span className="text-red-600">◀</span> Search Criteria
        </div>
        <div className="p-3 space-y-3 text-xs">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <label className="font-semibold text-gray-700 whitespace-nowrap">Bill Cycle Type <span className="text-red-600">*</span></label>
              <select
                value={billCycleType}
                onChange={(e) => setBillCycleType(e.target.value)}
                className="border border-gray-300 px-2 py-1 bg-white rounded outline-none focus:border-blue-500 w-64"
              >
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <label className="font-semibold text-gray-700 whitespace-nowrap">Bill Cycle ID <span className="text-red-600">*</span></label>
              <input
                type="text"
                value={billCycleId}
                onChange={(e) => setBillCycleId(e.target.value)}
                className="border border-gray-300 px-2 py-1 bg-white rounded outline-none focus:border-blue-500 w-40 font-mono"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleSearch}
              className="bg-[#337ab7] text-white px-8 py-1.5 rounded font-semibold hover:bg-[#286090] cursor-pointer border border-[#2e6da4] shadow-xs"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Records */}
      <div className="border border-[#b0c4de] rounded-sm bg-white overflow-hidden shadow-2xs">
        <div className="bg-[#e4ebf5] px-3 py-1 font-bold text-blue-900 border-b border-[#b0c4de] flex items-center gap-1">
          <span className="text-red-600">◀</span> Records
        </div>

        {hasSearched ? (
          <>
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#e4ebf5] border-b border-[#a9bbcf] text-blue-950 font-bold">
                  <th className="p-2 border-r border-[#a9bbcf]">Bill Cycle ID</th>
                  <th className="p-2 border-r border-[#a9bbcf]">Start Date</th>
                  <th className="p-2 border-r border-[#a9bbcf]">End Date</th>
                  <th className="p-2 border-r border-[#a9bbcf]">Bill Run Status</th>
                  <th className="p-2 border-r border-[#a9bbcf]">Preparation Status</th>
                  <th className="p-2 border-r border-[#a9bbcf]">Cutoff Status</th>
                  <th className="p-2">Operation</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 hover:bg-blue-50">
                  <td className="p-2 border-r border-gray-200 font-mono text-blue-800 font-medium">20260521</td>
                  <td className="p-2 border-r border-gray-200 font-mono">2026-06-21</td>
                  <td className="p-2 border-r border-gray-200 font-mono">2026-07-21</td>
                  <td className="p-2 border-r border-gray-200">Bill run</td>
                  <td className="p-2 border-r border-gray-200">
                    <span className="text-green-700 font-bold">Complete</span>
                  </td>
                  <td className="p-2 border-r border-gray-200">
                    <span className="text-green-700 font-bold">Complete</span>
                  </td>
                  <td className="p-2">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => addToast('Opening bill run detail view...', 'info')}
                        className="w-6 h-6 bg-blue-100 hover:bg-blue-200 border border-blue-300 rounded flex items-center justify-center cursor-pointer"
                        title="View Details"
                      >
                        <span className="text-blue-700 text-[10px]">📋</span>
                      </button>
                      <button
                        onClick={() => addToast('Opening bill run monitoring flowchart...', 'info')}
                        className="w-6 h-6 bg-green-100 hover:bg-green-200 border border-green-300 rounded flex items-center justify-center cursor-pointer"
                        title="View Flowchart"
                      >
                        <span className="text-green-700 text-[10px]">📊</span>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="bg-[#f0f4f8] px-4 py-1.5 border-t border-[#b0c4de] flex items-center justify-between text-[11px] text-gray-600">
              <div>Total records: <strong>1</strong></div>
              <div className="flex items-center gap-1">
                <select className="border border-gray-300 px-1 py-0.5 bg-white rounded text-[11px]">
                  <option>10</option>
                  <option>20</option>
                  <option>50</option>
                </select>
                <span>records</span>
                <button className="px-1.5 py-0.5 border border-gray-300 bg-white rounded" disabled>|&lt;</button>
                <button className="px-1.5 py-0.5 border border-gray-300 bg-white rounded" disabled>&lt;</button>
                <input type="text" defaultValue="1" className="border border-gray-300 px-1 py-0.5 bg-white rounded w-8 text-center text-[11px]" />
                <span>/ 1</span>
                <button className="px-1.5 py-0.5 border border-gray-300 bg-white rounded text-[11px]">Go</button>
                <button className="px-1.5 py-0.5 border border-gray-300 bg-white rounded" disabled>&gt;</button>
                <button className="px-1.5 py-0.5 border border-gray-300 bg-white rounded" disabled>&gt;|</button>
              </div>
            </div>
          </>
        ) : (
          <div className="p-6 text-center text-gray-400">
            Click <strong>Search</strong> to load billing records.
          </div>
        )}
      </div>
    </div>
  );
}
