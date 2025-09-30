import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Weather from './pages/Weather';


function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </div>
  );
}

export default App;
