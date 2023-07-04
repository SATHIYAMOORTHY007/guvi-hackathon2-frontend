import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { Oval } from 'react-loader-spinner'
import { useContext } from 'react'
import AuthContext from '../../auth/Authcontext/Authcontext'
function MovieList() {
  const [array, setArray] = useState('')
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(0)
  const [id, setId] = useState(null)
  const params = useParams()
  const { auth } = useContext(AuthContext)
  useEffect(() => {
    list()
  }, [])

  let handelDelete = async (id) => {
    try {
      setLoading(true)
      const confirmdate = window.confirm(
        'Are You Sure You Want To Delete Data ?',
      )
      if (confirmdate) {
        await axios.delete(`http://localhost:2001/api/v1/deleteMovie/${id}`, {
          headers: {
            token: auth.token,
          },
        })
        list()
      }
      setLoading(false)
    } catch (error) {
      setLoading(true)
      console.log(error)
    }
  }

  let list = async () => {
    try {
      const Theaters = await axios.get(
        'http://localhost:2001/api/v1/getAllMovie',
        {
          headers: {
            token: auth.token,
          },
        },
      )
      setArray(Theaters.data)
      setCount(Theaters.data.message.length)
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
          <div className="col-8 col-lg-8">
            <div className="container">
              <Link to="/admin/movie/create">
                <button
                  className="btn btn-primary mt-3 mb-3"
                  style={{ width: '10rem' }}
                >
                  Create +
                </button>
              </Link>
              <br />
              <h3 className="text-danger">Total Number Of Movies {count}</h3>
              <table class="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Language</th>
                    <th>Director</th>
                    <th>ReleaseDate</th>
                    <th>EndDate</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {array &&
                    array.message.map((d) => {
                      return (
                        <tr>
                          <td>{d.name}</td>
                          <td>{d.language}</td>
                          <th>{d.director}</th>
                          <td>{d.releaseDate}</td>
                          <td>{d.endDate}</td>
                          <td>
                            <Link
                              onClick={() => handelDelete(d._id)}
                              className="btn btn-danger mr-1 mt-2"
                            >
                              Delete
                            </Link>
                            <Link
                              to={`/admin/movie/update/${d._id}`}
                              className="btn btn-info mr-1 mt-2"
                            >
                              Edit
                            </Link>
                          </td>
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

export default MovieList
