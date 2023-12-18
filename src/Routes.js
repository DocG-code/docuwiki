import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NotFoundPage } from "./pages/NotFoundPage.js";
import { HomePage } from "./pages/HomePage.js";
import { DocumentDetail } from "./components/DocumentDetail.js";
import { Login } from "./components/Login.js";
import { Template_Post } from "./pages/Post.js";
import { My_Templates } from "./pages/MyTemplates.js";
import Edit from "./pages/EditPage.js";

export const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/document/:docId" element={<DocumentDetail />} />
        <Route path="/edit/:docId" element={<Edit />} />
        <Route path="/create" element={<Template_Post />} />
        <Route path="/mytemplates" element={<My_Templates />} />
        {/* Error route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
  );
};
