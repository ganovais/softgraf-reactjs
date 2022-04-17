import { Route, Routes } from "react-router-dom";
import { Home } from "../screens/Home";
import { Login } from "../screens/Login";
import { Register } from "../screens/Register";

export function AppRoutes() {
   return (
      <Routes>
         <Route path="/" element={<Login />} />
         <Route path="register" element={<Register />} />
         <Route path="home" element={<Home />} />
      </Routes>
   );
}
