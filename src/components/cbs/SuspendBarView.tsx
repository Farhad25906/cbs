import React, { useState } from 'react';
import { useToastStore } from '@/store/useToastStore';

export default function SuspendBarView() {
  const { addToast } = useToastStore();
  const [suspendForm, setSuspendForm] = useState({
    serviceNo: '1550155250',
    status: 'Active',
    statusReason: 'Normal',
    operationType: 'Customer Request Suspension',
    reason: 'Suspend: Customer Request',
    remarks: 'Lost',
    resumeDate: '',
    enableResumeDate: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast(`Suspend and Bar operation submitted for Service No ${suspendForm.serviceNo}`, 'success');
  };

  return (
    <div className="flex-1 p-6 bg-white overflow-y-auto flex flex-col max-w-3xl mx-auto w-full space-y-4 font-sans text-xs">
      <div className="border border-[#b0c4de] rounded-md shadow-md bg-white overflow-hidden">
        {/* Header bar matching Image 2 */}
        <div className="bg-[#e4ebf5] border-b border-[#a9bbcf] px-4 py-2 text-blue-900 font-bold flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span>🚫</span>
            <span>Suspend and Bar</span>
          </span>
          <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded text-[10px]">
            SERVICE SUSPENSION FORM
          </span>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Service No.</label>
              <input 
                type="text" 
                value={suspendForm.serviceNo}
                onChange={(e) => setSuspendForm({ ...suspendForm, serviceNo: e.target.value })}
                className="w-full border border-gray-300 px-3 py-1.5 bg-gray-50 rounded outline-none font-mono text-xs text-gray-800"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Status</label>
              <input 
                type="text" 
                readOnly
                value={suspendForm.status}
                className="w-full border border-gray-300 px-3 py-1.5 rounded bg-gray-50 text-green-700 font-bold text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Status Reason</label>
              <input 
                type="text" 
                readOnly
                value={suspendForm.statusReason}
                className="w-full border border-gray-300 px-3 py-1.5 rounded bg-gray-50 text-xs text-gray-700"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">* Operation Type</label>
              <select 
                value={suspendForm.operationType}
                onChange={(e) => setSuspendForm({ ...suspendForm, operationType: e.target.value })}
                className="w-full border border-gray-300 px-3 py-1.5 rounded bg-white outline-none focus:border-blue-500 font-medium text-xs"
              >
                <option value="Customer Request Suspension">Customer Request Suspension</option>
                <option value="Operator Suspension">Operator Suspension</option>
                <option value="Unbar / Resume Service">Unbar / Resume Service</option>
                <option value="Stolen & Lost Suspension">Stolen &amp; Lost Suspension</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">* Reason</label>
            <select 
              value={suspendForm.reason}
              onChange={(e) => setSuspendForm({ ...suspendForm, reason: e.target.value })}
              className="w-full border border-gray-300 px-3 py-1.5 rounded bg-white outline-none focus:border-blue-500 text-xs"
            >
              <option value="Suspend: Customer Request">Suspend: Customer Request</option>
              <option value="Lost SIM Card">Lost SIM Card</option>
              <option value="Overdue Bill Payment">Overdue Bill Payment</option>
              <option value="Fraudulent Activity">Fraudulent Activity</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Remarks</label>
            <textarea 
              rows={3}
              value={suspendForm.remarks}
              onChange={(e) => setSuspendForm({ ...suspendForm, remarks: e.target.value })}
              placeholder="Lost"
              className="w-full border border-gray-300 p-2 rounded bg-white outline-none focus:border-blue-500 resize-none text-xs"
            />
          </div>

          <div className="flex items-center gap-3 pt-2 border-t border-gray-200">
            <label className="flex items-center gap-1.5 font-semibold text-gray-700 cursor-pointer select-none">
              <input 
                type="checkbox"
                checked={suspendForm.enableResumeDate}
                onChange={(e) => setSuspendForm({ ...suspendForm, enableResumeDate: e.target.checked })}
                className="rounded text-blue-600"
              />
              <span>Resume Date</span>
            </label>

            {suspendForm.enableResumeDate && (
              <input 
                type="date"
                value={suspendForm.resumeDate}
                onChange={(e) => setSuspendForm({ ...suspendForm, resumeDate: e.target.value })}
                className="border border-gray-300 px-2 py-1 rounded outline-none text-xs"
              />
            )}
          </div>

          <div className="pt-4 flex items-center justify-start gap-3">
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
