import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../pages/app";
import AddContact from "../pages/add-contact";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/add" element={<AddContact />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
