import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit3, Search, CheckCircle } from 'lucide-react';
import { useTabStore } from '@/store/useTabStore';
import { useToastStore } from '@/store/useToastStore';

export default function OfferingDetailView() {
  const navigate = useNavigate();
  const addTab = useTabStore((state) => state.addTab);
  const { addToast } = useToastStore();
  const [activeSubTab, setActiveSubTab] = useState<string>('Basic Setting');

  // Sub-tabs matching Image 1
  const subTabs = [
    'Overview',
    'Basic Setting',
    'Element',
    'Property',
    'Plan',
    'Relationship',
    'Priority',
    'Consumption Limit',
    'Allowed/Disallowed',
    'Subscription Quantity',
    'Eligibility',
    'Publish',
    'Contract Term',
    'Reference Offering',
    'Subscription'
  ];

  const handleSubTabClick = (tab: string) => {
    setActiveSubTab(tab);
    if (tab === 'Plan') {
      addTab({
        id: 'bdc-rent-oneoff',
        name: 'BDC_Rent_oneoff',
        path: '/cbs/bdc-rent-oneoff',
        isClosable: true
      });
      addToast('Navigating to BDC_Rent_oneoff Plan view tab...', 'info');
      navigate('/cbs/bdc-rent-oneoff');
    } else {
      addToast(`Switched sub-tab to ${tab}`, 'info');
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f3f4f6] text-gray-800 text-xs font-sans p-4 space-y-4 overflow-y-auto">
      {/* Breadcrumb Header */}
      <div className="bg-[#e4ebf5] border border-[#a9bbcf] px-4 py-2 text-xs font-bold text-blue-900 rounded-sm flex items-center justify-between">
        <span>Unified Product Catalog &gt; Catalogs &gt; Offering(B2C) &gt; <strong className="text-blue-950 font-extrabold">Eid_Special_Offer 🍃</strong></span>
        <span className="bg-green-100 text-green-800 border border-green-300 px-2 py-0.5 rounded text-[10px] font-bold">STATUS: RELEASE</span>
      </div>

      {/* Sub-Navigation Tabs Row (Exact tabs bar from Image 1) */}
      <div className="bg-[#d9e2ec] border-b border-[#a9bbcf] px-2 pt-1.5 flex items-center gap-1 overflow-x-auto select-none">
        {subTabs.map((tab) => {
          const isActive = activeSubTab === tab;
          return (
            <button
              key={tab}
              onClick={() => handleSubTabClick(tab)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-t border-t border-x transition-all duration-150 whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-white text-blue-950 font-bold border-[#a9bbcf] border-b-white shadow-2xs'
                  : 'bg-[#e3ecf5] text-gray-700 hover:bg-white border-transparent'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Form Content Area */}
      <div className="bg-white border border-[#b0c4de] rounded-sm shadow-2xs overflow-hidden">
        
        {/* Basic Information Block (Image 1) */}
        <div className="border-b border-[#b0c4de]">
          <div className="bg-gradient-to-r from-[#e4ebf5] to-white px-4 py-2 text-xs font-bold text-gray-800 border-b border-[#b0c4de] flex items-center justify-between">
            <span>▼ Basic Information</span>
            <button 
              onClick={() => addToast('Editing Basic Information enabled', 'info')}
              className="text-xs text-blue-700 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-3 p-4 text-xs">
            <div className="flex items-center gap-2">
              <label className="w-36 text-right text-gray-600 font-semibold">Offering ID</label>
              <div className="flex items-center gap-2 flex-1">
                <input type="text" value="477062" className="border border-gray-300 px-2.5 py-1 bg-gray-50 text-xs w-52 rounded-sm font-mono outline-none" readOnly />
                <button className="text-gray-500 hover:text-blue-700"><Search className="w-3.5 h-3.5" /></button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="w-36 text-right text-gray-600 font-semibold">Offering Name *</label>
              <div className="flex items-center gap-2 flex-1">
                <input type="text" value="Eid_Special_Offer" className="border border-gray-300 px-2.5 py-1 bg-gray-50 text-xs w-52 rounded-sm font-bold text-gray-900 outline-none" readOnly />
                <button className="text-gray-500 hover:text-blue-700"><Edit3 className="w-3.5 h-3.5" /></button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="w-36 text-right text-gray-600 font-semibold">Notification Name *</label>
              <div className="flex items-center gap-2 flex-1">
                <div className="border border-gray-300 px-2.5 py-1 bg-gray-50 text-xs w-52 rounded-sm font-bold text-green-700 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                    <span>Eid_Special_Offer</span>
                  </span>
                  <Edit3 className="w-3.5 h-3.5 text-gray-500 hover:text-blue-700 cursor-pointer" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="w-36 text-right text-gray-600 font-semibold">Offering Short Name *</label>
              <div className="flex items-center gap-2 flex-1">
                <input type="text" value="Eid_Special_Offer" className="border border-gray-300 px-2.5 py-1 bg-gray-50 text-xs w-52 rounded-sm font-medium outline-none" readOnly />
                <button className="text-gray-500 hover:text-blue-700"><Edit3 className="w-3.5 h-3.5" /></button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="w-36 text-right text-gray-600 font-semibold">Offering Code *</label>
              <div className="flex items-center gap-2 flex-1">
                <input type="text" value="S49023" className="border border-gray-300 px-2.5 py-1 bg-gray-50 text-xs w-52 rounded-sm font-mono outline-none" readOnly />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="w-36 text-right text-gray-600 font-semibold">Subscription Offering Type</label>
              <div className="flex items-center gap-2 flex-1">
                <input type="text" value="Supplementary" className="border border-gray-300 px-2.5 py-1 bg-gray-50 text-xs w-52 rounded-sm font-medium outline-none" readOnly />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="w-36 text-right text-gray-600 font-semibold">Offering Status</label>
              <div className="flex items-center gap-2 flex-1">
                <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-sm border border-green-300 font-bold">Release</span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <label className="w-36 text-right text-gray-600 font-semibold mt-1">Description</label>
              <div className="flex-1 relative">
                <textarea 
                  className="border border-gray-300 p-2 bg-gray-50 text-xs w-full h-16 rounded-sm outline-none resize-none" 
                  readOnly 
                  defaultValue="Special Teletalk Eid Offer supplementary plan including bonus voice, volume, and SMS perks."
                />
                <button className="absolute top-2 right-2 text-gray-500 hover:text-blue-700"><Edit3 className="w-3.5 h-3.5" /></button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="w-36 text-right text-gray-600 font-semibold">Owner Type</label>
              <div className="flex items-center gap-2 flex-1">
                <select className="border border-gray-300 px-2 py-1 bg-white text-xs w-52 rounded-sm outline-none" disabled>
                  <option>Subscriber</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="w-36 text-right text-gray-600 font-semibold">Group Offering Type</label>
              <div className="flex items-center gap-2 flex-1">
                <select className="border border-gray-300 px-2 py-1 bg-white text-xs w-52 rounded-sm outline-none" disabled>
                  <option>Individual offering</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="w-36 text-right text-gray-600 font-semibold">Payment Mode *</label>
              <div className="flex items-center gap-2 flex-1">
                <select className="border border-gray-300 px-2 py-1 bg-white text-xs w-52 rounded-sm outline-none" disabled>
                  <option>All</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="w-36 text-right text-gray-600 font-semibold">Customer Type *</label>
              <div className="flex items-center gap-2 flex-1">
                <select className="border border-gray-300 px-2 py-1 bg-white text-xs w-52 rounded-sm outline-none" disabled>
                  <option>Individual customer</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="w-36 text-right text-gray-600 font-semibold">Network Type</label>
              <div className="flex items-center gap-2 flex-1">
                <select className="border border-gray-300 px-2 py-1 bg-white text-xs w-52 rounded-sm outline-none" disabled>
                  <option>Unspecified</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="w-36 text-right text-gray-600 font-semibold">Offering Type</label>
              <div className="flex items-center gap-2 flex-1">
                <select className="border border-gray-300 px-2 py-1 bg-white text-xs w-52 rounded-sm outline-none" disabled>
                  <option>Simple offering</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Offering Value section */}
        <div className="border-b border-[#b0c4de]">
          <div className="bg-gradient-to-r from-[#e4ebf5] to-white px-4 py-2 text-xs font-bold text-gray-800 border-b border-[#b0c4de]">
            ▼ Offering Value
          </div>
          <div className="p-4 flex items-center gap-2">
            <label className="w-36 text-right text-gray-600 font-semibold">Value</label>
            <div className="flex items-center gap-2">
              <input type="text" placeholder="Value Amount" className="border border-gray-300 px-2.5 py-1 bg-gray-50 text-xs w-64 rounded-sm outline-none" readOnly />
              <Search className="w-3.5 h-3.5 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Extended Information section */}
        <div className="bg-[#f0f4f8] px-4 py-2 text-xs font-bold text-gray-800 flex items-center gap-2 cursor-pointer hover:bg-gray-100">
          <span>▼ Extended Information</span>
        </div>

      </div>
    </div>
  );
}
