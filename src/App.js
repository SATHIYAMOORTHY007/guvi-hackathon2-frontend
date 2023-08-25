import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/footer/Footer'
import Home from './components/home/Home'
import 'bootstrap/dist/css/bootstrap.min.css'
import SelectTheater from './components/selectThreater/SelectTheater'
import Create from './admin/theater/Create'
import MovieCreate from './admin/movie/MovieCreate'
import TheaterList from './admin/theater/TheaterList'
import UpdateTheater from './admin/theater/UpdateTheater'
import MovieList from './admin/movie/MovieList'
import UpdateMovie from './admin/movie/UpdateMovie'
import Dashboard from './admin/Dashboard'
import Seatselect from './components/seatSelect/Seatselect'
import Reservation from './components/reservation/Reservation'
import Form from './auth/form/Form'
import Register from './auth/registerForm/Register'
import Forgetpassword from './auth/forgetpassword/Forgetpassword'
import Reset from './auth/resetpassword/Reset'
import Contactus from './components/contact/Contactus'
import User from './admin/user/User'
import Protect from './Protect'
import Required from './Required'
import GetAllQuery from './components/contact/GetAllQuery'
import Afterpay from './components/afterpay.js/Afterpay'
import PayFailed from './components/PayFailed'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetpassword" element={<Forgetpassword />} />
        <Route path="/resetpassword/:id/:token" element={<Reset />} />
        <Route path="/payment" element={<Afterpay />} />
        <Route path="/failed" element={<PayFailed />} />
        <Route element={<Required />}>
          <Route path="/" element={<Protect />}>
            <Route path="home" element={<Home />} />
            <Route path="SelectTheater/:id" element={<SelectTheater />} />
            <Route path="seatselect/:id/:movieid" element={<Seatselect />} />
            <Route
              path="reservation/:totalprice/:seats/:movieid/:theaterid"
              element={<Reservation />}
            />
            <Route path="user/contact" element={<Contactus />} />
            <Route path="user/getAllQuery" element={<GetAllQuery />} />
            <Route path="admin/dashboard" element={<Dashboard />} />
            <Route path="admin/theater/list" element={<TheaterList />} />
            <Route path="admin/theater/create" element={<Create />} />
            <Route
              path="admin/theater/update/:id"
              element={<UpdateTheater />}
            />
            <Route path="admin/movie/list" element={<MovieList />} />
            <Route path="admin/movie/update/:id" element={<UpdateMovie />} />
            <Route path="admin/movie/create" element={<MovieCreate />} />
            <Route path="admin/users" element={<User />} />
          </Route>
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
