import React from 'react'
import Sidebar from './Sidebar'
import { Link, Outlet } from 'react-router-dom'
import '../admin/admin.css'
function Dashboard() {
  return (
    <div className=".container">
      <div className="row">
        <div className="col-10 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <h1 className="my-4">Dashboard</h1>
          <div className="row pr-4">
            <div className="col-xl-12 col-sm-12 mb-3">
              <h1 className="text-danger text-center">Welcome Admin!!!</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
