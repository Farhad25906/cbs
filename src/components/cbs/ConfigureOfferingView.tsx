import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FolderTree, ChevronDown, Save, RefreshCw, CheckCircle2, Sliders, Layers, Calendar, Radio } from 'lucide-react';
import { useTabStore } from '@/store/useTabStore';
import { useToastStore } from '@/store/useToastStore';
import { useCRMStore, OfferingConfig, ChannelConfig } from '@/store/useCRMStore';

export default function ConfigureOfferingView() {
  const navigate = useNavigate();
  const addTab = useTabStore((state) => state.addTab);
  const { addToast } = useToastStore();

  const offerings = useCRMStore((state) => state.offerings);
  const updateOffering = useCRMStore((state) => state.updateOffering);

  const [selectedOfferingId, setSelectedOfferingId] = useState<string>('477062');
  const [activeSubTab, setActiveSubTab] = useState('Basic Information');

  // Active form state for editing
  const [formState, setFormState] = useState<OfferingConfig>({
    id: '477062',
    name: 'Eid_Special_Offer',
    shortName: 'Eid_Special_Offer',
    code: 'S49023',
    type: 'Supplementary',
    paymentMode: 'All',
    status: 'Release',
    validFrom: '2026-03-18 00:00:00',
    expiresAt: '2030-05-31 23:59:59',
    catalog: 'Catalogs',
    description: 'Special festive bundle offering with free bonus minutes and data for Eid celebrations.',
    channels: [
      { name: 'Third Party', effectiveDate: '2026-03-18 00:00:00', expirationDate: '2026-05-31 23:59:59', enabled: true },
      { name: 'Gallery', effectiveDate: '2026-03-18 00:00:00', expirationDate: '2026-05-31 23:59:59', enabled: true },
      { name: 'SMS', effectiveDate: '2026-03-18 00:00:00', expirationDate: '2026-05-31 23:59:59', enabled: true },
      { name: 'USSD (*121#)', effectiveDate: '2026-03-18 00:00:00', expirationDate: '2026-05-31 23:59:59', enabled: true }
    ]
  });

  // Sync formState when selected Offering changes or store updates
  useEffect(() => {
    const found = offerings.find((o) => o.id === selectedOfferingId) || offerings[0];
    if (found) {
      setFormState({
        ...found,
        channels: found.channels || [
          { name: 'Third Party', effectiveDate: '2026-03-18 00:00:00', expirationDate: '2026-05-31 23:59:59', enabled: true },
          { name: 'Gallery', effectiveDate: '2026-03-18 00:00:00', expirationDate: '2026-05-31 23:59:59', enabled: true },
          { name: 'SMS', effectiveDate: '2026-03-18 00:00:00', expirationDate: '2026-05-31 23:59:59', enabled: true }
        ]
      });
    }
  }, [selectedOfferingId, offerings]);

  const subTabs = [
    'Basic Information',
    'Effective&Expiration',
    'Channels',
    'Pricing Plan',
    'Properties',
    'Dependency',
    'Qualification',
    'Contract Term'
  ];

  const handleSelectOffering = (offering: OfferingConfig) => {
    setSelectedOfferingId(offering.id);
    addToast(`Selected offering '${offering.name}' for configuration`, 'info');
  };

  const handleInputChange = (field: keyof OfferingConfig, value: any) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleChannelToggle = (channelIndex: number) => {
    setFormState((prev) => {
      const newChannels = [...prev.channels];
      newChannels[channelIndex] = {
        ...newChannels[channelIndex],
        enabled: !newChannels[channelIndex].enabled
      };
      return { ...prev, channels: newChannels };
    });
  };

  const handleChannelDateChange = (channelIndex: number, field: 'effectiveDate' | 'expirationDate', value: string) => {
    setFormState((prev) => {
      const newChannels = [...prev.channels];
      newChannels[channelIndex] = {
        ...newChannels[channelIndex],
        [field]: value
      };
      return { ...prev, channels: newChannels };
    });
  };

  const handleSave = () => {
    updateOffering(formState.id, formState);
    addToast(`Offering '${formState.name}' updated successfully!`, 'success');
  };

  const handleReset = () => {
    const found = offerings.find((o) => o.id === selectedOfferingId) || offerings[0];
    if (found) {
      setFormState(JSON.parse(JSON.stringify(found)));
    }
    addToast('Reverted unsaved edits', 'info');
  };

  return (
    <div className="flex flex-col h-full bg-[#f3f4f6] text-gray-800 text-xs font-sans p-4 space-y-4">
      {/* Breadcrumb Header + Action Bar */}
      <div className="bg-[#e4ebf5] border border-[#a9bbcf] px-4 py-2 text-xs font-bold text-blue-900 rounded-sm flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-blue-700" />
          <span>CRM Configuration &gt; Catalogs &gt; <strong className="text-blue-950 font-extrabold">Configure Offering</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            className="bg-[#28a745] hover:bg-[#218838] text-white font-bold px-4 py-1 rounded-sm border border-[#1e7e34] shadow-2xs flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save</span>
          </button>
          <button
            onClick={handleReset}
            className="bg-white hover:bg-gray-100 text-gray-700 font-semibold px-3 py-1 rounded-sm border border-gray-300 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-4 overflow-hidden">
        {/* Left Tree Menu (Offer Catalog) */}
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
                {offerings.map((offer) => {
                  const isSelected = offer.id === selectedOfferingId;
                  return (
                    <div
                      key={offer.id}
                      onClick={() => handleSelectOffering(offer)}
                      className={`px-2 py-1.5 rounded border cursor-pointer transition-all flex items-center justify-between text-[11px] ${
                        isSelected
                          ? 'bg-blue-600 text-white font-bold border-blue-700 shadow-2xs'
                          : 'bg-white text-blue-900 font-semibold border-blue-200 hover:bg-blue-50'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 truncate">
                        <span>🏷️</span>
                        <span className="truncate">{offer.name}</span>
                      </div>
                      {isSelected && <CheckCircle2 className="w-3 h-3 text-white shrink-0" />}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Content Pane (Editable Form + Subtabs) */}
        <div className="flex-1 bg-white border border-[#b0c4de] rounded-sm p-4 overflow-y-auto flex flex-col space-y-4">
          
          {/* Offering Info Banner Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded p-3 flex items-center justify-between">
            <div>
              <span className="text-xs text-blue-600 font-bold uppercase tracking-wide">Configuring Offering:</span>
              <h2 className="text-base font-extrabold text-blue-950 flex items-center gap-2 mt-0.5">
                <span>{formState.name}</span>
                <span className="text-xs font-mono font-normal bg-blue-100 text-blue-800 px-2 py-0.5 rounded border border-blue-300">
                  ID: {formState.id}
                </span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded border border-green-300 font-semibold">
                  {formState.status}
                </span>
              </h2>
            </div>

            <button
              onClick={() => {
                addTab({
                  id: `offering-${formState.name}`,
                  name: `${formState.name} 🍃`,
                  path: `/cbs/eid-special-offer?name=${formState.name}`,
                  isClosable: true
                });
                navigate(`/cbs/eid-special-offer?name=${formState.name}`);
              }}
              className="text-xs text-blue-700 hover:underline font-semibold bg-white border border-blue-300 px-3 py-1 rounded shadow-2xs cursor-pointer"
            >
              View Offering Details &gt;&gt;
            </button>
          </div>

          {/* Sub-tabs Row */}
          <div className="bg-[#d9e2ec] border-b border-[#a9bbcf] px-2 pt-1.5 flex items-center gap-1 overflow-x-auto select-none rounded-t">
            {subTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSubTab(tab)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-t border-t border-x cursor-pointer transition-colors ${
                  activeSubTab === tab
                    ? 'bg-white text-blue-900 font-bold border-[#a9bbcf] border-b-white shadow-2xs'
                    : 'bg-[#e3ecf5] text-gray-700 hover:bg-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content 1: Basic Information */}
          {(activeSubTab === 'Basic Information' || activeSubTab === 'Properties') && (
            <div className="border border-[#b0c4de] rounded-sm bg-white p-4 space-y-4 shadow-2xs">
              <div className="bg-[#f0f4f8] px-3 py-1.5 border-b border-[#b0c4de] font-bold text-blue-900 flex items-center gap-1.5 -mx-4 -mt-4 mb-4">
                <Layers className="w-3.5 h-3.5 text-blue-700" />
                <span>Basic Properties & Metadata</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-gray-700 font-semibold text-xs">Offering Name:</label>
                  <input
                    type="text"
                    value={formState.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full border border-gray-300 px-2.5 py-1.5 rounded-sm bg-white focus:border-blue-500 outline-none text-xs font-semibold text-blue-950"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-700 font-semibold text-xs">Offering Short Name:</label>
                  <input
                    type="text"
                    value={formState.shortName}
                    onChange={(e) => handleInputChange('shortName', e.target.value)}
                    className="w-full border border-gray-300 px-2.5 py-1.5 rounded-sm bg-white focus:border-blue-500 outline-none text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-700 font-semibold text-xs">Offering Code:</label>
                  <input
                    type="text"
                    value={formState.code}
                    onChange={(e) => handleInputChange('code', e.target.value)}
                    className="w-full border border-gray-300 px-2.5 py-1.5 rounded-sm bg-white focus:border-blue-500 outline-none font-mono text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-700 font-semibold text-xs">Subscription Offering Type:</label>
                  <select
                    value={formState.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="w-full border border-gray-300 px-2.5 py-1.5 rounded-sm bg-white focus:border-blue-500 outline-none text-xs"
                  >
                    <option value="Supplementary">Supplementary</option>
                    <option value="Primary Offering">Primary Offering</option>
                    <option value="Plan / Policy">Plan / Policy</option>
                    <option value="Add-on Pack">Add-on Pack</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-gray-700 font-semibold text-xs">Payment Mode:</label>
                  <select
                    value={formState.paymentMode}
                    onChange={(e) => handleInputChange('paymentMode', e.target.value)}
                    className="w-full border border-gray-300 px-2.5 py-1.5 rounded-sm bg-white focus:border-blue-500 outline-none text-xs"
                  >
                    <option value="All">All Modes (Prepaid & Postpaid)</option>
                    <option value="Prepaid">Prepaid Only</option>
                    <option value="Postpaid">Postpaid Only</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-gray-700 font-semibold text-xs">Offering Status:</label>
                  <select
                    value={formState.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full border border-gray-300 px-2.5 py-1.5 rounded-sm bg-white focus:border-blue-500 outline-none text-xs font-bold text-green-700"
                  >
                    <option value="Release">Release (Active)</option>
                    <option value="Testing">Testing</option>
                    <option value="Draft">Draft</option>
                    <option value="Expired">Expired</option>
                  </select>
                </div>

                <div className="col-span-2 space-y-1">
                  <label className="text-gray-700 font-semibold text-xs">Description & Rules:</label>
                  <textarea
                    rows={3}
                    value={formState.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full border border-gray-300 px-2.5 py-1.5 rounded-sm bg-white focus:border-blue-500 outline-none text-xs"
                    placeholder="Enter offering notes or business rule descriptions..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tab Content 2: Effective & Expiration */}
          {activeSubTab === 'Effective&Expiration' && (
            <div className="border border-[#b0c4de] rounded-sm bg-white p-4 space-y-4 shadow-2xs">
              <div className="bg-[#f0f4f8] px-3 py-1.5 border-b border-[#b0c4de] font-bold text-blue-900 flex items-center gap-1.5 -mx-4 -mt-4 mb-4">
                <Calendar className="w-3.5 h-3.5 text-blue-700" />
                <span>Validity & Time Configuration</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-gray-700 font-semibold text-xs">Valid From (Effective Date):</label>
                  <input
                    type="text"
                    value={formState.validFrom}
                    onChange={(e) => handleInputChange('validFrom', e.target.value)}
                    className="w-full border border-gray-300 px-2.5 py-1.5 rounded-sm bg-white font-mono text-xs focus:border-blue-500 outline-none"
                    placeholder="YYYY-MM-DD HH:mm:ss"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-700 font-semibold text-xs">Expires At (Expiration Date):</label>
                  <input
                    type="text"
                    value={formState.expiresAt}
                    onChange={(e) => handleInputChange('expiresAt', e.target.value)}
                    className="w-full border border-gray-300 px-2.5 py-1.5 rounded-sm bg-white font-mono text-xs focus:border-blue-500 outline-none"
                    placeholder="YYYY-MM-DD HH:mm:ss"
                  />
                </div>

                <div className="col-span-2 space-y-1">
                  <label className="text-gray-700 font-semibold text-xs">Management Catalog Path:</label>
                  <input
                    type="text"
                    value={formState.catalog}
                    onChange={(e) => handleInputChange('catalog', e.target.value)}
                    className="w-full border border-gray-300 px-2.5 py-1.5 rounded-sm bg-white text-xs focus:border-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tab Content 3: Channels */}
          {(activeSubTab === 'Channels' || activeSubTab === 'Pricing Plan' || activeSubTab === 'Dependency' || activeSubTab === 'Qualification' || activeSubTab === 'Contract Term') && (
            <div className="space-y-4">
              {/* Sales Channels Table */}
              <div className="border border-[#b0c4de] rounded-sm bg-white overflow-hidden shadow-2xs">
                <div className="bg-[#f0f4f8] px-4 py-1.5 border-b border-[#b0c4de] font-bold text-blue-900 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Radio className="w-3.5 h-3.5 text-blue-700" />
                    <span>Sales Channels Configuration</span>
                  </span>
                  <span className="text-[11px] text-gray-500 font-normal">Toggle channels & edit validity dates</span>
                </div>
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#e4ebf5] border-b border-[#a9bbcf] text-blue-950 font-bold">
                      <th className="p-2 border-r border-[#a9bbcf] w-12 text-center">Enable</th>
                      <th className="p-2 border-r border-[#a9bbcf]">Channel Name</th>
                      <th className="p-2 border-r border-[#a9bbcf]">Effective Date</th>
                      <th className="p-2 border-r border-[#a9bbcf]">Expiration Date</th>
                      <th className="p-2 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formState.channels.map((channel, idx) => (
                      <tr key={channel.name} className="border-b border-gray-200 hover:bg-blue-50/50">
                        <td className="p-2 border-r border-gray-200 text-center">
                          <input
                            type="checkbox"
                            checked={channel.enabled}
                            onChange={() => handleChannelToggle(idx)}
                            className="rounded text-blue-600 cursor-pointer"
                          />
                        </td>
                        <td className="p-2 border-r border-gray-200 font-bold text-blue-900">
                          {channel.name}
                        </td>
                        <td className="p-2 border-r border-gray-200">
                          <input
                            type="text"
                            value={channel.effectiveDate}
                            onChange={(e) => handleChannelDateChange(idx, 'effectiveDate', e.target.value)}
                            className="w-full border border-gray-300 px-2 py-0.5 rounded-sm bg-white font-mono text-[11px] focus:border-blue-500 outline-none"
                          />
                        </td>
                        <td className="p-2 border-r border-gray-200">
                          <input
                            type="text"
                            value={channel.expirationDate}
                            onChange={(e) => handleChannelDateChange(idx, 'expirationDate', e.target.value)}
                            className="w-full border border-gray-300 px-2 py-0.5 rounded-sm bg-white font-mono text-[11px] focus:border-blue-500 outline-none"
                          />
                        </td>
                        <td className="p-2 text-center">
                          {channel.enabled ? (
                            <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded border border-green-300 font-bold text-[10px]">
                              Active
                            </span>
                          ) : (
                            <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded border border-gray-300 font-bold text-[10px]">
                              Disabled
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Bottom Update Bar */}
          <div className="pt-2 border-t border-gray-200 flex items-center justify-between">
            <span className="text-gray-500 text-[11px]">
              Last Modified: <strong>2026-08-01</strong> by <strong className="text-blue-900">User</strong>
            </span>
            <button
              onClick={handleSave}
              className="bg-[#337ab7] hover:bg-[#286090] text-white font-bold px-6 py-1.5 rounded-sm border border-[#2e6da4] shadow-2xs flex items-center gap-1.5 cursor-pointer text-xs transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Update Data</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
