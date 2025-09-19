import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import CurrentWeather from './components/CurrentWeather';
import Weather from './pages/Weather';
import Hero from "./pages/Hero"


function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      {/* <Weather /> */}
    </div>
  );
}

export default App;
