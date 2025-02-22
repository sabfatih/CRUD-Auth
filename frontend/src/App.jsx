import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./pages/DashboardLayout";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import UserList from "./components/UserList";
import ProductList from "./components/ProductList";
import Signup from "./components/Signup";
import EditUser from "./components/EditUser";
import FormAddProduct from "./components/FormAddProduct";
import FormEditProduct from "./components/FormEditProduct";

import { ToastContainer } from "react-toastify";
import Layout from "./pages/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/home" element={<DashboardLayout />}>
            <Route path="/home/dashboard" element={<Welcome />} />
            <Route path="/home/users" element={<UserList />} />
            <Route path="/home/products" element={<ProductList />} />
            <Route path="/home/products/add" element={<FormAddProduct />} />
            <Route
              path="/home/products/edit/:id"
              element={<FormEditProduct />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
