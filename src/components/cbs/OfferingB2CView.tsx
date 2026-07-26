import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Trash2, Star, Filter, FolderTree, ChevronDown, ChevronRight } from 'lucide-react';
import { useTabStore } from '@/store/useTabStore';
import { useToastStore } from '@/store/useToastStore';

export default function OfferingB2CView() {
  const navigate = useNavigate();
  const addTab = useTabStore((state) => state.addTab);
  const { addToast } = useToastStore();

  const [offeringId, setOfferingId] = useState('');
  const [offeringName, setOfferingName] = useState('');
  const [offeringShortName, setOfferingShortName] = useState('');
  const [offeringCode, setOfferingCode] = useState('');
  const [isFuzzy, setIsFuzzy] = useState(false);
  const [selectedTreeCategory, setSelectedTreeCategory] = useState('Offering (510)');

  const mockOfferings = [
    {
      id: '477062',
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
      id: '42446043',
      name: 'BDC_Rent_oneoff',
      paymentMode: 'All',
      type: 'Plan / Policy',
      shortName: 'BDC_Rent_oneoff',
      code: 'RentChargeCode',
      status: 'Release',
      validFrom: '2026-01-01 00:00:00',
      expiresAt: '2030-12-31 23:59:59',
      catalog: 'Plan'
    },
    {
      id: '410009',
      name: 'Corporate Sec Prepaid 3G',
      paymentMode: 'Prepaid',
      type: 'Primary Offering',
      shortName: 'Corp_Sec_3G',
      code: 'S49024',
      status: 'Release',
      validFrom: '2026-01-01 00:00:00',
      expiresAt: '2029-12-31 23:59:59',
      catalog: 'Catalogs'
    },
    {
      id: '470010',
      name: 'Teletalk Gift Volume Pack',
      paymentMode: 'All',
      type: 'Supplementary',
      shortName: 'Gift_Vol_Pack',
      code: 'S49025',
      status: 'Release',
      validFrom: '2026-02-15 00:00:00',
      expiresAt: '2032-12-31 23:59:59',
      catalog: 'Catalogs'
    }
  ];

  const handleOpenOfferingDetail = (item: typeof mockOfferings[0]) => {
    if (item.name === 'BDC_Rent_oneoff') {
      addTab({
        id: 'bdc-rent-oneoff',
        name: item.name,
        path: '/cbs/bdc-rent-oneoff',
        isClosable: true
      });
      addToast(`Opened plan details for ${item.name}`, 'info');
      navigate('/cbs/bdc-rent-oneoff');
    } else {
      addTab({
        id: 'eid-special-offer',
        name: 'Eid_Special_Offer 🍃',
        path: '/cbs/eid-special-offer',
        isClosable: true
      });
      addToast(`Opened offering details for ${item.name}`, 'info');
      navigate('/cbs/eid-special-offer');
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f3f4f6] text-gray-800 text-xs font-sans p-4 space-y-4">
      {/* Breadcrumb Header */}
      <div className="bg-[#e4ebf5] border border-[#a9bbcf] px-4 py-2 text-xs font-bold text-blue-900 rounded-sm flex items-center justify-between">
        <span>Unified Product Catalog &gt; Catalogs &gt; <strong className="text-blue-950">Offering(B2C)</strong></span>
        <span className="text-[11px] font-normal text-gray-500">CBS Catalog Query</span>
      </div>

      {/* Main Split Layout: Left Tree + Right Content (Pic 3) */}
      <div className="flex-1 flex gap-4 overflow-hidden">
        
        {/* Left Tree Menu (Pic 3) */}
        <div className="w-64 bg-[#f0f4f8] border border-[#cbd6e2] rounded-sm p-3 flex flex-col space-y-3 shrink-0 select-none">
          <div className="flex items-center gap-1.5 border-b border-[#cbd6e2] pb-2">
            <span className="text-gray-600 font-semibold text-xs">Project</span>
            <select className="border border-gray-300 px-2 py-0.5 rounded bg-white text-xs flex-1 outline-none">
              <option value="mvne">MVNE</option>
            </select>
          </div>

          <div className="space-y-1 text-xs overflow-y-auto flex-1">
            <div className="flex items-center gap-1 font-bold text-blue-900 cursor-pointer">
              <ChevronDown className="w-3.5 h-3.5" />
              <span>MVNE</span>
            </div>

            <div className="ml-4 border-l border-gray-300 pl-2 space-y-1">
              <div className="text-gray-600 cursor-pointer hover:text-blue-900 flex items-center gap-1">
                <span>My Favorite (0)</span>
              </div>

              <div className="space-y-1">
                <div className="font-bold text-blue-900 flex items-center gap-1 cursor-pointer">
                  <ChevronDown className="w-3.5 h-3.5" />
                  <span>Offering (510)</span>
                </div>

                <div className="ml-4 border-l border-gray-300 pl-2 space-y-1 text-gray-600">
                  <div className="hover:text-blue-900 cursor-pointer">OOTB DEMO (0)</div>
                  <div className="hover:text-blue-900 cursor-pointer">Primary Offerings (0)</div>
                  <div className="hover:text-blue-900 cursor-pointer">Recharge (0)</div>
                  <div 
                    onClick={() => {
                      setSelectedTreeCategory('Teletalk_PrimaryOffering (57)');
                      addToast('Selected Teletalk Primary Offering category', 'info');
                    }}
                    className={`cursor-pointer hover:text-blue-900 ${
                      selectedTreeCategory.includes('Primary') ? 'text-blue-800 font-bold bg-blue-50 px-1 rounded' : ''
                    }`}
                  >
                    Teletalk_PrimaryOffering (57)
                  </div>
                  <div 
                    onClick={() => {
                      setSelectedTreeCategory('Teletalk_SupplmentOffering (448)');
                      addToast('Selected Teletalk Supplement Offering category', 'info');
                    }}
                    className={`cursor-pointer hover:text-blue-900 ${
                      selectedTreeCategory.includes('Supplment') ? 'text-blue-800 font-bold bg-blue-50 px-1 rounded' : ''
                    }`}
                  >
                    Teletalk_SupplmentOffering (448)
                  </div>
                  <div className="hover:text-blue-900 cursor-pointer">test (5)</div>
                  <div className="hover:text-blue-900 cursor-pointer">VGS (0)</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content Area (Pic 3) */}
        <div className="flex-1 flex flex-col space-y-4 overflow-y-auto">
          
          {/* Search Criteria Box */}
          <div className="border border-[#b0c4de] rounded-sm bg-gradient-to-b from-[#f9fafb] to-white shadow-2xs">
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
                  placeholder="e.g. 477062" 
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
                  onClick={() => addToast('Search executed for Offering(B2C)', 'info')}
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

          {/* Result List Table */}
          <div className="border border-[#b0c4de] rounded-sm bg-white shadow-2xs overflow-hidden flex flex-col flex-1">
            <div className="bg-[#f0f4f8] px-4 py-2 border-b border-[#b0c4de] flex items-center justify-between">
              <div className="font-bold text-blue-900">Result List</div>
              <div className="flex items-center gap-2">
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-0.5 rounded-sm border border-gray-300 text-[11px] font-medium flex items-center gap-1 cursor-pointer">
                  <Trash2 className="w-3 h-3 text-red-600" />
                  <span>Delete</span>
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-0.5 rounded-sm border border-gray-300 text-[11px] font-medium flex items-center gap-1 cursor-pointer">
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
                      onClick={() => handleOpenOfferingDetail(item)}
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
                          onClick={() => handleOpenOfferingDetail(item)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer"
                        >
                          Open Tab
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

      </div>
    </div>
  );
}
