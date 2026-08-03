import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTabStore } from '@/store/useTabStore';
import { 
  Search, 
  FolderTree, 
  ChevronRight, 
  ChevronDown, 
  Plus, 
  Trash2, 
  Lock, 
  Unlock, 
  Download, 
  Upload, 
  RefreshCw, 
  Star, 
  Eye, 
  Edit3, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Filter, 
  Box, 
  Layers, 
  Cpu, 
  Database,
  Calendar,
  FileSpreadsheet,
  ShieldAlert,
  PhoneCall,
  Activity,
  PlayCircle,
  Clock,
  ArrowRight,
  CheckCircle,
  XCircle,
  FileText
} from 'lucide-react';
import { useToastStore } from '@/store/useToastStore';

// Data types
export interface InventoryItem {
  id: string;
  resourceId: string;
  name: string;
  shortName: string;
  code: string;
  type: 'MSISDN' | 'SIM/ICCID' | 'Voucher' | 'Terminal';
  category: 'Golden Number' | 'Silver Number' | 'Standard' | 'USIM 4G/5G' | 'eSIM' | 'BDT 100 Card' | 'BDT 500 Card' | 'CPE Router';
  status: 'Available' | 'Allocated' | 'Reserved' | 'Active' | 'Suspended' | 'Quarantined';
  warehouse: string;
  ownerType: string;
  paymentMode: string;
  customerType: string;
  networkType: string;
  createdDate: string;
  expiryDate: string;
  valueOrAmount?: string;
  iccidOrImsi?: string;
  bonusVolume?: string;
  bonusVoice?: string;
  bonusSms?: string;
}

// Initial Mock Inventory Data
const initialInventoryItems: InventoryItem[] = [
  {
    id: 'inv-001',
    resourceId: 'MS-0155000101',
    name: '0155000101 (Golden VIP)',
    shortName: '0155000101',
    code: 'MSISDN_GOLD_01',
    type: 'MSISDN',
    category: 'Golden Number',
    status: 'Available',
    warehouse: 'Dhaka Central HQ Warehouse',
    ownerType: 'Subscriber',
    paymentMode: 'All',
    customerType: 'Individual customer',
    networkType: 'LTE/5G',
    createdDate: '2026-01-10',
    expiryDate: '2030-12-31',
    valueOrAmount: 'BDT 5,000',
    bonusVolume: '4187593114 Bytes',
    bonusVoice: '2340 Seconds',
    bonusSms: '39 Items'
  },
  {
    id: 'inv-002',
    resourceId: 'MS-0155000102',
    name: '0155000102 (Standard)',
    shortName: '0155000102',
    code: 'MSISDN_STD_02',
    type: 'MSISDN',
    category: 'Standard',
    status: 'Active',
    warehouse: 'Chittagong Regional Hub',
    ownerType: 'Subscriber',
    paymentMode: 'Prepaid',
    customerType: 'Individual customer',
    networkType: '4G',
    createdDate: '2026-02-15',
    expiryDate: '2030-12-31',
    valueOrAmount: 'BDT 150',
    bonusVolume: '1073741824 Bytes',
    bonusVoice: '600 Seconds',
    bonusSms: '50 Items'
  },
  {
    id: 'inv-003',
    resourceId: 'SIM-8988012345678',
    name: 'USIM 4G 128K - Gemalto',
    shortName: 'USIM_4G_G1',
    code: 'SIM_CARD_898801',
    type: 'SIM/ICCID',
    category: 'USIM 4G/5G',
    status: 'Allocated',
    warehouse: 'Dhaka Central HQ Warehouse',
    ownerType: 'Dealer',
    paymentMode: 'All',
    customerType: 'Corporate customer',
    networkType: 'USIM Dual Multi',
    createdDate: '2026-03-01',
    expiryDate: '2028-06-30',
    iccidOrImsi: '89880040816058669359 / 470010928374',
    valueOrAmount: 'BDT 200'
  },
  {
    id: 'inv-004',
    resourceId: 'SIM-8988012345679',
    name: 'eSIM Profile Teletalk 5G',
    shortName: 'eSIM_5G_V1',
    code: 'ESIM_TELE_5G',
    type: 'SIM/ICCID',
    category: 'eSIM',
    status: 'Available',
    warehouse: 'E-SIM Digital Vault',
    ownerType: 'Subscriber',
    paymentMode: 'Postpaid',
    customerType: 'Individual customer',
    networkType: '5G SA',
    createdDate: '2026-05-12',
    expiryDate: '2032-12-31',
    iccidOrImsi: '8988019999888777666 / 470019998877',
    valueOrAmount: 'BDT 300'
  },
  {
    id: 'inv-005',
    resourceId: 'VCH-2026-100-089',
    name: 'Teletalk BDT 100 Recharge Voucher',
    shortName: 'VCH_100',
    code: 'VCH_BDT_100_B89',
    type: 'Voucher',
    category: 'BDT 100 Card',
    status: 'Available',
    warehouse: 'Rajshahi Regional Warehouse',
    ownerType: 'Retail Partner',
    paymentMode: 'Prepaid',
    customerType: 'All',
    networkType: 'Unspecified',
    createdDate: '2026-06-01',
    expiryDate: '2027-12-31',
    valueOrAmount: 'BDT 100',
    bonusVolume: '524288000 Bytes',
    bonusVoice: '300 Seconds',
    bonusSms: '20 Items'
  },
  {
    id: 'inv-006',
    resourceId: 'VCH-2026-500-090',
    name: 'Eid Special BDT 500 Voucher',
    shortName: 'Eid_Special_Offer',
    code: 'S49023',
    type: 'Voucher',
    category: 'BDT 500 Card',
    status: 'Reserved',
    warehouse: 'Dhaka Central HQ Warehouse',
    ownerType: 'Subscriber',
    paymentMode: 'All',
    customerType: 'Individual customer',
    networkType: 'Unspecified',
    createdDate: '2026-07-01',
    expiryDate: '2026-12-31',
    valueOrAmount: 'BDT 500',
    bonusVolume: '4187593114 Bytes',
    bonusVoice: '2340 Seconds',
    bonusSms: '39 Items'
  },
  {
    id: 'inv-007',
    resourceId: 'MS-0155000199',
    name: '0155000199 (Quarantined)',
    shortName: '0155000199',
    code: 'MSISDN_Q_99',
    type: 'MSISDN',
    category: 'Silver Number',
    status: 'Quarantined',
    warehouse: 'Sylhet Regional Depot',
    ownerType: 'System Pool',
    paymentMode: 'Prepaid',
    customerType: 'Individual customer',
    networkType: '3G/4G',
    createdDate: '2025-11-20',
    expiryDate: '2026-08-31',
    valueOrAmount: 'BDT 1,000'
  },
  {
    id: 'inv-008',
    resourceId: 'TRM-5G-CPE-001',
    name: 'Huawei 5G CPE Pro Router',
    shortName: '5G_CPE_PRO',
    code: 'TRM_HW_5GCPE',
    type: 'Terminal',
    category: 'CPE Router',
    status: 'Active',
    warehouse: 'Dhaka Central HQ Warehouse',
    ownerType: 'Enterprise Customer',
    paymentMode: 'Postpaid',
    customerType: 'Corporate customer',
    networkType: '5G NR Dual',
    createdDate: '2026-04-18',
    expiryDate: '2029-04-18',
    valueOrAmount: 'BDT 15,000'
  }
];

