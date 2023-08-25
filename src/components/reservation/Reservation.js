import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams, useNavigate, redirect } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import './reservation.css'

import { useContext } from 'react'
import AuthContext from '../../auth/Authcontext/Authcontext'

function Reservation() {
  const { auth } = useContext(AuthContext)
  const [moviename, setMoviename] = useState('')
  const [image, setImage] = useState('')
  const [language, setLanguage] = useState('')
  const [genre, setGenre] = useState('')

  const [theatername, setTheatername] = useState('')
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')
  const [address, setAddress] = useState('')
  const [seats, setSeats] = useState(null)
  const params = useParams()
  const navigate = useNavigate()
  const [res, setRes] = useState('')
  const [occupied, setOccupied] = useState([])
  const [success, setSuccess] = useState('')

  useEffect(() => {
    api()
    var a = params.seats

    var b = a.split(',').map(function (item) {
      return parseInt(item, 10)
    })
    setSeats(b)
  }, [])
  const api = async () => {
    //get movie data using id
    const movie = await axios.post(
      `https://bookmyshow-ukl3.onrender.com/api/v1/getParticularMovie/${params.movieid}`,
    )
    setMoviename(movie.data.message.name)
    setImage(movie.data.message.image)
    setLanguage(movie.data.message.language)
    setGenre(movie.data.message.genre)
    //get theater data using id
    const theater = await axios.post(
      `https://bookmyshow-ukl3.onrender.com/api/v1/getParticularTheater/${params.theaterid}`,
    )

    setOccupied(theater.data.message.seats)

    setTheatername(theater.data.message.name)
    setTime(theater.data.message.startsAt)
    setAddress(theater.data.message.city)
    setDate(theater.data.message.date)
  }

  const submit = async (e) => {
    e.preventDefault()
    //pdf info

    let item = {}
    item.image = image
    item.moviename = moviename
    item.language = language
    item.genre = genre
    item.total = params.totalprice
    item.date = date
    item.time = time
    item.theatername = theatername
    item.address = address
    item.seats = seats
    item.price = params.totalprice
    localStorage.clear('items', JSON.stringify(item))
    localStorage.setItem('items', JSON.stringify(item))

    localStorage.setItem('theaterid', JSON.stringify(params.theaterid))
    localStorage.setItem('occupied', JSON.stringify(occupied))
    // payment added using stripe
    let data = {}
    data.date = date
    data.startAt = time
    data.seats = seats
    data.email = auth.email
    data.total = params.totalprice
    data.movieId = params.movieid
    data.theaterId = params.theaterid
    localStorage.setItem('data', JSON.stringify(data))
    const stripe = await loadStripe(
      'pk_test_51NiESQSDD08v8MpQ65E9CCPLDbWGYyp3NSqujwWPY3tx2cGMAh6IbfQMICJocZL5n635oyaKI7xyY3JRXmHoMUxi00y5nSRMkf',
    )
    console.log('data', data)
    try {
      const response = await axios.post(
        'https://bookmyshow-ukl3.onrender.com/api/v1/payment',
        data,
      )
      const session = await response.data

      let result = stripe.redirectToCheckout({
        sessionId: session.id,
      })

      if (result.error) {
        setSuccess(result.error)
      }

      //seat booked
    } catch (err) {
      alert(err)
    }
  }

  return (
    <>
      <>
        <div className="container">
          <div class="m-ticket">
            <p class="m">M-Ticket</p>

            <div class="movie-details">
              <img src={image} class="poster" alt="movieImage" />

              <div class="movie">
                <h4>{moviename}</h4>

                <p>
                  {language}/{genre}
                </p>
                <p>
                  {date.slice(0, 10)} | {time}
                </p>
                <p>
                  {theatername}:{address}
                </p>
              </div>
            </div>

            <div class="info">Tap for support, details & more actions</div>

            <div class="ticket-details">
              <div class="ticket">
                <p>seat no {params.seats}</p>
              </div>
            </div>

            <div class="info-cancel">
              Cancellation not available for this venue
            </div>

            <div class="total-amount">
              <p>Total Amount</p>

              <p>Rs. {params.totalprice}</p>
            </div>
          </div>
        </div>
        <button
          className="btn btn-primary submit-button"
          type="submit"
          onClick={submit}
        >
          <span className="pay-buy">
            <i class="fa fa-ticket "></i>
          </span>
          <span className="pay-buy">
            pay & Buy Tickets ${params.totalprice}
          </span>
        </button>
      </>
    </>
  )
}

export default Reservation
