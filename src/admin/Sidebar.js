import { Link } from 'react-router-dom'
import '../admin/admin.css'
export default function Sidebar() {
  return (
    <div className="sidebar-wrapper">
      <nav id="sidebar">
        <ul className="list-unstyled components">
          <li>
            <Link to="/home">
              <i className="fa fa-home">Home</i>
            </Link>
          </li>
          <li>
            <Link to="/admin/dashboard">
              <i className="fas fa-tachometer-alt"></i> Dashboard
            </Link>
          </li>

          <li>
            <Link to="/admin/theater/list">
              <i className="fa fa-ticket"> Theater</i>
            </Link>
          </li>

          <li>
            <Link to="/admin/users">
              <i className="fa fa-users">Users</i>
            </Link>
          </li>

          <li>
            <Link to="/user/getAllQuery">
              <i className="fa fa-users">Users Query</i>
            </Link>
          </li>

          <li>
            <Link to="/admin/movie/list">
              <i className="fa fa-film">Movie</i>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
