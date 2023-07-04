import React, { useState } from 'react'
import './register.css'
import { useNavigate, Link } from 'react-router-dom'
import { Formik, useFormik } from 'formik'
import axios from 'axios'
import './register.css'
function Register() {
  const [loading, setloading] = useState(false)
  const navigator = useNavigate()

  const [data, setData] = useState('')
  const myformik = useFormik({
    initialValues: {
      username: '',
      email_id: '',
      pwd: '',
    },
    validate: (values) => {
      let errors = {}
      if (!values.username) {
        errors.username = 'please enter your name'
      }
      if (!values.email_id) {
        errors.email_id = 'please enter your email'
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email_id)
      ) {
        errors.email_id = 'Invalid email address'
      }
      if (!values.pwd) {
        errors.pwd = 'please enter password'
      }
      return errors
    },
    onSubmit: async (values) => {
      setloading(true)
      try {
        const value = await axios.post(
          'https://bookmyshow-ukl3.onrender.com/api/v1/auth/register',
          values,
        )
        if (value.data.message) {
          setData(value.data.message)
          setloading(false)
          alert('success')
          navigator('/')
        } else {
          setData(value.data.message)
          setloading(false)
          navigator('/')
        }
      } catch (error) {
        setData(error.response.data.message)
        console.log('error ', error.response.data.message)
        setloading(false)
      }
    },
  })

  return (
    <>
      <div className="body col-lg-12 col-md-8">
        <section class="container">
          <div class="login-container">
            <div class="form-container">
              <h1 class="opacity">Register</h1>
              <form onSubmit={myformik.handleSubmit}>
                <div>
                  <input
                    type="text"
                    placeholder="Enter your Name"
                    className={`form-control ${
                      myformik.errors.username ? 'is-invalid' : 'is-valid'
                    }`}
                    onChange={myformik.handleChange}
                    values={myformik.values.username}
                    name="username"
                  />
                  <span style={{ color: 'red' }}>
                    {myformik.errors.username}
                  </span>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Enter your Email"
                    className={`form-control ${
                      myformik.errors.email_id ? 'is-invalid' : 'is-valid'
                    }`}
                    onChange={myformik.handleChange}
                    values={myformik.values.email_id}
                    name="email_id"
                  />
                  <span style={{ color: 'red' }}>
                    {myformik.errors.email_id}
                  </span>
                </div>
                <div>
                  <input
                    className={`formcontrol${
                      myformik.errors.pwd ? 'is-invalid' : 'is-valid'
                    }`}
                    input="text"
                    onChange={myformik.handleChange}
                    values={myformik.values.pwd}
                    name="pwd"
                    placeholder="enter your password"
                  ></input>
                  <span style={{ color: 'red' }}>{myformik.errors.pwd}</span>
                </div>
                <div>
                  <button
                    type="sumbit"
                    disabled={loading}
                    value={loading ? 'submit' : 'submit'}
                    className="btn mt-2 opacity"
                  >
                    submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Register
