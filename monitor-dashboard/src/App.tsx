import { Link, Route, Routes } from 'react-router-dom';
import { DashboardPage } from './pages/DashboardPage';
import { SensorsPage } from './pages/SensorsPage';

export const App = () => {
  return (
    <>
      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/sensors">Sensors</Link>
      </nav>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/sensors" element={<SensorsPage />} />
      </Routes>
    </>
  );
};
