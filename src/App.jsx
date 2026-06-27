import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage';
import ProjectDetailsPage from './components/Details';
import AdminApp from './admin/AdminApp';

const App = () => {
  return (
    <BrowserRouter>
      <div className="bg-[#050816] relative z-0 overflow-x-hidden">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/project/:id" element={<ProjectDetailsPage />} />
          <Route path="/admin/*" element={<AdminApp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
