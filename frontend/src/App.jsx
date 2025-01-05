import './App.css';
import { ToastContainer } from 'react-toastify';
import AllRoutes from './pages/AllRoutes';

function App() {

  return (
    <div className="App">
      <AllRoutes />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
