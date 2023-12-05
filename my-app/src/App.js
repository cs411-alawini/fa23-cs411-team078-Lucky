import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import RestaurantListPage from "./pages/RestaurantListPage";
import RestaurantDetailPage from "./pages/RestaurantDetailPage";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route index element={<LoginPage />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/restaurants" element={<RestaurantListPage />} />
        <Route path="/restaurants/:id" element={<RestaurantDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
