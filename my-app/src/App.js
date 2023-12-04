import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RestaurantListPage from "./pages/RestaurantListPage";
import RestaurantDetailPage from "./pages/RestaurantDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route index element={<LoginPage />} /> */}
        <Route path="/restaurants" element={<RestaurantListPage />} />
        <Route path="/restaurants/:id" element={<RestaurantDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
