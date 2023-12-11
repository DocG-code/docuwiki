import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NotFoundPage } from "./pages/NotFoundPage.js";
import { HomePage } from "./pages/HomePage.js";
import { DocumentDetail } from "./components/DocumentDetail.js";
import { Login } from "./components/Login.js";

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/document/:docId" element={<DocumentDetail />} />
        {/* Error route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};
