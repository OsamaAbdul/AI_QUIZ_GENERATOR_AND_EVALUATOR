import './App.css'
import Login from '../pages/Login.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Quiz from '../pages/Quiz.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import Register from '../pages/Register.jsx';
import TakeQuiz from '../pages/TakeQuiz.jsx'
import Home from '../pages/Home.jsx'


function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/take-quiz" element={<PrivateRoute><TakeQuiz /></PrivateRoute>} />
      <Route path="/upload-pdf" element={<PrivateRoute><Quiz /></PrivateRoute>} />
    </Routes>
   </BrowserRouter>
  )
}

export default App
