import React, { useState } from 'react'
import { Formik, useFormik } from 'formik'
import axios from 'axios'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../Sidebar'
import DatePicker from 'react-datepicker'
import '../theater/create.css'
import { useContext } from 'react'
import { Oval } from 'react-loader-spinner'
import AuthContext from '../../auth/Authcontext/Authcontext'

function UpdateTheater() {
  const [isLoading, setLoading] = useState(false)
  const navigate = useNavigate()
  const params = useParams()
  const { auth } = useContext(AuthContext)
  useEffect(() => {
    Theater()
  }, [])

  let Theater = async () => {
    setLoading(true)
    try {
      const theater = await axios.post(
        `https://bookmyshow-ukl3.onrender.com/api/v1/getParticularTheater/${params.id}`,
      )
      setLoading(false)
      myformik.setValues(theater.data.message)
    } catch (error) {
      console.log(error)
    }
  }
  const myformik = useFormik({
    initialValues: {
      name: '',
      ticketPrice: '',
      movieid: '',
      image: '',
      startsAt: '',
      city: '',
    },
    onSubmit: async (values) => {
      setLoading(true)
      try {
        const updateTheater = await axios.put(
          `https://bookmyshow-ukl3.onrender.com/api/v1/updateTheater/${params.id}`,
          values,
          {
            headers: {
              token: auth.token,
            },
          },
        )
        setLoading(false)
        alert('success')
      } catch (error) {
        console.log(error)
      }
    },
  })
  return (
    <>
      {isLoading ? (
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
          <div className="col-2 col-lg-8">
            <form className="from-control" onSubmit={myformik.handleSubmit}>
              <div className="grid-container">
                <div className="item1">
                  <label for="theater_name">Theater Name</label>
                  <input
                    type="text"
                    class="form-control"
                    name="name"
                    className="form-control"
                    value={myformik.values.name}
                    onChange={myformik.handleChange}
                    placeholder=" enter theater name"
                  />
                </div>
                <div className="item2">
                  <label for="language">Ticket Price</label>
                  <input
                    type="text"
                    value={myformik.values.ticketPrice}
                    name="ticketPrice"
                    onChange={myformik.handleChange}
                    className="form-control"
                    placeholder="enter ticket price"
                  />
                </div>
                <div className="item3">
                  <label for="image_url">Image Url</label>
                  <input
                    type=""
                    class="form-control"
                    value={myformik.values.image}
                    name="image"
                    onChange={myformik.image}
                    placeholder="enter image url"
                    className="form-control"
                  />
                </div>
                <div className="item4">
                  <label for="address">Address</label>
                  <input
                    type="text"
                    value={myformik.values.city}
                    name="city"
                    onChange={myformik.handleChange}
                    placeholder="enter address"
                    className="form-control"
                  />
                </div>

                <div className="item7">
                  <label for="movieid">Movie_Id</label>
                  <input
                    type="text"
                    value={myformik.values.movieid}
                    name="movieid"
                    onChange={myformik.handleChange}
                    placeholder="enter movieid"
                    className="form-control"
                  />
                </div>

                <div className="item7">
                  <label for="startsAt">Starting Time</label>
                  <input
                    type="text"
                    value={myformik.values.startsAt}
                    name="startsAt"
                    onChange={myformik.handleChange}
                    placeholder="enter startsAt"
                    className="form-control"
                  />
                </div>

                <input type="submit" className="btn btn-primary mt-1" />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default UpdateTheater
