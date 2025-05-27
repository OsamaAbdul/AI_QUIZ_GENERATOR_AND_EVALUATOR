import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import Quiz from '../pages/Quiz.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import TakeQuiz from '../pages/TakeQuiz.jsx';
import LandingPage from '../pages/LandingPage.jsx';
import { UserProvider } from '../src/UseContext.jsx'; // Import UserProvider

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
          toastStyle={{ backgroundColor: '#fff', color: '#333', border: '1px solid #ccc', borderRadius: '6px' }}
          progressStyle={{ background: '#4a90e2' }}
        />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/take-quiz" element={<PrivateRoute><TakeQuiz /></PrivateRoute>} />
          <Route path="/upload-pdf" element={<PrivateRoute><Quiz /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;