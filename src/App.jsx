import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Weather from "./pages/Weather";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;