import { Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import AppShell from "./components/Layout/AppShell";
import HomePage from "./pages/HomePage";
import ModulePage from "./pages/ModulePage";
import GlossaryPage from "./pages/GlossaryPage";
import QuizSetupPage from "./pages/QuizSetupPage";
import QuizRunnerPage from "./pages/QuizRunnerPage";
import QuizResultsPage from "./pages/QuizResultsPage";
import DataLabPage from "./pages/DataLabPage";
import ExcelPage from "./pages/ExcelPage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <AppShell>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/modules" element={<Navigate to="/" replace />} />
          <Route path="/modules/:moduleId" element={<ModulePage />} />
          <Route path="/lab" element={<DataLabPage />} />
          <Route path="/excel" element={<ExcelPage />} />
          <Route path="/glossary" element={<GlossaryPage />} />
          <Route path="/quiz" element={<QuizSetupPage />} />
          <Route path="/quiz/run" element={<QuizRunnerPage />} />
          <Route path="/quiz/results" element={<QuizResultsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </AppShell>
  );
}
