import "./App.css";
import LoginPage from "./pages/loginPage";
import AdminPage from "./pages/adminPage";
import RegisterPage from "./pages/client/registerPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/homePage";
import {GoogleOAuthProvider} from "@react-oauth/google";
import ForgetPassword from "./pages/client/forgetPassword";

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes path="/*">
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgetpass" element={<ForgetPassword/>}/>
          <Route path="/*" element={<HomePage />} />
          {/* <Route path="/*" element={<h1>404 Not Found</h1>} /> */}
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
