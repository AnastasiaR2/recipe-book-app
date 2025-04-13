import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.tsx";
import RecipeListPage from "./pages/RecipeListPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RecipeListPage />} />
        <Route path="/recipes:id" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
