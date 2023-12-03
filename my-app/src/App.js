import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RestaurantListPage from './pages/RestaurantListPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/restaurants" element={<RestaurantListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
