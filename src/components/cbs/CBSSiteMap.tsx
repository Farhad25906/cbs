import { useNavigate } from 'react-router-dom';
import { useTabStore } from '@/store/useTabStore';
import { useToastStore } from '@/store/useToastStore';

export default function CBSSiteMap() {
  const navigate = useNavigate();
  const addTab = useTabStore((state) => state.addTab);
  const { addToast } = useToastStore();

  // Left sidebar categories (Image 4)
  const leftCategories = [
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

  const upcSections = [
    {
      title: 'Catalogs',
      columns: [
        [
          { name: 'Offering(B2C)', path: '/cbs/offering-b2c', tabId: 'offering-b2c' },
          { name: 'Product', path: '/cbs/offering-b2c', tabId: 'offering-b2c' },
          { name: 'Plan', path: '/cbs/bdc-rent-oneoff', tabId: 'bdc-rent-oneoff' }
        ],
        [
          { name: 'Policy Template', path: '/cbs/configure-offering', tabId: 'configure-offering' },
          { name: 'Brand', path: '/cbs/offering-b2c', tabId: 'offering-b2c' },
          { name: 'Sales Catalog', path: '/cbs/configure-offering', tabId: 'configure-offering' }
        ],
        [
          { name: 'Incentive', path: '/cbs/cash-recharge', tabId: 'cash-recharge' },
          { name: 'Simple Offering Template', path: '/cbs/eid-special-offer', tabId: 'eid-special-offer' },
          { name: 'Simple Offering', path: '/cbs/configure-offering', tabId: 'configure-offering' }
        ]
      ]
    },
    {
      title: 'Global Price',
      columns: [
        [{ name: 'Network Service', path: '/cbs/inventory', tabId: 'inventory' }],
        [{ name: 'Customer Service', path: '/cbs/inventory', tabId: 'inventory' }],
        [{ name: 'Special Number', path: '/cbs/inventory', tabId: 'inventory' }],
        [{ name: 'Tax', path: '/cbs/cash-recharge', tabId: 'cash-recharge' }]
      ]
    },
    {
      title: 'Global Business Rule',
      columns: [
        [
          { name: 'Consumption Limit', path: '/cbs/eid-special-offer', tabId: 'eid-special-offer' },
          { name: 'Notification', path: '/cbs/eid-special-offer', tabId: 'eid-special-offer' }
        ],
        [
          { name: 'Manage Status', path: '/cbs/offering-b2c', tabId: 'offering-b2c' },
          { name: 'Authentication', path: '/cbs/offering-b2c', tabId: 'offering-b2c' }
        ],
        [
          { name: 'Clear Resource', path: '/cbs/inventory', tabId: 'inventory' }
        ]
      ]
    },
    {
      title: 'Reference Data',
      columns: [
        [
          { name: 'Free Unit', path: '/cbs/bdc-rent-oneoff', tabId: 'bdc-rent-oneoff' },
          { name: '>>Free Unit Type', path: '/cbs/bdc-rent-oneoff', tabId: 'bdc-rent-oneoff' },
          { name: '>>Free Unit Payment Limit Type', path: '/cbs/bdc-rent-oneoff', tabId: 'bdc-rent-oneoff' },
          { name: '>>Free Unit Priority', path: '/cbs/bdc-rent-oneoff', tabId: 'bdc-rent-oneoff' },
          { name: 'Accumulator', path: '/cbs/integration-query', tabId: 'integration-query' },
          { name: '>>Accumulator Type', path: '/cbs/integration-query', tabId: 'integration-query' }
        ],
        [
          { name: '>>Accumulator Cycle', path: '/cbs/integration-query', tabId: 'integration-query' },
          { name: '>>Accumulator Type Reference', path: '/cbs/integration-query', tabId: 'integration-query' },
          { name: '>>Accumulator Scenario Rule', path: '/cbs/integration-query', tabId: 'integration-query' },
          { name: 'Account Balance', path: '/cbs/cash-recharge', tabId: 'cash-recharge' },
          { name: '>>Account Balance Type', path: '/cbs/cash-recharge', tabId: 'cash-recharge' },
          { name: '>>Account Balance Priority', path: '/cbs/cash-recharge', tabId: 'cash-recharge' }
        ],
        [
          { name: 'Policy Cycle', path: '/cbs/bdc-rent-oneoff', tabId: 'bdc-rent-oneoff' },
          { name: 'Time Schema', path: '/cbs/configure-offering', tabId: 'configure-offering' },
          { name: 'Notification', path: '/cbs/eid-special-offer', tabId: 'eid-special-offer' },
          { name: '>>Notification Template', path: '/cbs/eid-special-offer', tabId: 'eid-special-offer' },
          { name: '>>Notification Type', path: '/cbs/eid-special-offer', tabId: 'eid-special-offer' },
          { name: 'Policy Counter', path: '/cbs/bdc-rent-oneoff', tabId: 'bdc-rent-oneoff' }
        ],
        [
          { name: '>>Counter Define', path: '/cbs/bdc-rent-oneoff', tabId: 'bdc-rent-oneoff' },
          { name: '>>Counter Scenario', path: '/cbs/bdc-rent-oneoff', tabId: 'bdc-rent-oneoff' },
          { name: '>>Scenario Release', path: '/cbs/bdc-rent-oneoff', tabId: 'bdc-rent-oneoff' }
        ]
      ]
    },
    {
      title: 'Operation',
      columns: [
        [
          { name: 'Data Synchronization Status', path: '/cbs/inventory', tabId: 'inventory' },
          { name: 'Batch Data Synchronize', path: '/cbs/inventory', tabId: 'inventory' }
        ],
        [
          { name: 'Manage Locks', path: '/cbs/inventory', tabId: 'inventory' },
          { name: 'Trash', path: '/cbs/inventory', tabId: 'inventory' }
        ],
        [
          { name: 'Trash Logs', path: '/cbs/inventory', tabId: 'inventory' },
          { name: 'Batch Offering Release', path: '/cbs/offering-b2c', tabId: 'offering-b2c' }
        ]
      ]
    }
  ];

  const handleLinkClick = (item: { name: string; path: string; tabId: string }) => {
    addTab({
      id: item.tabId,
      name: item.name.replace(/\s*\(.*\)/, '').replace(/>>/g, ''),
      path: item.path,
      isClosable: true
    });
    addToast(`Opening ${item.name} in tab...`, 'info');
    navigate(item.path);
  };

  const handleCategoryClick = (category: string) => {
    // Map categories to paths
    const categoryMap: Record<string, { path: string; tabId: string }> = {
      'Unified Product Catalog': { path: '/cbs/site-map', tabId: 'site-map' },
      'Invoicing': { path: '/cbs/real-billing', tabId: 'real-billing' },
      'Billing Configuration': { path: '/cbs/bill-run', tabId: 'bill-run' },
      'Customer Care': { path: '/cbs/integration-query', tabId: 'integration-query' },
      'Inventory': { path: '/cbs/inventory', tabId: 'inventory' },
      'Accounts Receivable': { path: '/cbs/cash-recharge', tabId: 'cash-recharge' }
    };

    const target = categoryMap[category];
    if (target) {
      addTab({ id: target.tabId, name: category, path: target.path, isClosable: true });
      navigate(target.path);
      addToast(`Navigating to ${category}...`, 'info');
    } else {
      addToast(`${category} module — coming soon`, 'info');
    }
  };

  return (
    <div className="flex h-full bg-[#f3f4f6] text-gray-800 text-xs font-sans overflow-hidden">
      
      {/* Left Category Sidebar (Image 4) */}
      <div className="w-48 bg-[#f0f4f8] border-r border-[#cbd6e2] flex flex-col py-2 overflow-y-auto shrink-0">
        {leftCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`text-left px-4 py-2 text-xs font-medium border-b border-gray-200 hover:bg-[#e4ebf5] hover:text-blue-900 cursor-pointer transition-colors ${
              cat === 'Unified Product Catalog' ? 'bg-[#e4ebf5] text-blue-900 font-bold' : 'text-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col p-4 space-y-3 overflow-y-auto">
        {/* UPC Home Header */}
        <div className="bg-[#e4ebf5] border border-[#a9bbcf] px-4 py-2 text-xs font-bold text-blue-900 rounded-sm flex items-center justify-between">
          <span>UPC Home</span>
          <span className="text-[11px] text-gray-500 font-normal">Click any module to open in tab</span>
        </div>

        {/* Grid of Sections */}
        <div className="border border-[#b0c4de] rounded-sm shadow-xs overflow-hidden bg-white">
          {upcSections.map((section) => (
            <div key={section.title} className="border-b last:border-b-0 border-[#b0c4de]">
              {/* Section title header */}
              <div className="bg-[#f0f4f8] px-4 py-1.5 text-xs font-bold text-blue-900 border-b border-[#b0c4de]">
                <span>{section.title}</span>
              </div>

              {/* Section items in columns */}
              <div className="bg-white p-3">
                <div className={`grid gap-4 ${section.title === 'Reference Data' ? 'grid-cols-4' : 'grid-cols-4'}`}>
                  {section.columns.map((col, colIdx) => (
                    <div key={colIdx} className="space-y-1">
                      {col.map((item, itemIdx) => (
                        <div key={itemIdx} className="text-xs">
                          <button
                            type="button"
                            onClick={() => handleLinkClick(item)}
                            className={`hover:text-blue-900 hover:underline cursor-pointer text-left focus:outline-none ${
                              item.name.startsWith('>>') ? 'text-blue-600 pl-3' : 'text-blue-700 font-medium'
                            }`}
                          >
                            {item.name}
                          </button>
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
    </div>
  );
}
