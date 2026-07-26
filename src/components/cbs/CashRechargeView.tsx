import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Trash2, Download, Upload, RefreshCw, Link as LinkIcon, Edit3 } from 'lucide-react';
import { useTabStore } from '@/store/useTabStore';
import { useToastStore } from '@/store/useToastStore';

export default function CashRechargeView() {
  const navigate = useNavigate();
  const addTab = useTabStore((state) => state.addTab);
  const { addToast } = useToastStore();
  
  const [rewardName, setRewardName] = useState('');
  const [maxAmount, setMaxAmount] = useState('59.5');
  const [minAmount, setMinAmount] = useState('58.5');
  const [activeBottomTab, setActiveBottomTab] = useState<'bonus' | 'offer' | 'instalment'>('offer');

  const handleOpenOfferingTab = () => {
    addTab({
      id: 'eid-special-offer',
      name: 'Eid_Special_Offer 🍃',
      path: '/cbs/eid-special-offer',
      isClosable: true
    });
    addToast('Opening Eid_Special_Offer details tab...', 'info');
    navigate('/cbs/eid-special-offer');
  };

  return (
    <div className="flex flex-col h-full bg-[#f3f4f6] text-gray-800 text-xs font-sans p-4 space-y-4 overflow-y-auto">
      {/* Breadcrumb Header */}
      <div className="bg-[#e4ebf5] border border-[#a9bbcf] px-4 py-2 text-xs font-bold text-blue-900 rounded-sm flex items-center justify-between">
        <span>Cash Recharge / Reward Settings List Management</span>
        <span className="text-[11px] font-normal text-gray-500">CBS Cash Recharge Config</span>
      </div>

      {/* Filter / Search Bar (Image 5) */}
      <div className="border border-[#b0c4de] rounded-sm bg-[#f9fafb] p-3 flex items-center gap-4 flex-wrap shadow-2xs">
        <div className="flex items-center gap-2">
          <label className="font-semibold text-gray-600">Max Recharge Amount:</label>
          <input 
            type="text" 
            value={maxAmount}
            onChange={(e) => setMaxAmount(e.target.value)}
            className="border border-gray-300 px-2 py-1 bg-white rounded-sm text-xs w-28 outline-none focus:border-blue-500" 
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="font-semibold text-gray-600">Min Recharge Amount:</label>
          <input 
            type="text" 
            value={minAmount}
            onChange={(e) => setMinAmount(e.target.value)}
            className="border border-gray-300 px-2 py-1 bg-white rounded-sm text-xs w-28 outline-none focus:border-blue-500" 
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="font-semibold text-gray-600">Reward Name:</label>
          <input 
            type="text" 
            value={rewardName}
            onChange={(e) => setRewardName(e.target.value)}
            placeholder="e.g. Default / Bonus" 
            className="border border-gray-300 px-2 py-1 bg-white rounded-sm text-xs w-48 outline-none focus:border-blue-500" 
          />
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <button 
            onClick={() => addToast('Reward search executed', 'info')}
            className="bg-[#337ab7] hover:bg-[#286090] text-white px-4 py-1 rounded-sm font-semibold border border-[#2e6da4] flex items-center gap-1 cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search</span>
          </button>
          <button 
            onClick={() => {
              setRewardName('');
              setMaxAmount('');
              setMinAmount('');
              addToast('Reset filter options', 'info');
            }}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-1 rounded-sm font-semibold border border-gray-300 cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Top Table Card: Records (Image 5) */}
      <div className="border border-[#b0c4de] rounded-sm bg-white overflow-hidden shadow-2xs flex flex-col">
        <div className="bg-[#f0f4f8] px-4 py-2 border-b border-[#b0c4de] flex items-center justify-between">
          <div className="font-bold text-blue-900">Records</div>
          <div className="flex items-center gap-1.5 text-xs select-none">
            <button className="bg-gray-100 hover:bg-gray-200 border border-gray-300 px-2 py-0.5 rounded-sm flex items-center gap-1 cursor-pointer">
              <Plus className="w-3 h-3 text-green-600" />
              <span>Create</span>
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 border border-gray-300 px-2 py-0.5 rounded-sm flex items-center gap-1 cursor-pointer">
              <Trash2 className="w-3 h-3 text-red-600" />
              <span>Delete</span>
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 border border-gray-300 px-2 py-0.5 rounded-sm flex items-center gap-1 cursor-pointer">
              <Download className="w-3 h-3 text-blue-600" />
              <span>Export All</span>
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 border border-gray-300 px-2 py-0.5 rounded-sm flex items-center gap-1 cursor-pointer">
              <Upload className="w-3 h-3 text-amber-600" />
              <span>Import</span>
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 border border-gray-300 px-2 py-0.5 rounded-sm flex items-center gap-1 cursor-pointer">
              <RefreshCw className="w-3 h-3 text-purple-600" />
              <span>Synchronize</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs min-w-[900px]">
            <thead>
              <tr className="bg-[#e4ebf5] border-b border-[#a9bbcf] text-blue-950 font-bold">
                <th className="p-2 border-r border-[#a9bbcf] w-8 text-center"><input type="checkbox" /></th>
                <th className="p-2 border-r border-[#a9bbcf]">Reward Name</th>
                <th className="p-2 border-r border-[#a9bbcf]">Primary Offering</th>
                <th className="p-2 border-r border-[#a9bbcf]">Trade Type</th>
                <th className="p-2 border-r border-[#a9bbcf]">Reward Validity (days)</th>
                <th className="p-2 border-r border-[#a9bbcf]">Effective Time</th>
                <th className="p-2 border-r border-[#a9bbcf]">Expiration Time</th>
                <th className="p-2 border-r border-[#a9bbcf] text-center">Reward settings</th>
                <th className="p-2 text-center">Operation</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 hover:bg-blue-50">
                <td className="p-2 border-r border-gray-200 text-center"><input type="checkbox" /></td>
                <td className="p-2 border-r border-gray-200 font-bold text-blue-900">Default</td>
                <td className="p-2 border-r border-gray-200 font-mono text-blue-800">410009|Corporate Sec Prepaid 3G</td>
                <td className="p-2 border-r border-gray-200">Not limited</td>
                <td className="p-2 border-r border-gray-200 font-mono text-center">0</td>
                <td className="p-2 border-r border-gray-200 font-mono text-[11px]">2016-08-04 16:51:01</td>
                <td className="p-2 border-r border-gray-200 font-mono text-[11px]">2037-01-01 05:59:59</td>
                <td className="p-2 border-r border-gray-200 text-center">
                  <button onClick={handleOpenOfferingTab} className="text-blue-700 hover:underline inline-flex items-center gap-1 cursor-pointer">
                    <LinkIcon className="w-3.5 h-3.5 text-blue-600" />
                  </button>
                </td>
                <td className="p-2 text-center">
                  <button onClick={handleOpenOfferingTab} className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-0.5 rounded text-[10px] cursor-pointer">
                    <Edit3 className="w-3 h-3 inline" /> Edit
                  </button>
                </td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-blue-50">
                <td className="p-2 border-r border-gray-200 text-center"><input type="checkbox" /></td>
                <td className="p-2 border-r border-gray-200 font-bold text-blue-900">Default</td>
                <td className="p-2 border-r border-gray-200 font-mono text-blue-800">-1|ALL</td>
                <td className="p-2 border-r border-gray-200">Not limited</td>
                <td className="p-2 border-r border-gray-200 font-mono text-center">0</td>
                <td className="p-2 border-r border-gray-200 font-mono text-[11px]">2026-05-25 00:00:00</td>
                <td className="p-2 border-r border-gray-200 font-mono text-[11px]">2026-05-31 23:59:59</td>
                <td className="p-2 border-r border-gray-200 text-center">
                  <button onClick={handleOpenOfferingTab} className="text-blue-700 hover:underline inline-flex items-center gap-1 cursor-pointer">
                    <LinkIcon className="w-3.5 h-3.5 text-blue-600" />
                  </button>
                </td>
                <td className="p-2 text-center">
                  <button onClick={handleOpenOfferingTab} className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-0.5 rounded text-[10px] cursor-pointer">
                    <Edit3 className="w-3 h-3 inline" /> Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-[#f0f4f8] px-4 py-1.5 border-t border-[#b0c4de] flex items-center justify-between text-[11px] text-gray-600">
          <div>Total records: <strong>2</strong></div>
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

      {/* Bottom Sub-tabs & Reward Offer Settings Table (Image 5) */}
      <div className="border border-[#b0c4de] rounded-sm bg-white overflow-hidden shadow-2xs flex flex-col">
        <div className="bg-[#d9e2ec] border-b border-[#a9bbcf] px-2 pt-1.5 flex items-center justify-between select-none">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveBottomTab('bonus')}
              className={`px-4 py-1 text-xs font-semibold rounded-t border-t border-x cursor-pointer ${
                activeBottomTab === 'bonus' ? 'bg-white text-blue-900 font-bold border-[#a9bbcf] border-b-white' : 'bg-[#e3ecf5] text-gray-700'
              }`}
            >
              Bonus Set
            </button>
            <button
              onClick={() => setActiveBottomTab('offer')}
              className={`px-4 py-1 text-xs font-semibold rounded-t border-t border-x cursor-pointer ${
                activeBottomTab === 'offer' ? 'bg-white text-blue-900 font-bold border-[#a9bbcf] border-b-white' : 'bg-[#e3ecf5] text-gray-700'
              }`}
            >
              Offer Set
            </button>
            <button
              onClick={() => setActiveBottomTab('instalment')}
              className={`px-4 py-1 text-xs font-semibold rounded-t border-t border-x cursor-pointer ${
                activeBottomTab === 'instalment' ? 'bg-white text-blue-900 font-bold border-[#a9bbcf] border-b-white' : 'bg-[#e3ecf5] text-gray-700'
              }`}
            >
              Instalment Bonus
            </button>
          </div>

          <div className="flex items-center gap-1.5 pb-1">
            <button className="bg-gray-100 hover:bg-gray-200 border border-gray-300 px-2 py-0.5 rounded-sm text-[11px] flex items-center gap-1 cursor-pointer">
              <Plus className="w-3 h-3 text-green-600" />
              <span>Create</span>
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 border border-gray-300 px-2 py-0.5 rounded-sm text-[11px] flex items-center gap-1 cursor-pointer">
              <Trash2 className="w-3 h-3 text-red-600" />
              <span>Delete</span>
            </button>
          </div>
        </div>

        <div className="p-0">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#e4ebf5] border-b border-[#a9bbcf] text-blue-950 font-bold">
                <th className="p-2 border-r border-[#a9bbcf] w-8 text-center"><input type="checkbox" /></th>
                <th className="p-2 border-r border-[#a9bbcf]">Reward Offer Settings</th>
                <th className="p-2 border-r border-[#a9bbcf]">Validity Unit Type</th>
                <th className="p-2 border-r border-[#a9bbcf]">Validity Length</th>
                <th className="p-2 text-center">Operation</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 hover:bg-blue-50">
                <td className="p-2 border-r border-gray-200 text-center"><input type="checkbox" /></td>
                <td 
                  onClick={handleOpenOfferingTab}
                  className="p-2 border-r border-gray-200 font-mono text-blue-800 font-bold hover:underline cursor-pointer"
                >
                  477062|Eid_Special_Offer
                </td>
                <td className="p-2 border-r border-gray-200">Hour</td>
                <td className="p-2 border-r border-gray-200 font-mono font-bold">168</td>
                <td className="p-2 text-center">
                  <button onClick={handleOpenOfferingTab} className="bg-blue-600 text-white px-2 py-0.5 rounded text-[10px] hover:bg-blue-700 cursor-pointer">
                    Configure
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-[#f0f4f8] px-4 py-1.5 border-t border-[#b0c4de] flex items-center justify-between text-[11px] text-gray-600">
          <div>Total records: <strong>1</strong></div>
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
    </div>
  );
}
