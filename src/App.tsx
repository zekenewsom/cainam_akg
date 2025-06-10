import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Overview from './pages/Overview';
import TokensAndTrading from './pages/TokensAndTrading';
import Insights from './pages/Insights';
import PortfolioRisk from './pages/PortfolioRisk';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Navigate to='/overview' replace />} />
        <Route path='overview' element={<Overview />} />
        <Route path='token' element={<TokensAndTrading />} />
        {/* We'll add the dynamic :address param later */}
        <Route path='token/:address' element={<TokensAndTrading />} />
        <Route path='insights' element={<Insights />} />
        <Route path='portfolio' element={<PortfolioRisk />} />
      </Route>
    </Routes>
  );
}

export default App;
