import React from 'react'
import '../home/home.css'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Oval } from 'react-loader-spinner'
import Navbar from '../navbar/Navbar'
import { useContext } from 'react'
import AuthContext from '../../auth/Authcontext/Authcontext'
function Home() {
  const [array, setArray] = useState('')
  const [loading, setLoading] = useState(false)
  const { auth } = useContext(AuthContext)

  const getalldata = async () => {
    setLoading(true)
    try {
      const value = await axios.get(
        'https://bookmyshow-ukl3.onrender.com/api/v1/getAllMovie',
        {
          headers: {
            token: auth.token,
          },
        },
      )
      setArray(value.data)
      setLoading(false)
    } catch (err) {
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
          strokeWidth={5}
          strokeWidthSecondary={1}
          color="blue"
          secondaryColor="white"
        />
      ) : (
        <>
          <Navbar />
          <div className="container">
            <div className="row col-md-6 col-lg-12">
              {array &&
                array.message.map((d) => {
                  return (
                    <div className="card">
                      <img src={d.image} class="card-img-top" alt="..." />
                      <div className="card-body">
                        <h5 className="card-title">{d.name}</h5>
                        <p className="card-text   text-justify">
                          {d.description}
                        </p>
                        <Link
                          to={`/SelectTheater/${d._id}`}
                          className="btn btn-primary text-center "
                        >
                          Book
                        </Link>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Home
