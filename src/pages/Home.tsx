import { useNavigate } from 'react-router-dom';
import Footer from '../components/footer';

export default function Home() {
   const navigate = useNavigate();

   const handlePlayClick = () => {
      navigate('/modes');
   };

   return (
      <div className="App">
         <div className="content">
            <h1>Quizz</h1>
            <div className="button">
               <button onClick={handlePlayClick}>Jouer</button>
            </div>
         </div>
         <Footer />
      </div>
   );
}
