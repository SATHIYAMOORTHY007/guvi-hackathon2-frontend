import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Oval } from 'react-loader-spinner'
import Navbar from '../navbar/Navbar'
import { useContext } from 'react'
import AuthContext from '../../auth/Authcontext/Authcontext'
function SelectTheater() {
  const { auth } = useContext(AuthContext)
  const [array, setArray] = useState('')
  const params = useParams()
  const [cinimaid, SetCinimaid] = useState('')
  const [image1, SetImage] = useState('')

  const [movieid, setMovieid] = useState('')
  const [loading, setLoading] = useState(false)
  const getalldata = async () => {
    setLoading(true)

    try {
      const value = await axios.post(
        `http://localhost:2001/api/v1/getTheaterbyid/${params.id}`,
        {
          headers: {
            token: auth.token,
          },
        },
      )

      setMovieid(params.id)
      SetImage(value.data.movie.image)
      setArray(value.data)

      setLoading(false)
    } catch (err) {
      setLoading(true)
      console.log(err)
    }
  }
  useEffect(() => {
    getalldata()
  }, [])
  return (
    <>
      {loading ? (
        <Oval
          ariaLabel="loading-indicator"
          height={100}
          width={100}
          strokeWidth={10}
          strokeWidthSecondary={2}
          color="blue"
          secondaryColor="white"
        />
      ) : (
        <div className=".container-fluid">
          <Navbar />
          <div className="container col-lg-8">
            <div id="grid-container">
              {array?.message?.length > 0 ? (
                array.message.map((d) => {
                  return (
                    <div className="card">
                      <img
                        src={d.image}
                        class="card-img-top"
                        alt="theater image"
                      />
                      <div className="card-body">
                        <h5 className="card-title">{d.name}</h5>
                        <ul>
                          <li className="text-success">{d.city}</li>
                          <li className="text-success">{d.startsAt}</li>
                          <li>{Date(d.date).slice(0, 15)}</li>
                        </ul>
                        <Link
                          class="btn btn-primary"
                          to={`/seatSelect/${d._id}/${movieid}`}
                        >
                          Book
                        </Link>
                      </div>
                    </div>
                  )
                })
              ) : (
                <h1 className="font-monospace text-warning text-center ml-3">
                  Theater Not Available
                </h1>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SelectTheater
