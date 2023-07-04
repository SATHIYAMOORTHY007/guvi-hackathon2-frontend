import React from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function Reset() {
  const params = useParams()
  const Navigate = useNavigate()
  const myformik = useFormik({
    initialValues: {
      pwd: '',
      conpwd: '',
    },

    validate: (values) => {
      let errors = {}
      if (!values.pwd) {
        errors.pwd = 'please enter your possword'
      }
      if (!values.conpwd) {
        errors.conpwd = 'please enter your possword'
      }
      if (values.pwd !== values.conpwd) {
        errors.conpwd = 'please enter your possword'
      }
    },
    onSubmit: async (values) => {
      try {
        await axios.post(
          `https://bookmyshow-ukl3.onrender.com/api/v1/auth/resetpassword/${params.id}/${params.token}`,
          values,
        )
        alert('success')
        Navigate('/')
      } catch (error) {
        console.log(error)
      }
    },
  })

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={myformik.handleSubmit}>
          <h1 className="mb-3">Forgot Password</h1>
          <div className="form-group">
            <div className="row">
              <div className="col-3">
                <label htmlFor="pwd">Password</label>
              </div>
              <div className="col-6">
                <input
                  type="text"
                  id="pwd"
                  className="form-control"
                  onChange={myformik.handleChange}
                  values={myformik.values.pwd}
                  name="pwd"
                />
              </div>
            </div>
            <span style={{ color: 'red' }}>{myformik.errors.pwd}</span>
            <div className="row">
              <div className="col-3">
                <label htmlFor="conpwd">conform Password</label>
              </div>
              <div className="col-6">
                <input
                  type="text"
                  id="conpwd"
                  className="form-control"
                  onChange={myformik.handleChange}
                  values={myformik.values.conpwd}
                  name="conpwd"
                />
              </div>
              <span style={{ color: 'red' }}>{myformik.errors.conpwd}</span>
            </div>
            <button
              id="forgot_password_button"
              type="submit"
              className="btn  btn-danger py-3 mt-3"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Reset
