import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NotFoundPage } from "./pages/NotFoundPage.js";
import { HomePage } from "./pages/HomePage.js";

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Error route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};
