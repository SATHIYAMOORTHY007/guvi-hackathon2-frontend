import React, { useState } from 'react'
import '../forgetpassword/forgetpassword.css'
import { useFormik } from 'formik'
import axios from 'axios'

function Forgetpassword() {
  const [data, setData] = useState('')

  const myformik = useFormik({
    initialValues: {
      email_Id: '',
    },

    validate: (values) => {
      let errors = {}
      if (!values.email_Id) {
        errors.email_Id = 'please enter your email'
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email_Id)
      ) {
        errors.email_Id = 'Invalid email address'
      }
    },
    onSubmit: async (values) => {
      try {
        const value = await axios.post(
          `http://localhost:2001/api/v1/auth/forgetpassword`,
          values,
        )
        const al = value.data

        if (value.data.message) {
          return alert('email doesnot Exists....')
        }
        alert(al)
        myformik.values.email_Id = ''
      } catch (err) {
        console.log(err)
      }
    },
  })
  return (
    <div className="container">
      <form className="shadow-lg forget " onSubmit={myformik.handleSubmit}>
        <h1 className="mb-3">Forgot Password</h1>
        <div className="form-group">
          <div className="row">
            <div className="col-3"></div>
            <div className="col-6">
              <input
                type="email"
                id="email_field"
                className="form-control"
                placeholder="Enter Your Email"
                onChange={myformik.handleChange}
                values={myformik.values.email_Id}
                name="email_Id"
              />
            </div>
          </div>
          <span style={{ color: 'red' }}>{myformik.errors.email_Id}</span>
          <button
            id="forgot_password_button"
            type="submit"
            className="btn  btn-danger py-3 mt-3 "
          >
            Send Email
          </button>
        </div>
      </form>
      {data}
    </div>
  )
}

export default Forgetpassword
