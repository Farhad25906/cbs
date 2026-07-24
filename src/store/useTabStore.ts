import { create } from 'zustand';

export interface Tab {
  id: string;
  name: string;
  path: string;
  isClosable?: boolean;
  icon?: string;
}

interface TabStore {
  openTabs: Tab[];
  activeTabId: string;
  addTab: (tab: Tab) => void;
  closeTab: (tabId: string, navigate: (path: string) => void) => void;
  setActiveTabId: (id: string) => void;
  resetTabs: () => void;
}

const initialTabs: Tab[] = [
  { id: 'home', name: 'Home', path: '/cbs/home', isClosable: false, icon: '🏠' },
  { id: 'site-map', name: 'Site Map', path: '/cbs/site-map', isClosable: false },
  { id: 'offering-b2c', name: 'Offering(B2C)', path: '/cbs/offering-b2c', isClosable: true },
  { id: 'inventory', name: 'Inventory', path: '/cbs/inventory', isClosable: true, icon: '📦' }
];

export const useTabStore = create<TabStore>((set) => ({
  openTabs: initialTabs,
  activeTabId: 'site-map',
  
  addTab: (tab) => set((state) => {
    const exists = state.openTabs.some((t) => t.id === tab.id);
    const updatedTabs = exists 
      ? state.openTabs.map(t => t.id === tab.id ? { ...t, path: tab.path } : t)
      : [...state.openTabs, tab];
    return { 
      openTabs: updatedTabs, 
      activeTabId: tab.id 
    };
  }),
  
  closeTab: (tabId, navigate) => set((state) => {
    const tabToClose = state.openTabs.find(t => t.id === tabId);
    if (tabToClose && tabToClose.isClosable === false) {
      return {};
    }

    const filtered = state.openTabs.filter(t => t.id !== tabId);
    
    // If the closed tab was the active one, choose a new active tab and navigate to it
    if (state.activeTabId === tabId) {
      const index = state.openTabs.findIndex(t => t.id === tabId);
      const nextActiveTab = filtered[index] || filtered[index - 1] || filtered[0] || initialTabs[0];
      
      setTimeout(() => navigate(nextActiveTab.path), 0);
      return { 
        openTabs: filtered, 
        activeTabId: nextActiveTab.id 
      };
    }
    
    return { openTabs: filtered };
  }),
  
  setActiveTabId: (id) => set({ activeTabId: id }),
  
  resetTabs: () => set({ openTabs: initialTabs, activeTabId: 'site-map' })
}));
