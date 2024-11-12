import Home from "./pages/Home";
import Modes from "./pages/modes";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "./App.css";

function App() {
   return (
      <div className="App">
         <Router>
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/home" element={<Home />} />
               <Route path="/modes" element={<Modes />} />
            </Routes>
         </Router>
      </div>
   );
}

export default App;
