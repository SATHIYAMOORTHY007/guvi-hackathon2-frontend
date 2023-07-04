import React from 'react'
import { useContext } from 'react'
import AuthContext from './auth/Authcontext/Authcontext'
import Protect from './Protect'
import { Navigate } from 'react-router-dom'

function Required() {
  const { auth } = useContext(AuthContext)
  return auth?.token ? <Protect /> : <Navigate to="/" />
}

export default Required