export default function InventoryManagement() {
  const navigate = useNavigate();
  const addTab = useTabStore((state) => state.addTab);
  const { addToast } = useToastStore();

  const openInTab = (path: string, name: string, id: string) => {
    addTab({ id, name, path, isClosable: true });
    addToast(`Opening ${name} in tab...`, 'info');
    navigate(path);
  };

  // Active Sub-Tab / View Mode inside Inventory
  const [viewMode, setViewMode] = useState<
    'workspace' | 'matrix' | 'integration-query' | 'subscriber-info' | 'suspend-bar' | 'report-lost' | 'bill-run'
  >('workspace');

  const [activeTabType, setActiveTabType] = useState<'ALL' | 'MSISDN' | 'SIM/ICCID' | 'Voucher' | 'Terminal'>('ALL');

  // Search Filter Form State
  const [searchId, setSearchId] = useState('');
  const [searchStatus, setSearchStatus] = useState('ALL');
  const [searchCategory, setSearchCategory] = useState('ALL');
  const [searchWarehouse, setSearchWarehouse] = useState('ALL');
  const [isFuzzy, setIsFuzzy] = useState(false);

  // Data List State
  const [items, setItems] = useState<InventoryItem[]>(initialInventoryItems);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [pageSize, setPageSize] = useState(10);

  // Tree View State
  const [expandedNodes, setExpandedNodes] = useState<string[]>(['root', 'dhaka', 'regional']);
  const [selectedTreeNode, setSelectedTreeNode] = useState<string>('all');
  const [contextMenuNode, setContextMenuNode] = useState<{ id: string; x: number; y: number } | null>(null);

  // Detail Modal / Inspector Drawer State
  const [inspectingItem, setInspectingItem] = useState<InventoryItem | null>(null);
  const [detailSubTab, setDetailSubTab] = useState<'basic' | 'channels' | 'charges' | 'history'>('basic');

  // Create/Import Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newItemData, setNewItemData] = useState<Partial<InventoryItem>>({
    type: 'MSISDN',
    category: 'Standard',
    status: 'Available',
    warehouse: 'Dhaka Central HQ Warehouse',
    ownerType: 'Subscriber',
    paymentMode: 'All',
    customerType: 'Individual customer',
    networkType: '4G/5G'
  });

  // Suspend & Bar Form State (Image 3)
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

  // Report Lost Form State (Image 4)
  const [lostForm, setLostForm] = useState({
    serviceNo: '1550155250',
    status: 'Active',
    operationType: 'Lost',
    reason: 'Stolen & Lost',
    remarks: 'Lost'
  });

  // Integration Query State (Image 1)
  const [iqActiveTopTab, setIqActiveTopTab] = useState<'customer' | 'account' | 'subscriber' | 'order' | 'log'>('subscriber');
  const [iqActiveSubTab, setIqActiveSubTab] = useState<'info' | 'offering' | 'accumulator' | 'payment' | 'consumption' | 'freeunit' | 'status' | 'cdr'>('status');

  // Subscriber Info State (Image 2)
  const [siActiveSubTab, setSiActiveSubTab] = useState<'info' | 'offering' | 'group' | 'history' | 'payment' | 'status' | 'contract' | 'sim' | 'business'>('sim');

  // Bill Run Monitoring State (Image 5)
  const [billRunTab, setBillRunTab] = useState<'report' | 'query' | 'error' | 'decision' | 'rollback'>('query');

  // Toggle tree expand
  const toggleTreeNode = (nodeId: string) => {
    setExpandedNodes(prev => 
      prev.includes(nodeId) ? prev.filter(id => id !== nodeId) : [...prev, nodeId]
    );
  };

  // Filter items based on active sub tab and search fields
  const filteredItems = items.filter(item => {
    if (activeTabType !== 'ALL' && item.type !== activeTabType) return false;
    
    if (searchId) {
      const q = searchId.toLowerCase();
      const match = isFuzzy
        ? item.resourceId.toLowerCase().includes(q) || item.name.toLowerCase().includes(q) || item.code.toLowerCase().includes(q)
        : item.resourceId.toLowerCase().startsWith(q) || item.name.toLowerCase().startsWith(q);
      if (!match) return false;
    }

    if (searchStatus !== 'ALL' && item.status !== searchStatus) return false;
    if (searchCategory !== 'ALL' && item.category !== searchCategory) return false;
    if (searchWarehouse !== 'ALL' && item.warehouse !== searchWarehouse) return false;

    if (selectedTreeNode === 'dhaka' && !item.warehouse.includes('Dhaka')) return false;
    if (selectedTreeNode === 'chittagong' && !item.warehouse.includes('Chittagong')) return false;
    if (selectedTreeNode === 'rajshahi' && !item.warehouse.includes('Rajshahi')) return false;
    if (selectedTreeNode === 'esim' && !item.warehouse.includes('E-SIM')) return false;

    return true;
  });

  // Multi-select handlers
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredItems.map(i => i.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Action handlers
  const handleSearchReset = () => {
    setSearchId('');
    setSearchStatus('ALL');
    setSearchCategory('ALL');
    setSearchWarehouse('ALL');
    setIsFuzzy(false);
    setSelectedTreeNode('all');
    addToast('Search criteria reset', 'info');
  };

  const handleBatchStatusChange = (newStatus: InventoryItem['status']) => {
    if (selectedIds.length === 0) {
      addToast('Please select records first', 'warning');
      return;
    }
    setItems(prev => prev.map(item => 
      selectedIds.includes(item.id) ? { ...item, status: newStatus } : item
    ));
    addToast(`Updated status of ${selectedIds.length} item(s) to ${newStatus}`, 'success');
  };

  const handleBatchDelete = () => {
    if (selectedIds.length === 0) {
      addToast('Please select records to delete', 'warning');
      return;
    }
    if (confirm(`Are you sure you want to delete ${selectedIds.length} inventory record(s)?`)) {
      setItems(prev => prev.filter(item => !selectedIds.includes(item.id)));
      setSelectedIds([]);
      addToast('Selected records deleted successfully', 'success');
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemData.resourceId || !newItemData.name) {
      addToast('Resource ID and Name are required', 'error');
      return;
    }
    const created: InventoryItem = {
      id: `inv-${Date.now().toString().slice(-4)}`,
      resourceId: newItemData.resourceId || 'MS-NEW',
      name: newItemData.name || 'New Inventory Item',
      shortName: newItemData.shortName || newItemData.name || 'New_Item',
      code: newItemData.code || 'CODE_' + Math.floor(Math.random() * 10000),
      type: newItemData.type || 'MSISDN',
      category: newItemData.category || 'Standard',
      status: newItemData.status || 'Available',
      warehouse: newItemData.warehouse || 'Dhaka Central HQ Warehouse',
      ownerType: newItemData.ownerType || 'Subscriber',
      paymentMode: newItemData.paymentMode || 'All',
      customerType: newItemData.customerType || 'Individual customer',
      networkType: newItemData.networkType || '4G/5G',
      createdDate: new Date().toISOString().split('T')[0],
      expiryDate: '2030-12-31',
      valueOrAmount: newItemData.valueOrAmount || 'BDT 200',
      bonusVolume: '4187593114 Bytes',
      bonusVoice: '2340 Seconds',
      bonusSms: '39 Items'
    };

    setItems([created, ...items]);
    setIsCreateModalOpen(false);
    addToast(`Successfully created resource ${created.resourceId}`, 'success');
  };

  const handleSuspendSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast(`Suspend and Bar operation submitted for Service ${suspendForm.serviceNo}`, 'success');
    setViewMode('workspace');
  };

  const handleLostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast(`Report Lost request processed for Service ${lostForm.serviceNo}`, 'success');
    setViewMode('workspace');
  };

  // Matrix Overview Cards Data
  const upcInventorySections = [
    {
      title: 'Resource Management',
      items: [
        { label: 'MSISDN Inventory Pool', type: 'MSISDN' },
        { label: 'SIM / ICCID Inventory', type: 'SIM/ICCID' },
        { label: 'Voucher & Recharge Cards', type: 'Voucher' },
        { label: 'Terminal & CPE Equipment', type: 'Terminal' },
        { label: 'Golden & Special Number Pool', type: 'MSISDN' }
      ]
    },
    {
      title: 'Stock & Warehouse',
      items: [
        { label: 'Warehouse Master Locations', type: 'ALL' },
        { label: 'Stock Batch Receipt & Entry', type: 'ALL' },
        { label: 'Inter-Warehouse Transfers', type: 'ALL' },
        { label: 'Dealer Stock Allocation', type: 'SIM/ICCID' },
        { label: 'Return & Defective Inventory', type: 'ALL' }
      ]
    },
    {
      title: 'Voucher Operations',
      items: [
        { label: 'Voucher Batch Generation', type: 'Voucher' },
        { label: 'Voucher PIN Status Query', type: 'Voucher' },
        { label: 'Voucher Invalidation & Lock', type: 'Voucher' },
        { label: 'PIN Encryption Key Audit Log', type: 'Voucher' }
      ]
    },
    {
      title: 'Number Rules & Categories',
      items: [
        { label: 'MSISDN Category Definition', type: 'MSISDN' },
        { label: 'Mass Number Range Import', type: 'MSISDN' },
        { label: 'Reservation & Release Policy', type: 'MSISDN' },
        { label: 'Quarantine Pool Clean-up', type: 'MSISDN' }
      ]
    },
    {
      title: 'Operations & Synchronization',
      items: [
        { label: 'Batch Data Synchronize', type: 'ALL' },
        { label: 'Manage Resource Locks', type: 'ALL' },
        { label: 'Inventory Audit Logs & Trash', type: 'ALL' },
        { label: 'Batch Resource Release', type: 'ALL' }
      ]
    }
  ];

  return (
    <div className="flex flex-col h-full bg-[#f3f4f6] text-gray-800 text-xs font-sans select-none">
      
      {/* 1. TOP MODULE NAVIGATION BAR WITH EXPANDED CBS VIEWS */}
      <div className="bg-[#e4ebf5] border-b border-[#a9bbcf] px-4 py-2 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="font-bold text-[#1e3a8a] flex items-center gap-1.5 text-xs shrink-0">
            <Box className="w-4 h-4 text-blue-700" />
            <span>Site Map &gt; Inventory</span>
          </span>
          <span className="text-gray-400">|</span>
          
          {/* View Mode Switcher Toolbar */}
          <div className="flex items-center bg-white rounded border border-[#cbd6e2] p-0.5 shadow-2xs text-[11px]">
            <button
              onClick={() => setViewMode('workspace')}
              className={`px-2 py-1 rounded font-semibold transition-all cursor-pointer ${
                viewMode === 'workspace' 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'text-gray-600 hover:text-blue-700 hover:bg-gray-50'
              }`}
            >
              🖥️ Workspace
            </button>

            <button
              onClick={() => setViewMode('integration-query')}
              className={`px-2 py-1 rounded font-semibold transition-all cursor-pointer ${
                viewMode === 'integration-query' 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'text-gray-600 hover:text-blue-700 hover:bg-gray-50'
              }`}
            >
              🔍 Integration Query
            </button>

            <button
              onClick={() => setViewMode('subscriber-info')}
              className={`px-2 py-1 rounded font-semibold transition-all cursor-pointer ${
                viewMode === 'subscriber-info' 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'text-gray-600 hover:text-blue-700 hover:bg-gray-50'
              }`}
            >
              📱 SIM &amp; Subscriber Info
            </button>

            <button
              onClick={() => setViewMode('suspend-bar')}
              className={`px-2 py-1 rounded font-semibold transition-all cursor-pointer ${
                viewMode === 'suspend-bar' 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'text-gray-600 hover:text-blue-700 hover:bg-gray-50'
              }`}
            >
              🚫 Suspend &amp; Bar
            </button>

            <button
              onClick={() => setViewMode('report-lost')}
              className={`px-2 py-1 rounded font-semibold transition-all cursor-pointer ${
                viewMode === 'report-lost' 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'text-gray-600 hover:text-blue-700 hover:bg-gray-50'
              }`}
            >
              📋 Report Lost
            </button>

            <button
              onClick={() => setViewMode('bill-run')}
              className={`px-2 py-1 rounded font-semibold transition-all cursor-pointer ${
                viewMode === 'bill-run' 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'text-gray-600 hover:text-blue-700 hover:bg-gray-50'
              }`}
            >
              📈 Bill Run Diagram
            </button>

            <button
              onClick={() => setViewMode('matrix')}
              className={`px-2 py-1 rounded font-semibold transition-all cursor-pointer ${
                viewMode === 'matrix' 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'text-gray-600 hover:text-blue-700 hover:bg-gray-50'
              }`}
            >
              📊 Overview Grid
            </button>
          </div>
        </div>

        {/* Action Shortcuts */}
        <div className="flex items-center gap-2 shrink-0">
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-[#337ab7] hover:bg-[#286090] text-white px-2.5 py-1 rounded-sm border border-[#2e6da4] flex items-center gap-1 font-semibold cursor-pointer shadow-2xs text-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Resource</span>
          </button>
          <button 
            onClick={() => {
              addToast('Resource batch synchronization initiated', 'info');
            }}
            className="bg-[#5cb85c] hover:bg-[#449d44] text-white px-2 py-1 rounded-sm border border-[#4cae4c] flex items-center gap-1 font-semibold cursor-pointer text-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Sync</span>
          </button>
        </div>
      </div>

      {/* 2. MAIN CONTENT VIEW SWITCHER */}
      
      {/* SCREEN A: INTEGRATION QUERY VIEW (IMAGE 1) */}
      {viewMode === 'integration-query' && (
        <div className="flex-1 flex flex-col p-4 bg-white overflow-y-auto space-y-4">
          <div className="text-xs text-gray-500 font-semibold">
            Customer Care &gt; Point of Sale &gt; <strong className="text-blue-900">Integration Query</strong>
          </div>

          {/* Search criteria box */}
          <div className="border border-[#b0c4de] rounded-sm bg-[#f9fafb]">
            <div className="bg-[#e4ebf5] px-3 py-1 font-bold text-blue-900 border-b border-[#b0c4de]">
              ▶ Search Criteria
            </div>
            <div className="p-3 grid grid-cols-4 gap-3 text-xs">
              <div className="flex items-center gap-2">
                <label className="w-24 text-right font-semibold">Service No:</label>
                <input type="text" defaultValue="1511510579" className="border px-2 py-1 bg-white rounded flex-1" />
              </div>
              <div className="flex items-center gap-2">
                <label className="w-24 text-right font-semibold">Subscriber ID:</label>
                <input type="text" placeholder="Optional" className="border px-2 py-1 bg-white rounded flex-1" />
              </div>
              <div className="flex items-center justify-end gap-2 col-span-2">
                <button className="bg-[#337ab7] text-white px-4 py-1 rounded font-semibold">Search</button>
                <button className="bg-gray-200 px-4 py-1 rounded">Reset</button>
              </div>
            </div>
          </div>

          {/* Top Result Table with Customer / Subscriber / Account Tabs (Matching Image 1) */}
          <div className="border border-[#b0c4de] rounded-sm bg-white overflow-hidden flex flex-col">
            <div className="bg-[#d9e2ec] border-b border-[#a9bbcf] px-3 pt-1.5 flex items-center gap-1">
              {['customer', 'account', 'subscriber', 'order', 'log'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setIqActiveTopTab(tab as any)}
                  className={`px-3 py-1 text-xs font-semibold rounded-t border-t border-x capitalize cursor-pointer ${
                    iqActiveTopTab === tab ? 'bg-white text-blue-900 font-bold border-[#a9bbcf] border-b-white' : 'bg-[#e3ecf5] text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#e4ebf5] border-b border-[#a9bbcf] text-blue-950 font-bold">
                  <th className="p-2 border-r border-[#a9bbcf] w-8"></th>
                  <th className="p-2 border-r border-[#a9bbcf]">Subscriber ID / No</th>
                  <th className="p-2 border-r border-[#a9bbcf]">Offering Name</th>
                  <th className="p-2 border-r border-[#a9bbcf]">Brand</th>
                  <th className="p-2 border-r border-[#a9bbcf]">Payment Mode</th>
                  <th className="p-2 border-r border-[#a9bbcf]">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 hover:bg-blue-50">
                  <td className="p-2 text-center"><input type="radio" name="iqSelect" /></td>
                  <td className="p-2 font-mono text-blue-800 font-medium">1511121617</td>
                  <td className="p-2">Teletalk_Prepaid</td>
                  <td className="p-2">Sagotom</td>
                  <td className="p-2">Prepaid</td>
                  <td className="p-2 font-bold text-red-700">Call Barring</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-blue-50">
                  <td className="p-2 text-center"><input type="radio" name="iqSelect" defaultChecked /></td>
                  <td className="p-2 font-mono text-blue-800 font-medium">1922991720</td>
                  <td className="p-2">Teletalk_Prepaid</td>
                  <td className="p-2">Youth 3G</td>
                  <td className="p-2">Prepaid</td>
                  <td className="p-2 font-bold text-amber-700">Suspend</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-blue-50">
                  <td className="p-2 text-center"><input type="radio" name="iqSelect" /></td>
                  <td className="p-2 font-mono text-blue-800 font-medium">1511510579</td>
                  <td className="p-2">Teletalk_Prepaid</td>
                  <td className="p-2">Pool</td>
                  <td className="p-2">Prepaid</td>
                  <td className="p-2 font-bold text-green-700">Active</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Lower Sub-tabs Panel (Exact layout from Image 1) */}
          <div className="border border-[#b0c4de] rounded-sm bg-white flex flex-col flex-1">
            <div className="bg-[#d9e2ec] border-b border-[#a9bbcf] px-3 pt-1.5 flex items-center gap-1">
              {[
                { id: 'info', label: 'Subscriber Information' },
                { id: 'offering', label: 'Offering' },
                { id: 'accumulator', label: 'Accumulator' },
                { id: 'payment', label: 'Payment Relationship' },
                { id: 'consumption', label: 'Consumption Limit' },
                { id: 'freeunit', label: 'Free Unit' },
                { id: 'status', label: 'Status' },
                { id: 'cdr', label: 'CDR' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setIqActiveSubTab(tab.id as any)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-t border-t border-x cursor-pointer ${
                    iqActiveSubTab === tab.id ? 'bg-white text-blue-900 font-bold border-[#a9bbcf] border-b-white' : 'bg-[#e3ecf5] text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {iqActiveSubTab === 'status' ? (
              /* Subscriber Status Details Grid (Image 1 Exact Fields) */
              <div className="p-4 bg-[#f0f4f8] space-y-4">
                <div className="bg-white border border-[#b0c4de] rounded-sm p-4">
                  <div className="font-bold text-blue-950 border-b border-gray-200 pb-2 mb-3">
                    Subscriber Status &amp; Lifecycle Controls
                  </div>

                  <div className="grid grid-cols-3 gap-y-4 gap-x-6 text-xs">
                    <div className="flex items-center justify-between border-b pb-1">
                      <span className="text-gray-600 font-semibold">Life Cycle Status</span>
                      <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded font-bold">Call Barring</span>
                    </div>

                    <div className="flex items-center justify-between border-b pb-1">
                      <span className="text-gray-600 font-semibold">Activation Time</span>
                      <span className="font-mono">2020-11-02 12:45:47</span>
                    </div>

                    <div className="flex items-center justify-between border-b pb-1">
                      <span className="text-gray-600 font-semibold">Active Stop</span>
                      <span className="font-mono text-green-700 font-medium">2026-07-24 23:59:59</span>
                    </div>

                    <div className="flex items-center justify-between border-b pb-1">
                      <span className="text-gray-600 font-semibold">Call Barring Stop</span>
                      <span className="font-mono text-red-700 font-medium">2026-08-23 23:59:59</span>
                    </div>

                    <div className="flex items-center justify-between border-b pb-1">
                      <span className="text-gray-600 font-semibold">Suspend Stop</span>
                      <span className="font-mono text-amber-700">2026-09-22 23:59:59</span>
                    </div>

                    <div className="flex items-center justify-between border-b pb-1">
                      <span className="text-gray-600 font-semibold">Test Stop</span>
                      <span className="text-gray-500">Unspecified</span>
                    </div>

                    <div className="flex items-center justify-between border-b pb-1">
                      <span className="text-gray-600 font-semibold">Inventory Stop</span>
                      <span className="text-gray-700 font-medium">Normal</span>
                    </div>

                    <div className="flex items-center justify-between border-b pb-1">
                      <span className="text-gray-600 font-semibold">Pool Stop</span>
                      <span className="text-gray-500">None</span>
                    </div>

                    <div className="flex items-center justify-between border-b pb-1">
                      <span className="text-gray-600 font-semibold">Deactivation Stop</span>
                      <span className="text-gray-500">Unspecified</span>
                    </div>

                    <div className="flex items-center justify-between border-b pb-1">
                      <span className="text-gray-600 font-semibold">Customer Suspension</span>
                      <span className="text-gray-800">Barring</span>
                    </div>

                    <div className="flex items-center justify-between border-b pb-1">
                      <span className="text-gray-600 font-semibold">Customer Suspension End Date</span>
                      <span className="text-gray-500">--</span>
                    </div>

                    <div className="flex items-center justify-between border-b pb-1">
                      <span className="text-gray-600 font-semibold">Missing Claim</span>
                      <span className="text-gray-800 font-medium">Normal</span>
                    </div>

                    <div className="flex items-center justify-between border-b pb-1">
                      <span className="text-gray-600 font-semibold">Suspension on Outstanding</span>
                      <span className="text-gray-800">Normal</span>
                    </div>

                    <div className="flex items-center justify-between border-b pb-1">
                      <span className="text-gray-600 font-semibold">Suspension on Credit Control</span>
                      <span className="text-gray-800">Normal</span>
                    </div>

                    <div className="flex items-center justify-between border-b pb-1">
                      <span className="text-gray-600 font-semibold">Life Status Suspension</span>
                      <span className="text-gray-800">Normal</span>
                    </div>

                    <div className="flex items-center justify-between border-b pb-1">
                      <span className="text-gray-600 font-semibold">Operator Suspension</span>
                      <span className="text-gray-800">Normal</span>
                    </div>

                    <div className="flex items-center justify-between border-b pb-1">
                      <span className="text-gray-600 font-semibold">Recharge Black List</span>
                      <span className="text-green-700 font-bold">No</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500">
                Detailed CBS tab <strong className="text-gray-700">{iqActiveSubTab.toUpperCase()}</strong> loaded for selected subscriber.
              </div>
            )}
          </div>
        </div>
      )}

      {/* SCREEN B: SIM & SUBSCRIBER INFO VIEW (IMAGE 2) */}
      {viewMode === 'subscriber-info' && (
        <div className="flex-1 flex flex-col p-4 bg-white overflow-y-auto space-y-4">
          <div className="text-xs text-gray-500 font-semibold">
            Customer Care &gt; Point of Sale &gt; <strong className="text-blue-900">Subscriber Info &amp; SIM Management</strong>
          </div>

          {/* Search bar */}
          <div className="border border-[#b0c4de] rounded-sm bg-[#f9fafb] p-3">
            <div className="grid grid-cols-4 gap-3 text-xs">
              <div className="flex items-center gap-2">
                <label className="w-24 text-right font-semibold">Service No:</label>
                <input type="text" defaultValue="1511510579" className="border px-2 py-1 bg-white rounded flex-1" />
              </div>
              <div className="flex items-center gap-2">
                <label className="w-24 text-right font-semibold">Group Name:</label>
                <input type="text" placeholder="All Groups" className="border px-2 py-1 bg-white rounded flex-1" />
              </div>
              <div className="flex items-center justify-end gap-2 col-span-2">
                <button className="bg-[#337ab7] text-white px-4 py-1 rounded font-semibold">Search</button>
                <button className="bg-gray-200 px-4 py-1 rounded">Reset</button>
              </div>
            </div>
          </div>

          {/* Subscriber List Table */}
          <div className="border border-[#b0c4de] rounded-sm bg-white overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#e4ebf5] border-b border-[#a9bbcf] text-blue-950 font-bold">
                  <th className="p-2 border-r border-[#a9bbcf]">Service No</th>
                  <th className="p-2 border-r border-[#a9bbcf]">Group Name</th>
                  <th className="p-2 border-r border-[#a9bbcf]">Payment Flag</th>
                  <th className="p-2 border-r border-[#a9bbcf]">Status</th>
                  <th className="p-2 border-r border-[#a9bbcf]">Primary Offer</th>
                  <th className="p-2 border-r border-[#a9bbcf]">Tele Type</th>
                  <th className="p-2 border-r border-[#a9bbcf]">Churn Alert</th>
                  <th className="p-2">Default Account</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 bg-blue-50 font-medium">
                  <td className="p-2 font-mono text-blue-800">1511510579</td>
                  <td className="p-2">Individual</td>
                  <td className="p-2">Prepaid</td>
                  <td className="p-2 font-bold text-amber-700">Predeactivated</td>
                  <td className="p-2">Youth 3G</td>
                  <td className="p-2">4G</td>
                  <td className="p-2">NA</td>
                  <td className="p-2 font-mono">4000034085429</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Lower Sub-tabs Panel for Subscriber Info & SIM Management (Image 2) */}
          <div className="border border-[#b0c4de] rounded-sm bg-white flex flex-col flex-1 overflow-hidden">
            <div className="bg-[#d9e2ec] border-b border-[#a9bbcf] px-3 pt-1.5 flex items-end gap-1 overflow-x-auto">
              {[
                { id: 'info', label: 'Subscriber Info' },
                { id: 'offering', label: 'Offering' },
                { id: 'group', label: 'Group' },
                { id: 'history', label: 'Service No. History' },
                { id: 'payment', label: 'Payment Relation' },
                { id: 'status', label: 'Status History' },
                { id: 'contract', label: 'Contract' },
                { id: 'sim', label: 'SIM Management' },
                { id: 'business', label: 'Business Information' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSiActiveSubTab(tab.id as any)}
                  className={`px-3 py-1 text-xs font-semibold rounded-t border-t border-x cursor-pointer whitespace-nowrap ${
                    siActiveSubTab === tab.id ? 'bg-white text-blue-900 font-bold border-[#a9bbcf] border-b-white' : 'bg-[#e3ecf5] text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Subscriber Basic Info Grid (Exact layout from Image 2) */}
            <div className="p-4 bg-[#f0f4f8]">
              <div className="bg-white border border-[#b0c4de] rounded-sm p-4">
                <div className="font-bold text-blue-900 border-b border-gray-200 pb-2 mb-3">
                  Subscriber Basic Info &amp; SIM Profile
                </div>

                <div className="grid grid-cols-3 gap-y-3 gap-x-6 text-xs">
                  <div>
                    <span className="text-gray-500 block">Service No</span>
                    <strong className="font-mono text-blue-900 text-sm">1511510579</strong>
                  </div>

                  <div>
                    <span className="text-gray-500 block">SIM Card No (ICCID)</span>
                    <strong className="font-mono text-gray-800">89880040816058669359</strong>
                  </div>

                  <div>
                    <span className="text-gray-500 block">Status</span>
                    <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold">Predeactivated</span>
                  </div>

                  <div>
                    <span className="text-gray-500 block">Tele Type</span>
                    <strong>4G / USIM</strong>
                  </div>

                  <div>
                    <span className="text-gray-500 block">Payment Flag</span>
                    <strong>Prepaid</strong>
                  </div>

                  <div>
                    <span className="text-gray-500 block">Subscriber Type</span>
                    <strong>Individual</strong>
                  </div>

                  <div>
                    <span className="text-gray-500 block">SIM Item Code</span>
                    <strong className="font-mono">Sim card 64k</strong>
                  </div>

                  <div>
                    <span className="text-gray-500 block">MNP Status</span>
                    <strong className="text-green-700">No (Native Network)</strong>
                  </div>

                  <div>
                    <span className="text-gray-500 block">Contract Number</span>
                    <strong>Individual</strong>
                  </div>

                  <div>
                    <span className="text-gray-500 block">Brand</span>
                    <strong className="text-blue-700">TeleTalk</strong>
                  </div>

                  <div>
                    <span className="text-gray-500 block">SIM Card's PUK1</span>
                    <strong className="font-mono bg-gray-100 px-2 py-0.5 rounded border">88776655</strong>
                  </div>

                  <div>
                    <span className="text-gray-500 block">SIM Card's PUK2</span>
                    <strong className="font-mono bg-gray-100 px-2 py-0.5 rounded border">11223344</strong>
                  </div>

                  <div>
                    <span className="text-gray-500 block">Activation Time</span>
                    <span className="font-mono">2019-04-08 17:29:46</span>
                  </div>

                  <div>
                    <span className="text-gray-500 block">Latest Activation Time</span>
                    <span className="font-mono">2049-09-09 00:00:00</span>
                  </div>

                  <div>
                    <span className="text-gray-500 block">Effective Time</span>
                    <span className="font-mono">2019-04-08 12:26:11</span>
                  </div>

                  <div>
                    <span className="text-gray-500 block">SIM Card Type</span>
                    <span className="font-medium text-gray-800">Sim card 64K</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SCREEN C: SUSPEND AND BAR FORM (IMAGE 3) */}
      {viewMode === 'suspend-bar' && (
        <div className="flex-1 p-6 bg-white overflow-y-auto flex flex-col max-w-3xl mx-auto w-full space-y-4">
          <div className="border border-[#b0c4de] rounded-md shadow-md bg-white overflow-hidden">
            <div className="bg-gradient-to-r from-[#4b77b1] to-[#6f9fdc] px-4 py-2 text-white font-bold flex items-center justify-between">
              <span className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-yellow-300" />
                <span>Suspend and Bar Operations (Point of Sale)</span>
              </span>
              <span className="bg-yellow-400 text-gray-900 font-bold px-2 py-0.5 rounded text-[10px]">
                UNBAR / BAR CONTROL
              </span>
            </div>

            <form onSubmit={handleSuspendSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Service No *</label>
                  <input 
                    type="text" 
                    required
                    value={suspendForm.serviceNo}
                    onChange={(e) => setSuspendForm({ ...suspendForm, serviceNo: e.target.value })}
                    className="w-full border border-gray-300 px-3 py-1.5 rounded outline-none font-mono text-sm focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Current Status</label>
                  <input 
                    type="text" 
                    readOnly
                    value={suspendForm.status}
                    className="w-full border border-gray-300 px-3 py-1.5 rounded bg-gray-50 text-green-700 font-bold"
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
                    className="w-full border border-gray-300 px-3 py-1.5 rounded bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Operation Type *</label>
                  <select 
                    value={suspendForm.operationType}
                    onChange={(e) => setSuspendForm({ ...suspendForm, operationType: e.target.value })}
                    className="w-full border border-gray-300 px-3 py-1.5 rounded outline-none focus:border-blue-500 font-medium"
                  >
                    <option value="Customer Request Suspension">Customer Request Suspension</option>
                    <option value="Operator Suspension">Operator Suspension</option>
                    <option value="Unbar / Resume Service">Unbar / Resume Service</option>
                    <option value="Stolen & Lost Suspension">Stolen &amp; Lost Suspension</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Reason *</label>
                <select 
                  value={suspendForm.reason}
                  onChange={(e) => setSuspendForm({ ...suspendForm, reason: e.target.value })}
                  className="w-full border border-gray-300 px-3 py-1.5 rounded outline-none focus:border-blue-500"
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
                  placeholder="Enter remarks e.g. Lost"
                  className="w-full border border-gray-300 p-2 rounded outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-gray-200">
                <label className="flex items-center gap-1.5 font-semibold text-gray-700 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={suspendForm.enableResumeDate}
                    onChange={(e) => setSuspendForm({ ...suspendForm, enableResumeDate: e.target.checked })}
                    className="rounded text-blue-600"
                  />
                  <span>Schedule Automatic Resume Date</span>
                </label>

                {suspendForm.enableResumeDate && (
                  <input 
                    type="date"
                    value={suspendForm.resumeDate}
                    onChange={(e) => setSuspendForm({ ...suspendForm, resumeDate: e.target.value })}
                    className="border border-gray-300 px-2 py-1 rounded outline-none"
                  />
                )}
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setViewMode('workspace')}
                  className="px-5 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-1.5 bg-[#337ab7] hover:bg-[#286090] text-white rounded font-bold shadow-xs cursor-pointer"
                >
                  Next &gt;
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SCREEN D: REPORT LOST AND CANCEL REPORT FORM (IMAGE 4) */}
      {viewMode === 'report-lost' && (
        <div className="flex-1 p-6 bg-white overflow-y-auto flex flex-col max-w-3xl mx-auto w-full space-y-4">
          <div className="border border-[#b0c4de] rounded-md shadow-md bg-white overflow-hidden">
            <div className="bg-gradient-to-r from-[#4b77b1] to-[#6f9fdc] px-4 py-2 text-white font-bold flex items-center justify-between">
              <span>Report Lost and Cancel Report</span>
              <span className="bg-red-500 text-white font-bold px-2 py-0.5 rounded text-[10px]">
                LOST / STOLEN HANDLER
              </span>
            </div>

            <form onSubmit={handleLostSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Service No *</label>
                  <input 
                    type="text" 
                    required
                    value={lostForm.serviceNo}
                    onChange={(e) => setLostForm({ ...lostForm, serviceNo: e.target.value })}
                    className="w-full border border-gray-300 px-3 py-1.5 rounded outline-none font-mono text-sm focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Current Status</label>
                  <input 
                    type="text" 
                    readOnly
                    value={lostForm.status}
                    className="w-full border border-gray-300 px-3 py-1.5 rounded bg-gray-50 text-green-700 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Operation Type *</label>
                  <select 
                    value={lostForm.operationType}
                    onChange={(e) => setLostForm({ ...lostForm, operationType: e.target.value })}
                    className="w-full border border-gray-300 px-3 py-1.5 rounded outline-none focus:border-blue-500 font-medium"
                  >
                    <option value="Lost">Lost</option>
                    <option value="Stolen">Stolen</option>
                    <option value="Cancel Report">Cancel Report</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Reason *</label>
                  <select 
                    value={lostForm.reason}
                    onChange={(e) => setLostForm({ ...lostForm, reason: e.target.value })}
                    className="w-full border border-gray-300 px-3 py-1.5 rounded outline-none focus:border-blue-500"
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
                  placeholder="Enter remarks e.g. Lost"
                  className="w-full border border-gray-300 p-2 rounded outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setViewMode('workspace')}
                  className="px-5 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-1.5 bg-[#337ab7] hover:bg-[#286090] text-white rounded font-bold shadow-xs cursor-pointer"
                >
                  Next &gt;
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SCREEN E: BILL RUN MONITORING WORKFLOW DIAGRAM (IMAGE 5) */}
      {viewMode === 'bill-run' && (
        <div className="flex-1 flex flex-col p-4 bg-white overflow-y-auto space-y-4">
          <div className="text-xs text-gray-500 font-semibold flex items-center justify-between">
            <span>Invoicing &gt; Billing Configuration &gt; <strong className="text-blue-900">Bill Run Monitoring Workflow</strong></span>
            <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded font-bold border border-green-300">
              STATUS: BATCH EXECUTED SUCCESSFULLY
            </span>
          </div>

          {/* Sub tabs matching Image 5 top header */}
          <div className="bg-[#d9e2ec] border-b border-[#a9bbcf] px-3 pt-1.5 flex items-center gap-1">
            {[
              { id: 'report', label: 'Bill Report Query' },
              { id: 'query', label: 'Bill Query' },
              { id: 'error', label: 'View Error Message' },
              { id: 'decision', label: 'View Decision Log' },
              { id: 'rollback', label: 'One-click Rollback' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setBillRunTab(tab.id as any)}
                className={`px-3 py-1 text-xs font-semibold rounded-t border-t border-x cursor-pointer ${
                  billRunTab === tab.id ? 'bg-white text-blue-900 font-bold border-[#a9bbcf] border-b-white' : 'bg-[#e3ecf5] text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Workflow Canvas / Diagram Container (Exact replica of Image 5) */}
          <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-inner flex flex-col items-center justify-center min-h-[420px] overflow-x-auto">
            
            {/* Flow Nodes Diagram */}
            <div className="flex items-center gap-3 min-w-[1000px] py-8">
              
              {/* Start node */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-green-500 border-2 border-green-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
                  Start
                </div>
              </div>

              <div className="w-6 h-0.5 bg-gray-400"></div>

              {/* Node 1: Lite Bill Prepare */}
              <div className="border border-gray-300 rounded-md bg-white p-2.5 shadow-sm text-center w-36 relative">
                <div className="bg-green-100 text-green-800 text-[10px] font-bold px-1 rounded flex items-center justify-center gap-1 mb-1">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  <span>Used: 00:01:31</span>
                </div>
                <div className="text-[11px] font-bold text-gray-800">Lite Bill Prepare</div>
              </div>

              <div className="w-6 h-0.5 bg-gray-400"></div>

              {/* Node 2: Lite Bill Startup */}
              <div className="border border-gray-300 rounded-md bg-white p-2.5 shadow-sm text-center w-36 relative">
                <div className="bg-green-100 text-green-800 text-[10px] font-bold px-1 rounded flex items-center justify-center gap-1 mb-1">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  <span>Used: 00:10:29</span>
                </div>
                <div className="text-[11px] font-bold text-gray-800">Lite Bill Startup</div>
              </div>

              <div className="w-6 h-0.5 bg-gray-400"></div>

              {/* Node 3: Lite Bill Calculation */}
              <div className="border border-gray-300 rounded-md bg-white p-2.5 shadow-sm text-center w-36 relative">
                <div className="bg-green-100 text-green-800 text-[10px] font-bold px-1 rounded flex items-center justify-center gap-1 mb-1">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  <span>Used: 00:00:22</span>
                </div>
                <div className="text-[11px] font-bold text-gray-800">Lite Bill Calcul...</div>
              </div>

              <div className="w-6 h-0.5 bg-gray-400"></div>

              {/* Node 4: Lite Bill Generation */}
              <div className="border border-gray-300 rounded-md bg-white p-2.5 shadow-sm text-center w-36 relative">
                <div className="bg-green-100 text-green-800 text-[10px] font-bold px-1 rounded flex items-center justify-center gap-1 mb-1">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  <span>Used: 00:31:38</span>
                </div>
                <div className="text-[11px] font-bold text-gray-800">Lite Bill Gener...</div>
              </div>

              <div className="w-6 h-0.5 bg-gray-400"></div>

              {/* Node 5: Lite Bill Check */}
              <div className="border border-gray-300 rounded-md bg-white p-2.5 shadow-sm text-center w-36 relative">
                <div className="bg-green-100 text-green-800 text-[10px] font-bold px-1 rounded flex items-center justify-center gap-1 mb-1">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  <span>Used: 00:32:01</span>
                </div>
                <div className="text-[11px] font-bold text-gray-800">Lite Bill Check</div>
              </div>

              <div className="w-6 h-0.5 bg-gray-400"></div>

              {/* Node 6: Lite Bill Confirm & Branch */}
              <div className="flex flex-col items-center gap-4">
                <div className="border border-gray-300 rounded-md bg-white p-2.5 shadow-sm text-center w-36 relative">
                  <div className="bg-green-100 text-green-800 text-[10px] font-bold px-1 rounded flex items-center justify-center gap-1 mb-1">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                    <span>Used: 00:00:24</span>
                  </div>
                  <div className="text-[11px] font-bold text-gray-800">Lite Bill Confirm</div>
                </div>

                <div className="border border-gray-300 rounded-md bg-white p-2.5 shadow-sm text-center w-36 relative">
                  <div className="bg-green-100 text-green-800 text-[10px] font-bold px-1 rounded flex items-center justify-center gap-1 mb-1">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                    <span>Used: 00:01:39</span>
                  </div>
                  <div className="text-[11px] font-bold text-gray-800">Post Bill Run</div>
                </div>
              </div>

              <div className="w-6 h-0.5 bg-gray-400"></div>

              {/* End Node Branch */}
              <div className="flex flex-col items-center gap-4">
                <div className="border border-gray-300 rounded-md bg-white p-2.5 shadow-sm text-center w-36 relative">
                  <div className="bg-green-100 text-green-800 text-[10px] font-bold px-1 rounded flex items-center justify-center gap-1 mb-1">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                    <span>Used: &lt;1s</span>
                  </div>
                  <div className="text-[11px] font-bold text-gray-800">Update Billing ...</div>
                </div>

                <div className="w-10 h-10 rounded-full bg-red-500 border-2 border-red-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
                  End
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* SCREEN F: MATRIX OVERVIEW (HUAWEI CBS CATALOG GRID VIEW) */}
      {viewMode === 'matrix' && (
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          <div className="bg-[#e4ebf5] border border-[#a9bbcf] px-4 py-2 text-xs font-bold text-blue-900 rounded-sm flex items-center justify-between">
            <span>Inventory Management Overview Catalog</span>
            <span className="text-[11px] font-normal text-gray-500">CBS Inventory Module v3.6</span>
          </div>

          <div className="border border-[#b0c4de] rounded-sm shadow-xs overflow-hidden bg-white">
            {upcInventorySections.map((section, idx) => (
              <div key={section.title} className="border-b last:border-b-0 border-[#b0c4de]">
                <div className="bg-[#f0f4f8] px-4 py-2 text-xs font-bold text-blue-900 border-b border-[#b0c4de] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    <span>{section.title}</span>
                  </div>
                  <span className="text-[10px] text-gray-400">Section {idx + 1}</span>
                </div>

                <div className="p-4">
                  <div className="grid grid-cols-4 gap-4">
                    {section.items.map((item, itemIdx) => (
                      <div 
                        key={itemIdx}
                        onClick={() => {
                          setViewMode('workspace');
                          if (item.type !== 'ALL') {
                            setActiveTabType(item.type as any);
                          }
                          addToast(`Navigated to ${item.label}`, 'info');
                        }}
                        className="p-2.5 rounded-sm border border-gray-200 hover:border-blue-400 bg-gray-50/50 hover:bg-blue-50/60 transition-all cursor-pointer flex items-center justify-between group"
                      >
                        <span className="text-blue-700 font-medium group-hover:text-blue-900 group-hover:underline">
                          {item.label}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-700 transform group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SCREEN G: INTERACTIVE WORKSPACE (TREE + SEARCH + LIST + DETAILS) */}
      {viewMode === 'workspace' && (
        <div className="flex-1 flex overflow-hidden">
          
          {/* B1. LEFT RESOURCE / WAREHOUSE TREE */}
          <div className="w-64 bg-[#f0f4f8] border-r border-[#cbd6e2] flex flex-col">
            <div className="p-2.5 border-b border-[#cbd6e2] bg-[#e4ebf5] font-bold text-blue-900 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <FolderTree className="w-4 h-4 text-blue-700" />
                <span>Warehouse Hierarchy</span>
              </span>
              <button 
                onClick={() => setSelectedTreeNode('all')}
                className="text-[10px] text-blue-700 hover:underline cursor-pointer"
              >
                Reset Filter
              </button>
            </div>

            <div className="flex-1 p-2 overflow-y-auto space-y-1 text-xs">
              
              {/* Root node */}
              <div>
                <div 
                  onClick={() => {
                    setSelectedTreeNode('all');
                    toggleTreeNode('root');
                  }}
                  className={`flex items-center gap-1.5 px-2 py-1.5 rounded cursor-pointer ${
                    selectedTreeNode === 'all' ? 'bg-blue-100 text-blue-900 font-bold border border-blue-300' : 'hover:bg-[#e4ebf5] text-gray-700'
                  }`}
                >
                  <ChevronDown className={`w-3.5 h-3.5 transform transition-transform ${expandedNodes.includes('root') ? '' : '-rotate-90'}`} />
                  <span>🌐 All Inventory Warehouses</span>
                </div>

                {expandedNodes.includes('root') && (
                  <div className="ml-4 pl-2 border-l border-gray-300 space-y-1 mt-1">
                    
                    {/* Dhaka HQ */}
                    <div>
                      <div 
                        onClick={() => setSelectedTreeNode('dhaka')}
                        onContextMenu={(e) => {
                          e.preventDefault();
                          setContextMenuNode({ id: 'dhaka', x: e.clientX, y: e.clientY });
                        }}
                        className={`flex items-center justify-between px-2 py-1 rounded cursor-pointer ${
                          selectedTreeNode === 'dhaka' ? 'bg-blue-100 text-blue-900 font-bold border border-blue-300' : 'hover:bg-[#e4ebf5] text-gray-700'
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <span>🏬</span>
                          <span>Dhaka Central HQ</span>
                        </span>
                        <span className="text-[10px] text-gray-400 bg-gray-200 px-1 rounded">4</span>
                      </div>
                    </div>

                    {/* Chittagong */}
                    <div>
                      <div 
                        onClick={() => setSelectedTreeNode('chittagong')}
                        className={`flex items-center justify-between px-2 py-1 rounded cursor-pointer ${
                          selectedTreeNode === 'chittagong' ? 'bg-blue-100 text-blue-900 font-bold border border-blue-300' : 'hover:bg-[#e4ebf5] text-gray-700'
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <span>🏭</span>
                          <span>Chittagong Hub</span>
                        </span>
                        <span className="text-[10px] text-gray-400 bg-gray-200 px-1 rounded">1</span>
                      </div>
                    </div>

                    {/* Rajshahi */}
                    <div>
                      <div 
                        onClick={() => setSelectedTreeNode('rajshahi')}
                        className={`flex items-center justify-between px-2 py-1 rounded cursor-pointer ${
                          selectedTreeNode === 'rajshahi' ? 'bg-blue-100 text-blue-900 font-bold border border-blue-300' : 'hover:bg-[#e4ebf5] text-gray-700'
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <span>📦</span>
                          <span>Rajshahi Depot</span>
                        </span>
                        <span className="text-[10px] text-gray-400 bg-gray-200 px-1 rounded">1</span>
                      </div>
                    </div>

                    {/* E-SIM Vault */}
                    <div>
                      <div 
                        onClick={() => setSelectedTreeNode('esim')}
                        className={`flex items-center justify-between px-2 py-1 rounded cursor-pointer ${
                          selectedTreeNode === 'esim' ? 'bg-blue-100 text-blue-900 font-bold border border-blue-300' : 'hover:bg-[#e4ebf5] text-gray-700'
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <span>⚡</span>
                          <span>E-SIM Digital Vault</span>
                        </span>
                        <span className="text-[10px] text-gray-400 bg-gray-200 px-1 rounded">1</span>
                      </div>
                    </div>

                  </div>
                )}
              </div>

            </div>

            {/* Tree Context Menu (matching Image 2) */}
            {contextMenuNode && (
              <div 
                className="fixed bg-white border border-gray-300 shadow-lg rounded py-1 z-50 text-xs w-48"
                style={{ top: contextMenuNode.y, left: contextMenuNode.x }}
                onClick={() => setContextMenuNode(null)}
              >
                <div className="px-3 py-1 hover:bg-blue-50 text-gray-700 cursor-pointer" onClick={() => addToast('Fold action executed', 'info')}>Fold</div>
                <div className="px-3 py-1 hover:bg-blue-50 text-gray-700 cursor-pointer" onClick={() => addToast('Unlock action executed', 'info')}>Unlock</div>
                <div className="px-3 py-1 hover:bg-blue-50 text-gray-700 cursor-pointer" onClick={() => addToast('Suspend action executed', 'warning')}>Suspend</div>
                <div className="border-t border-gray-200 my-1"></div>
                <div className="px-3 py-1 hover:bg-blue-50 text-blue-800 font-semibold cursor-pointer" onClick={() => setIsCreateModalOpen(true)}>Create Version</div>
                <div className="px-3 py-1 hover:bg-blue-50 text-gray-700 cursor-pointer" onClick={() => addToast('Import wizard opened', 'info')}>Import</div>
                <div className="px-3 py-1 hover:bg-blue-50 text-gray-700 cursor-pointer" onClick={() => addToast('Exporting readable format...', 'success')}>Export in Readable Format</div>
              </div>
            )}

            <div className="p-2 border-t border-[#cbd6e2] bg-[#e4ebf5] text-[10px] text-gray-500">
              Selected Pool: <span className="font-bold text-gray-700">{selectedTreeNode.toUpperCase()}</span>
            </div>
          </div>

          {/* B2. MAIN INVENTORY SEARCH & TABLE WORKSPACE */}
          <div className="flex-1 flex flex-col overflow-y-auto bg-white">
            
            {/* SUB-RESOURCE TAB BAR */}
            <div className="bg-[#f0f4f8] border-b border-[#cbd6e2] px-4 pt-2 flex items-center justify-between">
              <div className="flex items-center gap-1">
                {[
                  { key: 'ALL', label: 'All Resources' },
                  { key: 'MSISDN', label: 'MSISDN Pool' },
                  { key: 'SIM/ICCID', label: 'SIM & ICCID' },
                  { key: 'Voucher', label: 'Vouchers & Cards' },
                  { key: 'Terminal', label: 'Terminals / CPE' }
                ].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTabType(tab.key as any)}
                    className={`px-3 py-1.5 rounded-t font-semibold border-t border-x cursor-pointer transition-all ${
                      activeTabType === tab.key
                        ? 'bg-white text-blue-900 border-[#cbd6e2] border-b-white font-bold'
                        : 'bg-[#e4ebf5] text-gray-600 border-transparent hover:bg-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="text-[11px] text-gray-500 pb-1">
                Showing {filteredItems.length} records
              </div>
            </div>

            <div className="p-4 space-y-4 flex-1">
              
              {/* SEARCH CRITERIA PANEL (HUAWEI CBS FORM STYLE) */}
              <div className="border border-[#b0c4de] rounded-sm bg-gradient-to-b from-[#f9fafb] to-white shadow-xs">
                
                <div className="bg-gradient-to-r from-[#e4ebf5] to-[#f0f4f8] px-4 py-1.5 border-b border-[#b0c4de] font-bold text-blue-900 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Filter className="w-3.5 h-3.5 text-blue-700" />
                    <span>Search Criteria</span>
                  </span>
                  <div className="flex items-center gap-2">
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
                </div>

                <div className="p-3 grid grid-cols-3 gap-x-6 gap-y-3">
                  
                  {/* Field 1: Resource ID / Code */}
                  <div className="flex items-center gap-2">
                    <label className="w-32 text-right text-gray-600 font-semibold">Resource ID / Name:</label>
                    <input
                      type="text"
                      value={searchId}
                      onChange={(e) => setSearchId(e.target.value)}
                      placeholder="e.g. 0155 / SIM / VCH..."
                      className="flex-1 border border-gray-300 px-2 py-1 bg-white rounded-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                    />
                  </div>

                  {/* Field 2: Status */}
                  <div className="flex items-center gap-2">
                    <label className="w-28 text-right text-gray-600 font-semibold">Status:</label>
                    <select
                      value={searchStatus}
                      onChange={(e) => setSearchStatus(e.target.value)}
                      className="flex-1 border border-gray-300 px-2 py-1 bg-white rounded-sm outline-none focus:border-blue-500"
                    >
                      <option value="ALL">-- All Statuses --</option>
                      <option value="Available">Available</option>
                      <option value="Allocated">Allocated</option>
                      <option value="Reserved">Reserved</option>
                      <option value="Active">Active</option>
                      <option value="Suspended">Suspended</option>
                      <option value="Quarantined">Quarantined</option>
                    </select>
                  </div>

                  {/* Field 3: Category */}
                  <div className="flex items-center gap-2">
                    <label className="w-28 text-right text-gray-600 font-semibold">Category:</label>
                    <select
                      value={searchCategory}
                      onChange={(e) => setSearchCategory(e.target.value)}
                      className="flex-1 border border-gray-300 px-2 py-1 bg-white rounded-sm outline-none focus:border-blue-500"
                    >
                      <option value="ALL">-- All Categories --</option>
                      <option value="Golden Number">Golden Number</option>
                      <option value="Silver Number">Silver Number</option>
                      <option value="Standard">Standard</option>
                      <option value="USIM 4G/5G">USIM 4G/5G</option>
                      <option value="eSIM">eSIM</option>
                      <option value="BDT 100 Card">BDT 100 Card</option>
                      <option value="BDT 500 Card">BDT 500 Card</option>
                      <option value="CPE Router">CPE Router</option>
                    </select>
                  </div>

                  {/* Field 4: Warehouse */}
                  <div className="flex items-center gap-2">
                    <label className="w-32 text-right text-gray-600 font-semibold">Warehouse:</label>
                    <select
                      value={searchWarehouse}
                      onChange={(e) => setSearchWarehouse(e.target.value)}
                      className="flex-1 border border-gray-300 px-2 py-1 bg-white rounded-sm outline-none focus:border-blue-500"
                    >
                      <option value="ALL">-- All Warehouses --</option>
                      <option value="Dhaka Central HQ Warehouse">Dhaka Central HQ</option>
                      <option value="Chittagong Regional Hub">Chittagong Hub</option>
                      <option value="Rajshahi Regional Warehouse">Rajshahi Depot</option>
                      <option value="Sylhet Regional Depot">Sylhet Depot</option>
                      <option value="E-SIM Digital Vault">E-SIM Digital Vault</option>
                    </select>
                  </div>

                  {/* Search Action Buttons */}
                  <div className="col-span-2 flex items-center justify-end gap-2 pt-1">
                    <button
                      onClick={() => addToast(`Searching inventory records (${filteredItems.length} found)...`, 'info')}
                      className="bg-[#337ab7] hover:bg-[#286090] text-white px-4 py-1 rounded-sm font-semibold border border-[#2e6da4] cursor-pointer shadow-xs flex items-center gap-1"
                    >
                      <Search className="w-3.5 h-3.5" />
                      <span>Search</span>
                    </button>

                    <button
                      onClick={handleSearchReset}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-1 rounded-sm font-semibold border border-gray-300 cursor-pointer"
                    >
                      Reset
                    </button>
                    
                    <button 
                      onClick={() => addToast('Advanced search fields expanded', 'info')}
                      className="text-blue-700 hover:underline ml-2 text-[11px]"
                    >
                      Advanced &gt;&gt;
                    </button>
                  </div>

                </div>

              </div>

              {/* RESULT LIST TABLE PANEL (MATCHING IMAGE 3) */}
              <div className="border border-[#b0c4de] rounded-sm bg-white shadow-xs overflow-hidden flex flex-col">
                
                {/* Table Header Controls */}
                <div className="bg-[#f0f4f8] px-4 py-2 border-b border-[#b0c4de] flex items-center justify-between">
                  <div className="font-bold text-blue-900 flex items-center gap-2">
                    <span>Result List</span>
                    {selectedIds.length > 0 && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-[10px]">
                        {selectedIds.length} selected
                      </span>
                    )}
                  </div>

                  {/* Action Bar Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewMode('suspend-bar')}
                      className="bg-amber-600 hover:bg-amber-700 text-white px-2 py-0.5 rounded-sm text-[11px] font-medium border border-amber-700 cursor-pointer flex items-center gap-1"
                    >
                      <ShieldAlert className="w-3 h-3" />
                      <span>Suspend / Bar</span>
                    </button>
                    <button
                      onClick={() => setViewMode('report-lost')}
                      className="bg-red-600 hover:bg-red-700 text-white px-2 py-0.5 rounded-sm text-[11px] font-medium border border-red-700 cursor-pointer flex items-center gap-1"
                    >
                      <FileText className="w-3 h-3" />
                      <span>Report Lost</span>
                    </button>
                    <button
                      onClick={() => handleBatchStatusChange('Available')}
                      className="bg-green-600 hover:bg-green-700 text-white px-2 py-0.5 rounded-sm text-[11px] font-medium border border-green-700 cursor-pointer"
                    >
                      Set Available
                    </button>
                    <button
                      onClick={handleBatchDelete}
                      className="bg-gray-700 hover:bg-gray-800 text-white px-2 py-0.5 rounded-sm text-[11px] font-medium border border-gray-800 flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Delete</span>
                    </button>
                    <button
                      onClick={() => addToast('Exported inventory records to CSV', 'success')}
                      className="bg-blue-700 hover:bg-blue-800 text-white px-2 py-0.5 rounded-sm text-[11px] font-medium border border-blue-800 flex items-center gap-1 cursor-pointer ml-2"
                    >
                      <FileSpreadsheet className="w-3 h-3" />
                      <span>Export</span>
                    </button>
                  </div>
                </div>

                {/* Table Data */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[900px]">
                    <thead>
                      <tr className="bg-[#e4ebf5] border-b border-[#a9bbcf] text-blue-950 font-bold text-[11px]">
                        <th className="p-2 border-r border-[#a9bbcf] w-8 text-center">
                          <input 
                            type="checkbox" 
                            onChange={handleSelectAll}
                            checked={filteredItems.length > 0 && selectedIds.length === filteredItems.length}
                          />
                        </th>
                        <th className="p-2 border-r border-[#a9bbcf]">Resource ID</th>
                        <th className="p-2 border-r border-[#a9bbcf]">Resource Name</th>
                        <th className="p-2 border-r border-[#a9bbcf]">Type</th>
                        <th className="p-2 border-r border-[#a9bbcf]">Category</th>
                        <th className="p-2 border-r border-[#a9bbcf]">Status</th>
                        {/* <th className="p-2 border-r border-[#a9bbcf]">Warehouse Location</th>
                        <th className="p-2 border-r border-[#a9bbcf]">Value / Amount</th> */}
                        <th className="p-2 border-r border-[#a9bbcf]">Created Date</th>
                        <th className="p-2 text-center">Operation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredItems.length === 0 ? (
                        <tr>
                          <td colSpan={10} className="p-8 text-center text-gray-500">
                            No inventory records found matching search criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredItems.map((item, index) => {
                          const isSelected = selectedIds.includes(item.id);
                          return (
                            <tr 
                              key={item.id} 
                              className={`border-b border-gray-200 text-xs transition-colors hover:bg-blue-50/50 ${
                                isSelected ? 'bg-blue-50' : index % 2 === 0 ? 'bg-white' : 'bg-[#f9fafb]'
                              }`}
                            >
                              <td className="p-2 border-r border-gray-200 text-center">
                                <input 
                                  type="checkbox" 
                                  checked={isSelected}
                                  onChange={() => handleSelectOne(item.id)}
                                />
                              </td>
                              <td className="p-2 border-r border-gray-200 font-mono font-medium text-blue-800">
                                {item.resourceId}
                              </td>
                              <td className="p-2 border-r border-gray-200 font-medium text-gray-900">
                                {item.name}
                              </td>
                              <td className="p-2 border-r border-gray-200">
                                <span className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded text-[10px] border border-gray-300">
                                  {item.type}
                                </span>
                              </td>
                              <td className="p-2 border-r border-gray-200 text-gray-700">
                                {item.category}
                              </td>
                              <td className="p-2 border-r border-gray-200">
                                <span className={`px-2 py-0.5 rounded-sm text-[10px] font-bold border ${
                                  item.status === 'Available' ? 'bg-green-100 text-green-800 border-green-300' :
                                  item.status === 'Active' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                                  item.status === 'Reserved' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                                  item.status === 'Allocated' ? 'bg-purple-100 text-purple-800 border-purple-300' :
                                  'bg-red-100 text-red-800 border-red-300'
                                }`}>
                                  {item.status}
                                </span>
                              </td>
                              {/* <td className="p-2 border-r border-gray-200 text-gray-600">
                                {item.warehouse}
                              </td>
                              <td className="p-2 border-r border-gray-200 font-semibold text-gray-800">
                                {item.valueOrAmount || 'N/A'}
                              </td> */}
                              <td className="p-2 border-r border-gray-200 text-gray-500 font-mono text-[11px]">
                                {item.createdDate}
                              </td>
                              <td className="p-2 text-center space-x-1">
                                <button
                                  onClick={() => setInspectingItem(item)}
                                  className="text-blue-700 hover:text-blue-900 p-1 hover:bg-blue-100 rounded cursor-pointer"
                                  title="View Full CBS Offering & Pricing Details"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => {
                                    setInspectingItem(item);
                                    addToast(`Editing record ${item.resourceId}`, 'info');
                                  }}
                                  className="text-gray-600 hover:text-gray-900 p-1 hover:bg-gray-200 rounded cursor-pointer"
                                  title="Edit Resource"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Footer */}
                <div className="bg-[#f0f4f8] px-4 py-2 border-t border-[#b0c4de] flex items-center justify-between text-xs text-gray-600">
                  <div className="flex items-center gap-3">
                    <span>Total records: <strong>{filteredItems.length}</strong></span>
                    <div className="flex items-center gap-1">
                      <span>Records/page:</span>
                      <select 
                        value={pageSize} 
                        onChange={(e) => setPageSize(Number(e.target.value))}
                        className="border border-gray-300 bg-white px-1 py-0.5 rounded text-xs"
                      >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button className="px-2 py-0.5 border border-gray-300 bg-white rounded disabled:opacity-50" disabled>|&lt;</button>
                    <button className="px-2 py-0.5 border border-gray-300 bg-white rounded disabled:opacity-50" disabled>&lt;</button>
                    <span className="px-2 font-bold text-blue-900">Page 1 of 1</span>
                    <button className="px-2 py-0.5 border border-gray-300 bg-white rounded disabled:opacity-50" disabled>&gt;</button>
                    <button className="px-2 py-0.5 border border-gray-300 bg-white rounded disabled:opacity-50" disabled>&gt;|</button>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      )}

      {/* 3. DETAIL INSPECTOR DRAWER / MODAL */}
      {inspectingItem && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-2xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-[#b0c4de] rounded-md shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-150">
            
            <div className="bg-gradient-to-r from-[#4b77b1] via-[#6f9fdc] to-[#4b77b1] px-4 py-2 text-white font-bold flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2">
                <span>📋 CBS Resource Details - {inspectingItem.resourceId}</span>
                <span className="bg-white/20 text-white px-2 py-0.5 rounded text-[10px] border border-white/30">
                  {inspectingItem.type}
                </span>
              </div>
              <button 
                onClick={() => setInspectingItem(null)}
                className="text-white/80 hover:text-white hover:bg-white/20 rounded p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-[#d9e2ec] border-b border-[#a9bbcf] px-4 pt-1.5 flex items-center gap-1">
              {[
                { id: 'basic', label: 'Basic Information' },
                { id: 'channels', label: 'Channels & Departments' },
                { id: 'charges', label: 'Recurring Charge & Free Bonus' },
                { id: 'history', label: 'Audit & Version Rules' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setDetailSubTab(tab.id as any)}
                  className={`px-3 py-1 text-xs font-semibold rounded-t border-t border-x cursor-pointer transition-all ${
                    detailSubTab === tab.id
                      ? 'bg-white text-blue-900 border-[#a9bbcf] border-b-white font-bold'
                      : 'bg-[#e3ecf5] text-gray-700 hover:bg-white border-transparent'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-5 overflow-y-auto flex-1 space-y-4 text-xs">
              {detailSubTab === 'basic' && (
                <div className="border border-[#b0c4de] rounded-sm bg-white overflow-hidden">
                  <div className="bg-[#f0f4f8] px-4 py-2 border-b border-[#b0c4de] font-bold text-gray-800 flex items-center justify-between">
                    <span>📎 Basic Information</span>
                    <span className="text-xs text-blue-700">Status: {inspectingItem.status}</span>
                  </div>

                  <div className="p-4 grid grid-cols-2 gap-x-8 gap-y-3">
                    <div className="flex items-center gap-2">
                      <label className="w-36 text-right text-gray-600 font-semibold">Offering / Resource ID</label>
                      <input type="text" value={inspectingItem.resourceId} className="flex-1 border border-gray-300 px-2 py-1 bg-gray-50 text-xs rounded-sm" readOnly />
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="w-36 text-right text-gray-600 font-semibold">Offering Name</label>
                      <input type="text" value={inspectingItem.name} className="flex-1 border border-gray-300 px-2 py-1 bg-gray-50 text-xs rounded-sm font-medium" readOnly />
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="w-36 text-right text-gray-600 font-semibold">Offering Short Name</label>
                      <input type="text" value={inspectingItem.shortName} className="flex-1 border border-gray-300 px-2 py-1 bg-gray-50 text-xs rounded-sm" readOnly />
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="w-36 text-right text-gray-600 font-semibold">Offering Code</label>
                      <input type="text" value={inspectingItem.code} className="flex-1 border border-gray-300 px-2 py-1 bg-gray-50 text-xs rounded-sm" readOnly />
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="w-36 text-right text-gray-600 font-semibold">Owner Type</label>
                      <input type="text" value={inspectingItem.ownerType} className="flex-1 border border-gray-300 px-2 py-1 bg-gray-50 text-xs rounded-sm" readOnly />
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="w-36 text-right text-gray-600 font-semibold">Payment Mode</label>
                      <input type="text" value={inspectingItem.paymentMode} className="flex-1 border border-gray-300 px-2 py-1 bg-gray-50 text-xs rounded-sm" readOnly />
                    </div>
                  </div>
                </div>
              )}

              {detailSubTab === 'charges' && (
                <div className="space-y-4">
                  <div className="border border-[#b0c4de] rounded-sm bg-white overflow-hidden">
                    <div className="bg-[#f0f4f8] px-4 py-2 border-b border-[#b0c4de] font-bold text-gray-800">
                      Free Unit Bonus Settings
                    </div>
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#e4ebf5] border-b border-[#a9bbcf] text-blue-950 font-bold">
                          <th className="p-2 border-r border-[#a9bbcf]">Free Unit Type</th>
                          <th className="p-2 border-r border-[#a9bbcf]">Bonus Amount</th>
                          <th className="p-2 border-r border-[#a9bbcf]">New Instance Flag</th>
                          <th className="p-2 border-r border-[#a9bbcf]">Span</th>
                          <th className="p-2">Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-200">
                          <td className="p-2 border-r border-gray-200 font-semibold text-blue-900">TeleTalk Gift Volume</td>
                          <td className="p-2 border-r border-gray-200 font-mono">4187593114 Bytes</td>
                          <td className="p-2 border-r border-gray-200">Create new instance</td>
                          <td className="p-2 border-r border-gray-200">168</td>
                          <td className="p-2 font-medium">Hour</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-[#f0f4f8] px-4 py-2 border-t border-[#b0c4de] flex items-center justify-end">
              <button 
                onClick={() => setInspectingItem(null)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-1 rounded text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. CREATE NEW RESOURCE MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-2xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-[#b0c4de] rounded-md shadow-xl w-full max-w-lg overflow-hidden">
            <div className="bg-gradient-to-r from-[#4b77b1] to-[#6f9fdc] px-4 py-2 text-white font-bold flex items-center justify-between">
              <span>➕ Add / Create New Inventory Item</span>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-4 space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Resource ID / Number *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. MS-0155000999 or SIM-8988099"
                  value={newItemData.resourceId || ''}
                  onChange={(e) => setNewItemData({ ...newItemData, resourceId: e.target.value })}
                  className="w-full border border-gray-300 px-2.5 py-1.5 rounded outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Resource Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Teletalk Special SIM"
                  value={newItemData.name || ''}
                  onChange={(e) => setNewItemData({ ...newItemData, name: e.target.value })}
                  className="w-full border border-gray-300 px-2.5 py-1.5 rounded outline-none"
                />
              </div>

              <div className="pt-3 border-t border-gray-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-1.5 bg-gray-200 text-gray-700 rounded font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 text-white rounded font-semibold"
                >
                  Create Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
