import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './reservation.css'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
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

  //seats converted to array of numbers

  useEffect(() => {
    api()
    var a = params.seats

    var b = a.split(',').map(function (item) {
      return parseInt(item, 10)
    })
    setSeats(b)
  }, [])
  const api = async () => {
    const movie = await axios.post(
      `https://bookmyshow-ukl3.onrender.com/api/v1/getParticularMovie/${params.movieid}`,
    )
    setMoviename(movie.data.message.name)
    setImage(movie.data.message.image)
    setLanguage(movie.data.message.language)
    setGenre(movie.data.message.genre)

    const theater = await axios.post(
      `https://bookmyshow-ukl3.onrender.com/api/v1/getParticularTheater/${params.theaterid}`,
    )

    setOccupied(theater.data.message.seats)

    setTheatername(theater.data.message.name)
    setTime(theater.data.message.startsAt)
    setAddress(theater.data.message.city)
    setDate(theater.data.message.date)
  }

  const submit = async () => {
    let data = {}
    data.date = date
    data.startAt = time
    data.seats = seats
    data.email = auth.email
    data.total = params.totalprice
    data.movieId = params.movieid
    data.theaterId = params.theaterid

    try {
      const a = await axios.post(
        'https://bookmyshow-ukl3.onrender.com/api/v1/createReservation',
        data,
        {
          headers: {
            token: auth.token,
          },
        },
      )
      occupied.forEach((e) => {
        e.forEach((seats) => {
          if (seats.isReserved === true) {
            seats.occupied = true
          }
        })
      })
      let seatUpdate = await axios.put(
        `https://bookmyshow-ukl3.onrender.com/api/v1/updateSeats/${params.theaterid}`,
        occupied,
        {
          headers: {
            token: auth.token,
          },
        },
      )

      setRes(a.data.reservation._id)

      var doc = new jsPDF('p', 'mm', 'a4')
      html2canvas(document.querySelector('.container')).then(function (canvas) {
        var imgData = canvas.toDataURL('image/png')
        var pageHeight = 300
        var imgWidth = 210
        var imgHeight = (canvas.height * imgWidth) / canvas.width
        var heightLeft = imgHeight
        var position = 15

        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight
          doc.addPage()
          doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
          heightLeft -= pageHeight
        }
        doc.output('dataurlnewwindow')
        doc.save(Date.now() + '.pdf')
      })

      alert('Cheack your mail')
      navigate(`/home`)
    } catch (err) {
      console.log(err)
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
