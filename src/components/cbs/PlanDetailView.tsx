import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FolderTree, ChevronDown } from 'lucide-react';
import { useTabStore } from '@/store/useTabStore';
import { useToastStore } from '@/store/useToastStore';

export default function PlanDetailView() {
  const navigate = useNavigate();
  const addTab = useTabStore((state) => state.addTab);
  const { addToast } = useToastStore();
  const [activeSubTab, setActiveSubTab] = useState<'basic' | 'policy'>('policy');
  const [showContextMenu, setShowContextMenu] = useState(true);

  const contextMenuItems = [
    'Fold',
    'Unlock',
    'Suspend',
    'Create Version',
    'Import',
    'Export in Readable Format'
  ];

  const handleContextMenuClick = (item: string) => {
    if (item === 'Create Version' || item === 'Unlock') {
      addTab({
        id: 'configure-offering',
        name: 'Configure Offering',
        path: '/cbs/configure-offering',
        isClosable: true
      });
      addToast(`Action "${item}" triggered! Opening Configure Offering view tab...`, 'success');
      navigate('/cbs/configure-offering');
    } else {
      addToast(`Action "${item}" executed on BDC_Rent_oneoff`, 'info');
    }
    setShowContextMenu(false);
  };

  return (
    <div className="flex flex-col h-full bg-[#f3f4f6] text-gray-800 text-xs font-sans p-4 space-y-4">
      {/* Breadcrumb Header */}
      <div className="bg-[#e4ebf5] border border-[#a9bbcf] px-4 py-2 text-xs font-bold text-blue-900 rounded-sm flex items-center justify-between">
        <span>Unified Product Catalog &gt; Catalogs &gt; Plan &gt; <strong className="text-blue-950 font-extrabold">BDC_Rent_oneoff</strong> 🔒</span>
        <span className="text-[11px] font-normal text-gray-500">Plan Policy Configuration</span>
      </div>

      {/* Main Split Layout: Left Version Tree + Right Details Pane (Image 2) */}
      <div className="flex-1 flex gap-4 overflow-hidden">
        
        {/* Left Version Tree (Image 2) */}
        <div className="w-64 bg-[#f0f4f8] border border-[#cbd6e2] rounded-sm flex flex-col p-2 select-none relative shrink-0">
          <div className="bg-[#e4ebf5] p-2 border-b border-[#cbd6e2] font-bold text-blue-900 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <FolderTree className="w-3.5 h-3.5 text-blue-700" />
              <span>BDC_Rent_oneoff</span>
            </span>
          </div>

          <div className="p-2 space-y-1 overflow-y-auto flex-1 text-xs">
            <div className="font-bold text-gray-700 flex items-center gap-1">
              <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              <span>All Versions</span>
            </div>
            
            <div className="ml-4 border-l border-gray-300 pl-2">
              <div 
                onClick={() => setShowContextMenu(!showContextMenu)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  setShowContextMenu(true);
                }}
                className="bg-blue-100 text-blue-950 font-bold px-2 py-1 rounded border border-blue-300 flex items-center justify-between cursor-pointer hover:bg-blue-200"
              >
                <span className="flex items-center gap-1">
                  <span>📄</span>
                  <span>BDC_Rent_oneoff</span>
                </span>
                <span className="text-[10px] text-blue-700">▼</span>
              </div>
            </div>
          </div>

          {/* Context Menu Popup (Image 2) */}
          {showContextMenu && (
            <div 
              className="absolute left-6 top-16 bg-white border border-gray-400 shadow-xl rounded-sm py-1 z-50 w-52 text-xs"
            >
              {contextMenuItems.map((item) => (
                <div 
                  key={item}
                  onClick={() => handleContextMenuClick(item)}
                  className={`px-3 py-1.5 cursor-pointer font-medium transition-colors ${
                    item === 'Create Version' ? 'text-white font-bold bg-[#1d5b96]' : 'text-gray-800 hover:bg-blue-50'
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Details Content Pane (Image 2) */}
        <div className="flex-1 bg-white border border-[#b0c4de] rounded-sm p-4 overflow-y-auto flex flex-col space-y-4">
          
          {/* Main Tabs Row */}
          <div className="bg-[#d9e2ec] border-b border-[#a9bbcf] px-2 pt-1.5 flex items-center gap-1 select-none">
            <button
              onClick={() => setActiveSubTab('basic')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-t border-t border-x cursor-pointer ${
                activeSubTab === 'basic' ? 'bg-white text-blue-900 font-bold border-[#a9bbcf] border-b-white' : 'bg-[#e3ecf5] text-gray-700'
              }`}
            >
              Basic Information
            </button>
            <button
              onClick={() => setActiveSubTab('policy')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-t border-t border-x cursor-pointer ${
                activeSubTab === 'policy' ? 'bg-white text-blue-900 font-bold border-[#a9bbcf] border-b-white' : 'bg-[#e3ecf5] text-gray-700'
              }`}
            >
              Policy Rule
            </button>
          </div>

          {/* Table 1: Recurring Charg... (Image 2) */}
          <div className="border border-[#b0c4de] rounded-sm bg-white overflow-hidden shadow-2xs">
            <div className="bg-[#f0f4f8] px-4 py-2 border-b border-[#b0c4de] font-bold text-gray-800 flex items-center justify-between">
              <span className="text-blue-900 font-extrabold">Recurring Charg...</span>
              <span className="text-[11px] text-gray-500 font-normal">Total records: 1</span>
            </div>

            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#e4ebf5] border-b border-[#a9bbcf] text-blue-950 font-bold">
                  <th className="p-2 border-r border-[#a9bbcf] w-24">Customized</th>
                  <th className="p-2 border-r border-[#a9bbcf]">Recurring Charge</th>
                  <th className="p-2 border-r border-[#a9bbcf]">Currency Unit</th>
                  <th className="p-2">Charge Code</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 hover:bg-blue-50">
                  <td className="p-2 border-r border-gray-200 text-center font-bold text-blue-700">✓</td>
                  <td className="p-2 border-r border-gray-200 font-mono text-blue-900 font-bold">42446043</td>
                  <td className="p-2 border-r border-gray-200">Unit</td>
                  <td className="p-2 font-mono text-gray-800">RentChargeCode</td>
                </tr>
              </tbody>
            </table>

            <div className="bg-[#f0f4f8] px-4 py-1.5 border-t border-[#b0c4de] flex items-center justify-between text-[11px] text-gray-600">
              <div>Total records: 1</div>
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

          {/* Table 2: Free Unit Bonus ... (Image 2) */}
          <div className="border border-[#b0c4de] rounded-sm bg-white overflow-hidden shadow-2xs">
            <div className="bg-[#f0f4f8] px-4 py-2 border-b border-[#b0c4de] font-bold text-gray-800 flex items-center justify-between">
              <span className="text-blue-900 font-extrabold">Free Unit Bonus ...</span>
              <span className="text-[11px] text-gray-500 font-normal">Total records: 3</span>
            </div>

            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#e4ebf5] border-b border-[#a9bbcf] text-blue-950 font-bold">
                  <th className="p-2 border-r border-[#a9bbcf] w-24">Customized</th>
                  <th className="p-2 border-r border-[#a9bbcf]">Free Unit Type</th>
                  <th className="p-2 border-r border-[#a9bbcf]">Bonus Amount</th>
                  <th className="p-2 border-r border-[#a9bbcf]">New Instance Flag</th>
                  <th className="p-2 border-r border-[#a9bbcf]">Number of Span ...</th>
                  <th className="p-2 border-r border-[#a9bbcf]">Duration Type</th>
                  <th className="p-2">Cal...</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 hover:bg-blue-50">
                  <td className="p-2 border-r border-gray-200 text-center text-blue-700">✓</td>
                  <td className="p-2 border-r border-gray-200 font-bold text-blue-900">TeleTalk Gift Volume</td>
                  <td className="p-2 border-r border-gray-200 font-mono text-gray-800 font-semibold">4187593114 Bytes</td>
                  <td className="p-2 border-r border-gray-200">Create new instance</td>
                  <td className="p-2 border-r border-gray-200 font-mono">168</td>
                  <td className="p-2 border-r border-gray-200">Hour</td>
                  <td className="p-2 text-gray-500">Default</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-blue-50">
                  <td className="p-2 border-r border-gray-200 text-center text-blue-700">✓</td>
                  <td className="p-2 border-r border-gray-200 font-bold text-blue-900">TeleTalk Gift Voice</td>
                  <td className="p-2 border-r border-gray-200 font-mono text-gray-800 font-semibold">2340 Seconds</td>
                  <td className="p-2 border-r border-gray-200">Create new instance</td>
                  <td className="p-2 border-r border-gray-200 font-mono">168</td>
                  <td className="p-2 border-r border-gray-200">Hour</td>
                  <td className="p-2 text-gray-500">Default</td>
                </tr>
                <tr className="hover:bg-blue-50">
                  <td className="p-2 border-r border-gray-200 text-center text-blue-700">✓</td>
                  <td className="p-2 border-r border-gray-200 font-bold text-blue-900">TeleTalk Gift SMS</td>
                  <td className="p-2 border-r border-gray-200 font-mono text-gray-800 font-semibold">39 Items</td>
                  <td className="p-2 border-r border-gray-200">Create new instance</td>
                  <td className="p-2 border-r border-gray-200 font-mono">168</td>
                  <td className="p-2 border-r border-gray-200">Hour</td>
                  <td className="p-2 text-gray-500">Default</td>
                </tr>
              </tbody>
            </table>

            <div className="bg-[#f0f4f8] px-4 py-1.5 border-t border-[#b0c4de] flex items-center justify-between text-[11px] text-gray-600">
              <div>Total records: 1</div>
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

      </div>
    </div>
  );
}
