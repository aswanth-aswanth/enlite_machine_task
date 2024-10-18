import Login from "./pages/Login";
import Register from "./pages/Register";
import DataTable from "./pages/DataTable";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<ProtectedRoute element={<DataTable />} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/table"
            element={<ProtectedRoute element={<DataTable />} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
