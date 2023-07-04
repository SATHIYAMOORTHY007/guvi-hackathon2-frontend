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
        <div className=".container-fluid ">
          <Navbar />
          <div className="container col-lg-8">
            <div className="row">
              <div id="grid-container">
                {array &&
                  array.message.map((d) => {
                    return (
                      <div class="card">
                        <img src={d.image} class="card-img-top" alt="..." />
                        <div class="card-body">
                          <h5 class="card-title">{d.name}</h5>
                          <p class="card-text   text-justify">
                            {d.description}
                          </p>
                          <Link
                            to={`/SelectTheater/${d._id}`}
                            class="btn btn-primary"
                          >
                            Book
                          </Link>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Home
