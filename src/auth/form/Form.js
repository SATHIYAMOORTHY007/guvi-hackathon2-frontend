import 'bootstrap/dist/css/bootstrap.min.css'
import { useFormik } from 'formik'
import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import './form.css'
import AuthContext from '../Authcontext/Authcontext'

function Form() {
  const { setAuth } = useContext(AuthContext)
  const [isLoading, setLoading] = useState(false)
  const Navigate = useNavigate()

  const myformik = useFormik({
    initialValues: {
      email_id: '',
      pwd: '',
    },
    validate: (values) => {
      let errors = {}
      if (!values.email_id) {
        errors.email_id = 'please enter email'
      }
      if (!values.pwd) {
        errors.pwd = 'please enter password'
      }

      return errors
    },
    onSubmit: async (values) => {
      try {
        setLoading(true)
        const value = await axios.post(
          'http://localhost:2001/api/v1/auth/login',
          values,
        )

        const token = value?.data?.token
        const role = value?.data?.isAdmin
        const name = value?.data?.details?.username
        const email = value?.data?.details?.email
        const id = value?.data?.details?._id

        setAuth({ token, role, name, email, id })
        Navigate('/home')
        setLoading(false)
      } catch (error) {
        alert('Not Valid')
        setLoading(false)
      }
    },
  })

  return (
    <>
      <div className="body col-lg-12 col-md-8">
        <section class="container">
          <div class="login-container">
            <div class="form-container">
              <h1 class="opacity">LOGIN</h1>
              <form onSubmit={myformik.handleSubmit}>
                <div>
                  <input
                    className={`form-control ${
                      myformik.errors.email_id ? 'is-invalid' : 'is-valid'
                    }`}
                    onChange={myformik.handleChange}
                    values={myformik.values.email_id}
                    name="email_id"
                    type="text"
                    placeholder="USERNAME"
                  />
                </div>
                <span style={{ color: 'red' }}>{myformik.errors.email_id}</span>
                <div>
                  <input
                    type="password"
                    placeholder="PASSWORD"
                    className={`form-control ${
                      myformik.errors.pwd ? 'is-invalid' : 'is-valid'
                    }`}
                    onChange={myformik.handleChange}
                    values={myformik.values.pwd}
                    name="pwd"
                  />
                  <span style={{ color: 'red' }}>{myformik.errors.pwd}</span>
                </div>
                <div>
                  <button
                    type="submit"
                    hidden={isLoading}
                    className="btn mt-2 btn-primary opacity"
                  >
                    SUBMIT
                  </button>
                </div>
              </form>
              <div class="register-forget opacity">
                <Link to={'/register'}>REGISTER</Link>
                <Link to={'/forgetpassword'}>FORGOT PASSWORD</Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Form
