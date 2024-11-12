import Footer from "./components/footer";
import Modes from "./pages/modes";
import "./App.css";

function App() {
   return (
      <div className="App">
         <div className="content">
            <h1>Quizz</h1>
            <div className="button"><button onClick={<Modes}>Jouer</button></div>
         </div>
         <Footer />
      </div>
   );
}

export default App;