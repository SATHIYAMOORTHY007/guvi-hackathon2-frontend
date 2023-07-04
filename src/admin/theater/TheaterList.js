import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../../auth/Authcontext/Authcontext'
import { Oval } from 'react-loader-spinner'
function TheaterList() {
  const [array, setArray] = useState('')
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [id, setId] = useState(null)
  const params = useParams()
  const { auth } = useContext(AuthContext)
  useEffect(() => {
    list()
  }, [])

  let handelDelete = async (id) => {
    setLoading(true)
    try {
      const confirmdate = window.confirm(
        'Are You Sure You Want To Delete Data ?',
      )
      if (confirmdate) {
        await axios.delete(
          `https://bookmyshow-ukl3.onrender.com/api/v1/deleteTheater/${id}`,
          {
            headers: {
              token: auth.token,
            },
          },
        )
        list()
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  let list = async () => {
    setLoading(true)
    try {
      const Theaters = await axios.get(
        'https://bookmyshow-ukl3.onrender.com/api/v1/getAllTheater',
        {
          headers: {
            token: auth.token,
          },
        },
      )
      setArray(Theaters.data)
      setCount(Theaters.data.message.length)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      {loading ? (
        <Oval
          ariaLabel="loading-indicator"
          height={100}
          width={100}
          strokeWidth={5}
          strokeWidthSecondary={1}
          color="blue"
          secondaryColor="white"
        />
      ) : (
        <div className="row">
          <div className="col-2 col-lg-2">
            <Sidebar />
          </div>
          <div className="col-5 col-md-8">
            <div className="container">
              <Link to="/admin/theater/create">
                <button
                  className="btn btn-primary mt-3 mb-3 text-center"
                  style={{ width: '10em' }}
                >
                  Create +
                </button>
              </Link>
              <br />
              <h3 className="text-danger">Total Number Of Theater {count}</h3>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Address</th>
                    <th scope="col">Movie_id</th>
                    <th scope="col">StartsAt</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {array &&
                    array.message.map((d) => {
                      return (
                        <tr>
                          <td>{d.name}</td>
                          <td>{d.city}</td>

                          <td>{d.movieid}</td>
                          <td>{d.startsAt}</td>
                          <Link
                            onClick={() => handelDelete(d._id)}
                            className="btn btn-danger mr-1 mt-2"
                          >
                            Delete
                          </Link>
                          <Link
                            to={`/admin/theater/update/${d._id}`}
                            className="btn btn-info mr-1 mt-2"
                          >
                            Edit
                          </Link>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default TheaterList
