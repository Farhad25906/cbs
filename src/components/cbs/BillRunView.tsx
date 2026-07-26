import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useToastStore } from '@/store/useToastStore';

export default function BillRunView() {
  const { addToast } = useToastStore();
  const [billRunTab, setBillRunTab] = useState<'report' | 'query' | 'error' | 'decision' | 'rollback'>('query');

  return (
    <div className="flex-1 flex flex-col p-4 bg-white overflow-y-auto space-y-4 font-sans text-xs">
      {/* Top Header Breadcrumb */}
      <div className="bg-[#e4ebf5] border border-[#a9bbcf] px-4 py-2 text-xs font-bold text-blue-900 rounded-sm flex items-center justify-between">
        <span>Home &gt; Site Map &gt; Real Billing &gt; <strong className="text-blue-950 font-extrabold">Bill Run Monitoring</strong></span>
        <span className="text-[11px] font-normal text-gray-500">CBS Billing Engine Monitor v4.5</span>
      </div>

      {/* Sub-action Tabs Row (Image 5) */}
      <div className="bg-[#d9e2ec] border-b border-[#a9bbcf] px-2 pt-1.5 flex items-center gap-1 overflow-x-auto select-none">
        {[
          { id: 'report', label: 'Bill Report Query' },
          { id: 'query', label: 'Bill Query' },
          { id: 'error', label: 'View Error Message' },
          { id: 'decision', label: 'View Decision Log' },
          { id: 'rollback', label: 'One-click Rollback' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setBillRunTab(tab.id as any);
              addToast(`Switched bill run view to ${tab.label}`, 'info');
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-t border-t border-x cursor-pointer whitespace-nowrap ${
              billRunTab === tab.id
                ? 'bg-white text-blue-900 font-bold border-[#a9bbcf] border-b-white shadow-2xs'
                : 'bg-[#e3ecf5] text-gray-700 hover:bg-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Flowchart Diagram Container (Matching Image 5) */}
      <div className="border border-[#b0c4de] rounded-sm bg-white p-6 overflow-x-auto shadow-2xs min-h-[400px] flex items-center justify-center">
        
        <div className="flex items-center gap-2 select-none min-w-[1000px]">
          
          {/* Start Orb */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-green-500 border-2 border-green-600 flex items-center justify-center text-white font-bold text-xs shadow-md animate-pulse">
              Start
            </div>
          </div>

          <div className="w-6 h-0.5 bg-gray-400"></div>

          {/* Node 1: Lite Bill Prepare */}
          <div className="border border-gray-300 rounded-md bg-white p-2.5 shadow-sm text-center w-36 relative">
            <div className="bg-green-100 text-green-800 text-[10px] font-bold px-1 py-0.5 rounded flex items-center justify-center gap-1 mb-1">
              <CheckCircle className="w-3 h-3 text-green-600" />
              <span>Used: 00:01:31</span>
            </div>
            <div className="text-[11px] font-bold text-gray-800">Lite Bill Prepare</div>
          </div>

          <div className="w-6 h-0.5 bg-gray-400"></div>

          {/* Node 2: Lite Bill Startup */}
          <div className="border border-gray-300 rounded-md bg-white p-2.5 shadow-sm text-center w-36 relative">
            <div className="bg-green-100 text-green-800 text-[10px] font-bold px-1 py-0.5 rounded flex items-center justify-center gap-1 mb-1">
              <CheckCircle className="w-3 h-3 text-green-600" />
              <span>Used: 00:10:29</span>
            </div>
            <div className="text-[11px] font-bold text-gray-800">Lite Bill Startup</div>
          </div>

          <div className="w-6 h-0.5 bg-gray-400"></div>

          {/* Node 3: Lite Bill Calcul... */}
          <div className="border border-gray-300 rounded-md bg-white p-2.5 shadow-sm text-center w-36 relative">
            <div className="bg-green-100 text-green-800 text-[10px] font-bold px-1 py-0.5 rounded flex items-center justify-center gap-1 mb-1">
              <CheckCircle className="w-3 h-3 text-green-600" />
              <span>Used: 00:00:22</span>
            </div>
            <div className="text-[11px] font-bold text-gray-800">Lite Bill Calcul...</div>
          </div>

          <div className="w-6 h-0.5 bg-gray-400"></div>

          {/* Node 4: Lite Bill Gener... */}
          <div className="border border-gray-300 rounded-md bg-white p-2.5 shadow-sm text-center w-36 relative">
            <div className="bg-green-100 text-green-800 text-[10px] font-bold px-1 py-0.5 rounded flex items-center justify-center gap-1 mb-1">
              <CheckCircle className="w-3 h-3 text-green-600" />
              <span>Used: 00:31:38</span>
            </div>
            <div className="text-[11px] font-bold text-gray-800">Lite Bill Gener...</div>
          </div>

          <div className="w-6 h-0.5 bg-gray-400"></div>

          {/* Node 5: Lite Bill Check */}
          <div className="border border-gray-300 rounded-md bg-white p-2.5 shadow-sm text-center w-36 relative">
            <div className="bg-green-100 text-green-800 text-[10px] font-bold px-1 py-0.5 rounded flex items-center justify-center gap-1 mb-1">
              <CheckCircle className="w-3 h-3 text-green-600" />
              <span>Used: 00:32:01</span>
            </div>
            <div className="text-[11px] font-bold text-gray-800">Lite Bill Check</div>
          </div>

          <div className="w-6 h-0.5 bg-gray-400"></div>

          {/* Node 6: Lite Bill Confirm & Branches */}
          <div className="flex flex-col items-center gap-6">
            <div className="border border-gray-300 rounded-md bg-white p-2.5 shadow-sm text-center w-36 relative">
              <div className="bg-green-100 text-green-800 text-[10px] font-bold px-1 py-0.5 rounded flex items-center justify-center gap-1 mb-1">
                <CheckCircle className="w-3 h-3 text-green-600" />
                <span>Used: 00:00:24</span>
              </div>
              <div className="text-[11px] font-bold text-gray-800">Lite Bill Confirm</div>
            </div>

            <div className="flex gap-4">
              {/* Branch A: Post Bill Run */}
              <div className="border border-gray-300 rounded-md bg-white p-2.5 shadow-sm text-center w-36 relative">
                <div className="bg-green-100 text-green-800 text-[10px] font-bold px-1 py-0.5 rounded flex items-center justify-center gap-1 mb-1">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  <span>Used: 00:01:39</span>
                </div>
                <div className="text-[11px] font-bold text-gray-800">Post Bill Run</div>
              </div>

              {/* Branch B: Batch settlement */}
              <div className="border border-gray-300 rounded-md bg-white p-2.5 shadow-sm text-center w-36 relative">
                <div className="bg-green-100 text-green-800 text-[10px] font-bold px-1 py-0.5 rounded flex items-center justify-center gap-1 mb-1">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  <span>Used: 00:00:21</span>
                </div>
                <div className="text-[11px] font-bold text-gray-800">Batch settlem...</div>
              </div>
            </div>
          </div>

          {/* Green vertical separator bar */}
          <div className="w-1.5 h-28 bg-green-500 rounded-full mx-2"></div>

          {/* Node 7: Update Billing... */}
          <div className="border border-gray-300 rounded-md bg-white p-2.5 shadow-sm text-center w-36 relative">
            <div className="bg-green-100 text-green-800 text-[10px] font-bold px-1 py-0.5 rounded flex items-center justify-center gap-1 mb-1">
              <CheckCircle className="w-3 h-3 text-green-600" />
              <span>Used: &lt;1s</span>
            </div>
            <div className="text-[11px] font-bold text-gray-800">Update Billing ...</div>
          </div>

          <div className="w-6 h-0.5 bg-gray-400"></div>

          {/* End Orb */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-red-500 border-2 border-red-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
              End
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
