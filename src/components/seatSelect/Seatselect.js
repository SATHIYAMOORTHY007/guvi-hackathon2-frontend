import axios from 'axios'
import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './seats.css'
import Sidebar from '../../admin/Sidebar'
import { Oval } from 'react-loader-spinner'
import Navbar from '../navbar/Navbar'
import { useContext } from 'react'
import AuthContext from '../../auth/Authcontext/Authcontext'
export default function Seatselect() {
  const { auth } = useContext(AuthContext)
  const params = useParams()
  const [selectSeat, setSelectSeat] = useState([])
  const [price, setPrice] = useState(0)
  const [totalprice, setTotalPrice] = useState(0)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    api()
  }, [])

  const api = async () => {
    setLoading(true)
    try {
      let a = await axios.post(
        `http://localhost:2001/api/v1/getseats/${params.id}`,
      )
      let Theater = await axios.post(
        `http://localhost:2001/api/v1/getTheaterbyid/${params.id}`,
      )

      setRows(a.data[0])
      setPrice(a.data[1])
      setLoading(false)
    } catch (err) {
      setLoading(true)
      console.log(err)
    }
  }

  const [rows, setRows] = useState(null)

  let pushArray = (item, key) => {
    setLoading(true)
    if (!selectSeat.includes(item)) {
      setSelectSeat([...selectSeat, item])
      setTotalPrice((selectSeat.length + 1) * price)

      key.isReserved = true
      setRows(
        rows.map((row) => {
          return row.map((seats) => {
            if (seats.id === key.id) {
              return {
                ...seats,
                isReserved: true,
              }
            }
            return seats
          })
        }),
      )
    } else {
      let n = selectSeat.filter((n) => n !== item)
      key.isReserved = false
      setSelectSeat([...n])
      setTotalPrice((selectSeat.length - 1) * price)
      setRows(
        rows.map((row) => {
          return row.map((seats) => {
            if (seats.id === key.id) {
              return {
                ...seats,
                isReserved: false,
              }
            }
            return seats
          })
        }),
      )
    }
    setLoading(false)
    console.log('total price', totalprice)
  }

  const submit = async () => {
    setLoading(true)
    try {
      let seatUpdate = await axios.put(
        `http://localhost:2001/api/v1/updateSeats/${params.id}`,
        rows,
        {
          headers: {
            token: auth.token,
          },
        },
      )

      navigate(
        `/reservation/${totalprice}/${selectSeat}/${params.movieid}/${params.id}`,
      )
      setLoading(false)
    } catch (err) {
      setLoading(true)
      console.log(err.message)
    }
  }

  const a = (key) => {
    if (key.isReserved && key.occupied) {
      return 'occupied'
    }
    if (key.isReserved) {
      return 'color-seat'
    } else {
      return 'seat'
    }
  }

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
        <div className=".container-fluid">
          <Navbar />
          <div className="container col-md-8 ">
            <ul className="showcase">
              <li>
                <div className="seat"></div>
                <small>N/A</small>
              </li>
              <li>
                <div className="color-seat"></div>
                <small>selected seats</small>
              </li>
              <li>
                <div className="occupied"></div>
                <small>occupied</small>
              </li>
            </ul>
            <div className="screen">
              <small className="screen-text">Screen</small>{' '}
            </div>
            <div className="display-seats">
              {rows &&
                rows?.map((e) => {
                  return (
                    <>
                      <div className="Seats-row">
                        {e.map((key) => {
                          return (
                            <>
                              <button
                                className={a(key)}
                                onClick={() => pushArray(key.id, key)}
                              >
                                {key.id}
                              </button>
                            </>
                          )
                        })}
                      </div>
                    </>
                  )
                })}
            </div>

            <div className="bottom-content">
              <p>{`Your Booked seats ${selectSeat.length} total ${totalprice}`}</p>
              {selectSeat.length > 0 ? (
                <button
                  className="btn btn-primary confirm"
                  onClick={submit}
                  style={{ width: '10em' }}
                >
                  Confirm
                </button>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
