import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import axios from 'axios'
import { Oval } from 'react-loader-spinner'
import './user.css'
import AuthContext from '../../auth/Authcontext/Authcontext'
function User() {
  const [movie, setMovie] = useState('')
  const [movie_id, setMovieid] = useState('')
  const [theater, setTheater] = useState('')
  const [theater_id, setTheaterid] = useState('')
  const [reserved, setReserved] = useState('')

  const { auth } = useContext(AuthContext)
  useEffect(() => {
    getShow()
  }, [])

  const getShow = async () => {
    try {
      let a = await axios.get('http://localhost:2001/api/v1/getAllMovie', {
        headers: {
          token: auth.token,
        },
      })
      setMovie(a.data.message)
      let b = await axios.get('http://localhost:2001/api/v1/getAllTheater', {
        headers: {
          token: auth.token,
        },
      })
      setTheater(b.data.message)
    } catch (err) {
      console.log(err.message)
    }
  }

  const getData = async (e) => {
    try {
      let a = await axios.post(
        `http://localhost:2001/api/v1/getreservedUser/${movie_id}/${theater_id}`,
      )
      setReserved(a)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div className="row">
        <div className="col-2 col-lg-2">
          <Sidebar />
        </div>
        <div className="col-8 col-md-8">
          <div className="container">
            <div className="options  mt-5 ">
              <select
                className="mr-3"
                onChange={(ev) => {
                  setMovieid(ev.target.value)
                }}
              >
                <option>Select Show</option>
                {movie &&
                  movie.map((e) => {
                    return (
                      <option value={e._id} key={e._id}>
                        {e.name}
                      </option>
                    )
                  })}
              </select>
              <select
                onChange={(ev) => {
                  setTheaterid(ev.target.value)
                }}
              >
                <option>Select Theater</option>
                {theater &&
                  theater.map((e) => {
                    return (
                      <option value={e._id} key={e._id}>
                        {e.name}
                      </option>
                    )
                  })}
              </select>
              <div className="col-md-4">
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={getData}
                >
                  Check
                </button>
              </div>
            </div>
            <br></br>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">TheaterId</th>
                  <th scope="col">Seats</th>
                  <th scope="col">Payment</th>
                  <th scope="col">Email</th>
                </tr>
              </thead>
              <tbody>
                {reserved ? (
                  reserved?.data &&
                  reserved?.data.map((d) => {
                    return (
                      <tr>
                        <th>{d.theaterId}</th>
                        <th>{d.seats.length}</th>
                        <th>{d.total}</th>
                        <th>{d.email}</th>
                      </tr>
                    )
                  })
                ) : (
                  <h1 className="text-center text-danger">No Data</h1>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default User
