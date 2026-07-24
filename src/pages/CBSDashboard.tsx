import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Info,
  ChevronRight,
  Search,
  Settings,
  FolderTree,
  ChevronDown,
  X,
  Plus
} from 'lucide-react';
import InventoryManagement from '@/pages/InventoryManagement';
import ToastContainer from '@/components/ToastContainer';
import { useCRMStore } from '@/store/useCRMStore';

// Tabs: Home, Site Map, Offering(B2C), Inventory
type HeaderTab = 'Home' | 'Site Map' | 'Offering(B2C)' | 'Inventory';

export default function CBSDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<HeaderTab>('Site Map');
  
  // Sidebar items for Site Map tab in CBS
  const cbsSidebarItems = [
    'Unified System Management',
    'Unified Product Catalog',
    'Invoicing',
    'Billing Configuration',
    'Accounts Receivable',
    'Customer Care',
    'General Ledger',
    'Inventory',
    'Task Scheduling Management',
    'NG OCG',
    'Emergency Maintenance Entry',
    'License',
    'Order Management'
  ];
  
  const [activeSidebarItem, setActiveSidebarItem] = useState<string>('Unified Product Catalog');
  const [currentTime, setCurrentTime] = useState('');

  // Keep the time updated like a real system
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      // Format: 2026-07-19 13:00:41
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

  const handleTabChange = (tab: HeaderTab) => {
    setActiveTab(tab);
    if (tab === 'Site Map') {
      setActiveSidebarItem('Unified Product Catalog');
    } else {
      setActiveSidebarItem('Home');
    }
  };

  // Unified Product Catalog Grid Data
  const upcSections = [
    {
      title: 'Catalogs',
      columns: [
        ['Offering(B2C)', 'Product', 'Plan'],
        ['Policy Template', 'Brand', 'Sales Catalog'],
        ['Incentive', 'Simple Offering Template', 'Simple Offering']
      ]
    },
    {
      title: 'Global Price',
      columns: [
        ['Network Service'],
        ['Customer Service'],
        ['Special Number'],
        ['Tax']
      ]
    },
    {
      title: 'Global Business Rule',
      columns: [
        ['Consumption Limit', 'Notification'],
        ['Manage Status', 'Authentication'],
        ['Clear Resource']
      ]
    },
    {
      title: 'Reference Data',
      columns: [
        ['Free Unit', '>>Free Unit Type', '>>Free Unit Payment Limit Type', '>>Free Unit Priority', 'Accumulator', '>>Accumulator Type'],
        ['>>Accumulator Cycle', '>>Accumulator Type Reference', '>>Accumulator Scenario Rule', 'Account Balance', '>>Account Balance Type', '>>Account Balance Priority'],
        ['Policy Cycle', 'Time Schema', 'Notification', '>>Notification Template', '>>Notification Type', 'Policy Counter'],
        ['>>Counter Define', '>>Counter Scenario', '>>Scenario Release']
      ]
    },
    {
      title: 'Operation',
      columns: [
        ['Data Synchronization Status', 'Batch Data Synchronize'],
        ['Manage Locks', 'Trash'],
        ['Trash Logs', 'Batch Offering Release']
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-gray-800 flex flex-col font-sans select-none">
      
      {/* 1. TOP HEADER BRAND BAR */}
      <div className="bg-gradient-to-r from-[#4b77b1] via-[#6f9fdc] to-[#4b77b1] border-b border-[#3b5e91] px-3 py-1 flex items-center justify-between text-white shadow-sm">
        <div className="flex items-center gap-3">
          {/* Huawei style Logo */}
          <div className="flex items-center gap-2">
            {/* Huawei Red flower shape SVG */}
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
          <button className="w-4 h-4 rounded-full bg-[#337ab7] hover:bg-[#286090] flex items-center justify-center text-white border border-[#2e6da4] shadow-xs cursor-pointer ml-1">
            <span className="text-[8px]">▼</span>
          </button>
        </div>

        {/* Right Info Controls */}
        <div className="flex items-center gap-5 text-[11px] text-blue-50 font-medium">
          <div className="flex items-center gap-1">
            <span className="text-blue-100">Project</span>
            <select className="border border-[#3b5e91] px-2 py-0.5 rounded-sm bg-white text-gray-800 text-[11px] h-6 outline-none focus:border-blue-400">
              <option value="tele_proj">Project</option>
            </select>
          </div>
          
          <div className="flex items-center gap-1.5 bg-[#3a6192]/40 px-2.5 py-1 rounded-md border border-[#3b5e91]">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span>Root (UTC+6, {currentTime || '2026-07-21 00:15:30'})</span>
            <Info className="w-3.5 h-3.5 text-blue-200 cursor-pointer hover:text-white" />
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-[#428bca] text-white px-2 py-0.5 rounded-sm text-[9px] font-bold border border-[#357ebd]">MVNE</span>
            <span className="text-yellow-200 font-semibold hover:underline cursor-pointer">benoir</span>
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

      {/* 2. TABS ROW (Home, Site Map, Offering(B2C), Inventory) */}
      <div className="bg-[#d9e2ec] border-b border-[#a9bbcf] px-3 pt-1.5 flex items-end justify-between shadow-xs">
        <div className="flex items-end gap-1 overflow-x-auto">
          {(['Home', 'Site Map', 'Offering(B2C)', 'Inventory'] as HeaderTab[]).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`group flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-t-md border-t border-x transition-all duration-150 relative cursor-pointer ${
                  isActive
                    ? 'bg-white text-blue-900 border-[#a9bbcf] font-bold border-b-white z-10'
                    : 'bg-[#e3ecf5] hover:bg-white text-gray-700 border-transparent hover:border-gray-300 border-b-[#a9bbcf]'
                }`}
              >
                {tab === 'Home' && <span className="text-[11px]">🏠</span>}
                {tab === 'Inventory' && <span className="text-[11px]">📦</span>}
                <span>{tab}</span>
                {(tab === 'Offering(B2C)' || tab === 'Inventory') && (
                  <span 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTabChange('Site Map');
                    }}
                    className="ml-1 text-[9px] bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-full w-3 h-3 flex items-center justify-center font-bold"
                  >
                    ×
                  </span>
                )}
              </button>
            );
          })}
        </div>
        
        <div className="pb-1 text-xs text-gray-500 flex items-center gap-1">
          <span className="cursor-pointer hover:text-gray-700">📋</span>
          <span className="cursor-pointer hover:text-gray-700">🔄</span>
        </div>
      </div>

      {/* 3. DOUBLE SIDEBAR + MAIN AREA PANEL */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* A. Vertical thin utility icon bar */}
        <div className="w-[45px] bg-[#e4ebf5] border-r border-[#cbd6e2] flex flex-col items-center py-4 gap-4">
          <div className="w-8 h-8 rounded-lg bg-white border border-[#cbd6e2] flex items-center justify-center text-blue-600 shadow-xs cursor-pointer hover:scale-105 transition-transform">
            <Search className="w-4 h-4" />
          </div>
          <div className="w-8 h-8 rounded-lg bg-white border border-[#cbd6e2] flex items-center justify-center text-blue-600 shadow-xs cursor-pointer hover:scale-105 transition-transform">
            <FolderTree className="w-4 h-4" />
          </div>
          <div className="w-8 h-8 rounded-lg bg-white border border-[#cbd6e2] flex items-center justify-center text-gray-500 cursor-pointer hover:scale-105 transition-transform">
            <Settings className="w-4 h-4" />
          </div>
        </div>

        {/* B. Main Sidebar Pane (Dynamic based on selected header tab) */}
        <div className="w-64 bg-[#f0f4f8] border-r border-[#cbd6e2] flex flex-col justify-between">
          <div className="flex-1 py-3 px-2 overflow-y-auto">
            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider px-3 mb-2">
              {activeTab} Menu
            </div>
            
            {activeTab === 'Site Map' ? (
              // Site Map sidebar items
              <div className="space-y-0.5">
                {cbsSidebarItems.map((item) => {
                  const isActive = activeSidebarItem === item;
                  return (
                    <button
                      key={item}
                      onClick={() => setActiveSidebarItem(item)}
                      className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-md border transition-all duration-150 flex items-center justify-between cursor-pointer ${
                        isActive
                          ? 'bg-white border-[#cbd6e2] text-blue-900 shadow-xs font-bold'
                          : 'border-transparent text-gray-600 hover:bg-[#e4ebf5] hover:text-gray-900'
                      }`}
                    >
                      <span>{item}</span>
                      {isActive && <ChevronRight className="w-3.5 h-3.5 text-blue-700" />}
                    </button>
                  );
                })}
              </div>
            ) : (
              // Other tabs show only "Home" button
              <div className="space-y-1">
                <button
                  onClick={() => setActiveSidebarItem('Home')}
                  className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-md border transition-all duration-150 flex items-center justify-between cursor-pointer ${
                    activeSidebarItem === 'Home'
                      ? 'bg-white border-[#cbd6e2] text-blue-900 shadow-xs font-bold'
                      : 'border-transparent text-gray-600 hover:bg-[#e4ebf5] hover:text-gray-900'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    🏠 Home
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-blue-700" />
                </button>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-[#cbd6e2] bg-[#e4ebf5] text-[10px] text-gray-500 flex items-center justify-between">
            <span>CBS v3.6.8</span>
            <span>Huawei 2026</span>
          </div>
        </div>

        {/* C. Middle Main Content Area */}
        <div className="flex-1 bg-white p-0 overflow-y-auto flex flex-col">
          {activeTab === 'Inventory' || (activeTab === 'Site Map' && activeSidebarItem === 'Inventory') ? (
            <InventoryManagement />
          ) : activeTab === 'Site Map' && activeSidebarItem === 'Unified Product Catalog' ? (
            // 4. MAIN WORKSPACE FOR SITE MAP -> UNIFIED PRODUCT CATALOG
            <div className="space-y-4">
              
              {/* UPC Home Top Bar */}
              <div className="bg-[#e4ebf5] border border-[#a9bbcf] px-4 py-2 text-xs font-bold text-blue-900 rounded-sm">
                UPC Home
              </div>

              {/* Grid of Sections */}
              <div className="border border-[#b0c4de] rounded-sm shadow-xs overflow-hidden">
                {upcSections.map((section) => (
                  <div key={section.title} className="border-b last:border-b-0 border-[#b0c4de]">
                    
                    {/* Section title header */}
                    <div className="bg-[#f0f4f8] px-4 py-1.5 text-xs font-bold text-blue-900 border-b border-[#b0c4de]">
                      <span>{section.title}</span>
                    </div>

                    {/* Section items in columns/rows */}
                    <div className="bg-white p-3">
                      <div className="grid grid-cols-4 gap-4">
                        {section.columns.map((col, colIdx) => (
                          <div key={colIdx} className="space-y-1.5">
                            {col.map((item, itemIdx) => (
                              <div key={itemIdx} className="text-xs">
                                <a 
                                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} 
                                  className="text-blue-700 hover:text-blue-900 hover:underline cursor-pointer"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    alert(`Navigate to: ${item}`);
                                  }}
                                >
                                  {item}
                                </a>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          ) : activeTab === 'Offering(B2C)' ? (
            // 5. DETAILED SPECIAL OFFER FORM FOR OFFERING(B2C)
            <div className="space-y-6">
              
              <div className="bg-gradient-to-r from-blue-50 to-white border border-[#b0c4de] rounded-sm shadow-xs">
                
                {/* Basic Information section */}
                <div className="border-b border-[#b0c4de]">
                  <div className="bg-gradient-to-r from-[#e4ebf5] to-white px-4 py-2 text-xs font-bold text-gray-800 border-b border-[#b0c4de] flex items-center justify-between">
                    <span>📎 Basic Information</span>
                    <button className="text-xs text-blue-700 hover:underline">✏️ Edit</button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3 p-4 text-xs">
                    <div className="flex items-center gap-2">
                      <label className="w-36 text-right text-gray-600 font-semibold">Offering ID</label>
                      <div className="flex items-center gap-2 flex-1">
                        <input type="text" value="47062" className="border border-gray-300 px-2 py-1 bg-gray-50 text-xs w-48 rounded-sm outline-none" readOnly />
                        <button className="text-xs text-gray-500 hover:text-gray-700">🔍</button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="w-36 text-right text-gray-600 font-semibold">Offering Name</label>
                      <div className="flex items-center gap-2 flex-1">
                        <input type="text" value="Ed_Special_Offer" className="border border-gray-300 px-2 py-1 bg-gray-50 text-xs w-48 rounded-sm outline-none font-medium text-gray-800" readOnly />
                        <button className="text-xs text-gray-500 hover:text-gray-700">✏️</button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="w-36 text-right text-gray-600 font-semibold">Notification Name</label>
                      <div className="flex items-center gap-2 flex-1">
                        <input type="text" value="✓" className="border border-gray-300 px-2 py-1 bg-gray-50 text-xs w-48 rounded-sm outline-none text-green-700 font-bold" readOnly />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="w-36 text-right text-gray-600 font-semibold">Offering Short Name</label>
                      <div className="flex items-center gap-2 flex-1">
                        <input type="text" value="Ed_Special_Offer" className="border border-gray-300 px-2 py-1 bg-gray-50 text-xs w-48 rounded-sm outline-none text-gray-800" readOnly />
                        <button className="text-xs text-gray-500 hover:text-gray-700">✏️</button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="w-36 text-right text-gray-600 font-semibold">Offering Code</label>
                      <div className="flex items-center gap-2 flex-1">
                        <input type="text" value="549023" className="border border-gray-300 px-2 py-1 bg-gray-50 text-xs w-48 rounded-sm outline-none" readOnly />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="w-36 text-right text-gray-600 font-semibold">Subscription Offering Type</label>
                      <div className="flex items-center gap-2 flex-1">
                        <input type="text" value="Supplementary" className="border border-gray-300 px-2 py-1 bg-gray-50 text-xs w-48 rounded-sm outline-none" readOnly />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="w-36 text-right text-gray-600 font-semibold">Offering Status</label>
                      <div className="flex items-center gap-2 flex-1">
                        <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-sm border border-green-200 font-medium">Release</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <label className="w-36 text-right text-gray-600 font-semibold mt-1">Description</label>
                      <div className="flex-1">
                        <textarea className="border border-gray-300 px-2 py-1 bg-gray-50 text-xs w-full h-16 rounded-sm outline-none resize-none" readOnly placeholder="Enter Special Offer Description..." />
                        <button className="text-xs text-gray-500 hover:text-gray-700 float-right mt-1">✏️ Edit</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Offering Value section */}
                <div className="border-b border-[#b0c4de]">
                  <div className="bg-gradient-to-r from-[#e4ebf5] to-white px-4 py-2 text-xs font-bold text-gray-800 border-b border-[#b0c4de] flex items-center justify-between">
                    <span>📎 Offering Value</span>
                    <button className="text-xs text-blue-700 hover:underline">✏️ Edit</button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3 p-4 text-xs">
                    <div className="flex items-center gap-2">
                      <label className="w-36 text-right text-gray-600 font-semibold">Owner Type</label>
                      <div className="flex items-center gap-2 flex-1">
                        <select className="border border-gray-300 px-2 py-1 bg-white text-xs w-48 rounded-sm outline-none" disabled>
                          <option>Subscriber</option>
                        </select>
                        <button className="text-xs text-gray-500 hover:text-gray-700">✏️</button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="w-36 text-right text-gray-600 font-semibold">Group Offering Type</label>
                      <div className="flex items-center gap-2 flex-1">
                        <select className="border border-gray-300 px-2 py-1 bg-white text-xs w-48 rounded-sm outline-none" disabled>
                          <option>Individual offering</option>
                        </select>
                        <button className="text-xs text-gray-500 hover:text-gray-700">✏️</button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="w-36 text-right text-gray-600 font-semibold">Payment Mode</label>
                      <div className="flex items-center gap-2 flex-1">
                        <select className="border border-gray-300 px-2 py-1 bg-white text-xs w-48 rounded-sm outline-none" disabled>
                          <option>All</option>
                        </select>
                        <button className="text-xs text-gray-500 hover:text-gray-700">✏️</button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="w-36 text-right text-gray-600 font-semibold">Customer Type</label>
                      <div className="flex items-center gap-2 flex-1">
                        <select className="border border-gray-300 px-2 py-1 bg-white text-xs w-48 rounded-sm outline-none" disabled>
                          <option>Individual customer</option>
                        </select>
                        <button className="text-xs text-gray-500 hover:text-gray-700">✏️</button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="w-36 text-right text-gray-600 font-semibold">Network Type</label>
                      <div className="flex items-center gap-2 flex-1">
                        <select className="border border-gray-300 px-2 py-1 bg-white text-xs w-48 rounded-sm outline-none" disabled>
                          <option>Unspecified</option>
                        </select>
                        <button className="text-xs text-gray-500 hover:text-gray-700">✏️</button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="w-36 text-right text-gray-600 font-semibold">Offering Type</label>
                      <div className="flex items-center gap-2 flex-1">
                        <select className="border border-gray-300 px-2 py-1 bg-white text-xs w-48 rounded-sm outline-none" disabled>
                          <option>Simple offering</option>
                        </select>
                        <button className="text-xs text-gray-500 hover:text-gray-700">✏️</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Extended Information section */}
                <div className="bg-[#f0f4f8] px-4 py-2 text-xs font-bold text-gray-800 flex items-center gap-2 cursor-pointer hover:bg-gray-100">
                  <span>🔍</span>
                  <span>Extended Information</span>
                </div>

              </div>

            </div>
          ) : (
            // 6. COMING SOON VIEW FOR OTHER SELECTIONS
            <div className="h-full flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center border border-blue-200 text-blue-500 mb-4 animate-bounce">
                ⚙️
              </div>
              <h3 className="text-lg font-bold text-gray-850 mb-1">Coming Soon</h3>
              <p className="text-xs text-gray-500 max-w-sm mb-6">
                The section <strong className="text-gray-700">"{activeSidebarItem}"</strong> under tab <strong className="text-gray-700">"{activeTab}"</strong> is currently in development.
              </p>
              <button 
                onClick={() => handleTabChange('Site Map')} 
                className="bg-[#4b77b1] hover:bg-[#3b6090] text-white text-xs font-bold px-4 py-2 rounded shadow-xs hover:shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Go to Site Map</span>
              </button>
            </div>
          )}
        </div>

      </div>

      <ToastContainer />
    </div>
  );
}
