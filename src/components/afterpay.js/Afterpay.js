import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import html2canvas from 'html2canvas'
import axios from 'axios'
import jsPDF from 'jspdf'
import { useContext } from 'react'

import AuthContext from '../../auth/Authcontext/Authcontext'
import { Navigate, useNavigate } from 'react-router-dom'
function Afterpay() {
  const Navigate = useNavigate('')
  const { auth } = useContext(AuthContext)
  const [item, setItem] = useState('')
  const [data, setData] = useState('')
  const [theaterid, setTheaterid] = useState('')
  const [occupied, setoccupied] = useState('')
  const [seatUpdated, setSeatUpdated] = useState(false)
  const [isReserved, setIsReserved] = useState(false)
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('items'))
    const datas = JSON.parse(localStorage.getItem('data'))
    const theaterids = JSON.parse(localStorage.getItem('theaterid'))
    const occupieds = JSON.parse(localStorage.getItem('occupied'))

    if (items && datas && theaterids && occupieds) {
      setItem(items)
      setData(datas)
      setTheaterid(theaterids)
      setoccupied(occupieds)
    }
    setTimeout(() => {
      if (isReserved && seatUpdated) download()
    }, 5000)
  }, [])
  //seats Reservation comfirmed

  const updated = async () => {
    try {
      occupied.map((e) => {
        return e.map((seats) => {
          if (seats.isReserved === true) {
            return (seats.occupied = true)
          }
        })
      })

      const updateSeats = await axios.put(
        `https://bookmyshow-ukl3.onrender.com/api/v1/updateSeats/${theaterid}`,
        occupied,
      )
      setSeatUpdated(true)
    } catch (err) {
      console.log(err)
    }
  }
  updated()
  const seatsbooked = async () => {
    try {
      const createReservation = await axios.post(
        'https://bookmyshow-ukl3.onrender.com/api/v1/createReservation',
        data,
      )
      isReserved(true)
    } catch (err) {
      console.log(err)
    }
  }
  seatsbooked()
  //download pdf
  const download = async () => {
    var doc = new jsPDF('p', 'mm', 'a4')
    await html2canvas(document.querySelector('.container')).then(function (
      canvas,
    ) {
      var imgData = canvas.toDataURL('image/jpg')
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
  }

  return (
    <>
      <>
        {item && item.image ? (
          <div className="container">
            <div class="m-ticket">
              <p class="m">M-Ticket</p>

              <div class="movie-details">
                {item.image ? (
                  <img src={item.image} class="poster" alt="movieImage" />
                ) : (
                  ''
                )}

                <div class="movie">
                  <h4>{item.moviename}</h4>

                  <p>
                    {item.language}/{item.genre}
                  </p>
                  <p>
                    {item.date} | {item.time}
                  </p>
                  <p>
                    {item.theatername}:{item.address}
                  </p>
                </div>
              </div>

              <div class="info">Tap for support, details & more actions</div>

              <div class="ticket-details">
                <div class="ticket">
                  {item && item.seats.map((e) => <p>seat no {e}</p>)}
                </div>
              </div>

              <div class="total-amount">
                <p>Total Amount</p>

                <p>Rs. {item.price}</p>
              </div>
            </div>
            <h1 className="text-center ">Payment Success</h1>
          </div>
        ) : (
          ''
        )}
      </>
    </>
  )
}

export default Afterpay
