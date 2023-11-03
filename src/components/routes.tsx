import { HashRouter, Routes, Route } from "react-router-dom";
import App from "../pages/app";
import AddContact from "../pages/add-contact";
import EditContact from "../pages/edit-contact";

const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/add" element={<AddContact />} />
        <Route path="/edit" element={<EditContact />} />
      </Routes>
    </HashRouter>
  );
};

export default Router;
