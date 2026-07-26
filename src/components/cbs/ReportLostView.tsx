import React, { useState } from 'react';
import { useToastStore } from '@/store/useToastStore';

export default function ReportLostView() {
  const { addToast } = useToastStore();
  const [lostForm, setLostForm] = useState({
    serviceNo: '1550155250',
    status: 'Active',
    operationType: 'Lost',
    reason: 'Stolen & Lost',
    remarks: 'Lost'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast(`Report Lost request processed for Service No ${lostForm.serviceNo}`, 'success');
  };

  return (
    <div className="flex-1 p-6 bg-white overflow-y-auto flex flex-col max-w-3xl mx-auto w-full space-y-4 font-sans text-xs">
      <div className="border border-[#b0c4de] rounded-md shadow-md bg-white overflow-hidden">
        {/* Header matching Image 3 */}
        <div className="bg-[#e4ebf5] border-b border-[#a9bbcf] px-4 py-2 text-blue-900 font-bold flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span>📋</span>
            <span>Report Lost and Cancel Report</span>
          </span>
          <span className="bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded text-[10px]">
            LOST / STOLEN REPORTING
          </span>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Service No.</label>
              <input 
                type="text" 
                value={lostForm.serviceNo}
                onChange={(e) => setLostForm({ ...lostForm, serviceNo: e.target.value })}
                className="w-full border border-gray-300 px-3 py-1.5 bg-gray-50 rounded outline-none font-mono text-xs text-gray-800"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Status</label>
              <input 
                type="text" 
                readOnly
                value={lostForm.status}
                className="w-full border border-gray-300 px-3 py-1.5 rounded bg-gray-50 text-green-700 font-bold text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">* Operation Type</label>
              <select 
                value={lostForm.operationType}
                onChange={(e) => setLostForm({ ...lostForm, operationType: e.target.value })}
                className="w-full border border-gray-300 px-3 py-1.5 rounded bg-white outline-none focus:border-blue-500 font-medium text-xs"
              >
                <option value="Lost">Lost</option>
                <option value="Stolen">Stolen</option>
                <option value="Cancel Report">Cancel Report</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">* Reason</label>
              <select 
                value={lostForm.reason}
                onChange={(e) => setLostForm({ ...lostForm, reason: e.target.value })}
                className="w-full border border-gray-300 px-3 py-1.5 rounded bg-white outline-none focus:border-blue-500 text-xs"
              >
                <option value="Stolen & Lost">Stolen &amp; Lost</option>
                <option value="SIM Replacement Required">SIM Replacement Required</option>
                <option value="Device Theft">Device Theft</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Remarks</label>
            <textarea 
              rows={3}
              value={lostForm.remarks}
              onChange={(e) => setLostForm({ ...lostForm, remarks: e.target.value })}
              placeholder="Lost"
              className="w-full border border-gray-300 p-2 rounded bg-white outline-none focus:border-blue-500 resize-none text-xs"
            />
          </div>

          <div className="pt-4 flex items-center justify-start gap-3 border-t border-gray-200">
            <button
              type="submit"
              className="px-6 py-1.5 bg-[#337ab7] hover:bg-[#286090] text-white rounded font-bold shadow-xs cursor-pointer text-xs"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
