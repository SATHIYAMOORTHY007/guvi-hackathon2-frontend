import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
function Movietime() {
  const [array, setArray] = useState('')
  const params = useParams()
  const [cinimaid, SetCinimaid] = useState('')

  const getalldata = async () => {
    try {
      const value = await axios.get(
        `https://bookmyshow-ukl3.onrender.com/api/v1/getshowTimes/${params.id}/${params._id}`,
        {
          headers: {
            token: auth.token,
          },
        },
      )

      setArray(value.data)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getalldata()
  }, [])
  return (
    <div className="container">
      <div className="row">
        {array &&
          array.map((d) => {
            return (
              <div className="col col-md-4 ">
                <div class="card">
                  <img src={d.image} class="card-img-top" alt="..." />
                  <div class="card-body">
                    <h5 class="card-title">{d.startAt}</h5>
                    <p class="card-text   text-justify">{}</p>

                    <Link class="btn btn-primary">Book</Link>
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Movietime
