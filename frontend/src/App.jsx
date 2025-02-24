import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./pages/DashboardLayout";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import UserList from "./components/UserList";
import ProductList from "./components/ProductList";
import Signup from "./components/Signup";
import FormAddProduct from "./components/FormAddProduct";
import FormEditProduct from "./components/FormEditProduct";
import ToastLayout from "./pages/ToastLayout";
import Profile from "./components/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ToastLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<DashboardLayout />}>
            <Route path="/home/dashboard" element={<Welcome />} />
            <Route path="/home/users" element={<UserList />} />
            <Route path="/home/products" element={<ProductList />} />
            <Route path="/home/products/add" element={<FormAddProduct />} />
            <Route
              path="/home/products/edit/:id"
              element={<FormEditProduct />}
            />
            <Route path="/home/profile/:id" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
