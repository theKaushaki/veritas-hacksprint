import './App.css';
import { Toaster } from 'react-hot-toast';
import AllRoutes from './pages/AllRoutes';

function App() {
  

  return (
    <div className="App">
      <AllRoutes />
      <Toaster />
    </div>
  );
}

export default App;
