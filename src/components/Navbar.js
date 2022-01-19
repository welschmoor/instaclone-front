
import { useReactiveVar } from "@apollo/client"
import { NavLink } from "react-router-dom"

import { darkModeVar, loggedInVar } from "../graphql/apollo"

const Navbar = () => {
  const loggedInBool = useReactiveVar(loggedInVar)
  const darkModeBool = useReactiveVar(darkModeVar)


  const logout = () => {
    loggedInVar(false)
    localStorage.removeItem("instapoundtoken")
  }

  return (
    <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/signup">Signup</NavLink>
      {loggedInBool ? "logged in!" : "not logged in!"}
      <button onClick={() => logout()} >logout</button>
      <button onClick={() => darkModeVar(darkModeBool ? false : true)} >change theme</button>
    </div>
  )
}


export default Navbar