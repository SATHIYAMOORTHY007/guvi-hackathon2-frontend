import React, { useContext } from 'react'

import './search.css'

function Searchbox() {
  return (
    <div className="row">
      <div className="col-2 ">
        <h1>Pixel cinima</h1>
      </div>

      <div className="col-8">
        {/*  <p className="admin-text">{`Welcome ${user.name} `}</p> */}
        {sessionStorage.getItem('Role') === 'true' ? (
          <p className="admin-text">hello</p>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default Searchbox
