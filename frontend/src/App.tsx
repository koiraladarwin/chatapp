import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './features/auth/pages/Login'
import Signup from './features/auth/pages/Signup'
import Chat from './features/chat/pages/Chat'
import Landing from './features/landing/Landing'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing/>}></Route>
      <Route path="/chat" element={<Chat />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}

export default App
