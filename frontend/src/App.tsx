import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './features/auth/pages/Login'
import Signup from './features/auth/pages/Signup'

function App() {

  return (
    <Routes>
      <Route path="/" ></Route>
      <Route path="/chat/:id" ></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
    </Routes>
  )
}

export default App
