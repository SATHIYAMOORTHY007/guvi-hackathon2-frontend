import React, { useContext } from 'react'
import '../navbar/navbar.css'
import { Link } from 'react-router-dom'
import AuthContext from '../../auth/Authcontext/Authcontext'
import { Navigate } from 'react-router-dom'
function Navbar() {
  const { auth } = useContext(AuthContext)

  return (
    <nav class="topnav">
      <div>
        <h3 className="name mt-2">Pixel Cinima's</h3>
      </div>
      <div>
        <h3 className="text-center mt-2">
          <li class="fa fa-home">
            <Link to={'/home'}>Home</Link>
          </li>
        </h3>
      </div>
      <div>
        {auth?.role ? (
          <h3 className="text-center mt-2">
            <i class="fa fa-dashboard">
              <Link to={'/admin/dashboard'}>Admin Dashboard</Link>
            </i>
          </h3>
        ) : (
          ''
        )}
      </div>

      <h3 className="text-center mt-2">
        Welcome <p>{auth?.name ? auth.name : ''}</p>
      </h3>
      <Link to={'/user/contact'}>
        <h3 className="text-center mt-2">Contact Us</h3>
      </Link>

      <Link to="/">
        <h2 className="logout">LogOut</h2>
      </Link>
    </nav>
  )
}

export default Navbar
