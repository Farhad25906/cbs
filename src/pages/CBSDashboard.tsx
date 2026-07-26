import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useTabStore } from '@/store/useTabStore';
import { useToastStore } from '@/store/useToastStore';
import ToastContainer from '@/components/ToastContainer';
import { useCRMStore } from '@/store/useCRMStore';
import { 
  Info, 
  ChevronRight, 
  Search, 
  Settings, 
  FolderTree, 
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  HelpCircle
} from 'lucide-react';

export default function CBSDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToast } = useToastStore();

  // Tab Store
  const openTabs = useTabStore((state) => state.openTabs);
  const activeTabId = useTabStore((state) => state.activeTabId);
  const addTab = useTabStore((state) => state.addTab);
  const closeTab = useTabStore((state) => state.closeTab);
  const setActiveTabId = useTabStore((state) => state.setActiveTabId);

  // Time & Sidebar state
  const [currentTime, setCurrentTime] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMiddleLoading, setIsMiddleLoading] = useState(false);

  // Sidebar items for CBS Site Map
  const cbsSidebarItems = [
    { name: 'Unified Product Catalog', path: '/cbs/site-map', id: 'site-map' },
    { name: 'Offering(B2C)', path: '/cbs/offering-b2c', id: 'offering-b2c' },
    { name: 'Eid_Special_Offer', path: '/cbs/eid-special-offer', id: 'eid-special-offer' },
    { name: 'Plan (BDC_Rent_oneoff)', path: '/cbs/bdc-rent-oneoff', id: 'bdc-rent-oneoff' },
    { name: 'Configure Offering', path: '/cbs/configure-offering', id: 'configure-offering' },
    { name: 'Cash Recharge Re...', path: '/cbs/cash-recharge', id: 'cash-recharge' },
    { name: 'Integration Query', path: '/cbs/integration-query', id: 'integration-query' },
    { name: 'Suspend and Bar', path: '/cbs/suspend-bar', id: 'suspend-bar' },
    { name: 'Report Lost & Cancel', path: '/cbs/report-lost', id: 'report-lost' },
    { name: 'Subscriber Info & SIM', path: '/cbs/subscriber-info', id: 'subscriber-info' },
    { name: 'Bill Run Monitoring', path: '/cbs/bill-run', id: 'bill-run' },
    { name: 'Real Billing', path: '/cbs/real-billing', id: 'real-billing' },
    { name: 'Reactivate Subscriber', path: '/cbs/reactivate-subscriber', id: 'reactivate-subscriber' },
    { name: 'Resource Inventory', path: '/cbs/inventory', id: 'inventory' }
  ];

  // Trigger middle UI loading animation on route transition
  useEffect(() => {
    setIsMiddleLoading(true);
    const timer = setTimeout(() => setIsMiddleLoading(false), 200);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Keep clock updated
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const pad = (n: number) => n.toString().padStart(2, '0');
      const yyyy = date.getFullYear();
      const mm = pad(date.getMonth() + 1);
      const dd = pad(date.getDate());
      const hh = pad(date.getHours());
      const min = pad(date.getMinutes());
      const ss = pad(date.getSeconds());
      setCurrentTime(`${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Sync route path with open tabs in store
  useEffect(() => {
    const path = location.pathname;
    if (path === '/cbs' || path === '/cbs/' || path.includes('/cbs/site-map')) {
      setActiveTabId('site-map');
    } else if (path.includes('/cbs/offering-b2c')) {
      addTab({ id: 'offering-b2c', name: 'Offering(B2C)', path, isClosable: true });
    } else if (path.includes('/cbs/eid-special-offer')) {
      addTab({ id: 'eid-special-offer', name: 'Eid_Special_Offer 🍃', path, isClosable: true });
    } else if (path.includes('/cbs/bdc-rent-oneoff')) {
      addTab({ id: 'bdc-rent-oneoff', name: 'BDC_Rent_oneoff', path, isClosable: true });
    } else if (path.includes('/cbs/configure-offering')) {
      addTab({ id: 'configure-offering', name: 'Configure Offering', path, isClosable: true });
    } else if (path.includes('/cbs/cash-recharge')) {
      addTab({ id: 'cash-recharge', name: 'Cash Recharge Re...', path, isClosable: true });
    } else if (path.includes('/cbs/integration-query')) {
      addTab({ id: 'integration-query', name: 'Integration Query', path, isClosable: true });
    } else if (path.includes('/cbs/suspend-bar')) {
      addTab({ id: 'suspend-bar', name: 'Suspend and Bar', path, isClosable: true });
    } else if (path.includes('/cbs/report-lost')) {
      addTab({ id: 'report-lost', name: 'Report Lost & Cancel', path, isClosable: true });
    } else if (path.includes('/cbs/subscriber-info')) {
      addTab({ id: 'subscriber-info', name: 'Subscriber Info', path, isClosable: true });
    } else if (path.includes('/cbs/bill-run')) {
      addTab({ id: 'bill-run', name: 'Bill Run Monitoring', path, isClosable: true });
    } else if (path.includes('/cbs/real-billing')) {
      addTab({ id: 'real-billing', name: 'Real Billing', path, isClosable: true });
    } else if (path.includes('/cbs/reactivate-subscriber')) {
      addTab({ id: 'reactivate-subscriber', name: 'Reactivate Subscriber', path, isClosable: true });
    } else if (path.includes('/cbs/inventory')) {
      addTab({ id: 'inventory', name: 'Inventory', path, isClosable: true, icon: '📦' });
    }
  }, [location.pathname, setActiveTabId, addTab]);

  const handleSidebarClick = (item: { name: string; path: string; id: string }) => {
    addTab({ id: item.id, name: item.name.replace(/\s*\(.*\)/, ''), path: item.path, isClosable: true });
    addToast(`Navigating to ${item.name}...`, 'info');
    navigate(item.path);
  };

  const getBreadcrumbs = () => {
    const path = location.pathname;
    if (path.includes('/cbs/eid-special-offer')) {
      return 'Unified Product Catalog > Catalogs > Offering(B2C) > Eid_Special_Offer 🍃';
    }
    if (path.includes('/cbs/bdc-rent-oneoff')) {
      return 'Unified Product Catalog > Catalogs > Plan > BDC_Rent_oneoff 🔒';
    }
    if (path.includes('/cbs/offering-b2c')) {
      return 'Unified Product Catalog > Catalogs > Offering(B2C)';
    }
    if (path.includes('/cbs/configure-offering')) {
      return 'Home > Product Catalog > Product Configuration > Configure Offering';
    }
    if (path.includes('/cbs/cash-recharge')) {
      return 'Cash Recharge / Reward Settings List Management';
    }
    if (path.includes('/cbs/integration-query')) {
      return 'Customer Care > Point of Sale > Integration Query';
    }
    if (path.includes('/cbs/suspend-bar')) {
      return 'Customer Care > Point of Sale > Suspend and Bar';
    }
    if (path.includes('/cbs/report-lost')) {
      return 'Customer Care > Point of Sale > Report Lost and Cancel Report';
    }
    if (path.includes('/cbs/subscriber-info')) {
      return 'Customer Care > Point of Sale > Subscriber Info & SIM Profile';
    }
    if (path.includes('/cbs/bill-run')) {
      return 'Home > Site Map > Real Billing > Bill Run Monitoring';
    }
    if (path.includes('/cbs/real-billing')) {
      return 'Invoicing > Bill Run Management > Real Billing';
    }
    if (path.includes('/cbs/reactivate-subscriber')) {
      return 'Customer Care > Subscriber Management > Reactivate Subscriber';
    }
    if (path.includes('/cbs/inventory')) {
      return 'Inventory Management > Resource Inventory Pool';
    }
    return 'Unified Product Catalog > Catalogs > Site Map';
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-gray-800 flex flex-col font-sans select-none">
      <ToastContainer />

      {/* 1. TOP HEADER BRAND BAR */}
      <div className="bg-gradient-to-r from-[#4b77b1] via-[#6f9fdc] to-[#4b77b1] border-b border-[#3b5e91] px-3 py-1 flex items-center justify-between text-white shadow-xs">
        <div className="flex items-center gap-3">
          {/* Huawei style Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/cbs/site-map')}>
            <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 50 C40 30, 20 40, 50 50 Z" fill="#e53935" />
              <path d="M50 50 C60 30, 80 40, 50 50 Z" fill="#e53935" />
              <path d="M50 50 C50 20, 40 10, 50 50 Z" fill="#e53935" />
              <path d="M50 50 C50 20, 60 10, 50 50 Z" fill="#e53935" />
              <path d="M50 50 C30 40, 15 60, 50 50 Z" fill="#e53935" />
              <path d="M50 50 C70 40, 85 60, 50 50 Z" fill="#e53935" />
              <path d="M50 50 C40 70, 30 90, 50 50 Z" fill="#e53935" />
              <path d="M50 50 C60 70, 70 90, 50 50 Z" fill="#e53935" />
              <circle cx="50" cy="50" r="8" fill="#ffffff" />
            </svg>
            <span className="text-xl font-bold tracking-tight text-white leading-none">CBS</span>
          </div>

          {/* Blue Dropdown Orb */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            title="Toggle Menu"
            className="w-4 h-4 rounded-full bg-[#337ab7] hover:bg-[#286090] flex items-center justify-center text-white border border-[#2e6da4] shadow-xs cursor-pointer ml-1"
          >
            <span className="text-[8px]">▼</span>
          </button>
        </div>

        {/* Right Info Controls */}
        <div className="flex items-center gap-4 text-[11px] text-blue-50 font-medium">
          <div className="flex items-center gap-1">
            <span className="text-blue-100">Project</span>
            <select className="border border-[#3b5e91] px-2 py-0.5 rounded-sm bg-white text-gray-800 text-[11px] h-6 outline-none focus:border-blue-400">
              <option value="tele_proj">Project</option>
            </select>
          </div>
          
          <div className="flex items-center gap-1.5 bg-[#3a6192]/40 px-2.5 py-1 rounded-md border border-[#3b5e91]">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span>Root (UTC+6, {currentTime || '2026-07-21 13:19:12'})</span>
            <Info className="w-3.5 h-3.5 text-blue-200 cursor-pointer hover:text-white" />
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-[#428bca] text-white px-2 py-0.5 rounded-sm text-[9px] font-bold border border-[#357ebd]">MVNE</span>
            <span className="text-yellow-200 font-semibold cursor-pointer hover:underline">benozir</span>
          </div>

          <button 
            onClick={() => {
              useCRMStore.getState().logout();
              navigate('/login');
            }} 
            className="flex items-center gap-1 bg-blue-700 hover:bg-blue-800 text-white px-2.5 py-1 rounded-sm border border-blue-800 transition-colors cursor-pointer"
          >
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* 2. TABS ROW */}
      <div className="bg-[#d9e2ec] border-b border-[#a9bbcf] px-3 pt-1.5 flex items-end justify-between shadow-xs">
        <div className="flex items-end gap-1 overflow-x-auto select-none">
          {openTabs.map((tab) => {
            const isActive = activeTabId === tab.id;
            return (
              <div
                key={tab.id}
                className={`group flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-t-md border-t border-x transition-all duration-150 relative ${
                  isActive
                    ? 'bg-white text-blue-950 border-[#a9bbcf] font-bold border-b-white z-10 shadow-2xs'
                    : 'bg-[#e3ecf5] hover:bg-white text-gray-700 border-transparent hover:border-gray-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => navigate(tab.path)}
                  className="flex items-center gap-1 cursor-pointer focus:outline-none"
                >
                  {tab.icon && <span className="text-[11px]">{tab.icon}</span>}
                  <span>{tab.name}</span>
                </button>

                {tab.isClosable !== false && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      closeTab(tab.id, navigate);
                    }}
                    className="ml-1 text-[10px] text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full w-3.5 h-3.5 flex items-center justify-center font-bold cursor-pointer"
                    title="Close Tab"
                  >
                    ×
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div className="pb-1 text-xs text-gray-500 flex items-center gap-1">
          <HelpCircle className="w-4 h-4 text-gray-400" />
          <span>Quick Help</span>
        </div>
      </div>

      {/* 3. BREADCRUMB TRAIL BAR */}
      <div className="bg-[#f8f9fa] border-b border-[#cfd2d7] px-4 py-1 text-[11px] text-gray-600 font-medium flex items-center justify-between select-none">
        <span>{getBreadcrumbs()}</span>
        <span className="text-gray-400 text-[10px]">CBS Unified Catalog v4.5</span>
      </div>

      {/* 4. DOUBLE SIDEBAR + MAIN AREA PANEL */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* A. Thin vertical utility icon bar */}
        <div className="w-[42px] bg-[#e4ebf5] border-r border-[#cbd6e2] flex flex-col items-center py-3 gap-3 shrink-0">
          <button
            onClick={() => navigate('/cbs/inventory')}
            className="w-7 h-7 rounded-md bg-white border border-[#cbd6e2] flex items-center justify-center text-blue-700 shadow-2xs cursor-pointer hover:scale-105 transition-transform"
            title="Search Inventory"
          >
            <Search className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => navigate('/cbs/site-map')}
            className="w-7 h-7 rounded-md bg-white border border-[#cbd6e2] flex items-center justify-center text-blue-700 shadow-2xs cursor-pointer hover:scale-105 transition-transform"
            title="Site Map Tree"
          >
            <FolderTree className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => navigate('/cbs/configure-offering')}
            className="w-7 h-7 rounded-md bg-white border border-[#cbd6e2] flex items-center justify-center text-gray-600 shadow-2xs cursor-pointer hover:scale-105 transition-transform"
            title="Catalog Settings"
          >
            <Settings className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* B. Dynamic Expandable Sidebar */}
        {isSidebarOpen && (
          <div className="w-60 bg-[#f0f4f8] border-r border-[#cbd6e2] flex flex-col justify-between shadow-2xs">
            <div className="flex-1 py-3 px-2 overflow-y-auto">
              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider px-3 mb-2 flex items-center justify-between">
                <span>CBS Navigation Menu</span>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="hover:bg-gray-200 p-0.5 rounded cursor-pointer text-gray-500"
                  title="Collapse Sidebar"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-0.5">
                {cbsSidebarItems.map((item, idx) => {
                  const isActive = location.pathname.includes(item.path);
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSidebarClick(item)}
                      className={`w-full text-left px-3 py-1.5 text-xs font-semibold rounded-md border transition-all duration-150 flex items-center justify-between cursor-pointer ${
                        isActive
                          ? 'bg-white border-[#cbd6e2] text-blue-950 shadow-2xs font-bold'
                          : 'border-transparent text-gray-600 hover:bg-[#e4ebf5] hover:text-gray-900'
                      }`}
                    >
                      <span className="truncate">{item.name}</span>
                      {isActive && <ChevronRight className="w-3.5 h-3.5 text-blue-700 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-3 border-t border-[#cbd6e2] bg-[#e4ebf5] text-[10px] text-gray-500 flex items-center justify-between">
              <span>CBS v3.6.8</span>
              <span>Huawei 2026</span>
            </div>
          </div>
        )}

        {/* Closed Sidebar Expand Button */}
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="absolute left-[42px] top-[140px] z-50 bg-[#e4ebf5] hover:bg-[#d6d8db] border-y border-r border-[#cbd6e2] p-1 rounded-r-md shadow-md cursor-pointer transition-colors"
            title="Expand Sidebar"
          >
            <ChevronRightIcon className="w-4 h-4 text-gray-600" />
          </button>
        )}

        {/* C. Middle Main Content Outlet Area */}
        <div className="flex-1 bg-white p-0 overflow-y-auto relative min-h-[450px]">
          {isMiddleLoading && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px] z-40 flex flex-col items-center justify-center transition-all duration-200">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent shadow-md mb-2"></div>
              <p className="text-xs font-semibold text-gray-700 tracking-wide animate-pulse">Loading Module View...</p>
            </div>
          )}
          <Outlet />
        </div>

      </div>

    </div>
  );
}
