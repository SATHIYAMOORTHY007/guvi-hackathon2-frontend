import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Sidebar from '../../admin/Sidebar'
import { useContext } from 'react'
import AuthContext from '../../auth/Authcontext/Authcontext'
function GetAllQuery() {
  const [array, setArray] = useState('')
  const [count, setCount] = useState(0)
  const { auth } = useContext(AuthContext)
  useEffect(() => {
    list()
  }, [])
  let list = async () => {
    try {
      const Query = await axios.post(
        'https://bookmyshow-ukl3.onrender.com/api/v1/auth/getAllQuery',
      )

      setArray(Query.data)
      setCount(Query.data.message.length)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className="row">
        <div className="col-2 col-lg-2">
          <Sidebar />
        </div>
        <div className="col-5 col-md-8">
          <div className="container">
            <br />
            <h3 className="text-danger">Total Number Of Users {count}</h3>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Query</th>
                </tr>
              </thead>
              <tbody>
                {array &&
                  array.message.map((d) => {
                    return (
                      <tr>
                        <td>{d.username}</td>
                        <td>{d.email}</td>
                        <td>{d.query}</td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default GetAllQuery
