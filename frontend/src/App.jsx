import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import { Route, Routes } from "react-router-dom"
import Home from './pages/Home';
import Tutors from './pages/Tutors';
import Login from './pages/Login';
import MyProfile from './pages/MyProfile';
import Blog from './pages/Blog';
import Session from './pages/Session';
import MySessions from './pages/MySessions';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import Verify from './pages/Verify';

export default function App() {
  return (
    <main className='overflow-hidden bg-light text-teritary'>
      <ToastContainer 
      position="bottom-right"
      />
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/tutors' element={<Tutors />}/>
        <Route path='/tutors/:subject' element={<Tutors />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/blog' element={<Blog />}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/my-profile' element={<MyProfile />}/>
        <Route path='/my-sessions' element={<MySessions />}/>
        <Route path="/session/:tutId" element={<Session />}/>
        <Route path="/verify" element={<Verify />}/>
      </Routes>
      <Footer />
    </main>
  )
}
