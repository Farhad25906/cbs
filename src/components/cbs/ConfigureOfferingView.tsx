import React, { useState } from 'react';
import { FolderTree, ChevronDown, ChevronRight } from 'lucide-react';
import { useToastStore } from '@/store/useToastStore';

export default function ConfigureOfferingView() {
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

  return (
    <div className="flex flex-col h-full bg-[#f3f4f6] text-gray-800 text-xs font-sans p-4 space-y-4">
      <div className="bg-[#e4ebf5] border border-[#a9bbcf] px-4 py-2 text-xs font-bold text-blue-900 rounded-sm">
        Home &gt; Product Catalog &gt; Product Configuration &gt; <strong className="text-blue-950 font-extrabold">Configure Offering</strong>
      </div>

      <div className="flex-1 flex gap-4 overflow-hidden">
        {/* Left Tree */}
        <div className="w-64 bg-[#f0f4f8] border border-[#cbd6e2] rounded-sm p-2 text-xs select-none">
          <div className="font-bold text-blue-900 mb-2 flex items-center gap-1 border-b pb-1">
            <FolderTree className="w-3.5 h-3.5" />
            <span>Offer Catalog</span>
          </div>

          <div className="ml-2 space-y-1">
            <div className="flex items-center gap-1 font-semibold text-gray-700">
              <ChevronDown className="w-3 h-3" />
              <span>INS Supplementary Offerings</span>
            </div>
            <div className="ml-4 border-l border-gray-300 pl-2">
              <div className="flex items-center gap-1 text-gray-600 font-medium">
                <ChevronDown className="w-3 h-3" />
                <span>Common</span>
              </div>
              <div className="ml-4 border-l border-gray-300 pl-2">
                <div className="bg-blue-100 text-blue-900 font-bold px-2 py-1 rounded border border-blue-300">
                  🏷️ Eid_Special_Offer
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 bg-white border border-[#b0c4de] rounded-sm p-4 overflow-y-auto flex flex-col space-y-4">
          
          {/* Sub-tabs Row */}
          <div className="bg-[#d9e2ec] border-b border-[#a9bbcf] px-2 pt-1.5 flex items-center gap-1 overflow-x-auto">
            {subTabs.map(tab => (
              <button
                key={tab}
                onClick={() => {
                  setActiveSubTab(tab);
                  addToast(`Switched channel tab to ${tab}`, 'info');
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-t border-t border-x cursor-pointer ${
                  activeSubTab === tab ? 'bg-white text-blue-900 font-bold border-[#a9bbcf] border-b-white' : 'bg-[#e3ecf5] text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Table 1: BE */}
          <div className="border border-[#b0c4de] rounded-sm bg-white overflow-hidden">
            <div className="bg-[#f0f4f8] px-4 py-1.5 border-b border-[#b0c4de] font-bold text-blue-900">
              ◉ BE
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
                  <td colSpan={7} className="p-3 text-center text-gray-500 italic">No Record.</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Table 2: Sales Channels & Departments */}
          <div className="grid grid-cols-2 gap-4">
            
            {/* Sales Channels */}
            <div className="border border-[#b0c4de] rounded-sm bg-white overflow-hidden">
              <div className="bg-[#f0f4f8] px-4 py-1.5 border-b border-[#b0c4de] font-bold text-blue-900">
                ◉ Sales Channels
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
                    <td className="p-2 text-green-700 font-bold">Enabled</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-2 border-r border-gray-200 font-bold text-blue-900">Gallery</td>
                    <td className="p-2 border-r border-gray-200 font-mono text-[11px]">2026-03-18 00:00:00</td>
                    <td className="p-2 border-r border-gray-200 font-mono text-[11px]">2026-05-31 23:59:59</td>
                    <td className="p-2 text-green-700 font-bold">Enabled</td>
                  </tr>
                  <tr>
                    <td className="p-2 border-r border-gray-200 font-bold text-blue-900">SMS</td>
                    <td className="p-2 border-r border-gray-200 font-mono text-[11px]">2026-03-18 00:00:00</td>
                    <td className="p-2 border-r border-gray-200 font-mono text-[11px]">2026-05-31 23:59:59</td>
                    <td className="p-2 text-green-700 font-bold">Enabled</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Departments */}
            <div className="border border-[#b0c4de] rounded-sm bg-white overflow-hidden">
              <div className="bg-[#f0f4f8] px-4 py-1.5 border-b border-[#b0c4de] font-bold text-blue-900">
                ◉ Departments
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
                    <td colSpan={3} className="p-3 text-center text-gray-500 italic">No Record.</td>
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
