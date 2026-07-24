import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '@/pages/Login';
import CBSDashboard from '@/pages/CBSDashboard';
import { useCRMStore } from '@/store/useCRMStore';

export default function App() {
  const isLoggedIn = useCRMStore((state) => state.isLoggedIn);

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={!isLoggedIn ? <Login /> : <Navigate to="/" replace />} 
        />
        <Route 
          path="/" 
          element={isLoggedIn ? <CBSDashboard /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/cbs/*" 
          element={isLoggedIn ? <CBSDashboard /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/inventory" 
          element={isLoggedIn ? <CBSDashboard /> : <Navigate to="/login" replace />} 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
