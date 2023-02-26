import './App.css';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { useSelector } from "react-redux";

const ProtectedRoute = ({ user, redirectPath = '/' }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};


function App() {
  const { auth } = useSelector((state) => state.reducer);
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoute user={auth} />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
