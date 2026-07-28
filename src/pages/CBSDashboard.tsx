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
  HelpCircle,
  User,
  LogOut,
  Bell,
  ChevronDown,
  ArrowLeft
} from 'lucide-react';
import logoImg from '@/assets/logo.png';

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
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
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

  // Load current user from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    } else {
      // Fallback - redirect to login if no user
      navigate('/');
    }
  }, [navigate]);

  // Adjust sidebar defaults: open on site-map, collapsed on detail forms
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/cbs/site-map')) {
      setIsSidebarOpen(true);
    } else {
      setIsSidebarOpen(false);
    }
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
      const urlParams = new URLSearchParams(path.split('?')[1] || '');
      const name = urlParams.get('name') || 'Eid_Special_Offer';
      const iconMap: Record<string, string> = {
        'Eid_Special_Offer': '🍃',
        'Boshonto_Offer': '🌸',
        'Victory_Pack': '🇧🇩',
        'Pohela_Boishakh_Pack': '🍎',
        'Monsoon_Data_Pack': '🌧️'
      };
      const icon = iconMap[name] || '🍃';
      addTab({ id: `offering-${name}`, name: `${name} ${icon}`, path, isClosable: true });
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

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    useCRMStore.getState().logout();
    navigate('/');
  };

  const getUserInitials = () => {
    if (!currentUser) return 'U';
    const name = currentUser.name || 'User';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const getBreadcrumbs = () => {
    const path = location.pathname;
    if (path.includes('/cbs/eid-special-offer')) {
      const urlParams = new URLSearchParams(path.split('?')[1] || '');
      const name = urlParams.get('name') || 'Eid_Special_Offer';
      const iconMap: Record<string, string> = {
        'Eid_Special_Offer': '🍃',
        'Boshonto_Offer': '🌸',
        'Victory_Pack': '🇧🇩',
        'Pohela_Boishakh_Pack': '🍎',
        'Monsoon_Data_Pack': '🌧️'
      };
      const icon = iconMap[name] || '🍃';
      return `Unified Product Catalog > Catalogs > Offering(B2C) > ${name} ${icon}`;
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

  // Check if user is logged in, if not show loading or redirect
  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-gray-800 flex flex-col font-sans select-none">
      <ToastContainer />

      {/* 1. TOP HEADER BRAND BAR */}
      <div className="bg-[#fcfdfd] border-b border-gray-300 px-4 py-1.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          {/* Logo from CBS assets */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/cbs/site-map')}>
            <img src={logoImg} alt="Teletalk Logo" className="h-8 object-contain" />
          </div>

          {/* Orange Dropdown Orb (Also toggles sidebar) */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            title="Toggle Sidebar Menu"
            className="w-5 h-5 rounded-full bg-[#f0ad4e] hover:bg-[#ec971f] flex items-center justify-center text-white shadow-xs cursor-pointer ml-1 transition-transform active:scale-95 border border-[#ec971f]"
          >
            <span className="text-[10px] text-white font-bold">▼</span>
          </button>
        </div>

        {/* Right Info Controls */}
        <div className="flex items-center gap-4 text-[11px] text-gray-600 font-medium">
          <div className="flex items-center gap-1">
            <span>Project</span>
            <select className="border border-gray-300 px-2 py-0.5 rounded-sm bg-white text-[11px] h-6 outline-none focus:border-cyan-500">
              <option value="teletalk">Teletalk Project</option>
              <option value="mvne">MVNE System</option>
            </select>
          </div>
          
          <div className="flex items-center gap-1.5 bg-gray-100 px-2.5 py-1 rounded-md border border-gray-200">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span>Root (UTC+6, {currentTime || '2026-07-21 13:19:12'})</span>
            <Info className="w-3.5 h-3.5 text-gray-400 cursor-pointer hover:text-gray-600" />
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-[#f0ad4e] text-white px-2 py-0.5 rounded-sm text-[9px] font-bold tracking-wider">MVNE</span>
            
            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded-md transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-[#2e7d32] text-white flex items-center justify-center text-xs font-bold">
                  {getUserInitials()}
                </div>
                <span className="text-[#c9302c] font-semibold">
                  {currentUser?.name || 'User'}
                </span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>

              {/* Dropdown Menu */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-800">{currentUser?.name || 'User'}</p>
                    <p className="text-xs text-gray-500">@{currentUser?.username || 'username'}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                      {currentUser?.role || 'User'}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      navigate('/cbs/site-map');
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    My Profile
                  </button>
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      navigate('/cbs/site-map');
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      navigate('/cbs/site-map');
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Bell className="w-4 h-4" />
                    Notifications
                  </button>
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        handleLogout();
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button 
            onClick={() => {
              handleLogout();
            }} 
            className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-sm border border-gray-300 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Switch System</span>
          </button>
        </div>
      </div>

      {/* 2. TABS ROW */}
      <div className="bg-[#e4e6e9] border-b border-gray-300 px-4 pt-1 flex items-end justify-between shadow-inner">
        <div className="flex items-end gap-1 overflow-x-auto select-none">
          {openTabs.map((tab) => {
            const isActive = activeTabId === tab.id;
            return (
              <div
                key={tab.id}
                className={`group flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-t-md border-t border-x transition-all duration-150 relative ${
                  isActive
                    ? 'bg-white text-[#c9302c] border-gray-300 font-bold border-b-white z-10 shadow-xs'
                    : 'bg-[#f4f5f7] hover:bg-white text-gray-700 border-transparent hover:border-gray-200 hover:text-gray-900 border-b-gray-300'
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
        <div className="w-[36px] bg-[#dfdfdf] border-r border-[#cfd2d7] flex flex-col items-center py-3 gap-3 shrink-0 select-none">
          {/* Orange User Avatar Orb */}
          <button
            onClick={() => navigate('/cbs/site-map')}
            className="w-6 h-6 rounded-full bg-[#f0ad4e] hover:bg-[#ec971f] flex items-center justify-center text-white font-bold text-xs shadow-xs cursor-pointer transition-transform active:scale-95 border border-[#ec971f]"
            title="User Profile"
          >
            <User className="w-3.5 h-3.5 text-white" />
          </button>

          {/* Search Magnifying Glass Icon Button */}
          <button
            onClick={() => navigate('/cbs/inventory')}
            className="w-6 h-6 rounded-md bg-transparent hover:bg-gray-300/70 flex items-center justify-center text-amber-700 cursor-pointer transition-colors"
            title="Search Inventory"
          >
            <Search className="w-3.5 h-3.5 text-amber-700" />
          </button>

          {/* Site Map Folder Tree Button */}
          <button
            onClick={() => navigate('/cbs/site-map')}
            className="w-6 h-6 rounded-md bg-transparent hover:bg-gray-300/70 flex items-center justify-center text-gray-700 cursor-pointer transition-colors"
            title="Site Map Tree"
          >
            <FolderTree className="w-3.5 h-3.5 text-gray-700" />
          </button>

          {/* Catalog Settings Button */}
          <button
            onClick={() => navigate('/cbs/configure-offering')}
            className="w-6 h-6 rounded-md bg-transparent hover:bg-gray-300/70 flex items-center justify-center text-gray-700 cursor-pointer transition-colors"
            title="Catalog Settings"
          >
            <Settings className="w-3.5 h-3.5 text-gray-700" />
          </button>
        </div>

        {/* B. Dynamic Expandable Sidebar */}
        {isSidebarOpen && (
          <div className="w-64 bg-[#f8f9fa] border-r border-gray-300 flex flex-col justify-between shadow-xs transition-all duration-300 animate-slide-in-left">
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

              <div className="space-y-1">
                {cbsSidebarItems.map((item, idx) => {
                  const isActive = location.pathname.includes(item.path);
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSidebarClick(item)}
                      className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-md border transition-all duration-150 flex items-center justify-between cursor-pointer ${
                        isActive
                          ? 'bg-white border-gray-300 text-gray-900 shadow-sm font-bold'
                          : 'border-transparent text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                      }`}
                    >
                      <span className="truncate">{item.name}</span>
                      {isActive && <ChevronRight className="w-3.5 h-3.5 text-red-500 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-3 border-t border-gray-200 bg-[#f1f3f5] text-[10px] text-gray-500 flex items-center justify-between">
              <span>CBS v3.6.8</span>
              <span>Huawei 2026</span>
            </div>
          </div>
        )}

        {/* Closed Sidebar Floating Button indicator */}
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="absolute left-[36px] top-[140px] z-50 bg-[#e4e6e9] hover:bg-[#d6d8db] border-y border-r border-gray-300 p-1 rounded-r-md shadow-md cursor-pointer transition-colors"
            title="Expand Sidebar"
          >
            <ChevronRightIcon className="w-4 h-4 text-gray-600" />
          </button>
        )}

        {/* C. Middle Main Content Outlet Area */}
        <div className="flex-1 bg-white p-0 overflow-y-auto relative min-h-[450px]">
          {isMiddleLoading && (
            <div className="absolute inset-0 bg-white/85 backdrop-blur-[1px] z-40 flex flex-col items-center justify-center transition-all duration-200">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent shadow-md mb-3"></div>
              <p className="text-xs font-semibold text-gray-700 tracking-wide animate-pulse">Loading Module View...</p>
            </div>
          )}
          <Outlet />
        </div>

      </div>

    </div>
  );
}
