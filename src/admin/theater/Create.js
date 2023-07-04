import React, { useState } from 'react'
import Sidebar from '../Sidebar'

import { useEffect } from 'react'
import axios from 'axios'

import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import '../theater/create.css'
import { useContext } from 'react'
import AuthContext from '../../auth/Authcontext/Authcontext'

function Create() {
  const [selectestartingdate, setSelectestartingdate] = useState(Date())
  const [name, setName] = useState('')
  const [ticketPrice, setTicketPrice] = useState('')
  const [city, setCity] = useState('')
  const [movieid, setMovieid] = useState('')
  const [startsAt, setStartsAt] = useState('')
  const [image, setImage] = useState('')
  const [movie, setMovie] = useState('')
  const { auth } = useContext(AuthContext)
  useEffect(() => {
    movieapi()
  }, [])

  const movieapi = async () => {
    const a = await axios.get(
      'https://bookmyshow-ukl3.onrender.com/api/v1/getAllMovie',
      {
        headers: {
          token: auth.token,
        },
      },
    )
    setMovie(a.data.message)
  }

  const onsubmit = async (e) => {
    e.preventDefault()
    try {
      const data = {}
      data.name = name
      data.ticketPrice = ticketPrice
      data.city = city
      data.image = image
      data.movieid = movieid
      data.startsAt = startsAt
      data.date = new Date(selectestartingdate)

      console.log(data)
      const a = await axios.post(
        'http://localhost:2001/api/v1/createTheater',
        data,
        {
          headers: {
            token: auth.token,
          },
        },
      )

      alert('success')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="row">
      <div className="col-2 col-lg-2">
        <Sidebar />
      </div>
      <div className="col-8 col-lg-8">
        <form className="from-control">
          <div className="grid-container">
            <div className="item1">
              <label for="name">Theater Name</label>
              <input
                type="text"
                class="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}
                name="name"
                placeholder=" enter Theater name"
              />
            </div>
            <div className="item2">
              <label for="ticketPrice">ticketPrice</label>
              <input
                type="text"
                class="form-control"
                name="ticketPrice"
                onChange={(e) => setTicketPrice(e.target.value)}
                value={ticketPrice}
                placeholder="enter ticketPrice"
              />
            </div>
            <div className="item3">
              <label for="city">Address</label>
              <input
                type="text"
                class="form-control"
                onChange={(e) => setCity(e.target.value)}
                value={city}
                name="city"
                placeholder="enter city"
              />
            </div>
            <div className="item4">
              <select
                className="mt-4"
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
            </div>
            <div className="item5">
              <label for="startsAt">startsAt</label>
              <input
                type="text"
                class="form-control"
                name="startsAt"
                onChange={(e) => setStartsAt(e.target.value)}
                placeholder="enter startsAt"
                value={startsAt}
              />
            </div>
            <div className="item6">
              <label for="image">image</label>
              <input
                type="text"
                class="form-control"
                name="image"
                placeholder="enter image url"
                onChange={(e) => setImage(e.target.value)}
                value={image}
              />
            </div>

            <div className="item8">
              <label for="date">Date</label>
              <DatePicker
                selected={selectestartingdate}
                name="selectestartingdate"
                onChange={(date) => setSelectestartingdate(date)}
                value={selectestartingdate}
              />
            </div>

            <button onClick={onsubmit}>Send</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Create
