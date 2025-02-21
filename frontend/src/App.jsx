import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import UserList from "./components/UserList";
import ProductList from "./components/ProductList";
import Signup from "./components/Signup";
import EditUser from "./components/EditUser";
import FormAddProduct from "./components/FormAddProduct";
import FormEditProduct from "./components/FormEditProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/users/edit/:id" element={<EditUser />} />
        <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={<Welcome />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/add" element={<FormAddProduct />} />
          <Route path="/products/edit/:id" element={<FormEditProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
