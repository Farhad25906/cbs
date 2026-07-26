import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '@/pages/Login';
import CBSDashboard from '@/pages/CBSDashboard';
import CBSSiteMap from '@/components/cbs/CBSSiteMap';
import OfferingB2CView from '@/components/cbs/OfferingB2CView';
import OfferingDetailView from '@/components/cbs/OfferingDetailView';
import PlanDetailView from '@/components/cbs/PlanDetailView';
import ConfigureOfferingView from '@/components/cbs/ConfigureOfferingView';
import CashRechargeView from '@/components/cbs/CashRechargeView';
import IntegrationQueryView from '@/components/cbs/IntegrationQueryView';
import SuspendBarView from '@/components/cbs/SuspendBarView';
import ReportLostView from '@/components/cbs/ReportLostView';
import SubscriberInfoView from '@/components/cbs/SubscriberInfoView';
import BillRunView from '@/components/cbs/BillRunView';
import RealBillingView from '@/components/cbs/RealBillingView';
import ReactivateSubscriberView from '@/components/cbs/ReactivateSubscriberView';
import InventoryManagement from '@/pages/InventoryManagement';
import { useCRMStore } from '@/store/useCRMStore';

export default function App() {
  const isLoggedIn = useCRMStore((state) => state.isLoggedIn);

  return (
    <Router>
      {!isLoggedIn ? (
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/cbs" element={<CBSDashboard />}>
            <Route index element={<Navigate to="site-map" replace />} />
            <Route path="site-map" element={<CBSSiteMap />} />
            <Route path="offering-b2c" element={<OfferingB2CView />} />
            <Route path="eid-special-offer" element={<OfferingDetailView />} />
            <Route path="bdc-rent-oneoff" element={<PlanDetailView />} />
            <Route path="configure-offering" element={<ConfigureOfferingView />} />
            <Route path="cash-recharge" element={<CashRechargeView />} />
            <Route path="integration-query" element={<IntegrationQueryView />} />
            <Route path="suspend-bar" element={<SuspendBarView />} />
            <Route path="report-lost" element={<ReportLostView />} />
            <Route path="subscriber-info" element={<SubscriberInfoView />} />
            <Route path="bill-run" element={<BillRunView />} />
            <Route path="real-billing" element={<RealBillingView />} />
            <Route path="reactivate-subscriber" element={<ReactivateSubscriberView />} />
            <Route path="inventory" element={<InventoryManagement />} />
            <Route path="inventory/:moduleSlug" element={<InventoryManagement />} />
          </Route>

          <Route path="/inventory" element={<Navigate to="/cbs/inventory" replace />} />
          <Route path="*" element={<Navigate to="/cbs/site-map" replace />} />
        </Routes>
      )}
    </Router>
  );
}
