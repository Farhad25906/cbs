import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FolderTree, ChevronDown } from 'lucide-react';
import { useTabStore } from '@/store/useTabStore';
import { useToastStore } from '@/store/useToastStore';

export default function ConfigureOfferingView() {
  const navigate = useNavigate();
  const addTab = useTabStore((state) => state.addTab);
  const { addToast } = useToastStore();
  const [activeSubTab, setActiveSubTab] = useState('Channels');

  const subTabs = [
    'Basic Information',
    'Effective&Expiration',
    'Elements',
    'Pricing Plan',
    'Properties',
    'Dependency',
    'Qualification',
    'Contract Term',
    'Channels',
    'Sub...'
  ];

  const handleSubTabClick = (tab: string) => {
    setActiveSubTab(tab);
    if (tab === 'Basic Information' || tab === 'Elements') {
      addTab({
        id: 'eid-special-offer',
        name: 'Eid_Special_Offer 🍃',
        path: '/cbs/eid-special-offer',
        isClosable: true
      });
      addToast(`Opening Eid_Special_Offer details tab for ${tab}...`, 'info');
      navigate('/cbs/eid-special-offer');
    } else {
      addToast(`Switched channel sub-tab to ${tab}`, 'info');
    }
  };

  const handleTreeOfferingClick = () => {
    addTab({
      id: 'eid-special-offer',
      name: 'Eid_Special_Offer 🍃',
      path: '/cbs/eid-special-offer',
      isClosable: true
    });
    addToast('Opening Eid_Special_Offer view in tab...', 'info');
    navigate('/cbs/eid-special-offer');
  };

  return (
    <div className="flex flex-col h-full bg-[#f3f4f6] text-gray-800 text-xs font-sans p-4 space-y-4">
      {/* Breadcrumb Header */}
      <div className="bg-[#e4ebf5] border border-[#a9bbcf] px-4 py-2 text-xs font-bold text-blue-900 rounded-sm">
        Home &gt; Product Catalog &gt; Product Configuration &gt; <strong className="text-blue-950 font-extrabold">Configure Offering</strong>
      </div>

      <div className="flex-1 flex gap-4 overflow-hidden">
        {/* Left Tree Menu (Image 4) */}
        <div className="w-64 bg-[#f0f4f8] border border-[#cbd6e2] rounded-sm p-3 text-xs select-none shrink-0 flex flex-col">
          <div className="font-bold text-blue-900 mb-2 flex items-center gap-1 border-b border-[#cbd6e2] pb-1.5">
            <FolderTree className="w-3.5 h-3.5 text-blue-700" />
            <span>Offer Catalog</span>
          </div>

          <div className="ml-1 space-y-1 overflow-y-auto flex-1">
            <div className="flex items-center gap-1 font-semibold text-gray-700 cursor-pointer">
              <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              <span>INS Supplementary Offerings</span>
            </div>
            <div className="ml-4 border-l border-gray-300 pl-2 space-y-1.5">
              <div className="flex items-center gap-1 text-gray-600 font-medium cursor-pointer">
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                <span>Common</span>
              </div>
              <div className="ml-4 border-l border-gray-300 pl-2 space-y-1.5">
                {[
                  { name: 'Eid_Special_Offer', icon: '🍃' },
                  { name: 'Boshonto_Offer', icon: '🌸' },
                  { name: 'Victory_Pack', icon: '🇧🇩' },
                  { name: 'Pohela_Boishakh_Pack', icon: '🍎' },
                  { name: 'Monsoon_Data_Pack', icon: '🌧️' }
                ].map((offer) => (
                  <div 
                    key={offer.name}
                    onClick={() => {
                      addTab({
                        id: `offering-${offer.name}`,
                        name: `${offer.name} ${offer.icon}`,
                        path: `/cbs/eid-special-offer?name=${offer.name}`,
                        isClosable: true
                      });
                      addToast(`Opening ${offer.name} details...`, 'info');
                      navigate(`/cbs/eid-special-offer?name=${offer.name}`);
                    }}
                    className="bg-blue-100/75 text-blue-900 font-bold px-2 py-1.5 rounded border border-blue-200 cursor-pointer hover:bg-blue-200 transition-colors flex items-center gap-1.5 text-[11px]"
                  >
                    <span>🏷️</span>
                    <span>{offer.name}</span>
                    <span className="text-xs">{offer.icon}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Content Pane (Image 4) */}
        <div className="flex-1 bg-white border border-[#b0c4de] rounded-sm p-4 overflow-y-auto flex flex-col space-y-4">
          
          {/* Sub-tabs Row (Image 4) */}
          <div className="bg-[#d9e2ec] border-b border-[#a9bbcf] px-2 pt-1.5 flex items-center gap-1 overflow-x-auto select-none">
            {subTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleSubTabClick(tab)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-t border-t border-x cursor-pointer ${
                  activeSubTab === tab ? 'bg-white text-blue-900 font-bold border-[#a9bbcf] border-b-white shadow-2xs' : 'bg-[#e3ecf5] text-gray-700 hover:bg-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Table 1: BE (Image 4) */}
          <div className="border border-[#b0c4de] rounded-sm bg-white overflow-hidden shadow-2xs">
            <div className="bg-[#f0f4f8] px-4 py-1.5 border-b border-[#b0c4de] font-bold text-blue-900 flex items-center gap-1">
              <span>◉</span>
              <span>BE</span>
            </div>
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#e4ebf5] border-b border-[#a9bbcf] text-blue-950 font-bold">
                  <th className="p-2 border-r border-[#a9bbcf]">BE</th>
                  <th className="p-2 border-r border-[#a9bbcf]">Brand</th>
                  <th className="p-2 border-r border-[#a9bbcf]">Offering Name</th>
                  <th className="p-2 border-r border-[#a9bbcf]">Management Catalog</th>
                  <th className="p-2 border-r border-[#a9bbcf]">Sales Catalog</th>
                  <th className="p-2 border-r border-[#a9bbcf]">Effective Date</th>
                  <th className="p-2">Expiration Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={7} className="p-4 text-center text-gray-500 italic">No Record.</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Table 2: Sales Channels & Departments (Image 4) */}
          <div className="grid grid-cols-2 gap-4">
            
            {/* Sales Channels */}
            <div className="border border-[#b0c4de] rounded-sm bg-white overflow-hidden shadow-2xs">
              <div className="bg-[#f0f4f8] px-4 py-1.5 border-b border-[#b0c4de] font-bold text-blue-900 flex items-center gap-1">
                <span>◉</span>
                <span>Sales Channels</span>
              </div>
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#e4ebf5] border-b border-[#a9bbcf] text-blue-950 font-bold">
                    <th className="p-2 border-r border-[#a9bbcf]">Channels</th>
                    <th className="p-2 border-r border-[#a9bbcf]">Effective Date</th>
                    <th className="p-2 border-r border-[#a9bbcf]">Expiration Date</th>
                    <th className="p-2">Operation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="p-2 border-r border-gray-200 font-bold text-blue-900 bg-blue-50/50">Third Party</td>
                    <td className="p-2 border-r border-gray-200 font-mono text-[11px]">2026-03-18 00:00:00</td>
                    <td className="p-2 border-r border-gray-200 font-mono text-[11px]">2026-05-31 23:59:59</td>
                    <td className="p-2 text-blue-700 font-semibold hover:underline cursor-pointer">Configure</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-2 border-r border-gray-200 font-bold text-blue-900">Gallery</td>
                    <td className="p-2 border-r border-gray-200 font-mono text-[11px]">2026-03-18 00:00:00</td>
                    <td className="p-2 border-r border-gray-200 font-mono text-[11px]">2026-05-31 23:59:59</td>
                    <td className="p-2 text-blue-700 font-semibold hover:underline cursor-pointer">Configure</td>
                  </tr>
                  <tr>
                    <td className="p-2 border-r border-gray-200 font-bold text-blue-900">SMS</td>
                    <td className="p-2 border-r border-gray-200 font-mono text-[11px]">2026-03-18 00:00:00</td>
                    <td className="p-2 border-r border-gray-200 font-mono text-[11px]">2026-05-31 23:59:59</td>
                    <td className="p-2 text-blue-700 font-semibold hover:underline cursor-pointer">Configure</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Departments */}
            <div className="border border-[#b0c4de] rounded-sm bg-white overflow-hidden shadow-2xs">
              <div className="bg-[#f0f4f8] px-4 py-1.5 border-b border-[#b0c4de] font-bold text-blue-900 flex items-center gap-1">
                <span>◉</span>
                <span>Departments</span>
              </div>
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#e4ebf5] border-b border-[#a9bbcf] text-blue-950 font-bold">
                    <th className="p-2 border-r border-[#a9bbcf]">Departments</th>
                    <th className="p-2 border-r border-[#a9bbcf]">Effective Date</th>
                    <th className="p-2">Expiration Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={3} className="p-4 text-center text-gray-500 italic">No Record.</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
