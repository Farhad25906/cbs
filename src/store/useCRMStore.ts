import { create } from 'zustand';

export interface Customer {
  id: string;
  name: string;
  mobile: string;
  type: 'Prepaid' | 'Postpaid';
  accountStatus: string;
  simStatus: string;
  iccid: string;
}

export interface Package {
  id: string;
  customerId: string;
  internet: string;
  voice: string;
  sms: string;
  bonusBalance: number;
  expiryDate: string;
}

export interface Balance {
  id: string;
  customerId: string;
  mainBalance: number;
  bonusBalance: number;
}

export interface RechargeHistory {
  id: string;
  customerId: string;
  date: string;
  amount: number;
}

export interface Order {
  id: string;
  customerId: string;
  type: string;
  status: string;
}

export interface Complaint {
  id: string;
  customerId: string;
  category: string;
  status: string;
}

export interface ChannelConfig {
  name: string;
  effectiveDate: string;
  expirationDate: string;
  enabled: boolean;
}

export interface OfferingConfig {
  id: string;
  name: string;
  shortName: string;
  code: string;
  type: string;
  paymentMode: string;
  status: string;
  validFrom: string;
  expiresAt: string;
  catalog: string;
  description: string;
  channels: ChannelConfig[];
}

interface CRMStore {
  customers: Customer[];
  packages: Package[];
  balances: Balance[];
  rechargeHistory: RechargeHistory[];
  orders: Order[];
  complaints: Complaint[];
  offerings: OfferingConfig[];
  currentCustomer: Customer | null;
  setCurrentCustomer: (customer: Customer | null) => void;
  searchCustomerByMobile: (mobile: string) => Customer | undefined;
  updateOffering: (id: string, updatedData: Partial<OfferingConfig>) => void;
  isLoggedIn: boolean;
  selectedSystem: 'cbs' | 'crm' | null;
  login: () => void;
  selectSystem: (system: 'cbs' | 'crm') => void;
  logout: () => void;
}

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Doe',
    mobile: '01712345678',
    type: 'Prepaid',
    accountStatus: 'Active',
    simStatus: 'Active',
    iccid: '8988012345678901234'
  },
  {
    id: '2',
    name: 'Jane Smith',
    mobile: '01812345678',
    type: 'Postpaid',
    accountStatus: 'Active',
    simStatus: 'Active',
    iccid: '8988012345678901235'
  }
];

const mockPackages: Package[] = [
  {
    id: '1',
    customerId: '1',
    internet: '10 GB',
    voice: '500 mins',
    sms: '200 SMS',
    bonusBalance: 50,
    expiryDate: '2026-08-20'
  }
];

const mockBalances: Balance[] = [
  {
    id: '1',
    customerId: '1',
    mainBalance: 150.50,
    bonusBalance: 25.75
  }
];

const mockRechargeHistory: RechargeHistory[] = [
  { id: '1', customerId: '1', date: '2026-07-15', amount: 100 },
  { id: '2', customerId: '1', date: '2026-07-05', amount: 50 }
];

const mockOrders: Order[] = [
  { id: 'ORD001', customerId: '1', type: 'SIM Replacement', status: 'Processing' },
  { id: 'ORD002', customerId: '1', type: 'Package Change', status: 'Completed' }
];

const mockComplaints: Complaint[] = [
  { id: 'CMP001', customerId: '1', category: 'Network Issue', status: 'Resolved' },
  { id: 'CMP002', customerId: '1', category: 'Billing Issue', status: 'Pending' }
];

const mockOfferings: OfferingConfig[] = [
  {
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
  },
  {
    id: '42446043',
    name: 'Boshonto_Offer',
    shortName: 'Boshonto_Offer',
    code: 'S49026',
    type: 'Supplementary',
    paymentMode: 'All',
    status: 'Release',
    validFrom: '2026-02-01 00:00:00',
    expiresAt: '2030-12-31 23:59:59',
    catalog: 'Catalogs',
    description: 'Spring festival promotional package with special voice and data rates.',
    channels: [
      { name: 'Third Party', effectiveDate: '2026-02-01 00:00:00', expirationDate: '2030-12-31 23:59:59', enabled: true },
      { name: 'Gallery', effectiveDate: '2026-02-01 00:00:00', expirationDate: '2030-12-31 23:59:59', enabled: true }
    ]
  },
  {
    id: '410009',
    name: 'Victory_Pack',
    shortName: 'Victory_Pack',
    code: 'S49027',
    type: 'Primary Offering',
    paymentMode: 'Prepaid',
    status: 'Release',
    validFrom: '2026-12-01 00:00:00',
    expiresAt: '2029-12-31 23:59:59',
    catalog: 'Catalogs',
    description: 'National victory day special package offering internet packs and minute bundles.',
    channels: [
      { name: 'SMS', effectiveDate: '2026-12-01 00:00:00', expirationDate: '2029-12-31 23:59:59', enabled: true }
    ]
  },
  {
    id: '470010',
    name: 'Pohela_Boishakh_Pack',
    shortName: 'Pohela_Boishakh',
    code: 'S49028',
    type: 'Supplementary',
    paymentMode: 'All',
    status: 'Release',
    validFrom: '2026-04-14 00:00:00',
    expiresAt: '2032-12-31 23:59:59',
    catalog: 'Catalogs',
    description: 'Bengali New Year special offer package.',
    channels: [
      { name: 'Gallery', effectiveDate: '2026-04-14 00:00:00', expirationDate: '2032-12-31 23:59:59', enabled: true }
    ]
  },
  {
    id: '480011',
    name: 'Monsoon_Data_Pack',
    shortName: 'Monsoon_Pack',
    code: 'S49029',
    type: 'Supplementary',
    paymentMode: 'Postpaid',
    status: 'Release',
    validFrom: '2026-06-01 00:00:00',
    expiresAt: '2030-08-31 23:59:59',
    catalog: 'Catalogs',
    description: 'Monsoon seasonal data volume package.',
    channels: [
      { name: 'Third Party', effectiveDate: '2026-06-01 00:00:00', expirationDate: '2030-08-31 23:59:59', enabled: true }
    ]
  }
];

export const useCRMStore = create<CRMStore>((set, get) => ({
  customers: mockCustomers,
  packages: mockPackages,
  balances: mockBalances,
  rechargeHistory: mockRechargeHistory,
  orders: mockOrders,
  complaints: mockComplaints,
  offerings: mockOfferings,
  currentCustomer: null,
  isLoggedIn: false,
  selectedSystem: 'cbs',
  setCurrentCustomer: (customer) => set({ currentCustomer: customer }),
  searchCustomerByMobile: (mobile) => {
    const { customers } = get();
    return customers.find(c => c.mobile === mobile);
  },
  updateOffering: (id, updatedData) => {
    set((state) => ({
      offerings: state.offerings.map((offering) =>
        offering.id === id ? { ...offering, ...updatedData } : offering
      )
    }));
  },
  login: () => {
    if (typeof localStorage !== 'undefined') localStorage.setItem('cbs_isLoggedIn', 'true');
    set({ isLoggedIn: true, selectedSystem: 'cbs' });
  },
  selectSystem: (system) => set({ selectedSystem: system }),
  logout: () => {
    if (typeof localStorage !== 'undefined') localStorage.setItem('cbs_isLoggedIn', 'false');
    set({ isLoggedIn: false, selectedSystem: null, currentCustomer: null });
  }
}));

