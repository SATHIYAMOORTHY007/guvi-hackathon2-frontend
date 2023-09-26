import React, { useContext, useState } from 'react'
import Sidebar from '../Sidebar'
import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import '../theater/create.css'
import { Discuss, Oval } from 'react-loader-spinner'
import axios from 'axios'
import AuthContext from '../../auth/Authcontext/Authcontext'

function MovieCreate() {
  const [loading, setLoading] = useState(false)
  const [selectestartingdate, setSelectestartingdate] = useState(Date())
  const [selecteenddate, setSelecteenddate] = useState(Date())
  const [name, setName] = useState('')
  const [language, setLanguage] = useState('')
  const [image, setImage] = useState('')
  const [genre, setGenre] = useState('')
  const [director, setDirector] = useState('')
  const [description, setDescription] = useState('')
  const [duration, setDuration] = useState('')
  const { auth } = useContext(AuthContext)
  const onsubmit = async (e) => {
    e.preventDefault()
    try {
      const data = {}
      data.name = name
      data.language = language
      data.genre = genre
      data.image = image
      data.director = director
      data.description = description
      data.duration = duration
      data.releaseDate = selectestartingdate
      data.endDate = selecteenddate

      if (
        name !== '' &&
        language !== '' &&
        genre !== '' &&
        image !== '' &&
        director !== '' &&
        description !== '' &&
        duration !== '' &&
        selectestartingdate !== '' &&
        selecteenddate !== ''
      ) {
        const a = await axios.post(
          'https://bookmyshow-ukl3.onrender.com/api/v1/create',
          data,
        )

        alert('success')
      } else {
        alert('required all')
      }
    } catch (error) {
      console.log(error)
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
        <div className="row">
          <div className="col-2 col-lg-2">
            <Sidebar />
          </div>
          <div className="col-8 col-lg-8">
            <form className="from-control">
              <div className="grid-container">
                <div className="item1">
                  <label for="movie_name">Movie Name</label>
                  <input
                    type="text"
                    class="form-control"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    name="name"
                    placeholder=" enter movie name"
                  />
                </div>
                <div className="item2">
                  <label for="language">Language</label>
                  <input
                    type="text"
                    class="form-control"
                    name="language"
                    onChange={(e) => setLanguage(e.target.value)}
                    value={language}
                    placeholder="enter language"
                  />
                </div>
                <div className="item3">
                  <label for="image_url">Image Url</label>
                  <input
                    type="text"
                    class="form-control"
                    onChange={(e) => setImage(e.target.value)}
                    value={image}
                    name="image"
                    placeholder="enter image url"
                  />
                </div>
                <div className="item4">
                  <label for="genre">Genre</label>
                  <input
                    type="text"
                    class="form-control"
                    name="genre"
                    onChange={(e) => setGenre(e.target.value)}
                    value={genre}
                    placeholder="enter genre"
                  />
                </div>
                <div className="item5">
                  <label for="director">Director</label>
                  <input
                    type="text"
                    class="form-control"
                    name="director"
                    onChange={(e) => setDirector(e.target.value)}
                    placeholder="enter director"
                    value={director}
                  />
                </div>
                <div className="item6">
                  <label for="duration">Duration</label>
                  <input
                    type="text"
                    class="form-control"
                    name="duration"
                    placeholder="enter duration"
                    onChange={(e) => setDuration(e.target.value)}
                    value={duration}
                  />
                </div>
                <div className="item7">
                  <label for="description">Description</label>
                  <textarea
                    type="text"
                    class="form-control"
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    placeholder="enter description"
                  />
                </div>
                <div className="item8">
                  <label for="releaseDate">ReleaseDate</label>
                  <input
                    type="date"
                    selected={selectestartingdate}
                    name="selectestartingdate"
                    onChange={(e) => setSelectestartingdate(e.target.value)}
                    value={selectestartingdate}
                  />
                </div>
                <div className="item9">
                  <label for="endDate">EndDate</label>
                  <input
                    type="date"
                    selected={selecteenddate}
                    onChange={(e) => setSelecteenddate(e.target.value)}
                    value={selecteenddate}
                  />
                </div>
                <button className="btn btn-primary" onClick={onsubmit}>
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default MovieCreate
