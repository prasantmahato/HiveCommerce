import './App.css';
import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';


function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
