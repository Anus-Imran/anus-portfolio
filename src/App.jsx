import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './components/Homepage';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';

const ProjectDetailsPage = lazy(() => import('./components/Details'));
const AdminApp = lazy(() => import('./admin/AdminApp'));

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#050816]">
    <div className="w-10 h-10 border-4 border-[#915eff] border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <div className="bg-[#050816] relative z-0 overflow-x-hidden select-none">
        <ScrollProgress />
        <CustomCursor />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/project/:id" element={<ProjectDetailsPage />} />
            <Route path="/admin/*" element={<AdminApp />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
};

export default App;
