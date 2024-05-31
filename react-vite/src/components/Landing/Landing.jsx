import { Navigate } from "react-router-dom"

import LoginFormModal from "../LoginFormModal"
import OpenModalButton from "../OpenModalButton"
import SignupFormModal from "../SignupFormModal"
import './Landing.css'
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { thunkAuthenticate } from "../../redux/session"

function Landing() {
  const dispatch = useDispatch()

  const sessionUser = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(thunkAuthenticate())
  }, [dispatch])

  if (sessionUser) {return <Navigate to='/home' replace={true} />}
  return ( 
    <div className='splash'>
      <div className='splash-container'>
        <h1>Welcome to Salt & Preppr</h1>
        <h2>Store all your favorite recipes in one easy to use place!</h2>
        <h3>Log in or Sign up to get started!</h3>
        <OpenModalButton 
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
        <OpenModalButton 
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </div>
    </div>

)
}

export default Landing
