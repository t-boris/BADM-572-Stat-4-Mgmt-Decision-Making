import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ThemeProvider } from "./contexts/ThemeContext";
import { I18nProvider } from "./i18n/I18nContext";
import "./styles/index.css";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Root element #root not found");

createRoot(rootEl).render(
  <StrictMode>
    <I18nProvider>
      <ThemeProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </I18nProvider>
  </StrictMode>,
);
