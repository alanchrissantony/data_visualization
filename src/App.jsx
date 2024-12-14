
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Dashboard from './pages/user/dashboard'
import Signin from './pages/user/login'
import AdminDashboard from './pages/admin/dashboard'
import AdminSignin from './pages/admin/login'
import Service from './pages/admin/service'
import Signup from './pages/user/signup'


function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Dashboard/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/admin' element={<AdminDashboard/>}/>
      <Route path='/admin/signin' element={<AdminSignin/>}/>
      <Route path='/admin/:id' element={<Service/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App
