import { Route, Routes } from "react-router-dom";
// import { Button } from "./components/ui/button";
import AuthPage from "./pages/auth/Index";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  );
}

export default App;