import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.tsx";
import RecipeInfoPage from "./pages/RecipeInfoPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/recipes" element={<App />} />
        <Route path="/recipes/:id" element={<RecipeInfoPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
