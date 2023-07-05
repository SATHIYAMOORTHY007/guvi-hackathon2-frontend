import React, { useState } from 'react'
import { Formik, useFormik } from 'formik'
import axios from 'axios'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../Sidebar'
import DatePicker from 'react-datepicker'
import '../theater/create.css'
import { Oval } from 'react-loader-spinner'
import { useContext } from 'react'
import AuthContext from '../../auth/Authcontext/Authcontext'
function UpdateMovie() {
  const [selectestartingdate, setSelectestartingdate] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const params = useParams()
  const { auth } = useContext(AuthContext)
  useEffect(() => {
    setLoading(true)
    Movie()
    setLoading(false)
  }, [])

  let Movie = async () => {
    try {
      setLoading(true)
      const movie = await axios.post(
        `https://bookmyshow-ukl3.onrender.com/api/v1/getParticularMovie/${params.id}`,
      )

      myformik.setValues(movie.data.message)
      setLoading(false)
    } catch (error) {
      setLoading(true)
      console.log(error)
    }
  }

  const myformik = useFormik({
    initialValues: {
      name: '',
      language: '',
      genre: '',
      image: '',
      director: '',
      description: '',
      duration: '',
    },
    onSubmit: async (values) => {
      console.log(values)

      try {
        setLoading(true)
        const a = await axios.put(
          `https://bookmyshow-ukl3.onrender.com/api/v1/updateMovie/${params.id}`,
          values,
          {
            headers: {
              token: auth.token,
            },
          },
        )

        alert('success')
        setLoading(false)
      } catch (error) {
        setLoading(true)
        console.log(error)
      }
    },
  })

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
        <div className="row">
          <div className="col-2 col-lg-2">
            <Sidebar />
          </div>
          <div className="col-2 col-lg-8 mt-5">
            <form className="from-control" onSubmit={myformik.handleSubmit}>
              <div className="grid-container">
                <div className="item1">
                  <label for="movie_name">Movie Name</label>
                  <input
                    type="text"
                    class="form-control"
                    name="name"
                    value={myformik.values.name}
                    onChange={myformik.handleChange}
                    placeholder=" enter movie name"
                  />
                </div>
                <div className="item2">
                  <label for="language">Language</label>
                  <input
                    type="text"
                    class="form-control"
                    name="language"
                    value={myformik.values.language}
                    onChange={myformik.handleChange}
                    placeholder="enter language"
                  />
                </div>
                <div className="item3">
                  <label for="image_url">Image Url</label>
                  <input
                    type="text"
                    class="form-control"
                    name="image"
                    value={myformik.values.image}
                    onChange={myformik.handleChange}
                    placeholder="enter image url"
                  />
                </div>
                <div className="item4">
                  <label for="genre">Genre</label>
                  <input
                    type="text"
                    class="form-control"
                    value={myformik.values.genre}
                    onChange={myformik.handleChange}
                    name="genre"
                    placeholder="enter genre"
                  />
                </div>
                <div className="item5">
                  <label for="director">Director</label>
                  <input
                    type="text"
                    class="form-control"
                    name="director"
                    value={myformik.values.director}
                    onChange={myformik.handleChange}
                    placeholder="enter director"
                  />
                </div>
                <div className="item6">
                  <label for="duration">Duration</label>
                  <input
                    type="text"
                    class="form-control"
                    name="duration"
                    value={myformik.values.duration}
                    onChange={myformik.handleChange}
                    placeholder="enter duration"
                  />
                </div>
                <div className="item7">
                  <label for="description">Description</label>
                  <textarea
                    type="text"
                    class="form-control"
                    value={myformik.values.description}
                    onChange={myformik.handleChange}
                    rows="7"
                    name="description"
                    placeholder="enter description"
                  />
                </div>
                {/*  <div className="item8">
           <label for="releaseDate">ReleaseDate</label>
           <DatePicker
             selected={selectestartingdate}
             onChange={(date) => setSelectestartingdate(date)}
             dateFormat={'dd/MM/yyy'}
           />
         </div> */}
                {/*  <div className="item9">
           <label for="endDate">EndDate</label>
           <DatePicker
             selected={selecteenddate}
             onChange={(date) => setSelecteenddate(date)}
             dateFormat={'dd/MM/yyy'}
           />
         </div> */}
                <input type="submit" className="btn btn-primary my-5 mt-5" />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default UpdateMovie
