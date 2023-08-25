import React, { useContext } from 'react'
import '../navbar/navbar.css'
import { Link } from 'react-router-dom'
import AuthContext from '../../auth/Authcontext/Authcontext'
import { Navigate } from 'react-router-dom'
function Navbar() {
  const { auth } = useContext(AuthContext)

  return (
    <div className="topnav">
      <div>
        <h4 className="name mt-2">Pixel Cinima's</h4>
      </div>
      <div>
        <h4 className="text-center mt-2">
          <li className="fa fa-home">
            <Link to={'/home'}>Home</Link>
          </li>
        </h4>
      </div>
      <div>
        {auth?.role ? (
          <h4 className="text-center mt-2">
            <i class="fa fa-dashboard">
              <Link to={'/admin/dashboard'}>Admin Dashboard</Link>
            </i>
          </h4>
        ) : (
          ''
        )}
      </div>

      <h4 className="text-center m-2">
        Welcome <br></br> {auth?.name ? auth.name : ''}
      </h4>

      <Link to={'/user/contact'}>
        <h4 className="text-center mt-2">Contact Us</h4>
      </Link>

      <h4 className="logout mt-2">
        <Link to="/">LogOut</Link>
      </h4>
    </div>
  )
}

export default Navbar
